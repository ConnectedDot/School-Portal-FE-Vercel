import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';
import { dummyStudentAttendance, dummyAttendanceSummary } from '@/data/student/attendance';

const StudentAttendance = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">My Attendance</h1>
                <DataSourceFlag source="dummy" />
            </div>

            <div className="grid md:grid-cols-5 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dummyAttendanceSummary.rate}%</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Present</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{dummyAttendanceSummary.present}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Absent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{dummyAttendanceSummary.absent}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Late</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{dummyAttendanceSummary.late}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Days</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dummyAttendanceSummary.totalDays}</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarCheck className="h-5 w-5" />
                        Recent Attendance
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {dummyStudentAttendance.map((record) => (
                            <div key={record.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                                <div>
                                    <div className="font-semibold">{record.date}</div>
                                    <div className="text-sm text-muted-foreground">{record.subject}</div>
                                    <div className="text-xs text-muted-foreground">Marked by: {record.markedBy}</div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    record.status === 'present' ? 'bg-green-100 text-green-800' :
                                    record.status === 'absent' ? 'bg-red-100 text-red-800' :
                                    record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                }`}>
                                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentAttendance;
