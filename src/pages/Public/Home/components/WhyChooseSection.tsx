const WhyChooseSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Why Choose <span className="text-primary">Our School</span>
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We provide an exceptional learning environment designed to nurture academic excellence,
                        character development, and lifelong success.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                            <svg className="w-10 h-10 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Comprehensive Education</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Our programs are all-encompassing, with custom-built curricula to specially
                            nurture students and prepare them for global leadership and success.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                            <svg className="w-10 h-10 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">World-Class Resources</h3>
                        <p className="text-gray-600 leading-relaxed">
                            As a technology-driven school, we provide modern facilities, digital learning tools,
                            and resources that help students acquire skills needed for the 21st century.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors">
                            <svg className="w-10 h-10 text-primary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Serene Environment</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Located in a peaceful setting with excellent security and social amenities.
                            Our campus provides a green, serene, and conducive atmosphere for learning.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
