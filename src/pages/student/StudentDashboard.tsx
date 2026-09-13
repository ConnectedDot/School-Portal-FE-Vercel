import { Card } from '../../components/common/Card';

export const StudentDashboard = () => {
    return (
        <div className="space-y-6 text-slate-950 dark:text-white">
            <div>
                <h1 className="text-3xl font-bold">Student Dashboard</h1>
                <p className="mt-1 text-muted-foreground">Track your academic progress</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="My Courses" className="text-slate-950 dark:bg-slate-900 dark:text-white">
                    <p className="text-3xl font-bold">8</p>
                    <p className="text-sm text-gray-500 mt-1">This semester</p>
                </Card>
                <Card title="Attendance" className="text-slate-950 dark:bg-slate-900 dark:text-white">
                    <p className="text-3xl font-bold">96%</p>
                    <p className="text-sm text-green-600 mt-1">Great attendance!</p>
                </Card>
                <Card title="Upcoming Assignments" className="text-slate-950 dark:bg-slate-900 dark:text-white">
                    <p className="text-3xl font-bold">5</p>
                    <p className="text-sm text-gray-500 mt-1">Due this week</p>
                </Card>
            </div>
        </div>
    );
};
export default StudentDashboard;
