import { useNavigate, useParams } from 'react-router-dom';
import { AdnPaths } from '../../../router/paths';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, BookOpen, Calendar, MapPin, Award, User, Users, Loader2 } from 'lucide-react';
import { useGetCourse } from '@/hooks/courses';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CourseView = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    const { data: course, isLoading, error } = useGetCourse(id!);

    // if (isLoading) {
    //     return (
    //         <div className="flex items-center justify-center h-96">
    //             <Loader2 className="h-8 w-8 animate-spin text-primary" />
    //         </div>
    //     );
    // }

    if (error || !course) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <p className="text-muted-foreground">Failed to load course details</p>
                <Button variant="outline" onClick={() => navigate(AdnPaths.COURSES)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Courses
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(AdnPaths.COURSES)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Course Details</h1>
                        <p className="text-muted-foreground text-sm">
                            View complete information about this course
                        </p>
                    </div>
                </div>
                <Button
                    onClick={() => navigate(`${AdnPaths.COURSES}/${id}/edit`)}
                    className="flex items-center gap-2 text-foreground"
                >
                    <Edit className="h-4 w-4" />
                    Edit Course
                </Button>
            </div>

            {/* Course Overview Card */}
            <Card>
                <CardContent className="pt-6">
                    <div className="space-y-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                    <BookOpen className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">{course.title}</h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="secondary">
                                            {course.subject}
                                        </Badge>
                                        <Badge variant="outline">
                                            {course.courseType}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-muted-foreground" />
                                <span className="text-2xl font-bold">{course.enrollmentCount || 0}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Enrolled Students</p>
                        </div>
                    </div>
                        {course.description && (
                            <div className="space-y-2">
                                <span className="text-sm font-medium">Description:</span>
                                <p className="text-muted-foreground">{course.description}</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Course Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <span className="text-sm font-medium">Subject:</span>
                                <p className="text-sm text-muted-foreground">{course.subject}</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-medium">Course Type:</span>
                                <p className="text-sm text-muted-foreground">{course.courseType}</p>
                            </div>
                            {Array.isArray(course.allowedDepartments) && course.allowedDepartments.length > 0 && (
                                <div className="space-y-2 md:col-span-2">
                                    <span className="text-sm font-medium">Allowed Departments:</span>
                                    <div className="flex flex-wrap gap-2">
                                        {course.allowedDepartments.map((dept: string) => (
                                            <Badge key={dept} variant="secondary">{dept}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2">
                                <span className="text-sm font-medium">Enrollment Count:</span>
                                <p className="text-sm text-muted-foreground">{course.enrollmentCount ?? 0} students</p>
                            </div>
                            <div className="space-y-2">
                                <span className="text-sm font-medium">Instructor:</span>
                                <p className="text-sm text-muted-foreground">
                                    {course.teacher 
                                        ? `${course.teacher.firstName} ${course.teacher.lastName}` 
                                        : "Not assigned"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Schedule & Location */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Schedule & Location
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {course.schedule ? (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Schedule:</span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-6">{course.schedule}</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <span className="text-sm font-medium">Schedule:</span>
                                <p className="text-sm text-muted-foreground">Not scheduled</p>
                            </div>
                        )}
                        {course.room ? (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Location:</span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-6">{course.room}</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <span className="text-sm font-medium">Location:</span>
                                <p className="text-sm text-muted-foreground">Not assigned</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* System Information */}
            <Card>
                <CardHeader>
                    <CardTitle>System Information</CardTitle>
                    <CardDescription>Course registration and tracking details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <span className="text-sm font-medium">Course ID:</span>
                            <p className="text-sm text-muted-foreground">{course.id}</p>
                        </div>
                        {course.createdAt && (
                            <div className="space-y-1">
                                <span className="text-sm font-medium">Created:</span>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(course.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                        {course.updatedAt && (
                            <div className="space-y-1">
                                <span className="text-sm font-medium">Last Updated:</span>
                                <p className="text-sm text-muted-foreground">
                                    {new Date(course.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CourseView;
