import { useNavigate, useParams } from 'react-router-dom';
import { AdnPaths } from '../../../router/paths';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useGetCourse, useUpdateCourse } from '@/hooks/courses';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';

interface CourseFormData {
    title: string;
    description: string;
    subject: string;
    courseType: string;
}

const CourseEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    const { data: course, isLoading: loadingCourse } = useGetCourse(id!);
    const { mutate: updateCourse, isPending } = useUpdateCourse(
        id!,
        async () => {
            navigate(`${AdnPaths.COURSES}/${id}`);
        }
    );

    const [formData, setFormData] = useState<CourseFormData>({
        title: '',
        description: '',
        subject: '',
        courseType: '',
    });

    // Populate form when course data loads
    useEffect(() => {
        if (course) {
            setFormData({
                title: course.title || '',
                description: course.description || '',
                subject: course.subject || '',
                courseType: course.courseType || '',
            });
        }
    }, [course]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateCourse({
            title: formData.title,
            description: formData.description,
            subject: formData.subject,
            courseType: formData.courseType,
        });
    };

    const handleCancel = () => {
        navigate(`${AdnPaths.COURSES}/${id}`);
    };

    const handleChange = (field: keyof CourseFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (loadingCourse) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center h-96 space-y-4">
                <p className="text-muted-foreground">Failed to load course details</p>
                <Button variant="outline" onClick={() => navigate(AdnPaths.COURSES)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Courses
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(-1)}
                        // onClick={() => navigate(`${AdnPaths.COURSES}/${id}`)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Edit Course</h1>
                        <p className="text-muted-foreground text-sm">
                            Update details for {course.title}
                        </p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Course Information</CardTitle>
                        <CardDescription>
                            Update the details below to modify course information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Course Information</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Course Title *</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => handleChange('title', e.target.value)}
                                        placeholder="e.g., Agricultural Science"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject *</Label>
                                    <Input
                                        id="subject"
                                        value={formData.subject}
                                        onChange={(e) => handleChange('subject', e.target.value)}
                                        placeholder="e.g., AGRICULTURAL_SCIENCE"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="courseType">Course Type *</Label>
                                    <Input
                                        id="courseType"
                                        value={formData.courseType}
                                        onChange={(e) => handleChange('courseType', e.target.value)}
                                        placeholder="e.g., GENERAL"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        placeholder="Enter course description"
                                        rows={4}
                                    />
                                </div>
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
                            <Button type="submit" disabled={isPending}>
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
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default CourseEdit;
