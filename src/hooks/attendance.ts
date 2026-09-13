import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/axios-Instance';

export interface AttendanceRecordInput { studentId: string; status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'; note?: string }

const invalidateAttendance = (client: ReturnType<typeof useQueryClient>) => client.invalidateQueries({ queryKey: ['attendance'] });

export const useOpenAttendanceSession = () => {
    const client = useQueryClient();
    return useMutation({ mutationFn: async (body: { courseId: string; date?: string; academicYearId?: string }) => (await axiosInstance.post('/attendance/session/open', body)).data, onSuccess: () => invalidateAttendance(client) });
};
export const useSubmitAttendance = (sessionId: string) => {
    const client = useQueryClient();
    return useMutation({ mutationFn: async (records: AttendanceRecordInput[]) => (await axiosInstance.post(`/attendance/session/${sessionId}/submit`, { records })).data, onSuccess: () => invalidateAttendance(client) });
};
export const useUpdateAttendanceRecord = () => {
    const client = useQueryClient();
    return useMutation({ mutationFn: async ({ recordId, ...body }: { recordId: string; status: AttendanceRecordInput['status']; note?: string }) => (await axiosInstance.patch(`/attendance/record/update/${recordId}`, body)).data, onSuccess: () => invalidateAttendance(client) });
};
export const useTeacherAttendanceSessions = (page = 1, limit = 20, courseId?: string) => useQuery({ queryKey: ['attendance', 'teacher', page, limit, courseId], queryFn: async () => (await axiosInstance.get('/attendance/teacher/my-sessions', { params: { page, limit, courseId } })).data });
export const useAttendanceSession = (sessionId: string) => useQuery({ queryKey: ['attendance', 'session', sessionId], queryFn: async () => (await axiosInstance.get(`/attendance/session/${sessionId}`)).data, enabled: !!sessionId });
export const useMyAttendance = (page = 1, limit = 30, courseId?: string) => useQuery({ queryKey: ['attendance', 'student', page, limit, courseId], queryFn: async () => (await axiosInstance.get('/attendance/student/my-attendance', { params: { page, limit, courseId } })).data });
export const useCourseAttendance = (courseId: string, page = 1, limit = 20) => useQuery({ queryKey: ['attendance', 'admin', 'course', courseId, page, limit], queryFn: async () => (await axiosInstance.get(`/attendance/admin/course/${courseId}`, { params: { page, limit } })).data, enabled: !!courseId });
export const useStudentAttendance = (studentId: string, page = 1, limit = 30, courseId?: string) => useQuery({ queryKey: ['attendance', 'admin', 'student', studentId, page, limit, courseId], queryFn: async () => (await axiosInstance.get(`/attendance/admin/student/${studentId}`, { params: { page, limit, courseId } })).data, enabled: !!studentId });
