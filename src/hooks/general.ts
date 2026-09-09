// import { sp } from "@pnp/sp";
// import { boolean } from "zod";
import { useMutation, useQuery, useQueryClient, type UseMutationOptions, type UseQueryOptions } from "@tanstack/react-query";
import { axiosInstance } from "@/axios-Instance";
// import { useAlert } from "@/context/AlertContext";
// import { fetchHeaders } from "@/utils/helpers";
import { baseURL } from "@/axios-Instance/constants";
import { fetchHeaders } from "@/utils/helpers";
import { toast } from "sonner";
import { getUserItem } from "@/storage";
import type { AxiosError, AxiosResponse } from "axios";

type id = string | number;

// Types
export type QueryConfig<T> = {
    url: string;
    queryKey: string[];
    options?: Omit<UseQueryOptions<T, AxiosError, T>, 'queryKey' | 'queryFn'>;
};

export type MutationConfig<T, V> = {
    url: string;
    queryKey?: string[];
    options?: Omit<UseMutationOptions<AxiosResponse<T>, AxiosError, V>, 'mutationFn'>;
};




// Add auth token to requests
const addAuthToken = async () => {
    try {
        // You can implement your token retrieval logic here
        const token = await getUserItem('token');
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    } catch (error) {
        console.error('Error setting auth token:', error);
    }
};


export const getItems = async (relativeUrl: string) => {
    // console.log("Get Items function called");

    try {
        const response = await axiosInstance.get(relativeUrl);
        const data = response.data;

        // console.log('API Response data:', data);

        if (!data?.success && !data?.data) {
            throw new Error(data?.error || data?.message || "Error contacting server");
        }

        return data.data || data;
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
};

export const getItem = async (relativeUrl: string, id?: id) => {
    // Append ID to URL if provided
    const url = id ? `${relativeUrl}/${id}` : relativeUrl;

    try {
        const response = await axiosInstance.get(url);
        const data = response.data;

        // console.log('API Response data:', data);

        if (!data) {
            throw new Error(data?.error || data?.message || "Error contacting server");
        }

        return data;
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
};

export const useGet = <T = any>({ url, queryKey, options }: QueryConfig<T>) => {
    return useQuery<T, AxiosError, T>({
        queryKey,
        queryFn: async () => {
            await addAuthToken();
            const response = await axiosInstance.get<T>(url);
            return response.data;
        },
        ...options,
    });
};

/**
 * Universal POST hook for creating data
 */
export const useCreate = <T = any, V = any>({ url, queryKey, options }: MutationConfig<T, V>) => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<T>, AxiosError, V>({
        mutationFn: async (data: V) => {
            await addAuthToken();
            return await axiosInstance.post<T>(url, data);
        },
        onSuccess: (_, __, ___) => {
            if (queryKey) {
                queryClient.invalidateQueries({ queryKey });
            }
        },
        ...options,
    });
};


/**
 * Universal PUT hook for updating data
 */
export const useUpdate = <T = any, V = any>({ url, queryKey, options }: MutationConfig<T, V>) => {
    const queryClient = useQueryClient();

    return useMutation<AxiosResponse<T>, AxiosError, V>({
        mutationFn: async (data: V) => {
            await addAuthToken();
            return await axiosInstance.put<T>(url, data);
        },
        onSuccess: (_, __, ___) => {
            if (queryKey) {
                queryClient.invalidateQueries({ queryKey });
            }
        },
        ...options,
    });
};

/**
 * A specialized function for getting an item by ID
 * This function explicitly requires an ID parameter and constructs the correct URL
 * @param resourcePath - The base resource path (e.g., '/products', '/users')
 * @param itemId - The required ID of the item to fetch
 * @returns The requested item data
 */

export const getItemById = async <T>(resourcePath: string, itemId: string | number): Promise<T> => {

    if (!itemId) {
        throw new Error("ID is required for getItemById");
    }

    const normalizedPath = resourcePath.startsWith('/') ? resourcePath : `/${resourcePath}`;
    const cleanPath = normalizedPath.endsWith('/') ? normalizedPath.slice(0, -1) : normalizedPath;
    return await getItem(cleanPath, itemId) as T;
};

export const createItem = async (
    relativeUrl: string,
    formData: any,
    isFormData?: boolean
) => {
    const url = `${baseURL}${relativeUrl}`;
    const headers = await fetchHeaders();

    const requestHeaders = isFormData
        ? { Authorization: headers.Authorization }
        : headers;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: isFormData ? formData : JSON.stringify(formData),
            headers: requestHeaders,
        });

        // console.log(`API Response status in createItem: ${JSON.stringify(response)}`);
        // console.log(`API Response status: ${response.status} ${response.statusText}`);



        // Still catch real HTTP errors
        if (!response.ok) {
            let errorMessage = `Error: ${response.statusText}`;
            try {
                const errorData = await response.json();
                // console.log('API Error Response-Createitem:', errorData);

                // Extract error message from various possible API response formats
                errorMessage =
                    errorData?.message
                    || errorMessage;
            } catch (_) {
                // If JSON parsing fails, keep the default error message
            }

            toast.error(errorMessage);
            // console.log(errorMessage, "error message in createItem")
            throw new Error(errorMessage);
        }

        const data = await response.json();
        // console.log('API Response data:', data);

        // ✅ New check: handle APIs that return { success: false }
        if (data && data.success === false) {
            throw new Error(
                Array.isArray(data.message) ? data.message.join(", ") : data.message || "Request failed"
            );
        }

        if (data && (data.error || data.statusCode >= 400)) {
            throw new Error(
                Array.isArray(data.message)
                    ? data.message.join(", ")
                    : data.message || data.error || "Error processing request"
            );
        }

        return data.data || data;
    } catch (error) {
        // console.error("API Request failed:", error);
        throw error;
    }
};


