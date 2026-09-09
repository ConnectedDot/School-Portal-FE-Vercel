// import { useGet, useUpdate, useCreate } from '@/hooks/api';
import { queryKeys } from '@/react-query/constants';
// import { User } from '@/types';
import { useCreate, useGet, useUpdate } from './general';
import type { User } from '@/types';

// Types
export interface StoreOwner {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Store {
  id: string;
  name: string;
  owner: StoreOwner;
}

// export interface UserProfile {
//   id: string;
//   name?: string;
//   firstName?: string;
//   lastName?: string;
//   email: string;
//   phone?: string;
//   avatar?: string;
//   createdAt?: string;
//   updatedAt?: string;
//   isActive?: boolean;
//   role?: string;
//   userType?: string;
//   store: Store; // store is a single object, not an array
//   // Add other user fields as needed
// }

export interface UpdateProfileRequest {
  name?: string;
  phone?: string;
  avatar?: string;
  // Add other updateable fields
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// Get current user profile hook
export const useGetUserProfile = (options?: { enabled?: boolean }) => {
  return useGet<User>({
    url: '/user/profile',
    queryKey: [queryKeys.user, 'profile'],
    options: options,
  });
};

// Update user profile hook
export const useUpdateProfile = () => {
  return useUpdate<User, UpdateProfileRequest>({
    url: '/user/profile',
    queryKey: [queryKeys.user, 'profile'],
  });
};

// Change password hook
export const useChangePassword = () => {
  return useCreate<{ message: string }, ChangePasswordRequest>({
    url: '/user/change-password',
    queryKey: [queryKeys.user, 'profile'],
  });
};

// Change PIN hook
export const useChangePin = () => {
  return useUpdate<{ message: string }, { currentPin: string; newPin: string }>({
    url: '/user/change-pin',
    queryKey: [queryKeys.user, 'profile'],
  });
};
