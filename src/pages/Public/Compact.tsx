import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap, Users, BookOpen, Calendar, CheckCircle, Phone, Mail, MapPin } from 'lucide-react';

const CompactPage = () => {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                            Fortis School Portal
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                            Empowering the next generation through excellence in education, character development, and innovation.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                                <Link to="/admissions">
                                    Apply for Admission
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link to="/academics">
                                    Explore Academics
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Academic Stages */}
            <section className="py-16 md:py-24 bg-card">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Academic Stages</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive education from junior secondary through senior secondary, preparing students for higher education and future success.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        <div className="bg-background rounded-2xl p-6 border border-border text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <GraduationCap className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Junior Secondary</h3>
                            <p className="text-muted-foreground text-sm">
                                JSS 1-3: Building strong foundations in core subjects and discovering individual strengths.
                            </p>
                        </div>
                        <div className="bg-background rounded-2xl p-6 border border-border text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Senior Secondary</h3>
                            <p className="text-muted-foreground text-sm">
                                SS 1-3: Specialized learning paths in Science, Arts, and Commercial streams.
                            </p>
                        </div>
                        <div className="bg-background rounded-2xl p-6 border border-border text-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Holistic Development</h3>
                            <p className="text-muted-foreground text-sm">
                                Beyond academics: sports, arts, leadership, and character building programs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Families Choose Us</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A nurturing environment where every student is valued, challenged, and supported to reach their full potential.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            { icon: CheckCircle, title: 'Academic Excellence', desc: 'Consistent track record of outstanding results and university placements.' },
                            { icon: Users, title: 'Experienced Faculty', desc: 'Dedicated teachers committed to student success and personal growth.' },
                            { icon: BookOpen, title: 'Modern Facilities', desc: 'Well-equipped classrooms, laboratories, library, and sports facilities.' },
                            { icon: Calendar, title: 'Rich Curriculum', desc: 'Balanced program combining academics, arts, sports, and technology.' },
                        ].map((item, index) => (
                            <div key={index} className="bg-card rounded-xl p-6 border border-border">
                                <item.icon className="h-8 w-8 text-primary mb-4" />
                                <h3 className="font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Admissions Overview */}
            <section className="py-16 md:py-24 bg-card">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Admissions Overview</h2>
                            <p className="text-muted-foreground">
                                Join our community of learners. Admission is open to qualified students based on merit and availability.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {[
                                'Submit application form with required documents',
                                'Attend entrance assessment and interview',
                                'Receive admission decision and offer',
                                'Complete enrollment and fee payment',
                                'Attend orientation and begin your journey',
                            ].map((step, index) => (
                                <div key={index} className="flex items-start gap-4 bg-background rounded-lg p-4 border border-border">
                                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <p className="text-sm">{step}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                                <Link to="/admissions">
                                    Start Your Application
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Stats */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
                        {[
                            { value: '25+', label: 'Years of Excellence' },
                            { value: '2000+', label: 'Students Enrolled' },
                            { value: '150+', label: 'Qualified Teachers' },
                            { value: '95%', label: 'University Placement' },
                        ].map((stat, index) => (
                            <div key={index}>
                                <div className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.value}</div>
                                <div className="text-muted-foreground text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-16 md:py-24 bg-card">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
                        <p className="text-muted-foreground mb-8">
                            Have questions? Our admissions team is here to help you with information about our programs, facilities, and enrollment process.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="flex items-center justify-center gap-3">
                                <Phone className="h-5 w-5 text-primary" />
                                <span className="text-sm">+234 XXX XXX XXXX</span>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <span className="text-sm">admissions@fortisschool.edu</span>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span className="text-sm">123 Education Lane, City</span>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                                <Link to="/contact">
                                    Contact Us
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline">
                                <Link to="/login">
                                    Portal Login
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CompactPage;
