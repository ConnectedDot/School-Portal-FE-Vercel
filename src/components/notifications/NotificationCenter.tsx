import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IonIcon } from '@ionic/react';
import {
    notificationsOutline,
    checkmarkDoneOutline,
    trashOutline,
    closeCircleOutline,
} from 'ionicons/icons';
import {
    useGetMyNotifications,
    useGetUnreadCount,
    useMarkAsRead,
    useMarkAllAsRead,
    useDeleteNotification,
} from '@/hooks/notifications';
import { Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useWebSocket } from '@/contexts/WebSocketContext';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const NotificationCenter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const { isConnected } = useWebSocket();

    // Fetch notifications
    const { data: allNotifications, isLoading: loadingAll } = useGetMyNotifications(1, 50);
    const { data: unreadNotifications, isLoading: loadingUnread } = useGetMyNotifications(1, 50, false);
    const { data: unreadCount } = useGetUnreadCount();

    // Mutations
    const { mutate: markAsRead } = useMarkAsRead('');
    const { mutate: markAllAsRead } = useMarkAllAsRead();
    const { mutate: deleteNotification } = useDeleteNotification();

    const handleMarkAsRead = (id: string) => {
        markAsRead({ id });
    };

    const handleMarkAllAsRead = () => {
        markAllAsRead({});
    };

    const handleDelete = (id: string) => {
        setDeleteId(id);
    };

    const confirmDelete = () => {
        if (deleteId) {
            deleteNotification(deleteId);
            setDeleteId(null);
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'SUCCESS':
                return '✓';
            case 'WARNING':
                return '⚠';
            case 'ERROR':
                return '✗';
            default:
                return 'ℹ';
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'SUCCESS':
                return 'text-green-500 bg-green-50';
            case 'WARNING':
                return 'text-orange-500 bg-orange-50';
            case 'ERROR':
                return 'text-red-500 bg-red-50';
            default:
                return 'text-blue-500 bg-blue-50';
        }
    };

    const renderNotificationList = (notifications: any[], loading: boolean) => {
        if (loading) {
            return (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
            );
        }

        if (!notifications || notifications.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <IonIcon icon={notificationsOutline} className="h-16 w-16 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">No notifications</p>
                </div>
            );
        }

        return (
            <div className="space-y-2">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`p-4 rounded-lg border transition-colors ${
                            !notification.isRead ? 'bg-accent/50 border-primary/20' : 'hover:bg-accent/30'
                        }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                                <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
                                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                                    </div>
                                    <div className="flex items-center gap-1 flex-shrink-0">
                                        {!notification.isRead && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleMarkAsRead(notification.id)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <IonIcon icon={checkmarkDoneOutline} className="h-4 w-4" />
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(notification.id)}
                                            className="h-8 w-8 p-0 text-destructive"
                                        >
                                            <IonIcon icon={trashOutline} className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline" className="text-xs">
                                        {notification.type}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const unreadCountValue = unreadCount?.unreadCount ?? unreadCount?.count ?? 0;

    return (
        <>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                        <IonIcon icon={notificationsOutline} className="h-5 w-5" />
                        {unreadCountValue > 0 && (
                            <Badge
                                variant="destructive"
                                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                            >
                                {unreadCountValue > 99 ? '99+' : unreadCountValue}
                            </Badge>
                        )}
                    </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                    <SheetHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <SheetTitle>Notifications</SheetTitle>
                                <SheetDescription className="flex items-center gap-2 mt-1">
                                    <span
                                        className={`h-2 w-2 rounded-full ${
                                            isConnected ? 'bg-green-500' : 'bg-gray-400'
                                        }`}
                                    />
                                    {isConnected ? 'Connected' : 'Disconnected'}
                                </SheetDescription>
                            </div>
                            {unreadCountValue > 0 && (
                                <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                                    <IonIcon icon={checkmarkDoneOutline} className="mr-2 h-4 w-4" />
                                    Mark all read
                                </Button>
                            )}
                        </div>
                    </SheetHeader>

                    <Tabs defaultValue="all" className="mt-6">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="all">
                                All
                                {allNotifications && allNotifications.length > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                        {allNotifications.length}
                                    </Badge>
                                )}
                            </TabsTrigger>
                            <TabsTrigger value="unread">
                                Unread
                                {unreadCountValue > 0 && (
                                    <Badge variant="destructive" className="ml-2">
                                        {unreadCountValue}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        </TabsList>

                        <ScrollArea className="h-[calc(100vh-200px)] mt-4">
                            <TabsContent value="all" className="mt-0">
                                {renderNotificationList(allNotifications || [], loadingAll)}
                            </TabsContent>
                            <TabsContent value="unread" className="mt-0">
                                {renderNotificationList(unreadNotifications || [], loadingUnread)}
                            </TabsContent>
                        </ScrollArea>
                    </Tabs>
                </SheetContent>
            </Sheet>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Notification</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this notification? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
