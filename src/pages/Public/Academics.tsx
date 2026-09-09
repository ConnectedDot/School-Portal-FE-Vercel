import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Users, Award, Clock, Target, ChevronRight } from 'lucide-react';

const AcademicsContent = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                            Academic Excellence
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                            A rigorous, well-rounded curriculum designed to develop critical thinking, creativity, and character.
                        </p>
                    </div>
                </div>
            </section>

            {/* Academic Philosophy */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Our Academic Philosophy</h2>
                        <p className="text-lg text-muted-foreground text-center mb-8">
                            We believe every student has unique potential. Our approach combines structured learning with individualized support, 
                            encouraging curiosity, independent thinking, and a love for lifelong learning.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: Target, title: 'Student-Centered', desc: 'Learning tailored to individual needs and learning styles.' },
                                { icon: BookOpen, title: 'Inquiry-Based', desc: 'Encouraging questions, exploration, and critical analysis.' },
                                { icon: Users, title: 'Collaborative', desc: 'Building teamwork and communication through group learning.' },
                            ].map((item, index) => (
                                <Card key={index} className="border-border">
                                    <CardContent className="p-6 text-center">
                                        <item.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                                        <h3 className="font-bold mb-2">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Junior Secondary */}
            <section className="py-16 md:py-24 bg-card">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Junior Secondary (JSS 1-3)</h2>
                            <p className="text-muted-foreground">
                                Building strong foundations in core subjects while discovering individual strengths and interests.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    Core Subjects
                                </h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>• English Language and Literature</li>
                                    <li>• Mathematics</li>
                                    <li>• Basic Science and Technology</li>
                                    <li>• Social Studies</li>
                                    <li>• French/Native Language</li>
                                    <li>• Business Studies</li>
                                    <li>• Agricultural Science</li>
                                    <li>• Home Economics</li>
                                    <li>• Physical and Health Education</li>
                                    <li>• Civic Education</li>
                                    <li>• Computer Studies</li>
                                    <li>• Religious and National Values</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    Learning Focus
                                </h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    <li>• Building literacy and numeracy skills</li>
                                    <li>• Introduction to scientific inquiry</li>
                                    <li>• Understanding social structures</li>
                                    <li>• Developing critical thinking</li>
                                    <li>• Technology literacy</li>
                                    <li>• Physical fitness and health awareness</li>
                                    <li>• Character and moral development</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Senior Secondary Pathways */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Senior Secondary Pathways (SS 1-3)</h2>
                            <p className="text-muted-foreground">
                                Specialized learning paths designed to prepare students for higher education and career aspirations.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: 'Science',
                                    icon: BookOpen,
                                    subjects: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English', 'Agricultural Science', 'Geography'],
                                    focus: 'For students pursuing medicine, engineering, pharmacy, and other science-based careers.'
                                },
                                {
                                    title: 'Arts',
                                    icon: Users,
                                    subjects: ['Literature in English', 'Government', 'History', 'Economics', 'Mathematics', 'English', 'CRK/IRK'],
                                    focus: 'For students interested in law, social sciences, humanities, and communication arts.'
                                },
                                {
                                    title: 'Commercial',
                                    icon: Award,
                                    subjects: ['Financial Accounting', 'Economics', 'Commerce', 'Mathematics', 'English', 'Government', 'CRK/IRK'],
                                    focus: 'For students aiming for business, finance, management, and entrepreneurial careers.'
                                },
                            ].map((pathway, index) => (
                                <Card key={index} className="border-border">
                                    <CardContent className="p-6">
                                        <pathway.icon className="h-8 w-8 text-primary mb-4" />
                                        <h3 className="text-xl font-bold mb-2">{pathway.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">{pathway.focus}</p>
                                        <div className="border-t border-border pt-4">
                                            <p className="text-xs font-semibold mb-2">Key Subjects:</p>
                                            <ul className="text-xs text-muted-foreground space-y-1">
                                                {pathway.subjects.map((subject, i) => (
                                                    <li key={i}>• {subject}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Teaching & Learning */}
            <section className="py-16 md:py-24 bg-card">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Teaching & Learning Model</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { title: 'Active Learning', desc: 'Students engage through discussions, projects, and hands-on activities.' },
                                { title: 'Technology Integration', desc: 'Smart classrooms, digital resources, and computer-aided learning.' },
                                { title: 'Continuous Assessment', desc: 'Regular evaluation through tests, projects, and practical work.' },
                                { title: 'Remedial Support', desc: 'Extra help for students who need additional assistance.' },
                                { title: 'Enrichment Programs', desc: 'Advanced work for high-achieving students.' },
                                { title: 'Parental Involvement', desc: 'Regular communication and partnership with families.' },
                            ].map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Clock className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold mb-1">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Assessment Approach */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Assessment Approach</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            We use a balanced assessment system that measures learning outcomes, provides feedback, and guides improvement.
                        </p>
                        <div className="grid md:grid-cols-4 gap-4 text-center">
                            {[
                                { label: 'Continuous Assessment', value: '40%' },
                                { label: 'Mid-Term Exams', value: '20%' },
                                { label: 'Final Exams', value: '30%' },
                                { label: 'Practical/Projects', value: '10%' },
                            ].map((item, index) => (
                                <div key={index} className="bg-card rounded-lg p-4 border border-border">
                                    <div className="text-2xl font-black text-primary mb-1">{item.value}</div>
                                    <div className="text-xs text-muted-foreground">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 bg-card">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Join Us?</h2>
                        <p className="text-muted-foreground mb-8">
                            Begin your academic journey with us. Admissions are open for the upcoming academic session.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                                <Link to="/admissions">
                                    Apply for Admission
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link to="/contact">
                                    Contact Admissions
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AcademicsContent;
