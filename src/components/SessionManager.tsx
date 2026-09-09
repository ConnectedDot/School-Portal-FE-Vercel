import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setTokenExpirationHandler } from '@/axios-Instance';
import { PublicPaths } from '@/router/paths';

/**
 * SessionManager Component
 * 
 * Handles token expiration detection and navigation.
 * Must be rendered inside Router context.
 * 
 * This component sets up the global token expiration handler
 * that redirects users to the session expired page when their
 * authentication token expires.
 */
export const SessionManager = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Register token expiration handler with axios interceptor
        setTokenExpirationHandler(() => {
            // console.log('Token expired - navigating to session expired page');
            navigate(PublicPaths.SESSION_EXPIRED, { replace: true });
        });

        // Cleanup function (though the handler persists across component lifecycle)
        return () => {
            // Handler remains registered for app lifetime
            // console.log('SessionManager cleanup');
        };
    }, [navigate]);

    // This component doesn't render anything
    return null;
};
