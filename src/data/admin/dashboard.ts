/**
 * Admin Dashboard Dummy Data
 * 
 * This file provides realistic dummy data for the admin dashboard
 * when backend API is not yet available or for testing purposes.
 */

export interface DashboardStats {
    totalStudents: number;
    totalTeachers: number;
    totalCourses: number;
    attendanceRate: number;
    pendingApprovals: number;
    activeThisMonth: number;
}

export interface RecentActivity {
    id: string;
    type: 'student_enrolled' | 'teacher_added' | 'course_created' | 'attendance_marked';
    description: string;
    timestamp: string;
    actor: string;
}

export const dummyDashboardStats: DashboardStats = {
    totalStudents: 1247,
    totalTeachers: 89,
    totalCourses: 42,
    attendanceRate: 87,
    pendingApprovals: 23,
    activeThisMonth: 1189,
};

export const dummyRecentActivities: RecentActivity[] = [
    {
        id: '1',
        type: 'student_enrolled',
        description: 'John Doe enrolled in SS1 Science',
        timestamp: '2025-01-15T10:30:00Z',
        actor: 'Admin User',
    },
    {
        id: '2',
        type: 'teacher_added',
        description: 'Mrs. Sarah Johnson added as Mathematics Teacher',
        timestamp: '2025-01-15T09:15:00Z',
        actor: 'Principal',
    },
    {
        id: '3',
        type: 'course_created',
        description: 'Advanced Physics course created for SS2',
        timestamp: '2025-01-15T08:45:00Z',
        actor: 'Academic Director',
    },
    {
        id: '4',
        type: 'attendance_marked',
        description: 'JSS1 attendance marked: 95% present',
        timestamp: '2025-01-15T08:00:00Z',
        actor: 'JSS1 Class Teacher',
    },
    {
        id: '5',
        type: 'student_enrolled',
        description: 'Jane Smith enrolled in JSS2 Arts',
        timestamp: '2025-01-14T14:20:00Z',
        actor: 'Admin User',
    },
];
