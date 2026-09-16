# WebSocket Notification System

## Overview
The WebSocket notification system enables real-time communication between different user roles in the School Portal. It uses native WebSocket API (WSS protocol) for secure, bidirectional communication.

## Features
- **Real-time notifications** - Instant delivery of messages without page refresh
- **Automatic reconnection** - Handles connection drops gracefully
- **Role-based communication** - Support for all user role combinations:
  - Admin ↔ Teacher
  - Admin ↔ Admin
  - Admin ↔ Student
  - Teacher ↔ Student
  - Admin ↔ Guardian
  - Teacher ↔ Guardian
- **Toast notifications** - Visual alerts for incoming messages
- **Notification center** - View all notifications in one place
- **Connection status indicator** - Real-time connection status display

## Architecture

### Components

#### 1. WebSocket Service (`src/services/websocket.ts`)
Core WebSocket connection management:
- Connection establishment with authentication
- Automatic reconnection with exponential backoff
- Heartbeat/ping-pong mechanism
- Message sending and receiving
- Event handlers for connect, disconnect, message, and error

#### 2. WebSocket Context (`src/contexts/WebSocketContext.tsx`)
React context provider for WebSocket functionality:
- Manages WebSocket lifecycle
- Provides hooks for components
- Integrates with React Query for cache invalidation
- Shows toast notifications for incoming messages

#### 3. Notification Center (`src/components/notifications/NotificationCenter.tsx`)
UI component for viewing notifications:
- Sheet/drawer interface
- Tabs for "All" and "Unread" notifications
- Mark as read functionality
- Delete notifications
- Connection status indicator
- Real-time unread count badge

#### 4. Send Notification (`src/components/notifications/SendNotification.tsx`)
UI component for sending notifications:
- Select recipient by role and name
- Set notification type (Info, Success, Warning, Error)
- Compose title and message
- Real-time sending via WebSocket

## Usage

### 1. Setup (Already Done)
The WebSocket system is automatically initialized in `App.tsx`:

```tsx
<WebSocketProvider>
  <RouterProvider router={router} />
</WebSocketProvider>
```

### 2. Using the Notification Center
The notification center is available in the header of all authenticated pages:
- Click the bell icon to open
- View unread count badge
- Mark notifications as read
- Delete notifications
- See connection status

### 3. Sending Notifications Programmatically

```tsx
import { useWebSocket } from '@/contexts/WebSocketContext';

function MyComponent() {
  const { sendNotification, isConnected } = useWebSocket();

  const handleSend = () => {
    sendNotification(
      { id: 'user-id', role: 'STUDENT' },
      'Assignment Due',
      'Your math assignment is due tomorrow',
      'WARNING'
    );
  };

  return (
    <button onClick={handleSend} disabled={!isConnected}>
      Send Notification
    </button>
  );
}
```

### 4. Using the Send Notification Dialog

```tsx
import { SendNotification } from '@/components/notifications';

function MyPage() {
  return (
    <div>
      {/* Default trigger button */}
      <SendNotification />
      
      {/* Custom trigger */}
      <SendNotification trigger={<Button>Notify User</Button>} />
      
      {/* Pre-fill recipient */}
      <SendNotification 
        defaultRecipient={{ 
          id: 'user-123', 
          role: 'STUDENT', 
          name: 'John Doe' 
        }} 
      />
    </div>
  );
}
```

### 5. Listening to Incoming Messages

```tsx
import { useWebSocket } from '@/contexts/WebSocketContext';
import { useEffect } from 'react';

function MyComponent() {
  const { lastMessage } = useWebSocket();

  useEffect(() => {
    if (lastMessage?.type === 'notification') {
      console.log('New notification:', lastMessage.payload);
      // Handle the notification in your component
    }
  }, [lastMessage]);

  return <div>...</div>;
}
```

## WebSocket URL
The WebSocket connects to: `wss://school-portal-be.onrender.com/api/v1/notifications/ws`

Authentication is handled via JWT token passed as a query parameter.

## Message Format

### Outgoing Messages
```json
{
  "type": "notification",
  "payload": {
    "to": {
      "id": "user-id",
      "role": "STUDENT"
    },
    "title": "Notification Title",
    "message": "Notification message content",
    "notificationType": "INFO",
    "metadata": {},
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

### Incoming Messages
```json
{
  "type": "notification",
  "payload": {
    "id": "notification-id",
    "title": "Notification Title",
    "message": "Notification message content",
    "notificationType": "SUCCESS",
    "from": {
      "id": "sender-id",
      "name": "John Doe",
      "role": "TEACHER"
    },
    "metadata": {},
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## Connection Management

### Auto-Reconnection
The WebSocket service automatically attempts to reconnect on connection loss:
- Initial retry after 5 seconds
- Maximum 10 reconnection attempts
- Connection status visible in UI

### Heartbeat
A heartbeat mechanism keeps the connection alive:
- Ping sent every 30 seconds
- Detects dead connections
- Triggers reconnection if needed

## Notification Types
- `INFO` - Blue, informational messages
- `SUCCESS` - Green, success confirmations
- `WARNING` - Orange, warning messages
- `ERROR` - Red, error notifications
- `MESSAGE` - General messages

## Integration with Existing Notification System
The WebSocket system works alongside the HTTP-based notification API:
- WebSocket provides real-time delivery
- HTTP API stores notification history
- Both systems share the same notification interface
- WebSocket invalidates React Query cache on new notifications

## Security
- WSS (WebSocket Secure) protocol for encrypted communication
- JWT authentication required for connection
- Authorization checks on backend for role-based access
- Connection automatically closed on token expiration

## Backend Requirements

For the WebSocket system to work, the backend must implement:

1. **WebSocket Gateway** at `/api/v1/notifications/ws`
2. **Authentication** via JWT in query parameter
3. **Message routing** based on user roles
4. **Notification persistence** for offline users

Example backend integration (NestJS):
```typescript
@WebSocketGateway({ cors: true })
export class NotificationsGateway {
  @SubscribeMessage('notification')
  handleNotification(client: Socket, payload: any) {
    // Validate and route notification
  }
}
```

## Troubleshooting

### Connection Issues
- Check if backend WebSocket server is running
- Verify JWT token is valid
- Check browser console for WebSocket errors
- Ensure firewall allows WebSocket connections

### Messages Not Received
- Confirm WebSocket is connected (check status indicator)
- Verify recipient role and ID are correct
- Check backend logs for routing errors

### Performance
- WebSocket connections are lightweight
- Minimal battery impact on mobile devices
- Automatic cleanup on logout/page close

## Future Enhancements
- [ ] Message delivery confirmation
- [ ] Typing indicators
- [ ] Read receipts
- [ ] Group notifications (broadcast to role)
- [ ] Rich media attachments
- [ ] Push notifications for mobile
- [ ] Chat functionality
