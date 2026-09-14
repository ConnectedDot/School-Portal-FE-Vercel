import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AdnPaths } from '../../../router/paths';
import { mockStudents } from '../../../utils/mockData';
import type { Student } from '../../../types';
import { Loader } from '../../../components/common/Loader';
import {
    User,
    Mail,
    Phone,
    Calendar,
    GraduationCap,
    MapPin,
    Edit,
    ArrowLeft,
    BookOpen,
    Award,
    Users,
    Clock
} from 'lucide-react';
import { formatEnumLabel, parseStudentLevel } from '@/lib/data-parser';
import { useGetStudents } from '@/hooks/students';

const StudentView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: availableStudents, isLoading } = useGetStudents();
    // const navigate = useNavigate();
    // Try to get student from location state first
    const [student, setStudent] = useState<Student | null>(() => {
        // @ts-ignore
        const stateStudent = window.history.state?.usr?.student;
        if (stateStudent) {
            // Flatten profile fields into student for compatibility
            return {
                ...stateStudent,
                ...stateStudent.profile,
                firstName: stateStudent.profile?.firstName || '',
                lastName: stateStudent.profile?.lastName || '',
                avatar: stateStudent.profile?.avatar || '',
                grade: stateStudent.profile?.studentLevel || '',
                class: stateStudent.profile?.department || '',
                phone: stateStudent.profile?.phone || '',
                address: stateStudent.profile?.address || '',
            };
        }
        return null;
    });

    useEffect(() => {
        if (student || !availableStudents || !id) return;
        const match = availableStudents.find((item: any) => item.id === id || item.userId === id);
        if (match) {
            setStudent({
                ...match,
                ...match.profile,
                firstName: match.firstName || match.profile?.firstName || '',
                lastName: match.lastName || match.profile?.lastName || '',
                avatar: match.avatar || match.profile?.avatar || '',
                grade: match.studentLevel || match.profile?.studentLevel || '',
                class: match.department || match.profile?.department || '',
                phone: match.phone || match.profile?.phone || '',
            } as Student);
        }
    }, [availableStudents, id, student]);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     // Simulate fetching student data
    //     const fetchStudent = async () => {
    //         setLoading(true);
    //         try {
    //             // TODO: Replace with actual API call
    //             await new Promise(resolve => setTimeout(resolve, 500));

    //             const foundStudent = mockStudents.find(s => s.id === id);
    //             if (foundStudent) {
    //                 setStudent(foundStudent);
    //             } else {
    //                 alert('Student not found');
    //                 navigate(AdnPaths.STUDENTS);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching student:', error);
    //             alert('Error loading student data');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchStudent();
    // }, [id, navigate]);

    // No need for sections structure with shadcn components

    // if (loading) {
    //     return (
    //         <div className="flex items-center justify-center min-h-96">
    //             <Loader />
    //         </div>
    //     );
    // }

    if (!student && isLoading) {
        return (
            <div className="flex min-h-96 flex-col items-center justify-center gap-3" role="status" aria-live="polite">
                <Loader />
                <p className="text-sm text-muted-foreground">Loading student profile…</p>
            </div>
        );
    }

    if (!student) {
        return (
            <Card>
                <CardContent className="p-12 text-center">
                    <p className="text-muted-foreground mb-4">Student not found</p>
                    <Button
                        onClick={() => navigate(-1)}
                        className="gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to={AdnPaths.DASH} className="hover:text-foreground transition-colors">
                    Dashboard
                </Link>
                <span>/</span>
                <Link to={AdnPaths.STUDENTS} className="hover:text-foreground transition-colors">
                    Students
                </Link>
                <span>/</span>
                <span className="text-foreground font-medium">
                    {student.firstName} {student.lastName}
                </span>
            </div>

            {/* Header with Actions */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20 border-2 border-border">
                                <AvatarImage
                                    src={student.avatar}
                                    alt={`${student.firstName} ${student.lastName}`}
                                />
                                <AvatarFallback className="text-lg">
                                    {student.firstName[0]}{student.lastName[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {student.firstName} {student.lastName}
                                </h1>
                                <p className="text-muted-foreground mt-1 flex items-center gap-2">
                                    {/* <Badge variant="secondary">ID: {student.id}</Badge> */}
                                    <span>•</span>
                                    <Badge variant="outline">Grade {parseStudentLevel(student.grade)}</Badge>
                                    <span>•</span>
                                    <Badge variant="outline">Department {formatEnumLabel(student.class)}</Badge>
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Link to={`${AdnPaths.ROOT}/students/${student.id}/edit`} state={{ student }}>
                            {/* <Link to={AdnPaths.STUDENTS_EDIT.replace(':id', student.id)} state={{ student }}> */}
                                <Button className="gap-2 text-foreground">
                                    <Edit className="h-4 w-4" />
                                    Edit Student
                                </Button>
                            </Link>
                            <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                               Go Back
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Student Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Student ID</Label>
                                <div className="mt-1">
                                    <Badge variant="secondary">{student.studentId}</Badge>
                                </div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Role</Label>
                                <div className="mt-1">
                                    <Badge variant="outline">{student.role.toUpperCase()}</Badge>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">First Name</Label>
                                <Input value={student.firstName} readOnly className="mt-1" />
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Last Name</Label>
                                <Input value={student.lastName} readOnly className="mt-1" />
                            </div>
                        </div>

                        <div>
                            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                Date of Birth
                            </Label>
                            <Input value={student.dateOfBirth} readOnly className="mt-1" />
                        </div>

                        <div>
                            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Email Address
                            </Label>
                            <Input value={student.email} readOnly className="mt-1" />
                        </div>

                        <div>
                            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Phone Number
                            </Label>
                            <Input value={student.phone || 'N/A'} readOnly className="mt-1" />
                        </div>
                    </CardContent>
                </Card>

                {/* Academic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Academic Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Current Grade</Label>
                                <div className="mt-1">
                                    <Badge variant="outline" className="gap-1">
                                        <BookOpen className="h-3 w-3" />
                                        Grade {student.grade}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-muted-foreground">Class</Label>
                                <div className="mt-1">
                                    <Badge variant="outline" className="gap-1">
                                        <Users className="h-3 w-3" />
                                        Class {student.class}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Enrolled Since
                            </Label>
                            <Input
                                value={new Date(student.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                                readOnly
                                className="mt-1"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Contact Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label className="text-sm font-medium text-muted-foreground">Address</Label>
                            <Textarea
                                value={student.address || 'No address provided'}
                                readOnly
                                className="mt-1 resize-none"
                                rows={3}
                            />
                        </div>

                        <div>
                            <Label className="text-sm font-medium text-muted-foreground">Guardian ID</Label>
                            <Input value={student.guardianId || 'N/A'} readOnly className="mt-1" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6 text-center">
                        <Award className="h-8 w-8 mx-auto mb-3 text-primary" />
                        <h3 className="text-lg font-semibold mb-2">Academic Performance</h3>
                        <div className="text-3xl font-bold text-primary mb-1">B+</div>
                        <p className="text-sm text-muted-foreground">Overall GPA</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 text-center">
                        <Clock className="h-8 w-8 mx-auto mb-3 text-green-600" />
                        <h3 className="text-lg font-semibold mb-2">Attendance</h3>
                        <div className="text-3xl font-bold text-green-600 mb-1">94%</div>
                        <p className="text-sm text-muted-foreground">This Semester</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 text-center">
                        <BookOpen className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                        <h3 className="text-lg font-semibold mb-2">Courses Enrolled</h3>
                        <div className="text-3xl font-bold text-blue-600 mb-1">6</div>
                        <p className="text-sm text-muted-foreground">Active Courses</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3 pb-4 border-b last:border-0">
                            <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                            <div>
                                <p className="text-sm font-medium">Submitted Assignment: Math Calculus</p>
                                <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 pb-4 border-b last:border-0">
                            <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                            <div>
                                <p className="text-sm font-medium">Attended: Physics Lab Session</p>
                                <p className="text-xs text-muted-foreground">1 day ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 pb-4 border-b last:border-0">
                            <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500" />
                            <div>
                                <p className="text-sm font-medium">Grade Updated: English Literature - A</p>
                                <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StudentView;
