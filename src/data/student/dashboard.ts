/**
 * Student Dashboard Dummy Data
 */

export interface StudentDashboardData {
    studentId: string;
    studentName: string;
    class: string;
    academicYear: string;
    attendanceRate: number;
    averageGrade: string;
    enrolledCourses: number;
    pendingAssignments: number;
    upcomingExams: number;
}

export const dummyStudentDashboard: StudentDashboardData = {
    studentId: 'STU001',
    studentName: 'John Doe',
    class: 'SS2 Science',
    academicYear: '2024-2025',
    attendanceRate: 92,
    averageGrade: 'B+',
    enrolledCourses: 9,
    pendingAssignments: 3,
    upcomingExams: 2,
};
