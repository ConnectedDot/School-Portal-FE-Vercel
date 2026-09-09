import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Mail, Phone, Calendar, MapPin, Briefcase, GraduationCap, Loader2, Edit, Save, X } from 'lucide-react';
import { useGetTeacherProfile, useUpdateTeacherProfile } from '@/hooks/teachers';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const TeacherProfile = () => {
    const { data: profile, isLoading, error, refetch } = useGetTeacherProfile();
    const { mutate: updateProfile, isPending } = useUpdateTeacherProfile(
        async () => {
            await refetch();
            setIsEditing(false);
            toast.success('Profile updated successfully');
        }
    );

    console.log(profile, "profile of teacher")

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        qualification: '',
        yearsOfExperience: '',
        stateOfOrigin: '',
        nationality: '',
        bankName: '',
        accountNumber: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',
    });

    // Initialize form data when profile loads
    useState(() => {
        if (profile) {
            setFormData({
                phone: profile.phone || '',
                address: profile.address || '',
                qualification: profile.qualification || '',
                yearsOfExperience: profile.yearsOfExperience || '',
                stateOfOrigin: profile.stateOfOrigin || '',
                nationality: profile.nationality || '',
                bankName: profile.bankName || '',
                accountNumber: profile.accountNumber || '',
                emergencyContactName: profile.emergencyContactName || '',
                emergencyContactPhone: profile.emergencyContactPhone || '',
                emergencyContactRelation: profile.emergencyContactRelation || '',
            });
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
    };

    const handleCancel = () => {
        if (profile) {
            setFormData({
                phone: profile.phone || '',
                address: profile.address || '',
                qualification: profile.qualification || '',
                yearsOfExperience: profile.yearsOfExperience || '',
                stateOfOrigin: profile.stateOfOrigin || '',
                nationality: profile.nationality || '',
                bankName: profile.bankName || '',
                accountNumber: profile.accountNumber || '',
                emergencyContactName: profile.emergencyContactName || '',
                emergencyContactPhone: profile.emergencyContactPhone || '',
                emergencyContactRelation: profile.emergencyContactRelation || '',
            });
        }
        setIsEditing(false);
    };

    if (isLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-12 w-1/3" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="space-y-6">
                <h1 className="text-3xl font-bold text-destructive">Error Loading Profile</h1>
                <p className="text-muted-foreground">Failed to load your profile. Please try again.</p>
                <Button onClick={() => refetch()}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                        <User className="h-8 w-8" />
                        My Profile
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        View and manage your profile information
                    </p>
                </div>
                {!isEditing ? (
                    <Button className='text-foreground' onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleCancel} disabled={isPending}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                        <Button className='text-foreground' onClick={handleSubmit} disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Summary Card */}
                <Card className="lg:col-span-1">
                    <CardHeader className="text-center">
                        <div className="mx-auto w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            {profile.profilePicture ? (
                                <img
                                    src={profile.profilePicture}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-5xl font-bold text-primary">
                                    {profile.firstName?.[0]}{profile.lastName?.[0]}
                                </span>
                            )}
                        </div>
                        <CardTitle className="text-2xl">
                            {profile.firstName} {profile.lastName}
                        </CardTitle>
                        <CardDescription>
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <div className="flex gap-2">
                                    <Badge
                                        variant={profile.employmentType === 'FULL_TIME' ? 'default' : 'outline'}
                                        className="px-3 py-1 text-sm rounded-full"
                                    >
                                        {profile.employmentType === 'FULL_TIME' ? 'Full Time' : 'Part Time'}
                                    </Badge>
                                    <Badge
                                        variant={
                                            profile.status === 'ACTIVE'
                                                ? 'success'
                                                : profile.status === 'PENDING'
                                                ? 'warning'
                                                : 'secondary'
                                        }
                                        className="px-3 py-1 text-sm rounded-full capitalize"
                                    >
                                        {profile.status.toLowerCase()}
                                    </Badge>
                                </div>
                                {profile.department && (
                                    <span className="text-xs text-muted-foreground mt-1">
                                        Department: <span className="font-medium text-foreground">{profile.department}</span>
                                    </span>
                                )}
                            </div>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            {/* Email */}
                            <div className="flex items-center gap-2 text-sm">
                                <span className="bg-muted rounded-full p-2">
                                    <Mail className="h-4 w-4 text-primary" />
                                </span>
                                <span className="font-medium">{profile.user?.email || profile.email}</span>
                            </div>
                            {/* Phone */}
                            {profile.phone && (
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="bg-muted rounded-full p-2">
                                        <Phone className="h-4 w-4 text-primary" />
                                    </span>
                                    <span>{profile.phone}</span>
                                </div>
                            )}
                            {/* Date of Birth */}
                            {profile.dateOfBirth && (
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="bg-muted rounded-full p-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                    </span>
                                    <span>{new Date(profile.dateOfBirth).toLocaleDateString()}</span>
                                </div>
                            )}
                            {/* Gender */}
                            {profile.gender && (
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="bg-muted rounded-full p-2">
                                        <User className="h-4 w-4 text-primary" />
                                    </span>
                                    <span className="capitalize">{profile.gender}</span>
                                </div>
                            )}
                            {/* Nationality */}
                            {profile.nationality && (
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="bg-muted rounded-full p-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                    </span>
                                    <span>{profile.nationality}</span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Details */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>
                            {isEditing ? 'Update your profile information' : 'Your current profile information'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Contact Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Phone className="h-5 w-5" />
                                    Contact Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Enter address"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="stateOfOrigin">State of Origin</Label>
                                        <Input
                                            id="stateOfOrigin"
                                            value={formData.stateOfOrigin}
                                            onChange={(e) => setFormData({ ...formData, stateOfOrigin: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Enter state of origin"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nationality">Nationality</Label>
                                        <Input
                                            id="nationality"
                                            value={formData.nationality}
                                            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Enter nationality"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Professional Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5" />
                                    Professional Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="qualification">Qualification</Label>
                                        <Input
                                            id="qualification"
                                            value={formData.qualification}
                                            onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="e.g., B.Sc Mathematics"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                                        <Input
                                            id="yearsOfExperience"
                                            type="number"
                                            value={formData.yearsOfExperience}
                                            onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="e.g., 5"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Banking Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Briefcase className="h-5 w-5" />
                                    Banking Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="bankName">Bank Name</Label>
                                        <Input
                                            id="bankName"
                                            value={formData.bankName}
                                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Enter bank name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="accountNumber">Account Number</Label>
                                        <Input
                                            id="accountNumber"
                                            value={formData.accountNumber}
                                            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Enter account number"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <Phone className="h-5 w-5" />
                                    Emergency Contact
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="emergencyContactName">Contact Name</Label>
                                        <Input
                                            id="emergencyContactName"
                                            value={formData.emergencyContactName}
                                            onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Enter contact name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                                        <Input
                                            id="emergencyContactPhone"
                                            value={formData.emergencyContactPhone}
                                            onChange={(e) => setFormData({ ...formData, emergencyContactPhone: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Enter contact phone"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="emergencyContactRelation">Relationship</Label>
                                        <Input
                                            id="emergencyContactRelation"
                                            value={formData.emergencyContactRelation}
                                            onChange={(e) => setFormData({ ...formData, emergencyContactRelation: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="e.g., Spouse, Parent"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TeacherProfile;
