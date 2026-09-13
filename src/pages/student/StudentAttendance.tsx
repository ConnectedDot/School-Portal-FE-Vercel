import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, Loader2 } from 'lucide-react';
import { useMyAttendance } from '@/hooks/attendance';

const StudentAttendance = () => {
    const { data, isLoading, isError } = useMyAttendance();
    const payload = data as any;
    const records = payload?.data?.data ?? payload?.data?.records ?? payload?.data ?? [];
    const summary = payload?.summary ?? payload?.data?.summary;

    return (
        <div className="space-y-5 p-4 sm:p-6">
            <h1 className="text-2xl font-black">My Attendance</h1>
            {summary && <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{Object.entries(summary).slice(0, 4).map(([label, value]) => <Card key={label}><CardContent className="p-4"><p className="text-xs font-bold uppercase text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-black">{String(value)}</p></CardContent></Card>)}</div>}
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><CalendarCheck className="h-5 w-5" />Recent Attendance</CardTitle></CardHeader>
                <CardContent>
                    {isLoading && <Loader2 className="mx-auto h-6 w-6 animate-spin" />}
                    {isError && <p className="text-sm text-destructive">Attendance could not be loaded.</p>}
                    {!isLoading && !isError && records.length === 0 && <p className="text-muted-foreground">No attendance records are available yet.</p>}
                    <div className="space-y-3">{records.map((record: any) => <article key={record.id} className="flex items-center justify-between gap-3 rounded-2xl border p-4"><div><p className="font-bold">{record.course?.title ?? 'School day'}</p><p className="text-sm text-muted-foreground">{new Date(record.date ?? record.createdAt).toLocaleDateString()}</p></div><span className="rounded-full bg-muted px-3 py-1 text-xs font-bold">{record.status}</span></article>)}</div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentAttendance;
