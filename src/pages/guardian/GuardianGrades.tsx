import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';

const GuardianGrades = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">Grades</h1>
                <DataSourceFlag source="dummy" />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Children's Grades
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">View academic performance for your children.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default GuardianGrades;
