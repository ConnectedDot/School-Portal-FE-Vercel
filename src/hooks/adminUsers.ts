import { axiosInstance } from '@/axios-Instance';
import { useQuery } from '@tanstack/react-query';

export type AdminUserRecord = Record<string, any> & {
    id?: string;
    email?: string;
    role?: string;
    profile?: Record<string, any> | null;
};

const extractUsers = (payload: any): AdminUserRecord[] => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.data?.data)) return payload.data.data;
    if (Array.isArray(payload?.users)) return payload.users;
    return [];
};

export const normalizeAdminUser = (user: AdminUserRecord): AdminUserRecord => {
    const profile = user?.profile && typeof user.profile === 'object' ? user.profile : {};
    const roleProfile = user?.student || user?.teacher || user?.administrator || user?.guardian || {};
    const mergedProfile = { ...profile, ...roleProfile };

    return {
        ...user,
        ...mergedProfile,
        id: mergedProfile.id || user.id,
        userId: user.id,
        email: user.email || mergedProfile.email || '',
        profile: mergedProfile,
    };
};

/**
 * The deployed all-users controller currently rejects every query-string key.
 * Fetch it without params and perform view filtering locally until the API uses
 * a decorated pagination/filter DTO.
 */
export const useAdminUsersQuery = () => useQuery<AdminUserRecord[]>({
    queryKey: ['/admin/all-users', 'parameter-free'],
    queryFn: async () => {
        const response = await axiosInstance.get('/admin/all-users');
        return extractUsers(response.data).map(normalizeAdminUser);
    },
    staleTime: 60_000,
    refetchOnWindowFocus: false,
});
