import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Check, User, GraduationCap, Users, FileText } from 'lucide-react';
import { mockStudents } from '../../utils/mockData';
import type { Student } from '../../types';

// Schema for each step
const personalInfoSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    dateOfBirth: z.string().min(1, 'Date of birth is required'),
    gender: z.enum(['male', 'female', 'other'], { message: 'Please select a gender' }),
});

const academicInfoSchema = z.object({
    studentId: z.string().min(5, 'Student ID must be at least 5 characters'),
    grade: z.string().min(1, 'Please select a grade'),
    section: z.string().min(1, 'Please select a section'),
    academicYear: z.string().min(1, 'Please select academic year'),
    previousSchool: z.string().optional(),
    transferReason: z.string().optional(),
});

const guardianInfoSchema = z.object({
    guardianType: z.enum(['parent', 'guardian', 'other'], { message: 'Please select guardian type' }),
    guardianFirstName: z.string().min(2, 'Guardian first name is required'),
    guardianLastName: z.string().min(2, 'Guardian last name is required'),
    guardianEmail: z.string().email('Invalid guardian email'),
    guardianPhone: z.string().min(10, 'Guardian phone number is required'),
    relationship: z.string().min(1, 'Please specify relationship'),
    address: z.string().min(10, 'Complete address is required'),
});

const medicalInfoSchema = z.object({
    hasAllergies: z.boolean(),
    allergies: z.string().optional(),
    hasMedicalConditions: z.boolean(),
    medicalConditions: z.string().optional(),
    emergencyContact: z.string().min(10, 'Emergency contact is required'),
    bloodGroup: z.string().optional(),
});

// Combined schema
const studentOnboardingSchema = z.object({
    ...personalInfoSchema.shape,
    ...academicInfoSchema.shape,
    ...guardianInfoSchema.shape,
    ...medicalInfoSchema.shape,
});

type StudentOnboardingData = z.infer<typeof studentOnboardingSchema>;

interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    schema: z.ZodSchema;
    fields: Array<keyof StudentOnboardingData>;
}

const steps: OnboardingStep[] = [
    {
        id: 'personal',
        title: 'Personal Information',
        description: 'Basic student details and contact information',
        icon: User,
        schema: personalInfoSchema,
        fields: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'gender'],
    },
    {
        id: 'academic',
        title: 'Academic Details',
        description: 'Educational background and enrollment information',
        icon: GraduationCap,
        schema: academicInfoSchema,
        fields: ['studentId', 'grade', 'section', 'academicYear', 'previousSchool', 'transferReason'],
    },
    {
        id: 'guardian',
        title: 'Guardian Information',
        description: 'Parent or guardian contact details',
        icon: Users,
        schema: guardianInfoSchema,
        fields: ['guardianType', 'guardianFirstName', 'guardianLastName', 'guardianEmail', 'guardianPhone', 'relationship', 'address'],
    },
    {
        id: 'medical',
        title: 'Medical & Emergency',
        description: 'Health information and emergency contacts',
        icon: FileText,
        schema: medicalInfoSchema,
        fields: ['hasAllergies', 'allergies', 'hasMedicalConditions', 'medicalConditions', 'emergencyContact', 'bloodGroup'],
    },
];

interface StudentOnboardingFormProps {
    studentId?: string; // If provided, component will be in edit mode
    onSubmit?: (data: StudentOnboardingData) => void;
    onCancel?: () => void;
    className?: string;
}