export const updateItem = async (
    relativeUrl: string,
    formData: any,
    isFormData?: boolean
) => {
    const ID = formData.id;
    const url = `${relativeUrl}/${ID}`;

    // Remove 'id' from formData before sending to API
    const { id, ...payloadWithoutId } = formData;

    // console.log('=== UPDATE ITEM DEBUG ===');
    // console.log('URL:', url);
    // console.log('Payload:', JSON.stringify(payloadWithoutId, null, 2));

    try {
        const response = await axiosInstance.patch(url, payloadWithoutId, {
            headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : undefined
        });

        const data = response.data;

        if (data && (data.error || data.statusCode >= 400)) {
            const errorMessage = Array.isArray(data.message)
                ? data.message.join(', ')
                : data.message || data.error || "Error processing request";
            throw new Error(errorMessage);
        }

        return data.data || data;
    } catch (error: any) {
        console.error('=== UPDATE ITEM ERROR ===');
        console.error('URL:', url);
        console.error('Status:', error?.response?.status);
        console.error('Response Data:', JSON.stringify(error?.response?.data, null, 2));
        console.error('Error Message:', error?.message);
        throw error;
    }
};

export const deleteItem = async (relativeUrl: string, id?: id) => {
    const url = id ? `${relativeUrl}/${id}` : relativeUrl;

    try {
        const response = await axiosInstance.delete(url);

        const data = response.data;

        if (data && (data.error || data.statusCode >= 400)) {
            const errorMessage = Array.isArray(data.message)
                ? data.message.join(', ')
                : data.message || data.error || "Error processing request";
            throw new Error(errorMessage);
        }

        return data.data || data || { success: true };
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
};

export const useGetItems = <T>(relativeUrl: string, params?: Record<string, string>, placeholder?: T[]) => {
    return useQuery<T[]>({
        placeholderData: placeholder,
        queryFn: async () => {
            const url = new URL(`${baseURL}${relativeUrl}`);
            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value) url.searchParams.append(key, value);
                });
            }
            const response = await axiosInstance.get<T[]>(url.toString());
            return response.data;
        },
        queryKey: [relativeUrl, params],
    });
};

