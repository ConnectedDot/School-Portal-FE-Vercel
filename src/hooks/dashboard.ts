import { useGetItem, useGetItems } from "./general";

export interface DashboardStats {
    totalStudents: number;
    totalTeachers: number;
    totalCourses: number;
    attendanceRate: number;
}

export interface RecentActivity {
    id: string;
    type: 'student' | 'teacher' | 'course';
    title: string;
    description: string;
    timestamp: string;
}

// Get dashboard stats
export const useGetDashboardStats = () => {
    // Since there's no specific dashboard endpoint, we'll fetch from individual endpoints
    // and calculate stats in the component
    return {
        students: useGetItems('/auth/students'),
        teachers: useGetItems('/auth/teachers'),
        courses: useGetItems('/course/all'),
    };
};
