import { useCreateItem, useGetItems, useGetItem, useUpdateItem, useDeleteItem } from "./general";
import { axiosInstance } from "@/axios-Instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminUsersQuery } from './adminUsers';

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
    email?: string;
    password?: string;
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
    void page; void limit; void autoFetchAll;
    const query = useAdminUsersQuery();
    return { ...query, data: query.data?.filter((user) => user.role === 'STUDENT') as Student[] | undefined };
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

export const useChangeStudentPassword = () => useMutation({
    mutationFn: async (body: { oldPassword: string; newPassword: string; confirmPassword: string }) =>
        (await axiosInstance.patch('/student/change-password', body)).data,
});

export const useUploadStudentAvatar = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: async (file: File) => {
            const form = new FormData();
            form.append('file', file);
            return (await axiosInstance.post('/student/upload-avatar', form)).data;
        },
        onSuccess: () => client.invalidateQueries({ queryKey: ['/student/profile'] }),
    });
};

// Create new student (admin only)
export const useCreateStudent = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    const client = useQueryClient();
    return useCreateItem<Student>(
        '/auth/register',
        'Student created successfully',
        async (data) => {
            await client.invalidateQueries({ queryKey: ['/admin/all-users'] });
            if (onSuccessFn) await onSuccessFn(data);
        },
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
    const client = useQueryClient();
    return useCreateItem<any>(
        '/auth/bulk-register',
        'Students uploaded successfully',
        async (data) => {
            await client.invalidateQueries({ queryKey: ['/admin/all-users'] });
            if (onSuccessFn) await onSuccessFn(data);
        },
        true,  // IS form data (file upload)
        true,  // Show success alert
        true   // Show error alert
    );
};
