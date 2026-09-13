import { useNavigate } from 'react-router-dom';
import { StudentOnboardingForm } from '../../../components/forms/StudentOnboardingForm';
import { AdnPaths } from '../../../router/paths';
import { Button } from '@/components/ui/button';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useCreateStudent } from '@/hooks/students';
import { toast } from 'sonner';

// Type for the onboarding data
interface StudentOnboardingData {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    grade: string;
    section: string;
    academicYear: string;
    previousSchool?: string;
    transferReason?: string;
    guardianType: 'parent' | 'guardian' | 'other';
    guardianFirstName: string;
    guardianLastName: string;
    guardianEmail: string;
    guardianPhone: string;
    relationship: string;
    address: string;
    hasAllergies: boolean;
    allergies?: string;
    hasMedicalConditions: boolean;
    medicalConditions?: string;
    emergencyContact: string;
    bloodGroup?: string;
}

const StudentOnboard = () => {
    const navigate = useNavigate();
    const { mutate: createStudent, isPending } = useCreateStudent(
        async () => {
            navigate(AdnPaths.STUDENTS);
        }
    );

    const handleOnboardingComplete = (data: StudentOnboardingData) => {
        // console.log('Student onboarding completed:', data);

        // Transform data to match API schema
        const studentData = {
            firstName: data.firstName,
            lastName: data.lastName,
            ...(data.email ? { email: data.email } : {}),
            ...(data.phone ? { phone: data.phone } : {}),
            dateOfBirth: new Date(data.dateOfBirth).toISOString(),
            gender: data.gender.toUpperCase(),
            studentLevel: data.grade,
            department: data.section,
            guardianFirstName: data.guardianFirstName,
            guardianLastName: data.guardianLastName,
            guardianEmail: data.guardianEmail,
            guardianPhone: data.guardianPhone,
            guardianAddress: data.address,
        };

        createStudent(studentData);
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <UserPlus className="h-6 w-6" />
                            Student Onboarding
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Add a new student to the school management system
                        </p>
                    </div>
                </div>
            </div>

            {/* Onboarding Form */}
            <StudentOnboardingForm
                onSubmit={handleOnboardingComplete}
                onCancel={handleCancel}
                isSubmitting={isPending}
            />
        </div>
    );
};

export default StudentOnboard;
