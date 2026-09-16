import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { websocketService, type WebSocketMessage, type NotificationType } from '@/services/websocket';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AuthContext } from './AuthContext';

interface WebSocketContextType {
    isConnected: boolean;
    sendNotification: (
        to: { id: string; role: string },
        title: string,
        message: string,
        notificationType?: NotificationType,
        metadata?: Record<string, any>
    ) => void;
    lastMessage: WebSocketMessage | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
    const queryClient = useQueryClient();
    const { user, isAuthenticated } = useContext(AuthContext);
    const hasConnected = useRef(false);

    // Handle incoming messages
    const handleMessage = useCallback(
        (message: WebSocketMessage) => {
            setLastMessage(message);

            // Handle notifications
            if (message.type === 'notification' && message.payload) {
                const { title, message: msg, notificationType } = message.payload;

                // Show toast notification
                const toastType = notificationType?.toLowerCase() as 'success' | 'error' | 'warning' | 'info';
                
                switch (toastType) {
                    case 'success':
                        toast.success(title || 'Notification', { description: msg });
                        break;
                    case 'error':
                        toast.error(title || 'Notification', { description: msg });
                        break;
                    case 'warning':
                        toast.warning(title || 'Notification', { description: msg });
                        break;
                    case 'info':
                    default:
                        toast.info(title || 'Notification', { description: msg });
                        break;
                }

                // Invalidate notifications query to refresh the list
                queryClient.invalidateQueries({ queryKey: ['/notification/my-notifications'] });
                queryClient.invalidateQueries({ queryKey: ['/notification/notifications/unread-count'] });
            }
        },
        [queryClient]
    );

    // Send notification function
    const sendNotification = useCallback(
        (
            to: { id: string; role: string },
            title: string,
            message: string,
            notificationType: NotificationType = 'INFO',
            metadata?: Record<string, any>
        ) => {
            websocketService.sendNotification(to, title, message, notificationType, metadata);
        },
        []
    );

    // Setup WebSocket connection
    useEffect(() => {
        if (!isAuthenticated || !user) {
            // Disconnect if not authenticated
            if (hasConnected.current) {
                websocketService.disconnect();
                hasConnected.current = false;
                setIsConnected(false);
            }
            return;
        }

        // Connect to WebSocket
        if (!hasConnected.current) {
            websocketService.connect();
            hasConnected.current = true;
        }

        // Subscribe to events
        const unsubscribeMessage = websocketService.onMessage(handleMessage);
        const unsubscribeConnect = websocketService.onConnect(() => {
            console.log('WebSocket connected in context');
            setIsConnected(true);
        });
        const unsubscribeDisconnect = websocketService.onDisconnect(() => {
            console.log('WebSocket disconnected in context');
            setIsConnected(false);
        });
        const unsubscribeError = websocketService.onError((error) => {
            console.error('WebSocket error in context:', error);
        });

        // Cleanup
        return () => {
            unsubscribeMessage();
            unsubscribeConnect();
            unsubscribeDisconnect();
            unsubscribeError();
        };
    }, [isAuthenticated, user, handleMessage]);

    // Disconnect on unmount
    useEffect(() => {
        return () => {
            if (hasConnected.current) {
                websocketService.disconnect();
                hasConnected.current = false;
            }
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ isConnected, sendNotification, lastMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (context === undefined) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};
