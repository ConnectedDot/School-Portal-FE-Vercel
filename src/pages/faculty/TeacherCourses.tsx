import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';

const TeacherCourses = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">My Courses</h1>
                <DataSourceFlag source="dummy" />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Assigned Courses
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">View and manage your assigned courses.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeacherCourses;
