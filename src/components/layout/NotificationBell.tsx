import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// import { ScrollArea } from '@/components/ui/scroll-area';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IonIcon } from '@ionic/react';
import {
    notificationsOutline,
    checkmarkDoneOutline,
    trashOutline,
    timeOutline,
    informationCircleOutline,
    warningOutline,
    checkmarkCircleOutline,
    closeCircleOutline,
    megaphoneOutline,
} from 'ionicons/icons';
import {
    useGetMyNotifications,
    useGetUnreadCount,
    useMarkAsRead,
    useMarkAllAsRead,
    useDeleteNotification,
    type Notification,
} from '@/hooks/notifications';
import { formatDistanceToNow } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@radix-ui/react-scroll-area';

export const NotificationBell = () => {
    const { data: notifications, isLoading, refetch } = useGetMyNotifications();
    const { data: unreadData } = useGetUnreadCount();
    const { mutate: markAsRead } = useMarkAsRead('', async () => {
        await refetch();
    });
    const { mutate: markAllAsRead } = useMarkAllAsRead(async () => {
        await refetch();
    });
    const { mutate: deleteNotification } = useDeleteNotification();

    const [isOpen, setIsOpen] = useState(false);
    const unreadCount = unreadData?.unreadCount || 0;

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'INFO':
                return informationCircleOutline;
            case 'SUCCESS':
                return checkmarkCircleOutline;
            case 'WARNING':
                return warningOutline;
            case 'ERROR':
                return closeCircleOutline;
            case 'ANNOUNCEMENT':
                return megaphoneOutline;
            default:
                return informationCircleOutline;
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'INFO':
                return 'text-blue-500 bg-blue-50';
            case 'SUCCESS':
                return 'text-green-500 bg-green-50';
            case 'WARNING':
                return 'text-orange-500 bg-orange-50';
            case 'ERROR':
                return 'text-red-500 bg-red-50';
            case 'ANNOUNCEMENT':
                return 'text-purple-500 bg-purple-50';
            default:
                return 'text-gray-500 bg-gray-50';
        }
    };

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.isRead) {
            markAsRead({ id: notification.id });
        }
    };

    const handleMarkAllAsRead = () => {
        markAllAsRead({});
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        deleteNotification(id);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <IonIcon icon={notificationsOutline} className="w-5 h-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96 p-0">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                        <IonIcon icon={notificationsOutline} className="w-5 h-5" />
                        <h3 className="font-semibold">Notifications</h3>
                        {unreadCount > 0 && (
                            <Badge variant="secondary" className="text-xs">
                                {unreadCount} new
                            </Badge>
                        )}
                    </div>
                    {notifications && notifications.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleMarkAllAsRead}
                            className="gap-1 h-8 text-xs"
                        >
                            <IonIcon icon={checkmarkDoneOutline} className="w-4 h-4" />
                            Mark all read
                        </Button>
                    )}
                </div>

                {/* Notifications List */}
                <ScrollArea className="h-96">
                    {isLoading ? (
                        <div className="p-4 space-y-3">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-20" />
                            ))}
                        </div>
                    ) : notifications && notifications.length > 0 ? (
                        <div className="divide-y">
                            {notifications.map((notification: Notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 hover:bg-accent transition-colors cursor-pointer ${!notification.isRead ? 'bg-muted/50' : ''
                                        }`}
                                    onClick={() => handleNotificationClick(notification)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                                            <IonIcon
                                                icon={getNotificationIcon(notification.type)}
                                                className="w-5 h-5"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="font-medium text-sm line-clamp-1">
                                                    {notification.title}
                                                </p>
                                                {!notification.isRead && (
                                                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <IonIcon icon={timeOutline} className="w-3 h-3" />
                                                    {formatDistanceToNow(new Date(notification.createdAt), {
                                                        addSuffix: true,
                                                    })}
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-6 px-2"
                                                    onClick={(e) => handleDelete(notification.id, e)}
                                                >
                                                    <IonIcon icon={trashOutline} className="w-3 h-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-4">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                <IonIcon
                                    icon={notificationsOutline}
                                    className="w-8 h-8 text-muted-foreground"
                                />
                            </div>
                            <p className="text-sm font-medium text-center">No notifications</p>
                            <p className="text-xs text-muted-foreground text-center mt-1">
                                You're all caught up!
                            </p>
                        </div>
                    )}
                </ScrollArea>

                {/* Footer */}
                {notifications && notifications.length > 0 && (
                    <div className="p-3 border-t">
                        <Button
                            variant="outline"
                            className="w-full"
                            size="sm"
                            onClick={() => setIsOpen(false)}
                        >
                            View all notifications
                        </Button>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
