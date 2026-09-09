import { useCreateItem, useGetItems } from "./general";

// Types for Enrollment
export interface Enrollment {
    id: string;
    studentId: string;
    courseId: string;
    enrollmentDate: string;
    status: string;
    course?: {
        id: string;
        title: string;
        description?: string;
        subject: string;
        courseType: string;
        teacher?: any;
    };
    student?: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface AutoEnrollDto {
    studentId?: string; // Optional if auto-detected from auth
}

// Auto enroll student to appropriate courses
export const useAutoEnroll = (
    onSuccessFn?: (data: any) => Promise<any>
) => {
    return useCreateItem<any>(
        '/enrollment/auto-enroll',
        'Successfully enrolled in courses',
        onSuccessFn,
        false, // Not form data
        true,  // Show success alert
        true   // Show error alert
    );
};

// Get student's enrollments
export const useGetMyEnrollment = () => {
    return useGetItems<Enrollment>('/enrollment/my-enrollment');
};

// Get enrollments with details (alternative endpoint if available)
export const useGetEnrollments = () => {
    return useGetItems<Enrollment>('/enrollment');
};
