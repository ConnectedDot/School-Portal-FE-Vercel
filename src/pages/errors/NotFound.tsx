import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AdnPaths, FcyPaths, SdtPaths, GdnPaths, PublicPaths } from '@/router/paths';
import { Home, ArrowLeft, Search, FileQuestion } from 'lucide-react';

export const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleGoHome = () => {
        // Get user from localStorage to navigate to appropriate dashboard
        const userStr = localStorage.getItem('user_data');
        if (userStr) {
            const user = JSON.parse(userStr);
            switch (user.role) {
                case 'ADMINISTRATOR':
                    navigate(AdnPaths.DASH);
                    break;
                case 'FACULTY':
                    navigate(FcyPaths.DASH);
                    break;
                case 'STUDENT':
                    navigate(SdtPaths.DASH);
                    break;
                case 'GUARDIAN':
                    navigate(GdnPaths.DASH);
                    break;
                default:
                    navigate(PublicPaths.LOGIN);
            }
        } else {
            navigate(PublicPaths.LOGIN);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
            <div className="max-w-2xl w-full shadow-2xl border-muted">
                <CardContent className="pt-12 pb-10 px-6 md:px-12">
                    <div className="text-center space-y-8">
                        {/* 404 Icon with Animation */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="w-40 h-40 bg-linear-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                                    <FileQuestion className="w-20 h-20 text-primary animate-pulse" />
                                </div>
                                <div className="absolute top-0 right-0">
                                    <Search className="w-10 h-10 text-muted-foreground opacity-50" />
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-5xl font-extrabold text-primary">
                                   Page Not Found
                                </h1>
                            </div>
                            <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                                Oops! The page you're looking for seems to have gone on vacation.
                                It might have been moved, deleted, or never existed in the first place.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleGoBack}
                                className="gap-2 min-w-40"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Go Back
                            </Button>
                            <Button
                            // variant={'default'}
                                size="lg"
                                onClick={handleGoHome}
                                className="gap-2 min-w-40 text-white"
                            >
                                <Home className="w-4 h-4" />
                                Go to Dashboard
                            </Button>
                        </div>

                        {/* Help Text */}
                        <div className="pt-6 border-t border-muted">
                            <p className="text-sm text-muted-foreground">
                                Need assistance? Contact your system administrator or double-check the URL for any typos.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </div>
        </div>
    );
};

export default NotFound;