// export const useGetItem = <T>(
//     relativeUrl: string,
//     id?: id,
//     placeholder?: any
// ) => {
//     return useQuery<T>({
//         placeholderData: placeholder,
//         queryFn: async () => await getItem(relativeUrl, id),
//         queryKey: [relativeUrl, id],
//     });
// };


export const useGetItem = <T>(
    relativeUrl: string,
    id?: id,
    placeholder?: any,
    options?: any
) => {
    return useQuery<T>({
        placeholderData: placeholder,
        queryFn: async () => await getItem(relativeUrl, id),
        queryKey: [relativeUrl, id],
        ...(options || {}),
    });
};


/**
 * Hook for fetching paginated data with cursor-based pagination
 * Supports automatic fetching of all pages or manual pagination
 * @param relativeUrl - The API endpoint
 * @param options - Pagination options
 * @returns React Query result with paginated data
 */
export const useGetPaginatedItem = <T>({
    relativeUrl,
    limit = 20,
    cursor,
    page = 1,
    search,
    autoFetchAll = false,
    enabled = true,
    placeholder,
    queryParams,
}: {
    relativeUrl: string;
    limit?: number;
    cursor?: string | null;
    page?: number;
    search?: string;
    autoFetchAll?: boolean;
    enabled?: boolean;
    placeholder?: any;
    queryParams?: Record<string, string>;
}) => {
    const buildUrl = (cursor?: string | null, pageNumber?: number) => {
        let url = relativeUrl;
        const params = new URLSearchParams();

        if (limit) params.append('limit', limit.toString());
        if (pageNumber) params.append('page', pageNumber.toString());
        if (cursor) params.append('cursor', cursor);
        if (search) params.append('search', search);
        
        // Add custom query parameters
        if (queryParams) {
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });
        }

        const queryString = params.toString();
        if (queryString) {
            url += url.includes('?') ? `&${queryString}` : `?${queryString}`;
        }

        return url;
    };

    // When autoFetchAll is true, return all data as a flat array
    if (autoFetchAll) {
        // console.log('useGetPaginatedItem - autoFetchAll mode enabled for:', relativeUrl);

        return useQuery<T[]>({
            placeholderData: placeholder,
            queryKey: [relativeUrl, 'all', limit, search],
            queryFn: async () => {

                const fetchAllPages = async (
                    currentData: T[] = [],
                    currentCursor?: string | null,
                    currentPage: number = 1
                ): Promise<T[]> => {
                    const url = buildUrl(currentCursor, currentPage);
                    const response = await axiosInstance.get(url);
                    const data = response.data;

                    const pageData = Array.isArray(data)
                        ? data
                        : Array.isArray(data?.data)
                            ? data.data
                            : Array.isArray(data?.data?.data)
                                ? data.data.data
                                : [];

                    const allData = [...currentData, ...pageData];

                    if (data?.hasMore && data?.nextCursor) {
                        return fetchAllPages(allData, data.nextCursor, currentPage + 1);
                    }

                    const meta = data?.meta || data?.data?.meta;
                    if (meta?.totalPages && currentPage < meta.totalPages) {
                        return fetchAllPages(allData, null, currentPage + 1);
                    }

                    return allData;
                };

                const result = await fetchAllPages();
                // console.log('useGetPaginatedItem - Fetch complete, total records:', result.length);
                return result;
            },
            enabled: enabled,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
        });
    }

    // When autoFetchAll is false, return paginated data with metadata
    return useQuery<{
        data: T[];
        currentRecords: number;
        totalRecords: number;
        hasMore: boolean;
        hasPrevious: boolean;
        nextCursor: string | null;
        previousCursor: string | null;
    }>({
        placeholderData: placeholder,
        queryKey: [relativeUrl, 'paginated', limit, page, cursor, search, queryParams],
        queryFn: async () => {
            // Build URL with query parameters
            const params = new URLSearchParams();
            if (limit) params.append('limit', limit.toString());
            if (page) params.append('page', page.toString());
            if (cursor) params.append('cursor', cursor);
            if (search) params.append('search', search);

            const queryString = params.toString();
            const url = `${relativeUrl}${queryString ? '?' + queryString : ''}`;

            // Use axiosInstance for the request
            const response = await axiosInstance.get(url);
            return response.data;
        },
        enabled,
        staleTime: 0, // Immediate staleness for manual pagination
        refetchOnWindowFocus: false, // Don't refetch on window focus
        refetchOnMount: false, // Don't auto-refetch on mount for manual pagination
    });
};

