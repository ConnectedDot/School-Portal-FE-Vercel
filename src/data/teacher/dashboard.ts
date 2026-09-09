/**
 * Teacher Dashboard Dummy Data
 */

export interface TeacherDashboardData {
    teacherId: string;
    teacherName: string;
    department: string;
    totalStudents: number;
    totalCourses: number;
    averageAttendance: number;
    pendingGrading: number;
    upcomingClasses: number;
}

export const dummyTeacherDashboard: TeacherDashboardData = {
    teacherId: 'TCH001',
    teacherName: 'Dr. Ibrahim',
    department: 'Science',
    totalStudents: 156,
    totalCourses: 4,
    averageAttendance: 89,
    pendingGrading: 12,
    upcomingClasses: 3,
};
