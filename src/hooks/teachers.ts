import type { TeacherData } from "@/types/teachers";
import { useCreateItem, useGetItems, useGetItem, useUpdateItem, useDeleteItem, useGetPaginatedItem } from "./general";
import { axiosInstance } from "@/axios-Instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAdminUsersQuery } from './adminUsers';

export interface CreateTeacherDto {
    email: string;
    firstName: string;
    lastName: string;
    gender?: string;
    phone?: string;
    dateOfBirth?: string;
    employmentType?: string;
    qualification?: string;
}

export interface UpdateTeacherProfileDto {
    dateOfBirth?: string;
    phone?: string;
    avatar?: string;
    address?: string;
    stateOfOrigin?: string;
    nationality?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    emergencyContactRelation?: string;
    bankName?: string;
    accountNumber?: string;
}

// Get all teachers with pagination (admin endpoint - backward compatibility)
export const useGetTeachers = (page: number = 1, limit: number = 20, autoFetchAll: boolean = false) => {
    void page; void limit; void autoFetchAll;
    const query = useAdminUsersQuery();
    return { ...query, data: query.data?.filter((user) => user.role === 'TEACHER') as TeacherData[] | undefined };
};

// Get single teacher by ID (backward compatibility)
export const useGetTeacher = (id: string, enabled: boolean = true) => {
    return useGetItem<TeacherData>(
        '/admin/teachers',
        id,
        undefined,
        { enabled: !!id && enabled }
    );
};

// Create new teacher (admin only)
export const useCreateTeacher = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useCreateItem<TeacherData>(
        '/auth/register-teacher',
        'Teacher created successfully',
        onSuccessFn,
        false, // Not form data
        true,  // Show success alert
        true   // Show error alert
    );
};

// Update teacher (backward compatibility)
export const useUpdateTeacher = (
    id: string,
    onSuccessFn?: (data: any) => Promise<any>
) => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: async (body: Partial<TeacherData>) => (await axiosInstance.patch(`/admin/teachers/${id}`, body)).data,
        onSuccess: async (data) => {
            await client.invalidateQueries({ queryKey: ['/admin/teachers'] });
            if (onSuccessFn) await onSuccessFn(data);
        },
    });
};

// Delete teacher (backward compatibility)
export const useDeleteTeacher = () => {
    return useDeleteItem<TeacherData>(
        '/admin/all-users',
        'Teacher deleted successfully',
        true,  // Show success alert
        true   // Show error alert
    );
};

// Get teacher's students (with pagination)
export const useGetMyStudents = (page: number = 1, limit: number = 10, search?: string, studentLevel?: string, status?: string, courseId?: string) => {
    const params: Record<string, string> = {};
    if (search) params.search = search;
    if (studentLevel) params.studentLevel = studentLevel;
    if (status) params.status = status;
    if (courseId) params.courseId = courseId;

    return useGetPaginatedItem<any>({
        relativeUrl: '/teacher/my-students',
        limit,
        autoFetchAll: false,
        enabled: true,
        queryParams: params,
    });
};

// Get teacher's courses
export const useGetMyCourses = () => {
    return useGetItems<any>('/teacher/my-courses');
};

// Get teacher profile
export const useGetTeacherProfile = () => {
    return useGetItem<TeacherData>(
        '/teacher/profile',
        '',
        undefined,
        { enabled: true }
    );
};

// Update teacher profile
export const useUpdateTeacherProfile = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useUpdateItem<TeacherData>(
        '/teacher/update-profile',
        'Profile updated successfully',
        onSuccessFn,
        false, // Not form data
        true,  // Show success alert
        true   // Show error alert
    );
};

// Certification types (matching Postman collection + backward compatibility)
export interface Certification {
    id: string;
    name: string;
    issuedBy: string;
    issuedAt: string;
    fileUrl?: string;
    createdAt?: string;
    updatedAt?: string;
    // Legacy fields for backward compatibility
    issuingOrganization?: string;
    issueDate?: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
    description?: string;
}

export interface CreateCertificationDto {
    name: string;
    issuedBy: string;
    issuedAt: string;
    file?: File;
    // Legacy fields for backward compatibility
    issuingOrganization?: string;
    issueDate?: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
    description?: string;
}

export interface UpdateCertificationDto {
    name?: string;
    issuedBy?: string;
    issuedAt?: string;
    file?: File;
    // Legacy fields for backward compatibility
    issuingOrganization?: string;
    issueDate?: string;
    expiryDate?: string;
    credentialId?: string;
    credentialUrl?: string;
    description?: string;
}

// Add certification (form data)
export const useCreateCertification = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useCreateItem<Certification>(
        '/teacher/certifications',
        'Certification added successfully',
        onSuccessFn,
        true, // IS form data (file upload)
        true, // Show success alert
        true  // Show error alert
    );
};

// Update certification (form data)
export const useUpdateCertification = (
    id: string,
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useUpdateItem<Certification>(
        `/teacher/certifications/${id}`,
        'Certification updated successfully',
        onSuccessFn,
        true, // IS form data (file upload)
        true, // Show success alert
        true  // Show error alert
    );
};

// Delete certification
export const useDeleteCertification = () => {
    return useDeleteItem<Certification>(
        '/teacher/certifications',
        'Certification deleted successfully',
        true, // Show success alert
        true  // Show error alert
    );
};

export const useChangeTeacherPassword = () => useMutation({
    mutationFn: async (body: { oldPassword: string; newPassword: string; confirmPassword: string }) =>
        (await axiosInstance.patch('/teacher/change-password', body)).data,
});

export const useUploadTeacherAvatar = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: async (file: File) => {
            const form = new FormData();
            form.append('file', file);
            return (await axiosInstance.post('/teacher/upload-avatar', form)).data;
        },
        onSuccess: () => client.invalidateQueries({ queryKey: ['/teacher/profile'] }),
    });
};
