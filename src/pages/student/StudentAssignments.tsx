import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Loader2 } from 'lucide-react';
import { useStudentAssignments } from '@/hooks/assignments';

const StudentAssignments = () => {
    const { data: assignments = [], isLoading, isError } = useStudentAssignments();
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">Assignments</h1>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        My Assignments
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading && <Loader2 className="mx-auto h-6 w-6 animate-spin" />}
                    {isError && <p className="text-sm text-destructive">Assignments could not be loaded.</p>}
                    {!isLoading && !isError && assignments.length === 0 && <p className="text-muted-foreground">No assignments are due.</p>}
                    <div className="grid gap-3 md:grid-cols-2">{assignments.map((assignment) => <article key={assignment.id} className="rounded-2xl border p-4"><h3 className="font-bold">{assignment.title}</h3><p className="mt-1 text-sm text-muted-foreground">{assignment.course?.title ?? 'Course'} · Due {new Date(assignment.dueDate).toLocaleDateString()}</p></article>)}</div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentAssignments;
