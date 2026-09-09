import { useGetItem, useGetPaginatedItem } from "./general";

// Types for User (can be Student, Teacher, Admin, etc.)
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone?: string;
    gender?: string;
    avatar?: string;
    dateOfBirth?: string;
    studentLevel?: string;
    department?: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface GetAllUsersParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: string; // STUDENT | TEACHER | ADMINISTRATOR | PARENT
    studentLevel?: string; // JSS_1 | JSS_2 | JSS_3 | SS_1 | SS_2 | SS_3
    status?: string; // PENDING | APPROVED | REJECTED | ON_LEAVE | SUSPENDED | TERMINATED | ACTIVE
}

// Get all users with filtering and pagination
export const useGetAllUsers = (
    page: number = 1,
    limit: number = 10,
    filters?: GetAllUsersParams
) => {
    // Build query parameters from filters
    const params: Record<string, string> = {};
    if (filters?.role) params.role = filters.role;
    if (filters?.studentLevel) params.studentLevel = filters.studentLevel;
    if (filters?.status) params.status = filters.status;
    if (filters?.search) params.search = filters.search;

    return useGetPaginatedItem<User>({
        relativeUrl: '/admin/all-users',
        limit,
        autoFetchAll: false,
        enabled: true,
        queryParams: params,
    });
};

// Get all users (convenience wrapper for all users)
export const useGetUsers = (limit: number = 10) => {
    return useGetAllUsers(1, limit);
};

// Get users by role
export const useGetUsersByRole = (
    role: string,
    limit: number = 10
) => {
    return useGetAllUsers(1, limit, { role });
};

// Get all students (via admin endpoint)
export const useGetAllStudents = (limit: number = 10) => {
    return useGetUsersByRole('STUDENT', limit);
};

// Get all teachers (via admin endpoint)
export const useGetAllTeachers = (limit: number = 10) => {
    return useGetUsersByRole('TEACHER', limit);
};

// Get all admins
export const useGetAllAdmins = (limit: number = 10) => {
    return useGetUsersByRole('ADMINISTRATOR', limit);
};
