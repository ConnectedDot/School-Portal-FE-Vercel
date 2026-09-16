/**
 * WebSocket Service for Real-time Notifications
 * Handles WebSocket connections using native WebSocket API
 * Supports notifications between:
 * - Admin to Teacher
 * - Admin to Admin
 * - Admin to Student
 * - Teacher to Student
 * - Admin to Guardian
 * - Teacher to Guardian
 */

import { getUserItem } from '@/storage';
import { io, type Socket } from 'socket.io-client';

export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'MESSAGE';

export interface WebSocketMessage {
    type: 'notification' | 'message' | 'ping' | 'pong';
    payload?: {
        id?: string;
        title?: string;
        message: string;
        notificationType?: NotificationType;
        from?: {
            id: string;
            name: string;
            role: string;
        };
        to?: {
            id: string;
            role: string;
        };
        metadata?: Record<string, any>;
        timestamp?: string;
    };
}

export interface WebSocketConfig {
    url: string;
    reconnectInterval?: number;
    maxReconnectAttempts?: number;
    heartbeatInterval?: number;
}

type MessageHandler = (message: WebSocketMessage) => void;
type ConnectionHandler = () => void;
type ErrorHandler = (error: Event | Error) => void;

class WebSocketService {
    private ws: Socket | null = null;
    private config: WebSocketConfig;
    private messageHandlers: Set<MessageHandler> = new Set();
    private connectHandlers: Set<ConnectionHandler> = new Set();
    private disconnectHandlers: Set<ConnectionHandler> = new Set();
    private errorHandlers: Set<ErrorHandler> = new Set();
    private reconnectAttempts = 0;
    private reconnectTimeout: NodeJS.Timeout | null = null;
    private heartbeatInterval: NodeJS.Timeout | null = null;
    private isIntentionalDisconnect = false;

    constructor(config: WebSocketConfig) {
        this.config = {
            reconnectInterval: 5000,
            maxReconnectAttempts: 10,
            heartbeatInterval: 30000,
            ...config,
        };
    }

    /**
     * Connect to WebSocket server
     */
    async connect(): Promise<void> {
        if (this.ws?.connected) {
            console.log('WebSocket already connected');
            return;
        }

        this.isIntentionalDisconnect = false;

        try {
            const token = await getUserItem('token');
            if (!token) {
                console.error('No authentication token available for WebSocket connection');
                return;
            }

            this.ws = io(this.config.url, {
                auth: { token },
                transports: ['websocket'],
                reconnection: false,
            });

            this.ws.on('connect', () => {
                console.log('WebSocket connected');
                this.reconnectAttempts = 0;
                this.startHeartbeat();
                this.notifyConnect();
            });

            this.ws.on('notification', (notification) => {
                this.handleMessage({
                    type: 'notification',
                    payload: {
                        id: notification.id,
                        title: notification.title,
                        message: notification.message,
                        notificationType: notification.type,
                        metadata: notification.metadata,
                        timestamp: notification.createdAt,
                    },
                });
            });

            this.ws.on('connect_error', (error) => {
                console.error('WebSocket error:', error);
                this.notifyError(error as any);
                this.ws?.disconnect();
            });

            this.ws.on('disconnect', () => {
                console.log('WebSocket disconnected');
                this.stopHeartbeat();
                this.notifyDisconnect();

                if (!this.isIntentionalDisconnect) {
                    this.attemptReconnect();
                }
            });
        } catch (error) {
            console.error('Failed to connect to WebSocket:', error);
            this.attemptReconnect();
        }
    }

    /**
     * Disconnect from WebSocket server
     */
    disconnect(): void {
        this.isIntentionalDisconnect = true;
        
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }

        this.stopHeartbeat();

        if (this.ws) {
            this.ws.disconnect();
            this.ws = null;
        }
    }

    /**
     * Send a message through WebSocket
     */
    send(message: WebSocketMessage): void {
        if (this.ws?.connected) {
            this.ws.emit(message.type, message.payload);
        } else {
            console.error('WebSocket is not connected');
        }
    }

    /**
     * Send a notification to a specific user
     */
    sendNotification(
        to: { id: string; role: string },
        title: string,
        message: string,
        notificationType: NotificationType = 'INFO',
        metadata?: Record<string, any>
    ): void {
        this.send({
            type: 'notification',
            payload: {
                to,
                title,
                message,
                notificationType,
                metadata,
                timestamp: new Date().toISOString(),
            },
        });
    }

    /**
     * Subscribe to incoming messages
     */
    onMessage(handler: MessageHandler): () => void {
        this.messageHandlers.add(handler);
        return () => this.messageHandlers.delete(handler);
    }

    /**
     * Subscribe to connection events
     */
    onConnect(handler: ConnectionHandler): () => void {
        this.connectHandlers.add(handler);
        return () => this.connectHandlers.delete(handler);
    }

    /**
     * Subscribe to disconnection events
     */
    onDisconnect(handler: ConnectionHandler): () => void {
        this.disconnectHandlers.add(handler);
        return () => this.disconnectHandlers.delete(handler);
    }

    /**
     * Subscribe to error events
     */
    onError(handler: ErrorHandler): () => void {
        this.errorHandlers.add(handler);
        return () => this.errorHandlers.delete(handler);
    }

    /**
     * Check if WebSocket is connected
     */
    isConnected(): boolean {
        return this.ws?.connected ?? false;
    }

    // Private methods

    private handleMessage(message: WebSocketMessage): void {
        // Handle pong response
        if (message.type === 'pong') {
            return;
        }

        // Notify all message handlers
        this.messageHandlers.forEach((handler) => {
            try {
                handler(message);
            } catch (error) {
                console.error('Error in message handler:', error);
            }
        });
    }

    private notifyConnect(): void {
        this.connectHandlers.forEach((handler) => {
            try {
                handler();
            } catch (error) {
                console.error('Error in connect handler:', error);
            }
        });
    }

    private notifyDisconnect(): void {
        this.disconnectHandlers.forEach((handler) => {
            try {
                handler();
            } catch (error) {
                console.error('Error in disconnect handler:', error);
            }
        });
    }

    private notifyError(error: Event | Error): void {
        this.errorHandlers.forEach((handler) => {
            try {
                handler(error);
            } catch (err) {
                console.error('Error in error handler:', err);
            }
        });
    }

    private attemptReconnect(): void {
        if (this.reconnectAttempts >= (this.config.maxReconnectAttempts || 10)) {
            console.error('Max reconnection attempts reached');
            return;
        }

        this.reconnectAttempts++;
        const delay = this.config.reconnectInterval || 5000;

        console.log(
            `Attempting to reconnect (${this.reconnectAttempts}/${this.config.maxReconnectAttempts}) in ${delay}ms...`
        );

        this.reconnectTimeout = setTimeout(() => {
            this.connect();
        }, delay);
    }

    private startHeartbeat(): void {
        this.stopHeartbeat();

        this.heartbeatInterval = setInterval(() => {
            if (this.ws?.connected) {
                this.send({ type: 'ping' });
            }
        }, this.config.heartbeatInterval || 30000);
    }

    private stopHeartbeat(): void {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }
}

// Create singleton instance
// Convert HTTPS URL to WSS URL for WebSocket connection
const wsUrl = 'https://school-portal-be.onrender.com/notifications';

export const websocketService = new WebSocketService({
    url: wsUrl,
    reconnectInterval: 5000,
    maxReconnectAttempts: 10,
    heartbeatInterval: 30000,
});

export default websocketService;
