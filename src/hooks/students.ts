import { useCreateItem, useGetItems, useGetItem, useUpdateItem, useDeleteItem, useGetPaginatedItem } from "./general";
import { axiosInstance } from "@/axios-Instance";

// Types for Student (matching Postman collection + backward compatibility)
export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    gender?: string;
    avatar?: string;
    dateOfBirth?: string;
    studentLevel?: string;
    department?: string;
    stateOfOrigin?: string;
    nationality?: string;
    address?: string;
    guardianName?: string;
    guardianEmail?: string;
    guardianPhone?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    // Legacy fields for backward compatibility
    enrollmentDate?: string;
    grade?: string;
    section?: string;
    studentId?: string;
    phoneNumber?: string;
    profile?: any;
    isVerified?: boolean;
}

export interface CreateStudentDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    gender?: string;
    phone?: string;
    avatar?: string;
    dateOfBirth?: string;
    studentLevel?: string;
    department?: string;
}

export interface UpdateStudentDto {
    phone?: string;
    avatar?: string;
    stateOfOrigin?: string;
    nationality?: string;
    email?: string;
}

// Get all students with pagination (admin endpoint - backward compatibility)
export const useGetStudents = (page: number = 1, limit: number = 20, autoFetchAll: boolean = false) => {
    return useGetPaginatedItem<Student>({
        relativeUrl: '/admin/all-users',
        limit,
        autoFetchAll,
        enabled: true,
    });
};

// Get my student profile
export const useMyStudentProfile = () => {
    return useGetItem<Student>('/student/profile');
};

// Get my enrolled courses
export const useMyEnrolledCourses = (academicYearId?: string) => {
    const params: Record<string, string> = {};
    if (academicYearId) params.academicYearId = academicYearId;
    return useGetItems<any>('/student/my-enrolled-courses', params);
};

// Update my student profile
export const useUpdateMyStudentProfile = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useUpdateItem<Student>(
        '/student/update-profile',
        'Profile updated successfully',
        onSuccessFn,
        false, // Not form data
        true,  // Show success alert
        true   // Show error alert
    );
};

// Create new student (admin only)
export const useCreateStudent = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useCreateItem<Student>(
        '/auth/register-student',
        'Student created successfully',
        onSuccessFn,
        false, // Not form data
        true,  // Show success alert
        true   // Show error alert
    );
};

// Delete student (admin endpoint - backward compatibility)
export const useDeleteStudent = () => {
    return useDeleteItem<Student>(
        '/admin/all-users',
        'Student deleted successfully',
        true,  // Show success alert
        true   // Show error alert
    );
};

// Bulk upload students (admin only)
export const useBulkUploadStudents = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useCreateItem<any>(
        '/auth/bulk-register',
        'Students uploaded successfully',
        onSuccessFn,
        true,  // IS form data (file upload)
        true,  // Show success alert
        true   // Show error alert
    );
};
