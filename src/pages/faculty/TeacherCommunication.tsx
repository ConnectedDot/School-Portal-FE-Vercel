import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';

const TeacherCommunication = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">Communication</h1>
                <DataSourceFlag source="dummy" />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Messages & Announcements
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Send messages to students and parents.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeacherCommunication;
