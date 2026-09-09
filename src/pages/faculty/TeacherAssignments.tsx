import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';

const TeacherAssignments = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">Assignments</h1>
                <DataSourceFlag source="dummy" />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        My Assignments
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Create and manage assignments for your students.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeacherAssignments;
