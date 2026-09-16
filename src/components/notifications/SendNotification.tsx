import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { IonIcon } from '@ionic/react';
import { sendOutline } from 'ionicons/icons';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { useGetAllUsers } from '@/hooks/admin';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface SendNotificationProps {
    trigger?: React.ReactNode;
    defaultRecipient?: { id: string; role: string; name: string };
}

export const SendNotification: React.FC<SendNotificationProps> = ({ trigger, defaultRecipient }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [recipientRole, setRecipientRole] = useState<string>(defaultRecipient?.role || '');
    const [recipientId, setRecipientId] = useState<string>(defaultRecipient?.id || '');
    const [notificationType, setNotificationType] = useState<'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR'>('INFO');

    const { sendNotification, isConnected } = useWebSocket();
    const { data: allUsers, isLoading: loadingUsers } = useGetAllUsers(1, 500);

    // Filter users by role
    const filteredUsers = allUsers?.filter((user) => {
        if (!recipientRole) return true;
        return user.role === recipientRole;
    });

    const handleSend = () => {
        if (!title.trim() || !message.trim() || !recipientId) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (!isConnected) {
            toast.error('WebSocket is not connected. Please try again later.');
            return;
        }

        const recipient = allUsers?.find((user) => user.id === recipientId);
        if (!recipient) {
            toast.error('Recipient not found');
            return;
        }

        sendNotification(
            { id: recipientId, role: recipient.role || '' },
            title,
            message,
            notificationType
        );

        toast.success('Notification sent successfully');
        
        // Reset form
        setTitle('');
        setMessage('');
        if (!defaultRecipient) {
            setRecipientRole('');
            setRecipientId('');
        }
        setNotificationType('INFO');
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button>
                        <IonIcon icon={sendOutline} className="mr-2 h-4 w-4" />
                        Send Notification
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Send Notification</DialogTitle>
                    <DialogDescription>
                        Send a real-time notification to a user. They will receive it instantly if they are online.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Recipient Role */}
                    <div className="space-y-2">
                        <Label htmlFor="role">Recipient Role *</Label>
                        <Select
                            value={recipientRole}
                            onValueChange={setRecipientRole}
                            disabled={!!defaultRecipient}
                        >
                            <SelectTrigger id="role">
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="STUDENT">Student</SelectItem>
                                <SelectItem value="TEACHER">Teacher</SelectItem>
                                <SelectItem value="ADMINISTRATOR">Administrator</SelectItem>
                                <SelectItem value="GUARDIAN">Guardian</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Recipient */}
                    <div className="space-y-2">
                        <Label htmlFor="recipient">Recipient *</Label>
                        {loadingUsers ? (
                            <div className="flex items-center justify-center p-4 border rounded-md">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Loading users...
                            </div>
                        ) : (
                            <Select
                                value={recipientId}
                                onValueChange={setRecipientId}
                                disabled={!!defaultRecipient || !recipientRole}
                            >
                                <SelectTrigger id="recipient">
                                    <SelectValue placeholder="Select recipient" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filteredUsers?.map((user) => (
                                        <SelectItem key={user.id} value={user.id || ''}>
                                            {user.firstName} {user.lastName} ({user.email})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    </div>

                    {/* Notification Type */}
                    <div className="space-y-2">
                        <Label htmlFor="type">Notification Type</Label>
                        <Select
                            value={notificationType}
                            onValueChange={(value: any) => setNotificationType(value)}
                        >
                            <SelectTrigger id="type">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="INFO">Info</SelectItem>
                                <SelectItem value="SUCCESS">Success</SelectItem>
                                <SelectItem value="WARNING">Warning</SelectItem>
                                <SelectItem value="ERROR">Error</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                            id="title"
                            placeholder="Enter notification title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                            id="message"
                            placeholder="Enter notification message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                        />
                    </div>

                    {/* Connection Status */}
                    <div className="flex items-center gap-2 text-sm">
                        <span
                            className={`h-2 w-2 rounded-full ${
                                isConnected ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        />
                        <span className="text-muted-foreground">
                            {isConnected ? 'Connected' : 'Disconnected'}
                        </span>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSend} disabled={!isConnected}>
                        <IonIcon icon={sendOutline} className="mr-2 h-4 w-4" />
                        Send Notification
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
