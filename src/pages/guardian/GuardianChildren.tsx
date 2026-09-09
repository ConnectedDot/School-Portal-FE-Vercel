import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';
import { dummyGuardianDashboard } from '@/data/guardian/dashboard';

const GuardianChildren = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">My Children</h1>
                <DataSourceFlag source="dummy" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {dummyGuardianDashboard.children.map((child) => (
                    <Card key={child.id}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                {child.studentName}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Class:</span>
                                    <span className="font-semibold">{child.class}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Attendance:</span>
                                    <span className="font-semibold">{child.attendanceRate}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Average Grade:</span>
                                    <span className="font-semibold">{child.averageGrade}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Recent Absences:</span>
                                    <span className="font-semibold text-red-600">{child.recentAbsences}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default GuardianChildren;
