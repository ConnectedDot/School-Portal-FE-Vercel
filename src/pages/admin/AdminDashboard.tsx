import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { IonIcon } from '@ionic/react';
import {
    peopleOutline,
    schoolOutline,
    bookOutline,
    checkmarkCircleOutline,
    trendingUpOutline,
    trendingDownOutline,
    calendarOutline,
    addCircleOutline,
    arrowForwardOutline,
    statsChartOutline,
    personAddOutline,
    clipboardOutline,
    documentsOutline,
    chatbubbleOutline,
    timeOutline,
    walletOutline,
    alertCircleOutline,
    shieldCheckmarkOutline,
} from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useGetStudents } from '@/hooks/students';
import { useGetTeachers } from '@/hooks/teachers';
import { useGetCourses } from '@/hooks/courses';
import { useGetAllUsers } from '@/hooks/admin';
import { AdnPaths } from '@/router/paths';
import { formatEnumLabel, parseStudentLevel } from '@/lib/data-parser';

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // Fetch dashboard data
    const { data: studentsData, isLoading: loadingStudents } = useGetStudents(1, 100, true);
    const { data: teachersData, isLoading: loadingTeachers } = useGetTeachers(1, 100, true);
    const { data: coursesData, isLoading: loadingCourses } = useGetCourses(1, 100, false);
    const { data: allUsersData } = useGetAllUsers();

    // Calculate stats
    const stats = useMemo(() => {
        const students = Array.isArray(studentsData) ? studentsData : [];
        const teachers = Array.isArray(teachersData) ? teachersData : [];
        const courses = Array.isArray(coursesData) ? coursesData : [];

        // Count active vs pending students
        const activeStudents = students.filter((s: any) => s.status === 'ACTIVE').length;
        const pendingStudents = students.filter((s: any) => s.status === 'PENDING').length;

        return {
            totalStudents: students.length,
            activeStudents,
            pendingStudents,
            totalTeachers: teachers.length,
            totalCourses: courses.length,
            attendanceRate: null,
            recentStudents: students.slice(0, 5),
            recentTeachers: teachers.slice(0, 3),
        };
    }, [studentsData, teachersData, coursesData]);

    const isLoading = loadingStudents || loadingTeachers || loadingCourses;

    // Overview stats with trends
    const overviewStats = [
        {
            title: 'Total Students',
            value: stats.totalStudents,
            change: '+12%',
            trend: 'up',
            icon: schoolOutline,
            color: 'bg-blue-500',
            lightColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            description: `${stats.activeStudents} active`,
            onClick: () => navigate(AdnPaths.STUDENTS),
        },
        {
            title: 'Total Teachers',
            value: stats.totalTeachers,
            change: '+5%',
            trend: 'up',
            icon: peopleOutline,
            color: 'bg-purple-500',
            lightColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            description: 'Faculty members',
            onClick: () => navigate(AdnPaths.FACULTY),
        },
        {
            title: 'Active Courses',
            value: stats.totalCourses,
            change: '+8%',
            trend: 'up',
            icon: bookOutline,
            color: 'bg-primary',
            lightColor: 'bg-primary/10',
            textColor: 'text-primary',
            description: 'This semester',
            onClick: () => navigate(AdnPaths.COURSES),
        },
        {
            title: 'Attendance Rate',
            value: stats.attendanceRate === null ? '—' : `${stats.attendanceRate}%`,
            change: null,
            trend: 'up',
            icon: checkmarkCircleOutline,
            color: 'bg-primary',
            lightColor: 'bg-primary/10',
            textColor: 'text-primary',
            description: 'No attendance summary supplied',
            onClick: () => navigate(AdnPaths.ATTENDANCE),
        },
    ];

    // Quick action items
    const quickActions = [
        {
            title: 'Add Student',
            description: 'Register new student',
            icon: personAddOutline,
            color: 'bg-blue-500',
            path: AdnPaths.STUDENTS_ONBOARD,
        },
        {
            title: 'Add Teacher',
            description: 'Register new teacher',
            icon: peopleOutline,
            color: 'bg-purple-500',
            path: AdnPaths.FACULTY_CREATE,
        },
        {
            title: 'Create Course',
            description: 'Add new course',
            icon: bookOutline,
            color: 'bg-green-500',
            path: AdnPaths.COURSES_CREATE,
        },
        {
            title: 'View Reports',
            description: 'Analytics & insights',
            icon: statsChartOutline,
            color: 'bg-orange-500',
            path: AdnPaths.REPORTS,
        },
        // Library action retained for a future release.
        {
            title: 'Calendar',
            description: 'School events',
            icon: calendarOutline,
            color: 'bg-indigo-500',
            path: AdnPaths.CALENDAR,
        },
    ];

    // System overview data
    const systemOverview = [
        { label: 'Pending Approvals', value: stats.pendingStudents, icon: alertCircleOutline, color: 'text-orange-500' },
        { label: 'Active Sessions', value: '—', icon: timeOutline, color: 'text-green-500' },
        { label: 'Total Revenue', value: '—', icon: walletOutline, color: 'text-blue-500' },
        { label: 'Security Status', value: '—', icon: shieldCheckmarkOutline, color: 'text-green-500' },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-36" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Welcome back, {user?.firstName || 'Admin'} 👋
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Your current school summary and activity.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => navigate(AdnPaths.REPORTS)}>
                            <IonIcon icon={statsChartOutline} className="mr-2" />
                            Export report
                        </Button>
                        <Button onClick={() => navigate(AdnPaths.STUDENTS_ONBOARD)}>
                            <IonIcon icon={addCircleOutline} className="mr-2" />
                            Add Student
                        </Button>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {overviewStats.map((stat, index) => (
                        <Card
                            key={index}
                            className="relative overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                            onClick={stat.onClick}
                        >
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
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge
                                        variant={stat.trend === 'up' ? 'success' : 'error'}
                                        className="text-xs"
                                    >
                                        <IonIcon
                                            icon={stat.trend === 'up' ? trendingUpOutline : trendingDownOutline}
                                            className="w-3 h-3 mr-1"
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

                {/* System Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <IonIcon icon={statsChartOutline} className="w-5 h-5" />
                            System Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {systemOverview.map((item, index) => (
                                <div key={index} className="flex items-center gap-3 rounded-2xl bg-muted/45 p-4 ring-1 ring-inset ring-border/30">
                                    <div className={`${item.color}`}>
                                        <IonIcon icon={item.icon} className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold">{item.value}</div>
                                        <div className="text-xs text-muted-foreground">{item.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <IonIcon icon={personAddOutline} className="w-5 h-5" />
                                    Recent Registrations
                                </CardTitle>
                                <CardDescription>Latest student enrollments</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => navigate(AdnPaths.STUDENTS)}>
                                View all
                                <IonIcon icon={arrowForwardOutline} className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {stats.recentStudents.length > 0 ? (
                                stats.recentStudents.map((student: any) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between rounded-2xl bg-muted/35 p-3 ring-1 ring-inset ring-border/25 hover:bg-muted/65 transition-colors cursor-pointer"
                                        onClick={() => navigate(AdnPaths.STUDENTS_VIEW.replace(':id', student.id))}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={student.profilePicture} />
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    {student.firstName?.[0]}{student.lastName?.[0]}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-sm">
                                                    {student.firstName} {student.lastName}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {student.studentLevel || student.grade
                                                        ? `Grade ${parseStudentLevel(student.studentLevel || student.grade)}`
                                                        : 'Grade not assigned'}
                                                    {student.department ? ` · ${formatEnumLabel(student.department)}` : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={student.status === 'ACTIVE' ? 'success' : 'warning'} className="text-xs">
                                                {student.status || 'PENDING'}
                                            </Badge>
                                            <IonIcon icon={arrowForwardOutline} className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    <IonIcon icon={peopleOutline} className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                    <p>No recent registrations</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card> */}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               
                {/* Quick Actions */}
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <IonIcon icon={addCircleOutline} className="w-5 h-5" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Frequently used features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {quickActions.map((action, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="w-full justify-start h-auto p-3 hover:bg-accent"
                                onClick={() => navigate(action.path)}
                            >
                                <div className={`${action.color} p-2 rounded-lg mr-3`}>
                                    <IonIcon icon={action.icon} className="w-4 h-4 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <div className="font-medium text-sm">{action.title}</div>
                                    <div className="text-xs text-muted-foreground">{action.description}</div>
                                </div>
                                <IonIcon icon={arrowForwardOutline} className="w-4 h-4 text-muted-foreground" />
                            </Button>
                        ))}
                    </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="max-w-md">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <IonIcon icon={calendarOutline} className="w-5 h-5" />
                                    Upcoming Events
                                </CardTitle>
                                <CardDescription>School calendar highlights</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => navigate(AdnPaths.CALENDAR)}>
                                View all
                                <IonIcon icon={arrowForwardOutline} className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { date: 'Dec 20', event: 'Parent-Teacher Meeting', time: '2:00 PM', type: 'meeting' },
                                { date: 'Dec 22', event: 'Science Fair', time: '10:00 AM', type: 'event' },
                                { date: 'Dec 25', event: 'Sports Day', time: '9:00 AM', type: 'sports' },
                                { date: 'Dec 28', event: 'Winter Break Begins', time: 'All Day', type: 'holiday' },
                            ].map((event, i) => (
                                <div key={i} className="flex items-center gap-4 p-3 border rounded-lg hover:bg-accent transition-colors">
                                    <div className="bg-primary/10 p-3 rounded-lg text-center min-w-[60px]">
                                        <div className="text-lg font-bold text-primary">
                                            {event.date.split(' ')[1]}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {event.date.split(' ')[0]}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{event.event}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <IonIcon icon={timeOutline} className="w-3 h-3 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">{event.time}</span>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {event.type}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* COMMENTED OUT: Faculty Overview section - as per requirements */}
                {/* <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <IonIcon icon={peopleOutline} className="w-5 h-5" />
                                    Faculty Overview
                                </CardTitle>
                                <CardDescription>Recently added teachers</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => navigate(AdnPaths.FACULTY)}>
                                View all
                                <IonIcon icon={arrowForwardOutline} className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {stats.recentTeachers.length > 0 ? (
                                stats.recentTeachers.map((teacher: any) => (
                                    <div key={teacher.id} className="flex items-center gap-3 rounded-2xl bg-muted/35 p-3 ring-1 ring-inset ring-border/25 hover:bg-muted/65 transition-colors">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={teacher.profilePicture} />
                                            <AvatarFallback className="bg-purple-500 text-white">
                                                {teacher.firstName?.[0]}{teacher.lastName?.[0]}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="font-medium">
                                                {teacher.firstName} {teacher.lastName}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {teacher.qualification || 'Teacher'} • {teacher.department || 'General'}
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {teacher.status || 'ACTIVE'}
                                        </Badge>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-muted-foreground">
                                    No recent faculty additions
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card> */}

            </div >
        </>
    );
};

export default AdminDashboard;
