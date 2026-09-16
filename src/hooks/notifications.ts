import { useCreateItem, useGetItems, useUpdateItem, useDeleteItem, useGetItem } from "./general";

// Notification interface (matches Postman collection)
export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
    isRead: boolean;
    link?: string;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

export interface CreateNotificationDto {
    title: string;
    message: string;
    type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
    link?: string;
    metadata?: Record<string, any>;
}

export interface AdminSendNotificationDto extends CreateNotificationDto {
    sendToAll?: boolean;
    recipientRole?: string;
    recipientIds?: string[];
}

export interface NotificationStats {
    count?: number;
    unreadCount?: number;
}

// Get my notifications (with pagination)
export const useGetMyNotifications = (page: number = 1, limit: number = 20, isRead?: boolean, type?: string) => {
    const params: Record<string, string> = {};
    if (page) params.page = page.toString();
    if (limit) params.limit = limit.toString();
    if (isRead !== undefined) params.isRead = isRead.toString();
    if (type) params.type = type;
    
    return useGetItems<Notification>('/notification/my-notifications', params);
};

// Get unread count
export const useGetUnreadCount = () => {
    return useGetItem<NotificationStats>(
        '/notification/notifications/unread-count',
        '',
        undefined,
        { enabled: true, staleTime: 5 * 60 * 1000, refetchOnWindowFocus: false }
    );
};

// Create notification
export const useCreateNotification = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useCreateItem<Notification>(
        '/notification/create-notification',
        'Notification sent successfully',
        onSuccessFn,
        false,
        true,
        true
    );
};

export const useSendAdminNotification = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useCreateItem<any>(
        '/notification/admin/send',
        'Notification sent successfully',
        onSuccessFn,
        false,
        true,
        true
    );
};

// Mark notification as read
export const useMarkAsRead = (
    id: string,
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useUpdateItem<Notification>(
        `/notification/notifications/${id}/mark-as-read`,
        'Marked as read',
        onSuccessFn,
        false,
        false, // Don't show success toast
        true
    );
};

// Mark all as read
export const useMarkAllAsRead = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useUpdateItem<Notification>(
        '/notification/notifications/mark-all-as-read',
        'All notifications marked as read',
        onSuccessFn,
        false,
        true,
        true
    );
};

// Delete notification
export const useDeleteNotification = () => {
    return useDeleteItem<Notification>(
        '/notification/notifications',
        'Notification deleted',
        true,
        true
    );
};

// Delete all notifications
export const useDeleteAllNotifications = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useDeleteItem<Notification>(
        '/notification/notifications/delete-all',
        'All notifications deleted',
        true,
        true
    );
};

// Test notification (Admin only)
export const useSendTestNotification = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useCreateItem<any>(
        '/notification/test',
        'Test notification sent successfully',
        onSuccessFn,
        false,
        true,
        true
    );
};