export function StudentOnboardingForm({ studentId, onSubmit, onCancel, className }: StudentOnboardingFormProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [isLoading, setIsLoading] = useState(!!studentId);
    const [student, setStudent] = useState<Student | null>(null);
    const isEditMode = !!studentId;

    const form = useForm<StudentOnboardingData>({
        resolver: zodResolver(studentOnboardingSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            gender: undefined,
            studentId: '',
            grade: '',
            section: '',
            academicYear: '',
            previousSchool: '',
            transferReason: '',
            guardianType: undefined,
            guardianFirstName: '',
            guardianLastName: '',
            guardianEmail: '',
            guardianPhone: '',
            relationship: '',
            address: '',
            hasAllergies: false,
            allergies: '',
            hasMedicalConditions: false,
            medicalConditions: '',
            emergencyContact: '',
            bloodGroup: '',
        },
    });

    // Auto-generate student ID if not in edit mode
    useEffect(() => {
        if (!isEditMode && !form.getValues('studentId')) {
            const generateStudentId = () => {
                const randomHex = Math.floor(Math.random() * 0xFFFFFF)
                    .toString(16)
                    .toUpperCase()
                    .padStart(6, '0');
                return `FORT-${randomHex}`;
            };

            const newStudentId = generateStudentId();
            form.setValue('studentId', newStudentId);
        }
    }, [isEditMode, form]);


    // Fetch student data when in edit mode
    useEffect(() => {
        const fetchStudentData = async () => {
            if (!studentId) return;

            setIsLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 500));

                const foundStudent = mockStudents.find(s => s.id === studentId);
                if (foundStudent) {
                    setStudent(foundStudent);

                    // Populate form with existing data
                    form.reset({
                        firstName: foundStudent.firstName,
                        lastName: foundStudent.lastName,
                        email: foundStudent.email,
                        phone: foundStudent.phone || '',
                        dateOfBirth: foundStudent.dateOfBirth,
                        gender: (foundStudent.gender as 'male' | 'female' | 'other') || 'male', // Default to male if not specified
                        studentId: foundStudent.studentId,
                        grade: foundStudent.grade,
                        section: foundStudent.class, // Map class to section
                        academicYear: new Date().getFullYear().toString(),
                        previousSchool: '',
                        transferReason: '',
                        guardianType: 'parent' as const,
                        guardianFirstName: foundStudent.guardianId || '', // These would come from guardian data
                        guardianLastName: '',
                        guardianEmail: '',
                        guardianPhone: '',
                        relationship: 'Parent',
                        address: foundStudent.address || '',
                        hasAllergies: false,
                        allergies: '',
                        hasMedicalConditions: false,
                        medicalConditions: '',
                        emergencyContact: foundStudent.phone || '',
                        bloodGroup: '',
                    });

                    // Mark all steps as completed in edit mode
                    setCompletedSteps(new Set([0, 1, 2, 3]));
                }
            } catch (error) {
                console.error('Error fetching student:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStudentData();
    }, [studentId, form]);

    const currentStepData = steps[currentStep];
    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;
    const progress = ((currentStep + 1) / steps.length) * 100;

    // Show loading state when fetching student data
    if (isLoading) {
        return (
            <Card className={cn('w-full max-w-4xl mx-auto', className)}>
                <CardContent className="p-6">
                    <div className="flex items-center justify-center min-h-96">
                        <div className="text-center space-y-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                            <p className="text-muted-foreground">Loading student data...</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const validateCurrentStep = async () => {
        const stepFields = currentStepData.fields;
        const stepData: Record<string, unknown> = {};

        stepFields.forEach(field => {
            stepData[field] = form.getValues(field);
        });

        try {
            await currentStepData.schema.parseAsync(stepData);
            return true;
        } catch (error) {
            // Trigger validation errors in the form
            await form.trigger(stepFields);
            return false;
        }
    };

    const handleNext = async () => {
        const isValid = await validateCurrentStep();
        if (isValid) {
            setCompletedSteps(prev => new Set([...prev, currentStep]));
            if (!isLastStep) {
                setCurrentStep(prev => prev + 1);
            }
        }
    };

    const handlePrevious = () => {
        if (!isFirstStep) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleStepClick = async (stepIndex: number) => {
        if (stepIndex < currentStep || completedSteps.has(stepIndex)) {
            setCurrentStep(stepIndex);
        } else if (stepIndex === currentStep + 1) {
            await handleNext();
        }
    };

    const handleFormSubmit = async (data: StudentOnboardingData) => {
        // console.log('Student onboarding data:', data);
        onSubmit?.(data);
    };

    const hasAllergies = form.watch('hasAllergies');
    const hasMedicalConditions = form.watch('hasMedicalConditions');

    return (
        <div className={cn('space-y-4', className)}>
            {/* Progress Header */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-6 w-6" />
                        {steps[currentStep].title}
                        <Badge variant="secondary">Step {currentStep + 1} of {steps.length}</Badge>
                    </CardTitle>
                    <CardDescription>
                        Complete all steps to onboard a new student to the system
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Progress Bar */}
            <Card>
                <CardContent className="pt-4">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>
                </CardContent>
            </Card>

            {/* Step Navigation */}
            <Card>
                <CardContent className="pt-4">
                    <nav className="flex justify-between">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = index === currentStep;
                            const isCompleted = completedSteps.has(index);
                            const isAccessible = index <= currentStep || isCompleted;

                            return (
                                <button
                                    key={step.id}
                                    onClick={() => handleStepClick(index)}
                                    disabled={!isAccessible}
                                    className={cn(
                                        'flex flex-col items-center space-y-2 p-2 rounded-lg transition-colors',
                                        'hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed',
                                        isActive && 'bg-primary/10 text-primary',
                                        isCompleted && !isActive && 'text-green-600'
                                    )}
                                >
                                    <div className={cn(
                                        'flex items-center justify-center w-10 h-10 rounded-full border-2',
                                        isActive && 'border-primary bg-primary/10',
                                        isCompleted && !isActive && 'border-green-600 bg-green-50',
                                        !isActive && !isCompleted && 'border-muted-foreground/30'
                                    )}>
                                        {isCompleted ? (
                                            <Check className="h-5 w-5 text-green-600" />
                                        ) : (
                                            <Icon className="h-5 w-5" />
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs font-medium">{step.title}</div>
                                        <div className="text-xs text-muted-foreground hidden sm:block">
                                            {step.description}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </nav>
                </CardContent>
            </Card>

            {/* Form Content */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <currentStepData.icon className="h-5 w-5" />
                        {currentStepData.title}
                    </CardTitle>
                    <CardDescription>{currentStepData.description}</CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 ">
                            {/* Personal Information Step */}
                            {currentStep === 0 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter first name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="studentId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Student ID</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter student ID"
                                                            readOnly={isEditMode}
                                                            className={isEditMode ? 'bg-muted' : ''}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    {isEditMode && (
                                                        <FormDescription>
                                                            Student ID cannot be changed
                                                        </FormDescription>
                                                    )}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="student@school.com" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Student email for communication and portal access
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="dateOfBirth"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Date of Birth</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Gender</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup
                                                            onValueChange={field.onChange}
                                                            defaultValue={field.value}
                                                            className="flex flex-col space-y-1"
                                                        >
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="male" id="male" />
                                                                <FormLabel htmlFor="male">Male</FormLabel>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="female" id="female" />
                                                                <FormLabel htmlFor="female">Female</FormLabel>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="other" id="other" />
                                                                <FormLabel htmlFor="other">Other</FormLabel>
                                                            </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Academic Information Step */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="studentId"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Student ID</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="STU-2024-001" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Unique identifier for the student
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="grade"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Grade Level</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select grade level" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="9">Grade 9</SelectItem>
                                                            <SelectItem value="10">Grade 10</SelectItem>
                                                            <SelectItem value="11">Grade 11</SelectItem>
                                                            <SelectItem value="12">Grade 12</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="section"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Section</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select section" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="A">Section A</SelectItem>
                                                            <SelectItem value="B">Section B</SelectItem>
                                                            <SelectItem value="C">Section C</SelectItem>
                                                            <SelectItem value="D">Section D</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="academicYear"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Academic Year</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select academic year" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="2024-2025">2024-2025</SelectItem>
                                                            <SelectItem value="2025-2026">2025-2026</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="previousSchool"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Previous School (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Name of previous school" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="transferReason"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Transfer Reason (Optional)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Reason for transfer" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Guardian Information Step */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="guardianType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Guardian Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select guardian type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="parent">Parent</SelectItem>
                                                            <SelectItem value="guardian">Guardian</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="relationship"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Relationship</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="e.g., Father, Mother, Guardian" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="guardianFirstName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Guardian First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter first name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="guardianLastName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Guardian Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter last name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="guardianEmail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Guardian Email</FormLabel>
                                                    <FormControl>
                                                        <Input type="email" placeholder="guardian@email.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="guardianPhone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Guardian Phone</FormLabel>
                                                    <FormControl>
                                                        <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Enter complete address..."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            {/* Medical Information Step */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="emergencyContact"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Emergency Contact</FormLabel>
                                                    <FormControl>
                                                        <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Phone number to contact in case of emergency
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="bloodGroup"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Blood Group (Optional)</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select blood group" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="A+">A+</SelectItem>
                                                            <SelectItem value="A-">A-</SelectItem>
                                                            <SelectItem value="B+">B+</SelectItem>
                                                            <SelectItem value="B-">B-</SelectItem>
                                                            <SelectItem value="AB+">AB+</SelectItem>
                                                            <SelectItem value="AB-">AB-</SelectItem>
                                                            <SelectItem value="O+">O+</SelectItem>
                                                            <SelectItem value="O-">O-</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <Separator />

                                    <FormField
                                        control={form.control}
                                        name="hasAllergies"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>Has known allergies</FormLabel>
                                                    <FormDescription>
                                                        Check this if the student has any known allergies
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {hasAllergies && (
                                        <FormField
                                            control={form.control}
                                            name="allergies"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Allergy Details</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Please describe the allergies and their severity..."
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}

                                    <FormField
                                        control={form.control}
                                        name="hasMedicalConditions"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <div className="space-y-1 leading-none">
                                                    <FormLabel>Has medical conditions</FormLabel>
                                                    <FormDescription>
                                                        Check this if the student has any medical conditions
                                                    </FormDescription>
                                                </div>
                                            </FormItem>
                                        )}
                                    />

                                    {hasMedicalConditions && (
                                        <FormField
                                            control={form.control}
                                            name="medicalConditions"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Medical Conditions</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Please describe any medical conditions..."
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )}
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="flex justify-between pt-4">
                                <div className="flex space-x-2">
                                    {onCancel && (
                                        <Button type="button" variant="outline" onClick={onCancel}>
                                            Cancel
                                        </Button>
                                    )}
                                    {!isFirstStep && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={handlePrevious}
                                            className="flex items-center gap-2 text-foreground"
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Previous
                                        </Button>
                                    )}
                                </div>

                                <div className="flex space-x-2">
                                    {!isLastStep ? (
                                        <Button
                                            type="button"
                                            onClick={handleNext}
                                            className="flex items-center gap-2 text-foreground"
                                        >
                                            Next
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    ) : (
                                        <Button
                                            type="submit"
                                            className="flex items-center gap-2 text-foreground"
                                        >
                                            <Check className="h-4 w-4" />
                                            Complete Onboarding
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}