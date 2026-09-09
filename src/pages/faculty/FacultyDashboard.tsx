import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { extractDataArray } from '@/hooks/general';
import {
    IonIcon
} from '@ionic/react';
import {
    personOutline, 
    bookOutline, 
    checkmarkCircleOutline, 
    timeOutline,
    trendingUpOutline,
    calendarOutline,
    clipboardOutline,
    peopleOutline,
    addCircleOutline,
    arrowForwardOutline,
    chatbubbleOutline,
    documentTextOutline,
    schoolOutline
} from 'ionicons/icons';
import { useGetMyStudents, useGetMyCourses, useGetTeacherProfile } from '@/hooks/teachers';
import { useNavigate } from 'react-router-dom';

export const FacultyDashboard = () => {
    const navigate = useNavigate();
    const { data: profile, isLoading: profileLoading } = useGetTeacherProfile();
    const { data: students, isLoading: studentsLoading } = useGetMyStudents();
    const { data: courses, isLoading: coursesLoading } = useGetMyCourses();

    const stats = [
        {
            title: 'My Courses',
            value: extractDataArray(courses)?.length || 0,
            change: '+12%',
            trend: 'up',
            icon: bookOutline,
            color: 'bg-blue-500',
            lightColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            description: 'Active courses'
        },
        {
            title: 'Total Students',
            value: extractDataArray(students)?.length || 0,
            change: '+8%',
            trend: 'up',
            icon: peopleOutline,
            color: 'bg-purple-500',
            lightColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            description: 'Enrolled students'
        },
        {
            title: 'Pending Tasks',
            value: 12,
            change: '-5%',
            trend: 'down',
            icon: clipboardOutline,
            color: 'bg-orange-500',
            lightColor: 'bg-orange-50',
            textColor: 'text-orange-600',
            description: 'Assignments to grade'
        },
        {
            title: 'Attendance Rate',
            value: '94%',
            change: '+2%',
            trend: 'up',
            icon: checkmarkCircleOutline,
            color: 'bg-green-500',
            lightColor: 'bg-green-50',
            textColor: 'text-green-600',
            description: 'This week'
        },
    ];

    const quickActions = [
        {
            title: 'Create Assignment',
            description: 'Add new assignment',
            icon: addCircleOutline,
            color: 'bg-blue-500',
            onClick: () => navigate('/fcy/assignments')
        },
        {
            title: 'Mark Attendance',
            description: 'Take attendance',
            icon: checkmarkCircleOutline,
            color: 'bg-green-500',
            onClick: () => navigate('/fcy/attendance')
        },
        {
            title: 'Grade Submissions',
            description: 'Review & grade',
            icon: documentTextOutline,
            color: 'bg-purple-500',
            onClick: () => navigate('/fcy/grades')
        },
        {
            title: 'View Students',
            description: 'Manage students',
            icon: peopleOutline,
            color: 'bg-orange-500',
            onClick: () => navigate('/fcy/my-students')
        },
    ];

    const upcomingClasses = [
        { subject: 'Mathematics', time: '09:00 AM', class: 'SS 2A', room: 'Room 101' },
        { subject: 'Physics', time: '11:00 AM', class: 'SS 3B', room: 'Lab 2' },
        { subject: 'Chemistry', time: '02:00 PM', class: 'SS 1C', room: 'Lab 1' },
    ];

    const recentActivity = [
        { student: 'John Doe', action: 'Submitted assignment', subject: 'Mathematics', time: '2 hours ago' },
        { student: 'Jane Smith', action: 'Requested consultation', subject: 'Physics', time: '4 hours ago' },
        { student: 'Mike Johnson', action: 'Submitted late work', subject: 'Chemistry', time: '5 hours ago' },
        { student: 'Sarah Williams', action: 'Completed quiz', subject: 'Mathematics', time: '1 day ago' },
    ];

    if (profileLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-32" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Welcome back, {profile?.firstName || 'Teacher'} 👋
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Track, manage and forecast your classes and students.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate('/faculty/calendar')}>
                        <IonIcon icon={calendarOutline} className="mr-2" />
                        Calendar
                    </Button>
                    <Button onClick={() => navigate('/faculty/courses')}>
                        <IonIcon icon={bookOutline} className="mr-2" />
                        My Courses
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="relative overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={`${stat.lightColor} p-2 rounded-lg`}>
                                <IonIcon 
                                    icon={stat.icon} 
                                    className={`w-5 h-5 ${stat.textColor}`}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-foreground">
                                {stat.value}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge 
                                    variant={stat.trend === 'up' ? 'success' : 'secondary'}
                                    className="text-xs"
                                >
                                    <IonIcon 
                                        icon={trendingUpOutline} 
                                        className={`w-3 h-3 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`}
                                    />
                                    {stat.change}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                    {stat.description}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <Card className="lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <IonIcon icon={addCircleOutline} className="w-5 h-5" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Frequently used features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {quickActions.map((action, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="w-full justify-start h-auto p-4 hover:bg-accent"
                                onClick={action.onClick}
                            >
                                <div className={`${action.color} p-2 rounded-lg mr-3`}>
                                    <IonIcon icon={action.icon} className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <div className="font-semibold text-sm">{action.title}</div>
                                    <div className="text-xs text-muted-foreground">{action.description}</div>
                                </div>
                                <IonIcon icon={arrowForwardOutline} className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                {/* Upcoming Classes */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <IonIcon icon={timeOutline} className="w-5 h-5" />
                                    Today's Schedule
                                </CardTitle>
                                <CardDescription>Your upcoming classes</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => navigate('/faculty/calendar')}>
                                View all
                                <IonIcon icon={arrowForwardOutline} className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingClasses.map((cls, index) => (
                                <div 
                                    key={index}
                                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                            <IonIcon icon={schoolOutline} className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-foreground">{cls.subject}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {cls.class} • {cls.room}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="outline" className="font-mono">
                                            <IonIcon icon={timeOutline} className="mr-1 w-3 h-3" />
                                            {cls.time}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity & Top Students */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <IonIcon icon={chatbubbleOutline} className="w-5 h-5" />
                                    Recent Activity
                                </CardTitle>
                                <CardDescription>Latest student activities</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm">
                                View all
                                <IonIcon icon={arrowForwardOutline} className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback>{activity.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-foreground">
                                                {activity.student}
                                            </p>
                                            <span className="text-xs text-muted-foreground">
                                                {activity.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {activity.action}
                                        </p>
                                        <Badge variant="secondary" className="text-xs">
                                            {activity.subject}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Performing Students */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <IonIcon icon={trendingUpOutline} className="w-5 h-5" />
                                    Top Performers
                                </CardTitle>
                                <CardDescription>Students with highest scores</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => navigate('/faculty/my-students')}>
                                View all
                                <IonIcon icon={arrowForwardOutline} className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {studentsLoading ? (
                                <div className="space-y-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <Skeleton key={i} className="h-16" />
                                    ))}
                                </div>
                            ) : extractDataArray(students) && extractDataArray(students).length > 0 ? (
                                extractDataArray(students).slice(0, 4).map((student: any, index: number) => (
                                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarImage src={student.avatar} />
                                                    <AvatarFallback>
                                                        {student.firstName?.[0]}{student.lastName?.[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">
                                                    {student.firstName} {student.lastName}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {student.class || 'SS 2A'}
                                                </div>
                                            </div>
                                        </div>
                                        <Badge variant="success" className="font-semibold">
                                            {Math.floor(Math.random() * 10) + 90}%
                                        </Badge>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No student data available
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FacultyDashboard;
