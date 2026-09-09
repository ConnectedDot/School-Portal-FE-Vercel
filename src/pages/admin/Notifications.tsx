import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IonIcon } from '@ionic/react';
import {
    notificationsOutline,
    sendOutline,
    flashOutline,
    peopleOutline,
    personOutline,
    checkmarkCircleOutline,
    closeCircleOutline,
} from 'ionicons/icons';
import { useCreateNotification, useSendTestNotification } from '@/hooks/notifications';
import { useGetStudents } from '@/hooks/students';
import { useGetTeachers } from '@/hooks/teachers';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useGetAllUsers } from '@/hooks/admin';

const AdminNotifications = () => {
    const [notificationType, setNotificationType] = useState<'broadcast' | 'role' | 'specific'>('broadcast');
    const [formData, setFormData] = useState({
        title: '',
        message: '',
        type: 'INFO' as 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR' | 'ANNOUNCEMENT',
        recipientRole: '',
        recipientIds: [] as string[],
    });

    const { data: students, isLoading: loadingStudents } = useGetAllUsers(1, 100);
    // const { data: students, isLoading: loadingStudents } = useGetStudents(100, true);
    const { data: teachers, isLoading: loadingTeachers } = useGetTeachers(1, 100, false);

        const studentsData = Array.isArray(students)
        ? students.filter((u: any) => u.role?.toLowerCase() === 'student')
        : (students && Array.isArray((students as any).data))
            ? (students as any).data.filter((u: any) => u.role?.toLowerCase() === 'student')
            : [];

    const { mutate: createNotification, isPending: sendingNotification } = useCreateNotification(
        async () => {
            setFormData({
                title: '',
                message: '',
                type: 'INFO',
                recipientRole: '',
                recipientIds: [],
            });
            toast.success('Notification sent successfully!');
        }
    );

    const { mutate: sendTestNotification, isPending: sendingTest } = useSendTestNotification(
        async () => {
            toast.success('Test notification sent!');
        }
    );

    const handleSendNotification = () => {
        if (!formData.title || !formData.message) {
            toast.error('Please fill in title and message');
            return;
        }

        const payload: any = {
            title: formData.title,
            message: formData.message,
            type: formData.type,
        };

        if (notificationType === 'broadcast') {
            payload.sendToAll = true;
        } else if (notificationType === 'role') {
            if (!formData.recipientRole) {
                toast.error('Please select a recipient role');
                return;
            }
            payload.recipientRole = formData.recipientRole;
        } else if (notificationType === 'specific') {
            if (formData.recipientIds.length === 0) {
                toast.error('Please select at least one recipient');
                return;
            }
            payload.recipientIds = formData.recipientIds;
        }

        createNotification(payload);
    };

    const handleTestNotification = () => {
        sendTestNotification({});
    };

    const notificationTypes = [
        { value: 'INFO', label: 'Info', color: 'bg-blue-500' },
        { value: 'SUCCESS', label: 'Success', color: 'bg-green-500' },
        { value: 'WARNING', label: 'Warning', color: 'bg-orange-500' },
        { value: 'ERROR', label: 'Error', color: 'bg-red-500' },
        { value: 'ANNOUNCEMENT', label: 'Announcement', color: 'bg-purple-500' },
    ];

    const recipientRoles = [
        { value: 'STUDENT', label: 'All Students' },
        { value: 'TEACHER', label: 'All Teachers' },
        { value: 'ADMINISTRATOR', label: 'All Administrators' },
        { value: 'GUARDIAN', label: 'All Guardians' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                        <IonIcon icon={notificationsOutline} className="w-8 h-8" />
                        Notification Management
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Send notifications to users and test notification system
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={handleTestNotification}
                    disabled={sendingTest}
                    className="gap-2"
                >
                    <IonIcon icon={flashOutline} />
                    Test Notification
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Send Notification Form */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <IonIcon icon={sendOutline} className="w-5 h-5" />
                            Send Notification
                        </CardTitle>
                        <CardDescription>
                            Create and send notifications to users
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Notification Type */}
                        <div className="space-y-2">
                            <Label>Notification Type</Label>
                            <div className="flex flex-wrap gap-2">
                                {notificationTypes.map((type) => (
                                    <Button
                                        key={type.value}
                                        variant={formData.type === type.value ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setFormData({ ...formData, type: type.value as any })}
                                        className="gap-2"
                                    >
                                        <div className={`w-3 h-3 rounded-full ${type.color}`} />
                                        {type.label}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter notification title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>

                        {/* Message */}
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="Enter notification message"
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        {/* Recipient Selection */}
                        <Tabs value={notificationType} onValueChange={(v) => setNotificationType(v as any)}>
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="broadcast" className="gap-2">
                                    <IonIcon icon={peopleOutline} className="w-4 h-4" />
                                    Broadcast
                                </TabsTrigger>
                                <TabsTrigger value="role" className="gap-2">
                                    <IonIcon icon={peopleOutline} className="w-4 h-4" />
                                    By Role
                                </TabsTrigger>
                                <TabsTrigger value="specific" className="gap-2">
                                    <IonIcon icon={personOutline} className="w-4 h-4" />
                                    Specific Users
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="broadcast" className="space-y-2">
                                <div className="p-4 border rounded-lg bg-muted/50">
                                    <p className="text-sm text-muted-foreground">
                                        This notification will be sent to all users in the system.
                                    </p>
                                </div>
                            </TabsContent>

                            <TabsContent value="role" className="space-y-2">
                                <Label>Select Role</Label>
                                <Select
                                    value={formData.recipientRole}
                                    onValueChange={(value) => setFormData({ ...formData, recipientRole: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select recipient role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {recipientRoles.map((role) => (
                                            <SelectItem key={role.value} value={role.value}>
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </TabsContent>

                            <TabsContent value="specific" className="space-y-2">
                                <Label>Select Users</Label>
                                {loadingStudents || loadingTeachers ? (
                                    <Skeleton className="h-32" />
                                ) : (
                                    <div className="border rounded-lg p-4 max-h-64 overflow-y-auto space-y-2">
                                        <p className="text-sm font-medium mb-2">Students</p>
                                        {studentsData && studentsData.slice(0, 10).map((student: any) => (
                                            <div key={student.id} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.recipientIds.includes(student.userId)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setFormData({
                                                                ...formData,
                                                                recipientIds: [...formData.recipientIds, student.userId]
                                                            });
                                                        } else {
                                                            setFormData({
                                                                ...formData,
                                                                recipientIds: formData.recipientIds.filter(id => id !== student.userId)
                                                            });
                                                        }
                                                    }}
                                                    className="rounded"
                                                />
                                                <span className="text-sm">
                                                    {student.firstName} {student.lastName}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>

                        {/* Send Button */}
                        <Button
                            onClick={handleSendNotification}
                            disabled={sendingNotification}
                            className="w-full gap-2"
                            size="lg"
                        >
                            {sendingNotification ? (
                                <>
                                    <IonIcon icon={sendOutline} className="animate-pulse" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <IonIcon icon={sendOutline} />
                                    Send Notification
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* Preview & Info */}
                <div className="space-y-6">
                    {/* Preview */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="p-4 border rounded-lg bg-card space-y-2">
                                    <div className="flex items-start justify-between">
                                        <Badge variant="default" className="text-xs">
                                            {formData.type}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">Just now</span>
                                    </div>
                                    <h4 className="font-semibold">
                                        {formData.title || 'Notification Title'}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                        {formData.message || 'Your notification message will appear here...'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <span className="text-sm text-muted-foreground">Total Students</span>
                                <Badge variant="secondary">{studentsData?.length || 0}</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <span className="text-sm text-muted-foreground">Total Teachers</span>
                                {/* <Badge variant="secondary">{teachersData?.length || 0}</Badge> */}
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                                <span className="text-sm text-muted-foreground">Selected Recipients</span>
                                <Badge variant="default">
                                    {notificationType === 'broadcast'
                                        ? 'All Users'
                                        : notificationType === 'role'
                                            ? formData.recipientRole || '0'
                                            : formData.recipientIds.length}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminNotifications;
