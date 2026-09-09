import { Card } from '../../components/common/Card';

export const GuardianDashboard = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Guardian Dashboard</h1>
                <p className="text-gray-600 mt-1">Monitor your child's progress</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card title="Child's Attendance">
                    <p className="text-3xl font-bold">94%</p>
                    <p className="text-sm text-gray-500 mt-1">This month</p>
                </Card>
                <Card title="Average Grade">
                    <p className="text-3xl font-bold">B+</p>
                    <p className="text-sm text-green-600 mt-1">Good performance</p>
                </Card>
                <Card title="Unread Messages">
                    <p className="text-3xl font-bold">3</p>
                    <p className="text-sm text-gray-500 mt-1">From teachers</p>
                </Card>
            </div>
        </div>
    );
};
export default GuardianDashboard;
