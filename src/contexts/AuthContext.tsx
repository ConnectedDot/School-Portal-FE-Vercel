import React, { createContext, useEffect, useState, useMemo, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getUserItem, setUserItem } from "../storage";
import { queryKeys } from "@/react-query/constants";
import { axiosInstance } from "@/axios-Instance";
import type { User } from "@/types";

export type userProps = User | undefined;

export type ChildProps = {
    children: React.ReactNode;
};

export const AuthContext = createContext({
    user: undefined as userProps | undefined,
    token: undefined as string | undefined,
    isAuthenticated: false,
    authenticate: async (_token: string) => { },
    logout: () => { },
    updateUser: async (_data: userProps) => { },
    // verifyToken: async (token: string) => false as boolean,
});

export type AuthContextType = {
    user: userProps | undefined;
    token: string | undefined;
    isAuthenticated: boolean;
    authenticate: (token: string) => Promise<void>;
    logout: () => void;
    updateUser: (data: userProps) => Promise<void>;
    // verifyToken: (token: string) => Promise<boolean>;
};

function AuthContextProvider({ children }: ChildProps) {
    const [authToken, setAuthToken] = useState<string | undefined>(undefined);
    const [user, setUser] = useState<userProps | undefined>(undefined);
    const queryClient = useQueryClient();

    // let navigation: NavigationProp<RootStackParamList> | undefined;
    // try {
    //     navigation = useNavigation<NavigationProp<RootStackParamList>>();
    // } catch (error) {
    //     navigation = undefined;
    // }

    // const { data: userProfile, isSuccess } = useGetUserProfile({
    //     enabled: isInitialized && !!authToken
    // });

    // const fetchTokenAndUser = async () => {
    //     try {
    //         const token = await getUserItem("token");
    //         if (token) {
    //             setAuthToken(token);
    //         }

    //         const userData = await getUserItem("user_data");
    //         if (userData) {
    //             setUser(userData);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching auth data:", error);
    //     } finally {
    //         setIsInitialized(true);
    //     }
    // };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userToken = await getUserItem("token");
                const userData = await getUserItem("user_data");
                
                // console.log('Fetched from storage:', { userToken, userData });
                
                if (userToken) {
                    setAuthToken(userToken);
                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
                }
                
                if (userData) {
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error loading auth data from storage:', error);
            }
        };
        fetchUserData();
    }, []);

    const logout = useCallback(async () => {
        setUserItem("token", null);
        setUserItem("user_data", null);

        // Reset subscription alert flag on logout
        // await resetSubscriptionAlertFlag();

        setUser(undefined);
        setAuthToken(undefined);

        queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
        queryClient.clear();

        // if (navigation) {
        //     try {
        //         navigation.reset({
        //             index: 0,
        //             routes: [{ name: 'Login' } as any],
        //         });
        //     } catch (error) {
        //         console.error('Failed to reset navigation', error);
        //     }
        // }
    }, [queryClient]);

    // useEffect(() => {
    //     fetchTokenAndUser();

    //     // Register the token expiration handler with axios interceptor
    //     setTokenExpirationHandler(() => {
    //         logout();
    //     });

    //     // Register the subscription expired handler
    //     // setSubscriptionExpiredHandler(() => {
    //     //     if (navigation) {
    //     //         navigation.dispatch(
    //     //             CommonActions.navigate({
    //     //                 name: 'SubscriptionPlans'
    //     //             })
    //     //         );
    //     //     }
    //     // });
    // }, [logout]);

    const authenticate = useCallback(async (token: string) => {
        setAuthToken(token);
        await setUserItem("token", token);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // console.log('Token authenticated and saved:', token);
    }, []);

    const updateUser = useCallback(async (data: userProps) => {
        setUser(data);
        await setUserItem("user_data", data);
        // console.log('User data updated and saved:', data);
    }, []);

    // const verifyToken = useCallback(async (token: string): Promise<boolean> => {
    //     try {
    //         if (!token) return false;

    //         const response = await axiosInstance.get('/users/profile');
    //         if (response.status === 200) {
    //             if (response.data) {
    //                 updateUser(response.data);
    //             }
    //             return true;
    //         }

    //         return false;
    //     } catch (error) {
    //         if (isInitialized) {
    //             console.error("Token validation failed:", error);
    //         }

    //         if (isInitialized) {
    //             logout();
    //         }
    //         return false;
    //     }
    // }, [isInitialized, updateUser, logout]);

    const value = useMemo(() => ({
        user: user,
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout,
        updateUser,
        // verifyToken,
    }), [user, authToken, authenticate, logout, updateUser, 
        // verifyToken
    ]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
