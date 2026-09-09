import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';

const StudentCalendar = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">Calendar</h1>
                <DataSourceFlag source="dummy" />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Academic Calendar
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">View upcoming events, exams, and important dates.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentCalendar;
