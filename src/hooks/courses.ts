import { useCreateItem, useGetItems, useGetItem, useUpdateItem, useDeleteItem, useGetPaginatedItem } from "./general";
import { axiosInstance } from "@/axios-Instance";
import { baseURL } from "@/axios-Instance/constants";
import { useQueryClient, useMutation } from "@tanstack/react-query";

// Types for Course (matching Postman collection + backward compatibility)
export interface Course {
    id: string;
    title: string;
    description?: string;
    subject: string;
    courseType: string;
    allowedDepartments: string[];
    teacher?: any;
    enrollmentCount?: number;
    createdAt?: string;
    updatedAt?: string;
    // Legacy fields for backward compatibility
    name?: string;
    code?: string;
    credits?: number;
    grade?: string;
    teacherId?: string;
    teacherName?: string;
    schedule?: string;
    room?: string;
    status?: string;
    department?: string;
}

export interface CreateCourseDto {
    title: string;
    description?: string;
    subject: string;
    courseType: string;
    allowedDepartments?: string[];
    // Legacy fields for backward compatibility
    name?: string;
    code?: string;
    credits?: number;
    grade?: string;
    teacherId?: string;
    schedule?: string;
    room?: string;
}

// Get all courses with pagination
export const useGetCourses = (page: number = 1, limit: number = 10, autoFetchAll: boolean = false, search?: string) => {
    return useGetPaginatedItem<Course>({
        relativeUrl: '/course/all',
        limit,
        autoFetchAll,
        enabled: true,
    });
};

// Get all courses (backward compatibility alias)
export const useGetAllCourses = (limit: number = 20, autoFetchAll: boolean = false) => {
    return useGetPaginatedItem<Course>({
        relativeUrl: '/course/all',
        limit,
        autoFetchAll,
        enabled: true,
    });
};

// Get single course by ID
export const useGetCourse = (id: string, enabled: boolean = true) => {
    return useGetItem<Course>(
        '/course',
        id,
        undefined,
        { enabled: !!id && enabled }
    );
};

// Get teacher's courses
export const useGetMyCourses = () => {
    return useGetItems<Course>('/course/my-course');
};

// Create new course
export const useCreateCourse = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useCreateItem<Course>(
        '/course/create',
        'Course created successfully',
        onSuccessFn,
        false, // Not form data
        true,  // Show success alert
        true   // Show error alert
    );
};

// Update course
export const useUpdateCourse = (
    id: string,
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useUpdateItem<Course>(
        '/course',
        'Course updated successfully',
        onSuccessFn,
        false, // Not form data
        true,  // Show success alert
        true   // Show error alert
    );
};

// Delete course
export const useDeleteCourse = () => {
    return useDeleteItem<Course>(
        '/course',
        'Course deleted successfully',
        true,  // Show success alert
        true   // Show error alert
    );
};

// Assign teacher to course (uses PUT as per Postman collection)
export const useAssignTeacher = (
    teacherId: string,
    courseId: string,
    onSuccessFn?: (data: any) => Promise<any>
) => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: async () => {
            const token = localStorage.getItem('token');
            const response = await fetch(`${baseURL}/course/teacher/${teacherId}/course/${courseId}/assign`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to assign teacher');
            }
            return response.json();
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['courses'] });
            if (onSuccessFn) onSuccessFn(data);
        },
    });
};
