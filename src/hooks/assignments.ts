import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/axios-Instance';

export type SubmissionType = 'FILE_UPLOAD' | 'TEXT' | 'HYBRID' | 'OFFLINE';

export interface Assignment {
    id: string;
    title: string;
    description: string;
    courseId: string;
    dueDate: string;
    maxScore?: number;
    submissionType?: SubmissionType;
    attachmentUrl?: string | null;
    course?: { id: string; title: string; subject?: string };
    submission?: { id: string; status: string; score?: number | null } | null;
}

export interface AssignmentInput {
    title: string;
    description: string;
    courseId: string;
    dueDate: string;
    maxScore?: number;
    submissionType?: SubmissionType;
    academicYearId?: string;
    file?: File;
}

const toFormData = (input: AssignmentInput | { textContent?: string; file?: File }) => {
    const form = new FormData();
    Object.entries(input).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') form.append(key, value instanceof File ? value : String(value));
    });
    return form;
};

const listData = <T,>(payload: any): T[] => payload?.data?.data ?? payload?.data ?? (Array.isArray(payload) ? payload : []);

export const useTeacherAssignments = (page = 1, limit = 10) => useQuery({
    queryKey: ['assignments', 'teacher', page, limit],
    queryFn: async () => listData<Assignment>((await axiosInstance.get('/assignment/teacher/my-assignments', { params: { page, limit } })).data),
});

export const useStudentAssignments = (page = 1, limit = 10) => useQuery({
    queryKey: ['assignments', 'student', page, limit],
    queryFn: async () => listData<Assignment>((await axiosInstance.get('/assignment/student/my-course-assignments', { params: { page, limit } })).data),
});

export const useAssignmentsByCourse = (courseId: string, page = 1, limit = 10) => useQuery({
    queryKey: ['assignments', 'course', courseId, page, limit],
    queryFn: async () => (await axiosInstance.get(`/assignment/course/${courseId}`, { params: { page, limit } })).data,
    enabled: !!courseId,
});

export const useAssignment = (id: string) => useQuery({
    queryKey: ['assignments', 'detail', id],
    queryFn: async () => (await axiosInstance.get(`/assignment/${id}`)).data,
    enabled: !!id,
});

export const useCreateAssignment = () => {
    const client = useQueryClient();
    return useMutation({ mutationFn: async (input: AssignmentInput) => (await axiosInstance.post('/assignment/create', toFormData(input))).data, onSuccess: () => client.invalidateQueries({ queryKey: ['assignments'] }) });
};

export const useUpdateAssignment = (id: string) => {
    const client = useQueryClient();
    return useMutation({ mutationFn: async (input: Partial<AssignmentInput>) => (await axiosInstance.patch(`/assignment/update/${id}`, toFormData(input as AssignmentInput))).data, onSuccess: () => client.invalidateQueries({ queryKey: ['assignments'] }) });
};

export const useDeleteAssignment = () => {
    const client = useQueryClient();
    return useMutation({ mutationFn: async (id: string) => (await axiosInstance.delete(`/assignment/delete/${id}`)).data, onSuccess: () => client.invalidateQueries({ queryKey: ['assignments'] }) });
};

export const useSubmitAssignment = (id: string) => {
    const client = useQueryClient();
    return useMutation({ mutationFn: async (input: { textContent?: string; file?: File }) => (await axiosInstance.post(`/assignment/${id}/submit`, toFormData(input))).data, onSuccess: () => client.invalidateQueries({ queryKey: ['assignments'] }) });
};

export const useAssignmentSubmissions = (id: string, page = 1, limit = 20, status?: string) => useQuery({
    queryKey: ['assignments', id, 'submissions', page, limit, status],
    queryFn: async () => (await axiosInstance.get(`/assignment/${id}/submissions`, { params: { page, limit, status } })).data,
    enabled: !!id,
});

export const useGradeSubmission = () => useMutation({ mutationFn: async ({ submissionId, ...body }: { submissionId: string; score: number; feedback?: string; status?: 'GRADED' | 'RESUBMIT_REQUESTED' }) => (await axiosInstance.patch(`/assignment/grade/${submissionId}`, body)).data });
export const useOfflineGrade = (assignmentId: string) => useMutation({ mutationFn: async (body: { studentId: string; score: number; feedback?: string }) => (await axiosInstance.post(`/assignment/${assignmentId}/offline-grade`, body)).data });
