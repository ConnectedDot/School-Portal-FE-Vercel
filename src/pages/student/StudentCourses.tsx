import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';

const StudentCourses = () => {
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
                        Enrolled Courses
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">View and manage your enrolled courses.</p>
                    <div className="text-sm text-muted-foreground">
                        Course data will be loaded from the API. Use the My Enrollments page to manage course enrollments.
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentCourses;
