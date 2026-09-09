import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

// Simplified schema that works with React Hook Form
const formSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    grade: z.string().min(1, 'Please select a grade'),
    hasAllergies: z.boolean(),
    allergies: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface SimpleShadcnFormProps {
    onSubmit?: (data: FormData) => void;
    className?: string;
}

export interface SimpleShadcnFormRef {
    submitForm: () => void;
    resetForm: () => void;
    getValues: () => FormData;
}

export const SimpleShadcnForm = forwardRef<SimpleShadcnFormRef, SimpleShadcnFormProps>(
    ({ onSubmit, className }, ref) => {
        const form = useForm<FormData>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                grade: '',
                hasAllergies: false,
                allergies: '',
            },
        });

        useImperativeHandle(ref, () => ({
            submitForm: () => {
                form.handleSubmit((data) => {
                    // console.log('Form submitted:', data);
                    onSubmit?.(data);
                })();
            },
            resetForm: () => form.reset(),
            getValues: () => form.getValues(),
        }));

        const handleFormSubmit = (data: FormData) => {
            // console.log('Form data:', data);
            onSubmit?.(data);
        };

        const hasAllergies = form.watch('hasAllergies');

        return (
            <Card className={cn('max-w-2xl mx-auto', className)}>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        Student Registration
                        <Badge variant="secondary">shadcn/ui</Badge>
                    </CardTitle>
                    <CardDescription>
                        Create a new student profile using shadcn/ui components
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
                            {/* Personal Information Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                        Personal Information
                                    </h3>
                                </div>
                                <Separator />

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
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
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
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input type="email" placeholder="Enter email address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input type="tel" placeholder="Enter phone number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Academic Information */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                        Academic Information
                                    </h3>
                                </div>
                                <Separator />

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

                            {/* Health Information */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                        Health Information
                                    </h3>
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
                                                <FormLabel>
                                                    Has known allergies
                                                </FormLabel>
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
                                                        placeholder="Please describe the allergies..."
                                                        className="resize-none"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    List all known allergies and their severity
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end space-x-4 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => form.reset()}
                                >
                                    Reset
                                </Button>
                                <Button type="submit">
                                    Create Student
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        );
    }
);

SimpleShadcnForm.displayName = 'SimpleShadcnForm';