/**
 * Helper to extract data array from paginated response or return array directly
 * This provides backward compatibility for components expecting arrays
 */
export const extractDataArray = <T>(response: T[] | { data: T[]; currentRecords: number; totalRecords: number; hasMore: boolean; hasPrevious: boolean; nextCursor: string | null; previousCursor: string | null } | undefined): T[] => {
    if (!response) {
        return [];
    }
    if (Array.isArray(response)) {
        return response;
    }
    if (response && 'data' in response && Array.isArray(response.data)) {
        return response.data;
    }
    return [];
};

/**
 * A specialized hook for fetching an item by ID
 * This makes the ID parameter explicit and required, unlike useGetItem where it's optional
 * @param resourcePath - The base resource path (e.g., '/products', '/users')
 * @param itemId - The ID of the item to fetch
 * @param placeholder - Optional placeholder data
 * @returns A React Query result with the requested item
 */

export const useGetItemById = <T>(
    resourcePath: string,
    itemId: string | number,
    placeholder?: any
) => {
    // Normalize the resourcePath to ensure correct URL construction
    const normalizedPath = resourcePath.startsWith('/') ? resourcePath : `/${resourcePath}`;

    // Remove trailing slash if present
    const cleanPath = normalizedPath.endsWith('/') ? normalizedPath.slice(0, -1) : normalizedPath;

    return useQuery<T>({
        placeholderData: placeholder,
        queryFn: async () => {
            // console.log(`Fetching item by ID: ${itemId} from path: ${cleanPath}`);
            const result = await getItem(cleanPath, itemId);
            return result;
        },
        queryKey: [cleanPath, 'item', itemId],
        enabled: !!itemId, // Only enable the query if an ID is provided
    });
};

export const useCreateItem = <T>(
    relativeUrl: string,
    successMessage?: string,
    onSuccessFn?: (data: any) => Promise<any>,
    isFormData?: boolean, // is form / multipart data
    showSuccessAlert: boolean = false,
    showErrorAlert: boolean = true
) => {
    const queryClient = useQueryClient();
    // const { showSuccess, showError } = useAlert();

    // console.log(relativeUrl, "Relative url in useCreateItem")

    return useMutation({
        mutationFn: async (payload: Record<string, any>) =>
            await createItem(relativeUrl, payload, isFormData),
        async onSuccess(data, variables, context) {
            // console.log({ data, variables, context });
            // Invalidate the primary query and its paginated version
            await queryClient.invalidateQueries({ queryKey: [relativeUrl] });

            // Invalidate any queries that start with the same base path
            await queryClient.invalidateQueries({
                predicate: (query) => {
                    const queryKey = query.queryKey[0];
                    if (typeof queryKey === 'string') {
                        return queryKey.startsWith(relativeUrl.split('?')[0]);
                    }
                    return false;
                }
            });

            onSuccessFn && (await onSuccessFn(data));
            const msg = successMessage ? successMessage : "Item created successfully";
            if (showSuccessAlert) {
                toast.success(msg);

            }
        },
        onError(error, variables, context) {
            // console.log({ error, variables, context });
            if (showErrorAlert) {
                toast.error(
                    error?.message ||
                    "An error occurred while submitting your request. Please try again."
                );
            }
        },
    });
};

