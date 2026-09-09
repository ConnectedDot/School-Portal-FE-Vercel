import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/types';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { ShieldAlert, ArrowLeft, Home, LogOut, AlertCircle } from 'lucide-react';
import { AdnPaths, FcyPaths, SdtPaths, GdnPaths, PublicPaths } from '@/router/paths';

export const Unauthorized = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGoToDashboard = () => {
        if (!user) {
            navigate(PublicPaths.LOGIN);
            return;
        }

        // Navigate to user's appropriate dashboard
        switch (user.role) {
            case UserRole.ADMIN:
                navigate(AdnPaths.DASH);
                break;
            case UserRole.FACULTY:
                navigate(FcyPaths.DASH);
                break;
            case UserRole.STUDENT:
                navigate(SdtPaths.DASH);
                break;
            case UserRole.GUARDIAN:
                navigate(GdnPaths.DASH);
                break;
            default:
                navigate(PublicPaths.LOGIN);
        }
    };

    const handleLogout = () => {
        logout();
        navigate(PublicPaths.LOGIN);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl shadow-2xl">
                <CardHeader className="text-center space-y-4 pb-8">
                    <div className="mx-auto w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
                        <ShieldAlert className="h-10 w-10 text-destructive" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold text-destructive">
                            403 - Access Denied
                        </CardTitle>
                        <CardDescription className="text-base mt-3">
                            You don't have permission to access this resource
                        </CardDescription>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Explanation */}
                    <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                                <h3 className="font-semibold text-foreground mb-2">Why am I seeing this?</h3>
                                <p className="text-sm text-muted-foreground">
                                    The page or resource you're trying to access requires specific permissions 
                                    that your current user role does not have. This is not a session or login issue.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* User Info */}
                    {user && (
                        <div className="border rounded-lg p-4 space-y-2">
                            <p className="text-sm text-muted-foreground">Current Session:</p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{user.email || user.firstName + ' ' + user.lastName}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {user.firstName} {user.lastName}
                                    </p>
                                </div>
                                <Badge variant="secondary" className="capitalize">
                                    {user.role}
                                </Badge>
                            </div>
                        </div>
                    )}

                    {/* What to do */}
                    <div className="border-l-4 border-primary pl-4 py-2">
                        <h3 className="font-semibold text-foreground mb-2">What can I do?</h3>
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Go back to the previous page</li>
                            <li>• Return to your dashboard</li>
                            <li>• Contact an administrator if you believe you should have access</li>
                        </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3 pt-4">
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={handleGoBack}
                                className="flex-1"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Go Back
                            </Button>
                            <Button
                                onClick={handleGoToDashboard}
                                className="flex-1"
                            >
                                <Home className="mr-2 h-4 w-4" />
                                My Dashboard
                            </Button>
                        </div>

                        <div className="pt-2 border-t">
                            <Button
                                variant="ghost"
                                onClick={handleLogout}
                                className="w-full"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    </div>

                    {/* Help Text */}
                    <p className="text-xs text-center text-muted-foreground pt-2">
                        If you believe you should have access to this resource, please contact your system administrator
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Unauthorized;
