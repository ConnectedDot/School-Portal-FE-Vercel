import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Clock, LogOut, ShieldAlert } from 'lucide-react';
import { PublicPaths } from '@/router/paths';
import { clearUserData } from '@/storage';
import { IonIcon } from '@ionic/react';
import { heart, home, logOut,  } from 'ionicons/icons';


const SessionExpired = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Prevent back/forward navigation
        const preventNavigation = (e: PopStateEvent) => {
            e.preventDefault();
            window.history.pushState(null, '', window.location.pathname);
        };

        // Push a state to prevent back button
        window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', preventNavigation);

        // Cleanup
        return () => {
            window.removeEventListener('popstate', preventNavigation);
        };
    }, []);

    const handleProceed = async () => {
        // Clear all user data
        await clearUserData();

        // Navigate to login
        navigate(PublicPaths.LOGIN, { replace: true });
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl border-2">
                <CardHeader className="text-center space-y-4 pb-8">
                    <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center relative">
                        <Clock className="h-10 w-10 text-destructive" />
                        <div className="absolute -top-1 -right-1 w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-destructive-foreground" />
                        </div>
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold text-destructive">
                            Session Expired
                        </CardTitle>
                        <CardDescription className="text-base mt-3">
                            Your login session has expired for security reasons
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Explanation */}
                    <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                        <div className="flex items-start gap-3">
                            <ShieldAlert className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                            <div className="space-y-2">
                                <h3 className="font-semibold text-foreground">Why did this happen?</h3>
                                <ul className="text-sm text-muted-foreground space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Your authentication token has expired due to inactivity</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Your session timed out for security protection</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Your credentials are no longer valid</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* What to do next */}
                    <div className="border-l-4 border-primary pl-4 py-2">
                        <h3 className="font-semibold text-foreground mb-2">What happens next?</h3>
                        <p className="text-sm text-muted-foreground">
                            Click the button below to securely log out and return to the login page.
                            You'll need to enter your credentials again to continue.
                        </p>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-semibold text-amber-900 dark:text-amber-100 text-sm">
                                    Security Notice
                                </h4>
                                <p className="text-xs text-amber-800 dark:text-amber-200 mt-1">
                                    For your protection, you cannot navigate back. Please proceed to log in again.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        <Button
                            onClick={handleProceed}
                            className="text-foreground w-full h-12 text-base font-semibold"
                            size="lg"
                        >
                            <IonIcon icon={logOut} className="mr-2" style={{ fontSize: '20px' }} />
                            Proceed to Login
                        </Button>
                    </div>

                    {/* Footer Note */}
                    <p className="text-xs text-center text-muted-foreground pt-2">
                        If you continue to experience issues, please contact your system administrator
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default SessionExpired;