export const useUpdateItem = <T>(
    relativeUrl: string,
    successMessage?: string,
    onSuccessFn?: (data: any) => Promise<any>,
    isFormData?: boolean, // is form / multipart data
    showSuccessAlert: boolean = true,
    showErrorAlert: boolean = true
) => {
    const queryClient = useQueryClient();
    // const { showSuccess, showError } = useAlert();

    return useMutation({
        mutationFn: async (payload: Record<string, any>) =>
            await updateItem(relativeUrl, payload, isFormData),
        async onSuccess(data, variables, context) {
            // console.log({ data, variables, context });
            // Invalidate the primary query and its paginated version
            await queryClient.invalidateQueries({ queryKey: [relativeUrl] });

            // Invalidate any queries that start with the same base path
            await queryClient.invalidateQueries({
                predicate: (query) => {
                    const queryKey = query.queryKey[0];
                    if (typeof queryKey === 'string') {
                        return queryKey.startsWith(relativeUrl.split('?')[0].split('/').slice(0, -1).join('/'));
                    }
                    return false;
                }
            });

            onSuccessFn && (await onSuccessFn(data));
            const msg = successMessage ? successMessage : "Item updated successfully";
            if (showSuccessAlert) {
                toast.success(msg);
            }
        },
        onError(error, variables, context) {
            // console.log({ error, variables, context });
            if (showErrorAlert) {
                toast.error(
                    error?.message ||
                    "An error occurred while submitting your request. Please try again."
                );
            }
        },
    });
};

export const useCreateMultipleItems = <T>(
    relativeUrl: string,
    successMessage?: string,
    onSuccessFn?: (data: any) => Promise<any>,
    isFormData?: boolean, // is form / multipart data
    showSuccessAlert: boolean = false,
    showErrorAlert: boolean = true
) => {
    const queryClient = useQueryClient();
    // const { showSuccess, showError } = useAlert();

    return useMutation({
        mutationFn: async (payloadList: Record<string, any>[]) => {
            const res = await Promise.all(
                payloadList?.map(async (payload) => {
                    return createItem(relativeUrl, payload, isFormData);
                })
            );
            return res;
        },
        async onSuccess(data, variables, context) {
            // console.log({ data, variables, context });
            // Invalidate the primary query and its paginated version
            await queryClient.invalidateQueries({ queryKey: [relativeUrl] });

            // Invalidate any queries that start with the same base path
            await queryClient.invalidateQueries({
                predicate: (query) => {
                    const queryKey = query.queryKey[0];
                    if (typeof queryKey === 'string') {
                        return queryKey.startsWith(relativeUrl.split('?')[0]);
                    }
                    return false;
                }
            });

            onSuccessFn && (await onSuccessFn(data));
            const msg = successMessage ? successMessage : "Items created successfully";
            if (showSuccessAlert)
                toast.success(msg);
            // showSuccess(msg);
        },
        onError(error, variables, context) {
            // console.log({ error, variables, context });
            if (showErrorAlert) {
                toast.error(
                    error?.message ||
                    "An error occurred while submitting your request. Please try again."
                );
            }
        },
    });
};

export const useDeleteItem = <T>(
    relativeUrl: string,
    successMessage?: string,
    showSuccessAlert: boolean = false,
    showErrorAlert: boolean = true
) => {
    const queryClient = useQueryClient();
    // const { showSuccess, showError } = useAlert();

    return useMutation({
        mutationFn: async (id?: id) => await deleteItem(relativeUrl, id),
        async onSuccess(data, variables, context) {
            // console.log({ data, variables, context });
            // Invalidate the primary query and its paginated version
            await queryClient.invalidateQueries({ queryKey: [relativeUrl] });

            // Invalidate any queries that start with the same base path
            await queryClient.invalidateQueries({
                predicate: (query) => {
                    const queryKey = query.queryKey[0];
                    if (typeof queryKey === 'string') {
                        return queryKey.startsWith(relativeUrl.split('?')[0].split('/').slice(0, -1).join('/'));
                    }
                    return false;
                }
            });

            const msg = successMessage ? successMessage : "Item deleted successfully";
            if (showSuccessAlert)
                toast.success(msg);

        },
        onError(error, variables, context) {
            // console.log({ error, variables, context });
            if (showErrorAlert) {
                toast.error(
                    error?.message ||
                    "An error occurred while submitting your request. Please try again."
                );
            }
        },
    });
};
