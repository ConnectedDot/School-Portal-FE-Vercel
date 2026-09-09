import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAutoEnroll } from '@/hooks/enrollments';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const StudentEnrollment = () => {
    const [enrollmentStatus, setEnrollmentStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const { mutate: autoEnroll, isPending } = useAutoEnroll(
        async () => {
            setEnrollmentStatus('success');
        }
    );

    const handleAutoEnroll = () => {
        setEnrollmentStatus('idle');
        autoEnroll({});
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                    <BookOpen className="h-8 w-8" />
                    Course Enrollment
                </h1>
                <p className="text-muted-foreground mt-2">
                    Automatically enroll in courses based on your grade level and department
                </p>
            </div>

            {/* Enrollment Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Auto-Enroll in Courses</CardTitle>
                    <CardDescription>
                        Click the button below to automatically enroll in courses that match your academic profile.
                        The system will assign you to appropriate courses based on your grade level, department, and available slots.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Status Alerts */}
                    {enrollmentStatus === 'success' && (
                        <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <AlertTitle className="text-green-900 dark:text-green-100">Enrollment Successful!</AlertTitle>
                            <AlertDescription className="text-green-800 dark:text-green-200">
                                You have been successfully enrolled in your courses. You can view them in "My Enrollments".
                            </AlertDescription>
                        </Alert>
                    )}

                    {enrollmentStatus === 'error' && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Enrollment Failed</AlertTitle>
                            <AlertDescription>
                                There was an error enrolling you in courses. Please try again or contact your administrator.
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Enrollment Info */}
                    <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                        <h3 className="font-semibold text-foreground">How Auto-Enrollment Works:</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>The system analyzes your grade level and department</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Finds courses that match your academic requirements</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>Automatically enrolls you in available courses</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span>You'll receive confirmation once enrollment is complete</span>
                            </li>
                        </ul>
                    </div>

                    {/* Action Button */}
                    <Button
                        onClick={handleAutoEnroll}
                        disabled={isPending}
                        className="w-full"
                        size="lg"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Enrolling...
                            </>
                        ) : (
                            <>
                                <BookOpen className="mr-2 h-5 w-5" />
                                Auto-Enroll in Courses
                            </>
                        )}
                    </Button>

                    {/* Note */}
                    <p className="text-xs text-muted-foreground text-center">
                        If you need to enroll in specific courses or have questions, please contact your academic advisor.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentEnrollment;
