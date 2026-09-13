import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Loader2 } from 'lucide-react';
import { useTeacherAttendanceSessions } from '@/hooks/attendance';

const TeacherAttendance = () => {
    const { data, isLoading, isError } = useTeacherAttendanceSessions();
    const payload = data as any;
    const sessions = payload?.data?.data ?? payload?.data ?? (Array.isArray(payload) ? payload : []);
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">Attendance</h1>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CalendarCheck className="h-5 w-5" />
                        Attendance Management
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading && <Loader2 className="mx-auto h-6 w-6 animate-spin" />}
                    {isError && <p className="text-sm text-destructive">Attendance sessions could not be loaded.</p>}
                    {!isLoading && !isError && sessions.length === 0 && <p className="text-muted-foreground">No attendance sessions have been opened yet.</p>}
                    <div className="space-y-3">{sessions.map((session: any) => <article key={session.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-4"><div><h3 className="font-bold">{session.course?.title ?? 'Course attendance'}</h3><p className="text-sm text-muted-foreground">{new Date(session.date ?? session.createdAt).toLocaleDateString()}</p></div><span className="text-sm font-medium">{session._count?.records ?? session.records?.length ?? 0} records</span></article>)}</div>
                </CardContent>
            </Card>
        </div>
    );
};

export default TeacherAttendance;
