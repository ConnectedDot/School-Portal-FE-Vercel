import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';
import { dummyStudentDashboard } from '@/data/student/dashboard';

const StudentProfile = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <DataSourceFlag source="dummy" />
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Student Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                                <div className="font-semibold">{dummyStudentDashboard.studentId}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                <div className="font-semibold">{dummyStudentDashboard.studentName}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Class</label>
                                <div className="font-semibold">{dummyStudentDashboard.class}</div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Academic Year</label>
                                <div className="font-semibold">{dummyStudentDashboard.academicYear}</div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-border">
                            <p className="text-sm text-muted-foreground">
                                To update your profile information, please contact the school administration.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentProfile;
