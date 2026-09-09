import { useNavigate } from 'react-router-dom';
import { AdnPaths } from '../../../router/paths';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookOpen, Loader2 } from 'lucide-react';
import { useCreateCourse } from '@/hooks/courses';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

interface CourseFormData {
    title: string;
    description: string;
    subject: string;
    courseType: string;
}

const CourseCreate = () => {
    const navigate = useNavigate();
    const { mutate: createCourse, isPending } = useCreateCourse(
        async () => {
            navigate(AdnPaths.COURSES);
        }
    );

    const [formData, setFormData] = useState<CourseFormData>({
        title: '',
        description: '',
        subject: '',
        courseType: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createCourse({
            title: formData.title,
            description: formData.description,
            subject: formData.subject,
            courseType: formData.courseType,
        });
    };

    const handleCancel = () => {
        navigate(AdnPaths.COURSES);
    };

    const handleChange = (field: keyof CourseFormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
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
                        // onClick={() => navigate(AdnPaths.COURSES)}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                            <BookOpen className="h-6 w-6" />
                            Create New Course
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Add a new course to the course catalog
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
                            Fill in the details below to create a new course
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Course Information */}
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
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Create Course
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

export default CourseCreate;
