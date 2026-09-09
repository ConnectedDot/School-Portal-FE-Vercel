/**
 * Guardian Dashboard Dummy Data
 */

export interface GuardianDashboardData {
    guardianId: string;
    guardianName: string;
    children: GuardianChild[];
    totalChildren: number;
    overallAttendanceRate: number;
    pendingFees: number;
    upcomingMeetings: number;
}

export interface GuardianChild {
    id: string;
    studentId: string;
    studentName: string;
    class: string;
    attendanceRate: number;
    averageGrade: string;
    recentAbsences: number;
}

export const dummyGuardianDashboard: GuardianDashboardData = {
    guardianId: 'GRD001',
    guardianName: 'Mr. John Doe',
    children: [
        {
            id: '1',
            studentId: 'STU001',
            studentName: 'James Doe',
            class: 'JSS2',
            attendanceRate: 95,
            averageGrade: 'A',
            recentAbsences: 0,
        },
        {
            id: '2',
            studentId: 'STU002',
            studentName: 'Mary Doe',
            class: 'SS1',
            attendanceRate: 88,
            averageGrade: 'B',
            recentAbsences: 2,
        },
    ],
    totalChildren: 2,
    overallAttendanceRate: 92,
    pendingFees: 250000,
    upcomingMeetings: 1,
};
