/**
 * Bursary/Finance Dashboard Dummy Data
 * 
 * NOTE: This is a frontend scaffold. The backend role enum does not currently include BURSAR.
 * Do not expose production finance routes until backend supports the BURSAR role.
 */

export interface BursaryDashboardData {
    totalStudents: number;
    totalFeesCollected: number;
    pendingFees: number;
    paymentRate: number;
    activeInvoices: number;
    overduePayments: number;
}

export const dummyBursaryDashboard: BursaryDashboardData = {
    totalStudents: 1247,
    totalFeesCollected: 45600000,
    pendingFees: 8500000,
    paymentRate: 84,
    activeInvoices: 234,
    overduePayments: 67,
};
