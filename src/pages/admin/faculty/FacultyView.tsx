import { useNavigate, useParams } from 'react-router-dom';
import { AdnPaths } from '../../../router/paths';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Mail, Phone, Calendar, User, BookOpen, GraduationCap, Briefcase } from 'lucide-react';
import { useGetTeacher } from '@/hooks/teachers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

const FacultyView = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    const { data: teacher, isLoading, error } = useGetTeacher(id!);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !teacher) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <p className="text-muted-foreground">Failed to load faculty member details</p>
                <Button variant="outline" onClick={() => navigate(AdnPaths.FACULTY)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Faculty List
                </Button>
            </div>
        );
    }

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(-1)}
                        // onClick={() => navigate(AdnPaths.FACULTY)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Faculty Details</h1>
                        <p className="text-muted-foreground text-sm">
                            View complete information about this faculty member
                        </p>
                    </div>
                </div>
                <Button
                    onClick={() => navigate(`${AdnPaths.FACULTY}/${id}/edit`)}
                    className="flex items-center gap-2"
                >
                    <Edit className="h-4 w-4" />
                    Edit Details
                </Button>
            </div>

            {/* Profile Card */}
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col items-center space-y-4">
                            <Avatar className="h-32 w-32">
                                <AvatarImage src={teacher.profilePicture} alt={`${teacher.firstName} ${teacher.lastName}`} />
                                <AvatarFallback className="text-2xl">
                                    {getInitials(teacher.firstName, teacher.lastName)}
                                </AvatarFallback>
                            </Avatar>
                            <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'}>
                                {teacher.status || 'Active'}
                            </Badge>
                        </div>
                        <div className="flex-1 space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold">
                                    {teacher.firstName} {teacher.lastName}
                                </h2>
                                <p className="text-muted-foreground">
                                    {teacher.department} • {teacher.specialization}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span>{teacher.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span>{teacher.phoneNumber}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span>
                                        Born: {teacher.dateOfBirth ? new Date(teacher.dateOfBirth).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>{teacher.gender}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Professional Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5" />
                            Professional Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Department:</span>
                            </div>
                            <p className="text-sm text-muted-foreground pl-6">{teacher.department}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Specialization:</span>
                            </div>
                            <p className="text-sm text-muted-foreground pl-6">{teacher.specialization}</p>
                        </div>
                        {teacher.qualification && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Qualification:</span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-6">{teacher.qualification}</p>
                            </div>
                        )}
                        {teacher.experience && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Experience:</span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-6">{teacher.experience}</p>
                            </div>
                        )}
                        {teacher.joiningDate && (
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium">Joining Date:</span>
                                </div>
                                <p className="text-sm text-muted-foreground pl-6">
                                    {new Date(teacher.joiningDate).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Contact & Address */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <span className="text-sm font-medium">Email Address:</span>
                            <p className="text-sm text-muted-foreground">{teacher.email}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-sm font-medium">Phone Number:</span>
                            <p className="text-sm text-muted-foreground">{teacher.phoneNumber}</p>
                        </div>
                        <div className="space-y-2">
                            <span className="text-sm font-medium">Address:</span>
                            <p className="text-sm text-muted-foreground">{teacher.address}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* System Information */}
            <Card>
                <CardHeader>
                    <CardTitle>System Information</CardTitle>
                    <CardDescription>Account and registration details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <span className="text-sm font-medium">Teacher ID:</span>
                            <p className="text-sm text-muted-foreground">{teacher.id}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-sm font-medium">Role:</span>
                            <p className="text-sm text-muted-foreground">{teacher.role || 'FACULTY'}</p>
                        </div>
                        <div className="space-y-1">
                            <span className="text-sm font-medium">Account Status:</span>
                            <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'}>
                                {teacher.status || 'Active'}
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default FacultyView;
