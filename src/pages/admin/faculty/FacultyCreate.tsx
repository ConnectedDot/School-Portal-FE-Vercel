import { useNavigate } from 'react-router-dom';
import { AdnPaths } from '../../../router/paths';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useCreateTeacher } from '@/hooks/teachers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { TeacherData } from '@/types/teachers';



const FacultyCreate = () => {
    const navigate = useNavigate();
    const { mutate: createTeacher, isPending } = useCreateTeacher(
        async () => {
            navigate(AdnPaths.FACULTY);
        }
    );

       const [formData, setFormData] = useState<TeacherData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: 'MALE',
        employmentType: "FULL_TIME",
        // address: '',
        // department: '',
        // specialization: '',
        qualification: '',
        // experience: '',
        // joiningDate: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createTeacher(formData);
    };

    const handleCancel = () => {
        navigate(AdnPaths.FACULTY);
    };

    const handleChange = (field: keyof TeacherData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

//       const handleChange = (name: any, value: any) => {
//     setFormData({ ...formData, [name]: value });
//   };

    return (
        <div className="space-y-4">
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
                        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <UserPlus className="h-6 w-6" />
                            Add New Faculty Member
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Register a new teacher or faculty member in the system
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Faculty Information</CardTitle>
                        <CardDescription>
                            Fill in the details below to register a new faculty member
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name *</Label>
                                    <Input
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={(e) => handleChange('firstName', e.target.value)}
                                        placeholder="Enter first name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name *</Label>
                                    <Input
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={(e) => handleChange('lastName', e.target.value)}
                                        placeholder="Enter last name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        placeholder="teacher@school.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                                    <Input
                                        id="phoneNumber"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        placeholder="+234 XXX XXX XXXX"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                                    <Input
                                        id="dateOfBirth"
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gender">Gender *</Label>
                                    <Select
                                        value={formData.gender}
                                        onValueChange={(value) => handleChange('gender', value)}
                                    >
                                        <SelectTrigger id="gender">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="MALE">Male</SelectItem>
                                            <SelectItem value="FEMALE">Female</SelectItem>
                                            <SelectItem value="OTHER">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* <div className="space-y-2">
                                    <Label htmlFor="joiningDate">Joining Date *</Label>
                                    <Input
                                        id="joiningDate"
                                        type="date"
                                        value={formData.joiningDate}
                                        onChange={(e) => handleChange('joiningDate', e.target.value)}
                                        required
                                    />
                                </div> */}
                            </div>
                            {/* <div className="space-y-2">
                                <Label htmlFor="address">Address *</Label>
                                <Textarea
                                    id="address"
                                    value={formData.address}
                                    onChange={(e) => handleChange('address', e.target.value)}
                                    placeholder="Enter full address"
                                    required
                                />
                            </div> */}
                        </div>

                        {/* Professional Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Professional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* <div className="space-y-2">
                                    <Label htmlFor="department">Department *</Label>
                                    <Input
                                        id="department"
                                        value={formData.department}
                                        onChange={(e) => handleChange('department', e.target.value)}
                                        placeholder="e.g., Mathematics, Science"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="specialization">Specialization *</Label>
                                    <Input
                                        id="specialization"
                                        value={formData.specialization}
                                        onChange={(e) => handleChange('specialization', e.target.value)}
                                        placeholder="e.g., Algebra, Physics"
                                        required
                                    />
                                </div> */}
                                <div className="space-y-2">
                                    <Label htmlFor="qualification">Highest Qualification *</Label>
                                    <Input
                                        id="qualification"
                                        value={formData.qualification}
                                        onChange={(e) => handleChange('qualification', e.target.value)}
                                        placeholder="e.g., M.Sc., Ph.D."
                                        required
                                    />
                                </div>
                                {/* <div className="space-y-2">
                                    <Label htmlFor="experience">Years of Experience *</Label>
                                    <Input
                                        id="experience"
                                        value={formData.experience}
                                        onChange={(e) => handleChange('experience', e.target.value)}
                                        placeholder="e.g., 5 years"
                                        required
                                    />
                                </div> */}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={isPending}
                            >
                                Cancel
                            </Button>
                            <Button 
                            className='text-foreground'
                            type="submit" 
                            disabled={isPending}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="mr-0 h-4 w-4 " />
                                        Register member
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default FacultyCreate;
