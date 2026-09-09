import { Card } from '../../components/common/Card';

export const StudentDashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
                <p className="text-gray-600 mt-1">Track your academic progress</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="My Courses">
                    <p className="text-3xl font-bold">8</p>
                    <p className="text-sm text-gray-500 mt-1">This semester</p>
                </Card>
                <Card title="Attendance">
                    <p className="text-3xl font-bold">96%</p>
                    <p className="text-sm text-green-600 mt-1">Great attendance!</p>
                </Card>
                <Card title="Upcoming Assignments">
                    <p className="text-3xl font-bold">5</p>
                    <p className="text-sm text-gray-500 mt-1">Due this week</p>
                </Card>
            </div>
        </div>
    );
};
export default StudentDashboard;
