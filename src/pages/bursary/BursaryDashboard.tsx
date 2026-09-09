import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, AlertTriangle } from 'lucide-react';
import { DataSourceFlag } from '@/components/shared/DataSourceFlag';
import { dummyBursaryDashboard } from '@/data/bursary/dashboard';

const BursaryDashboard = () => {
    return (
        <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
                <h1 className="text-2xl font-bold">Bursary Dashboard</h1>
                <DataSourceFlag source="dummy" />
            </div>

            {/* Development Notice */}
            <Card className="mb-6 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                        <AlertTriangle className="h-5 w-5" />
                        Development Notice
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <strong>Important:</strong> The Bursary/Finance module is currently a frontend scaffold. 
                        The backend role enum does not include BURSAR, and finance endpoints are not yet available.
                        Do not expose production finance routes until backend support is confirmed.
                    </p>
                </CardContent>
            </Card>

            {/* Dashboard Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Students</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dummyBursaryDashboard.totalStudents}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Fees Collected</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₦{(dummyBursaryDashboard.totalFeesCollected / 1000000).toFixed(1)}M</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Fees</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">₦{(dummyBursaryDashboard.pendingFees / 1000000).toFixed(1)}M</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Payment Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{dummyBursaryDashboard.paymentRate}%</div>
                    </CardContent>
                </Card>
            </div>

            {/* Info Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Finance Management
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">
                        Manage fee structures, invoices, and payments when backend endpoints are available.
                    </p>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Active Invoices:</span>
                            <span className="font-semibold">{dummyBursaryDashboard.activeInvoices}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Overdue Payments:</span>
                            <span className="font-semibold text-red-600">{dummyBursaryDashboard.overduePayments}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BursaryDashboard;
