import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Loader2, Mail, Phone, Calendar, BookOpen } from 'lucide-react';
import { useGetMyStudents } from '@/hooks/teachers';
import { Skeleton } from '@/components/ui/skeleton';
import { ShadcnDataTable, type ShadcnDataTableColumn, type ShadcnDataTableAction } from '@/components/common/ShadcnDataTable';
import { extractDataArray } from '@/hooks/general';

const TeacherStudents = () => {
    const { data: students, isLoading, error } = useGetMyStudents();

    const columns: ShadcnDataTableColumn<any>[] = [
        {
            key: 'name',
            label: 'Student Name',
            render: (student) => (
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                            {student.firstName?.[0]}{student.lastName?.[0]}
                        </span>
                    </div>
                    <div>
                        <div className="font-medium">{student.firstName} {student.lastName}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {student.email}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'gradeLevel',
            label: 'Grade',
            render: (student) => (
                <Badge variant="secondary">
                    {student.gradeLevel || 'N/A'}
                </Badge>
            ),
        },
        {
            key: 'department',
            label: 'Department',
            render: (student) => student.department || 'N/A',
        },
        {
            key: 'contact',
            label: 'Contact',
            render: (student) => (
                <div className="space-y-1 text-sm">
                    {student.phoneNumber && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {student.phoneNumber}
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'enrolledCourses',
            label: 'Enrolled Courses',
            render: (student) => (
                <div className="flex items-center gap-1 text-sm">
                    <BookOpen className="h-3 w-3 text-muted-foreground" />
                    {student.enrolledCourses?.length || 0} courses
                </div>
            ),
        },
        {
            key: 'joinDate',
            label: 'Joined',
            render: (student) => (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : 'N/A'}
                </div>
            ),
        },
    ];

    const actions: ShadcnDataTableAction<any>[] = [
        {
            label: 'View Details',
            onClick: (student) => {
                console.log('View student:', student);
                // Navigate to student details
            },
        },
        {
            label: 'View Progress',
            onClick: (student) => {
                console.log('View progress:', student);
                // Navigate to student progress
            },
        },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-destructive">Error Loading Students</h1>
                <p className="text-muted-foreground">Failed to load your students. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                    <Users className="h-8 w-8" />
                    My Students
                </h1>
                <p className="text-muted-foreground mt-2">
                    Students enrolled in your courses
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                        <div className="text-2xl font-bold">{extractDataArray(students)?.length || 0}</div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
                        <div className="text-2xl font-bold">
                            {extractDataArray(students)?.filter((s: any) => s.status === 'active').length || 0}
                        </div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium text-muted-foreground">This Semester</CardTitle>
                        <div className="text-2xl font-bold">{extractDataArray(students)?.length || 0}</div>
                    </CardHeader>
                </Card>
            </div>

            {/* Students Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Student Directory</CardTitle>
                </CardHeader>
                <CardContent>
                    {extractDataArray(students) && extractDataArray(students).length > 0 ? (
                        <ShadcnDataTable
                            keyExtractor={(student: any) => student.id}
                            data={extractDataArray(students)}
                            columns={columns}
                            actions={actions}
                        />
                    ) : (
                        <div className="text-center py-12">
                            <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No Students Yet</h3>
                            <p className="text-muted-foreground">
                                You don't have any students enrolled in your courses yet.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default TeacherStudents;
