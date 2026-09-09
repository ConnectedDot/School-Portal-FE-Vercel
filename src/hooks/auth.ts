// import { createItem, useCreateItem, useGetItem, useUpdateItem } from "./general";
import { useContext } from "react";
import { setUserItem, getUserItem } from '@/storage';
// import { AuthContext } from '@/context';
// import { useAlert } from "@/context/AlertContext";
// import { User } from '@/types';
import { axiosInstance } from "@/axios-Instance";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/types";
import { AuthContext } from "@/contexts/AuthContext";
import { useCreateItem, createItem, useGetItem, useUpdateItem } from "./general";
import { toast } from "sonner";


export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  businessName?: string;
  phone?: string;
  role?: string;
  storeId?: string;
  userType?: 'platform-staff' | 'customer' | 'store-staff';
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

/**
 * Get user profile
 * @param token Access token
 * @returns User profile
 */
export const getUserProfile = async (token: string): Promise<User> => {
  const response = await axiosInstance.get('/student/profile', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = response.data;
  if (!data) {
    throw new Error("Failed to fetch user profile");
  }
  return data;
};

/**
 * Hook to login a user
 */
export const useLogin = () => {
  const { authenticate, updateUser } = useContext(AuthContext);
  // const { showSuccess, showError } = useAlert();

  return useCreateItem<any>(
    "/auth/login",
    "Login successful",
    async (data) => {
      try {
        const { token } = data;
        await setUserItem("token", token);

        // Store user data from response
        if (data.user) {
          await setUserItem("user_data", data.user);
          authenticate(token);
          // showSuccess("Success", "Login successful");
          toast.success("Login successful");
        }

      } catch (error) {
        console.error("Failed during login process:", error);
        // showError("Error", error instanceof Error ? error.message : "Authentication failed");
        // throw error;
      }
    },
    false, // Not form data
    false, // Don't show success alert (we handle it above)
    true   // Show error alert
  );
};



export const login = async (relativeUrl: string, formData: any, successMessage?: string) => {
  const { baseURL } = await import('@/axios-Instance/constants');

  const url = `${baseURL}${relativeUrl}`;

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = response.data;

    // Handle APIs that return { success: false }
    if (data && data.success === false) {
      const errorMessage = Array.isArray(data.message) ? data.message.join(", ") : data.message || "Request failed";
      throw new Error(errorMessage);
    }

    if (data && data.success !== false) {
      toast.success(successMessage || "Login successful");
    }

    return data;
  } catch (error: any) {
    const responseMessage = error?.response?.data?.message || error?.response?.data?.error;
    const errorMessage = Array.isArray(responseMessage)
      ? responseMessage.join(", ")
      : responseMessage || error?.message || "Unable to contact login server";

    throw new Error(errorMessage);
  }
};

export const useLogins = (
  relativeUrl: string,
  successMessage?: string,
  onSuccessFn?: (data: any) => Promise<any>
) => {
  const queryClient = useQueryClient();
  // const { showSuccess, showError } = useAlert();

  return useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      const response = await login(relativeUrl, payload, successMessage);
      // console.log(response, "UseLogins response")
      return response;
    },

    async onSuccess(data) {
      // console.log('onSuccess triggered with data:', data);
      await queryClient.invalidateQueries({ queryKey: [relativeUrl] });
      
      if (onSuccessFn) {
        try {
          await onSuccessFn(data);
        } catch (error) {
          console.error('Error in onSuccessFn:', error);
          throw error;
        }
      }
    },
    onError(error) {
      toast.error(error instanceof Error ? error.message : "Login failed. Please try again.");
    },
  });
};

export const useRegisters = <T>(
  relativeUrl: string,
  successMessage?: string,
  onSuccessFn?: (data: any) => Promise<any>
) => {
  const queryClient = useQueryClient();
  // const { showSuccess, showError } = useAlert();

  return useMutation({
    mutationFn: async (payload: Record<string, any>) => {
      const response = await createItem(relativeUrl, payload);
      if (response && response.statusCode && response.statusCode >= 400) {
        throw new Error(Array.isArray(response.message)
          ? response.message.join(', ')
          : response.message || 'Registration failed');
      }

      return response;
    },
    async onSuccess(data, variables, context) {
      // console.log('onSuccess data (register):', data);
      await queryClient.invalidateQueries({ queryKey: [relativeUrl] });

      // Only proceed if we have an access_token (real success)
      if (data && data.access_token) {
        if (onSuccessFn) {
          try {
            await onSuccessFn(data);
          } catch (error) {
            console.error('Error in onSuccessFn (register):', error);
            throw error;
          }
        }

        const msg = successMessage ? successMessage : "Registration successful";
        // showSuccess("Success", msg);
        toast.success(msg);
      }
    },
    onError(error, variables, context) {
      // console.log("Error happened during registration:", error);

      let errorMessage = "Registration failed. Please check your details and try again.";

      if (error instanceof Error) {
        // console.error('Error details:', error.message, error.stack);
        errorMessage = error.message;
      }
      // showError(errorMessage);
      toast.error(errorMessage);
    },
  });
};



/**
 * Hook to register a user
 */
export const useRegister = () => {
  // const { showSuccess } = useAlert();

  return useCreateItem<any>(
    "/auth/register",
    "Registration successful",
    async () => {
      // showSuccess("Success", "Account created successfully. You can now login.");
      toast.success("Account created successfully. You can now login.");
    },
    false, // Not form data
    false, // Don't show success alert (we handle it in the callback)
    true   // Show error alert
  );
};

/**
 * Hook to change password
 */
export const useChangePassword = () => {
  return useUpdateItem<any>(
    "/v1/users/change-password",
    "Password changed successfully",
    undefined, // No ID key needed
    true,      // Show success alert
    true       // Show error alert
  );
};

/**
 * Hook to get user profile
 */
export const useProfile = () => {
  return useGetItem<User>(
    "/v1/users/profile"
  );
};

/**
 * Hook to forgot password
 */
export const useForgotPassword = () => {
  return useCreateItem<any>(
    "/v1/auth/forgot-password",
    "Password reset instructions sent to your email",
    undefined, // No callback needed
    false,     // Not form data
    true,      // Show success alert
    true       // Show error alert
  );
};

/**
 * Hook to reset password
 */
export const useResetPassword = () => {
  return useCreateItem<any>(
    "/v1/auth/reset-password",
    "Password reset successful. You can now login with your new password.",
    undefined, // No callback needed
    false,     // Not form data
    true,      // Show success alert
    true       // Show error alert
  );
};
