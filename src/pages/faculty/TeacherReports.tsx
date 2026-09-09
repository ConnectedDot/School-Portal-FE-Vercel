import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';

const TeacherReports = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">Reports</h1>
                <DataSourceFlag source="dummy" />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Performance Reports
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">View performance reports for your classes and students.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeacherReports;
