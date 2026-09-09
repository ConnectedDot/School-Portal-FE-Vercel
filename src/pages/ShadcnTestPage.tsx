import { useRef } from 'react';
import { SimpleShadcnForm, type SimpleShadcnFormRef } from '@/components/examples/SimpleShadcnForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ShadcnTestPage = () => {
    const formRef = useRef<SimpleShadcnFormRef>(null);

    const handleSubmit = (data: { firstName: string; lastName: string; email: string; phone?: string; grade: string; hasAllergies: boolean; allergies?: string }) => {
        // console.log('Form submitted:', data);
        alert(`Student created: ${data.firstName} ${data.lastName}`);
    };

    const handleExternalSubmit = () => {
        formRef.current?.submitForm();
    };

    const handleReset = () => {
        formRef.current?.resetForm();
    };

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            shadcn/ui Integration Test
                            <Badge variant="default">Live Demo</Badge>
                        </CardTitle>
                        <CardDescription>
                            Testing shadcn/ui components integration with our School Portal
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary">16</div>
                                <div className="text-sm text-muted-foreground">Components Installed</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">✓</div>
                                <div className="text-sm text-muted-foreground">React Hook Form</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">Z</div>
                                <div className="text-sm text-muted-foreground">Zod Validation</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* External Controls */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">External Form Controls</CardTitle>
                        <CardDescription>
                            Demonstrate imperative form control via refs
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-2">
                            <Button onClick={handleExternalSubmit} variant="default">
                                Submit Form Externally
                            </Button>
                            <Button onClick={handleReset} variant="outline">
                                Reset Form Externally
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Separator />

                {/* Main Form */}
                <SimpleShadcnForm
                    ref={formRef}
                    onSubmit={handleSubmit}
                />

                {/* Component Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Components Used</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {[
                                'Button', 'Card', 'Input', 'Label',
                                'Form', 'Select', 'Textarea', 'Checkbox',
                                'RadioGroup', 'Progress', 'Separator', 'Badge',
                                'Dialog', 'Sheet', 'Tabs', 'Alert'
                            ].map((component) => (
                                <Badge key={component} variant="secondary" className="justify-center">
                                    {component}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ShadcnTestPage;