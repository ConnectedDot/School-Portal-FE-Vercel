import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Loader2, RefreshCw, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMyEnrolledCourses } from '@/hooks/students';

const StudentCourses = () => {
    const { data, isLoading, isError, refetch } = useMyEnrolledCourses();
    const payload = data as any;
    const courses = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
            ? payload.data
            : [];

    return (
        <div className="space-y-5 p-4 sm:p-6">
            <div>
                <h1 className="text-2xl font-black sm:text-3xl">My Courses</h1>
                <p className="mt-1 text-sm text-muted-foreground">Courses assigned to you through automatic enrollment.</p>
            </div>

            <Card className="rounded-3xl border-slate-200/80 bg-white/95 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Enrolled Courses
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading && <div className="flex min-h-40 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin" /></div>}
                    {isError && (
                        <div className="flex min-h-40 flex-col items-center justify-center gap-3 text-center">
                            <p className="text-sm text-muted-foreground">We could not load your enrolled courses.</p>
                            <Button variant="outline" onClick={() => refetch()}><RefreshCw className="mr-2 h-4 w-4" />Try again</Button>
                        </div>
                    )}
                    {!isLoading && !isError && courses.length === 0 && (
                        <div className="min-h-40 rounded-2xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                            No courses have been assigned to you yet.
                        </div>
                    )}
                    {!isLoading && !isError && courses.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {courses.map((item: any) => {
                                const course = item.course ?? item;
                                return (
                                    <article key={item.id ?? course.id} className="rounded-2xl border bg-slate-50/70 p-4 dark:bg-white/[0.03]">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="truncate font-bold">{course.title ?? course.name ?? 'Untitled course'}</h3>
                                                <p className="mt-1 text-sm text-muted-foreground">{course.subject ?? 'General subject'}</p>
                                            </div>
                                            <Badge variant="secondary">{item.status ?? 'Active'}</Badge>
                                        </div>
                                        {course.teacher && <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><User className="h-4 w-4" />{course.teacher.firstName} {course.teacher.lastName}</p>}
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentCourses;
