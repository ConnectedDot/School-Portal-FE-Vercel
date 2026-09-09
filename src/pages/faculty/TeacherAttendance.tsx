import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';

const TeacherAttendance = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">Attendance</h1>
                <DataSourceFlag source="dummy" />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarCheck className="h-5 w-5" />
                        Attendance Management
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Mark and view attendance for your classes.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeacherAttendance;
