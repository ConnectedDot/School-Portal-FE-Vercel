import type { User, UserRole } from "../types";

// import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// import { AuthLayout } from '../layouts/AuthLayout';
// import { MainLayout } from '../layouts/MainLayout';
import { PublicPaths, } from './paths';
import { MainLayout } from "../layouts/MainLayout";



// Protected Route Component
interface ProtectedRouteProps {
    allowedRoles: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const isAuthenticated = localStorage.getItem('token');
    const userStr = localStorage.getItem('user_data');
    const user: User | null = userStr ? JSON.parse(userStr) : null;

    if (!isAuthenticated || !user) {
        return <Navigate to={PublicPaths.LOGIN} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <MainLayout />;
};