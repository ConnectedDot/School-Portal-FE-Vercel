// import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { UserRole } from '../types';

// Pages
// import { LoginPage } from '../pages/auth/LoginPage';
import { ProtectedRoute } from './ProtectedRoute';
import Unauthorized from '../pages/errors/Unauthorized';
import NotFound from '../pages/errors/NotFound';
import { AdminRouter } from './AdminRouter';
import { FacultyRouter } from './FacultyRouter';
import { StudentRouter } from './StudentRouter';
import { PublicRoutes } from './PublicRoutes';
import { GuardianRouter } from './GuardianRouter';

// Router Configuration
export const router = createBrowserRouter([
    // Public routes (including root and shadcn test page)
    {
        path: '/*',
        element: <PublicRoutes />,
    },

    // Admin routes
    {
        path: '/adn',
        element: <ProtectedRoute allowedRoles={[UserRole.ADMIN]} />,
        children: [
            {
                path: '*',
                element: <AdminRouter />,
            },
        ],
    },

    // Faculty routes
    {
        path: '/fcy/*',
        element: <ProtectedRoute allowedRoles={[UserRole.FACULTY]} />,
        children: [
            {
                path: '*',
                element: <FacultyRouter />,
            },
        ],
    },

    // Student routes
    {
        path: '/sdt/*',
        element: <ProtectedRoute allowedRoles={[UserRole.STUDENT]} />,
        children: [
            {
                path: '*',
                element: <StudentRouter />,
            },
        ],
    },

    // Guardian routes
    {
        path: '/gdn/*',
        element: <ProtectedRoute allowedRoles={[UserRole.GUARDIAN]} />,
        children: [
            {
                path: '*',
                element: <GuardianRouter />,
            },
        ],
    },

    // Error routes
    {
        path: '/unauthorized',
        element: <Unauthorized />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);
