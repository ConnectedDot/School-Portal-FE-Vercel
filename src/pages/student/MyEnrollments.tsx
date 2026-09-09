import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Loader2, Calendar, User, Building } from 'lucide-react';
import { useGetMyEnrollment } from '@/hooks/enrollments';
import { Skeleton } from '@/components/ui/skeleton';

const MyEnrollments = () => {
    const { data: enrollments, isLoading, error } = useGetMyEnrollment();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold">My Enrollments</h1>
                    <p className="text-muted-foreground mt-2">Loading your enrolled courses...</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2 mt-2" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-20 w-full" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-destructive">Error Loading Enrollments</h1>
                    <p className="text-muted-foreground mt-2">Failed to load your enrolled courses. Please try again.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                    <BookOpen className="h-8 w-8" />
                    My Enrollments
                </h1>
                <p className="text-muted-foreground mt-2">
                    Courses you are currently enrolled in
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardDescription>Total Enrollments</CardDescription>
                        <CardTitle className="text-3xl">{enrollments?.length || 0}</CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardDescription>Active Courses</CardDescription>
                        <CardTitle className="text-3xl">
                            {enrollments?.filter(e => e.status === 'active').length || 0}
                        </CardTitle>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardDescription>This Semester</CardDescription>
                        <CardTitle className="text-3xl">{enrollments?.length || 0}</CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Empty State */}
            {!enrollments || enrollments.length === 0 ? (
                <Card>
                    <CardContent className="pt-6 text-center py-12">
                        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No Enrollments Yet</h3>
                        <p className="text-muted-foreground">
                            You haven't enrolled in any courses yet. Use the Auto-Enroll feature to get started.
                        </p>
                    </CardContent>
                </Card>
            ) : (
                /* Enrollment Cards */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {enrollments.map((enrollment) => (
                        <Card key={enrollment.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg line-clamp-2">
                                            {enrollment.course?.title || 'Untitled Course'}
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            {enrollment.course?.subject || 'No subject'}
                                        </CardDescription>
                                    </div>
                                    <Badge variant={enrollment.status === 'active' ? 'default' : 'secondary'}>
                                        {enrollment.status || 'Active'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {enrollment.course?.description && (
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {enrollment.course.description}
                                    </p>
                                )}

                                <div className="space-y-2 text-sm">
                                    {enrollment.course?.teacher && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <User className="h-4 w-4" />
                                            <span>
                                                {enrollment.course.teacher.firstName} {enrollment.course.teacher.lastName}
                                            </span>
                                        </div>
                                    )}

                                    {enrollment.course?.courseType && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Building className="h-4 w-4" />
                                            <span>{enrollment.course.courseType}</span>
                                        </div>
                                    )}

                                    {enrollment.enrollmentDate && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>
                                                Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEnrollments;
