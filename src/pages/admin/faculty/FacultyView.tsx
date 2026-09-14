import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Briefcase, Edit, Landmark, Loader2, ShieldCheck, UserRound } from 'lucide-react';
import { AdnPaths } from '@/router/paths';
import { useGetTeacher } from '@/hooks/teachers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatEnumLabel, formatFullName, getInitials } from '@/lib/data-parser';

const Value = ({ label, value }: { label: string; value?: React.ReactNode }) => (
    <div className="rounded-2xl bg-muted/35 p-4 ring-1 ring-inset ring-border/25">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div className="mt-1.5 break-words text-sm font-semibold">{value ?? 'Not provided'}</div>
    </div>
);

export default function FacultyView() {
    const navigate = useNavigate();
    const { id = '' } = useParams<{ id: string }>();
    const { data: teacher, isLoading, error } = useGetTeacher(id);

    if (isLoading) return <div className="flex min-h-96 flex-col items-center justify-center gap-3" role="status"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="text-sm text-muted-foreground">Loading faculty details…</p></div>;
    if (error || !teacher) return <div className="flex min-h-96 flex-col items-center justify-center gap-4"><p className="text-muted-foreground">Faculty details could not be loaded.</p><Button variant="outline" onClick={() => navigate(AdnPaths.FACULTY)}><ArrowLeft className="mr-2 h-4 w-4" />Back to Faculty</Button></div>;

    const name = formatFullName(teacher);
    const email = teacher.user?.email || teacher.email;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4"><Button variant="outline" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button><div><h1 className="text-2xl font-bold">Faculty Details</h1><p className="text-sm text-muted-foreground">Complete staff and employment information</p></div></div>
                <Button onClick={() => navigate(`${AdnPaths.FACULTY}/${id}/edit`)}><Edit className="mr-2 h-4 w-4" />Edit Details</Button>
            </div>

            <Card className="overflow-hidden border-0 shadow-xl"><div className="h-24 bg-gradient-to-r from-primary/20 via-card to-teal-400/10" /><CardContent className="-mt-10 flex flex-col gap-5 px-6 pb-7 sm:flex-row sm:items-end sm:px-8">
                <Avatar className="h-24 w-24 border-4 border-card shadow-lg"><AvatarImage src={teacher.avatar || undefined} alt={name} /><AvatarFallback className="text-xl font-bold">{getInitials(name)}</AvatarFallback></Avatar>
                <div className="flex-1"><h2 className="text-2xl font-bold">{name}</h2><div className="mt-2 flex flex-wrap gap-2"><Badge variant="secondary">{formatEnumLabel(teacher.status)}</Badge><Badge variant="outline">{formatEnumLabel(teacher.employmentType)}</Badge><Badge variant="outline">{teacher.schoolId || 'No school ID'}</Badge></div></div>
            </CardContent></Card>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="border-0 shadow-lg"><CardHeader><CardTitle className="flex items-center gap-2"><UserRound className="h-5 w-5 text-primary" />Personal & contact</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">
                    <Value label="Email address" value={email} /><Value label="Phone number" value={teacher.phone} /><Value label="Gender" value={formatEnumLabel(teacher.gender)} /><Value label="Date of birth" value={formatDate(teacher.dateOfBirth)} /><Value label="Address" value={teacher.address} /><Value label="Nationality" value={teacher.nationality} /><Value label="State of origin" value={teacher.stateOfOrigin} />
                </CardContent></Card>
                <Card className="border-0 shadow-lg"><CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-teal-400" />Professional information</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">
                    <Value label="Qualification" value={teacher.qualification} /><Value label="Years of experience" value={teacher.yearsOfExperience} /><Value label="Employment type" value={formatEnumLabel(teacher.employmentType)} /><Value label="Courses taught" value={teacher.coursesTaught?.length ?? 0} /><Value label="Certifications" value={teacher.certifications?.length ?? 0} /><Value label="Current academic year" value={teacher.currentAcademicYear?.name} /><Value label="Starting academic year" value={teacher.startAcademicYear?.name} />
                </CardContent></Card>
                <Card className="border-0 shadow-lg"><CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-emerald-400" />Emergency & payroll</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">
                    <Value label="Emergency contact" value={teacher.emergencyContactName} /><Value label="Emergency phone" value={teacher.emergencyContactPhone} /><Value label="Relationship" value={teacher.emergencyContactRelation} /><Value label="Bank name" value={teacher.bankName} /><Value label="Account number" value={teacher.accountNumber} /><Value label="Salary" value={teacher.salary == null ? undefined : Number(teacher.salary).toLocaleString()} />
                </CardContent></Card>
                <Card className="border-0 shadow-lg"><CardHeader><CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5 text-blue-400" />System information</CardTitle></CardHeader><CardContent className="grid gap-3 sm:grid-cols-2">
                    <Value label="Teacher ID" value={teacher.id} /><Value label="User ID" value={teacher.userId || teacher.user?.id} /><Value label="School ID" value={teacher.schoolId} /><Value label="Role" value={formatEnumLabel(teacher.user?.role || 'TEACHER')} /><Value label="Verification" value={teacher.user?.isVerified ? 'Verified' : 'Not verified'} /><Value label="Created" value={formatDate(teacher.createdAt)} />
                </CardContent></Card>
            </div>
        </div>
    );
}
