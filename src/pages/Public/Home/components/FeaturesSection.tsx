const FeaturesSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-blue-600 font-semibold mb-2">THE TOOLS YOU NEED</p>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                        <span className="text-blue-600">FEATURE COMFORTS</span>
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                        Hands-on tools power to help you master technologies faster and easier-configure labs.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
                    <div className="text-center">
                        <p className="text-5xl font-bold text-blue-600 mb-2">86%</p>
                        <p className="text-gray-600">of learners report improved job performance with us</p>
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-bold text-blue-600 mb-2">97%</p>
                        <p className="text-gray-600">of users say our content helped in their careers</p>
                    </div>
                    <div className="text-center">
                        <p className="text-5xl font-bold text-blue-600 mb-2">100+</p>
                        <p className="text-gray-600">of elite universities use our courses and certification</p>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Cloud Sandboxes */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">CLOUD SANDBOXES</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Spin up cloud sandbox to practice without the cost or complexity of your
                                own cloud infrastructure.
                            </p>
                        </div>
                    </div>

                    {/* Career Learning Paths */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-video bg-gradient-to-br from-purple-50 to-pink-50">
                            <img
                                src="/api/placeholder/400/300"
                                alt="Career learning"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">CAREER LEARNING PATHS</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Follow structured paths designed by industry experts to achieve your
                                career goals faster.
                            </p>
                        </div>
                    </div>

                    {/* Unlimited Courses - Featured */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl overflow-hidden transform lg:scale-105">
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <div className="text-center text-white p-6">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold mb-2">UNLIMITED COURSES</h4>
                            </div>
                        </div>
                        <div className="p-6 text-white">
                            <p className="text-blue-100 text-sm leading-relaxed mb-4">
                                Access our entire library of courses across multiple technologies and
                                skill levels with a single subscription.
                            </p>
                            <button className="w-full px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-all duration-300">
                                START LEARNING
                            </button>
                        </div>
                    </div>

                    {/* Curated Updates */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-video bg-gradient-to-br from-orange-50 to-yellow-50">
                            <img
                                src="/api/placeholder/400/300"
                                alt="Curated updates"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">CURATED UPDATES</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Stay current with regularly updated content that reflects the latest
                                industry trends and technologies.
                            </p>
                        </div>
                    </div>

                    {/* Additional Feature 1 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-video bg-gradient-to-br from-green-50 to-teal-50">
                            <img
                                src="/api/placeholder/400/300"
                                alt="Expert instructors"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">EXPERT INSTRUCTORS</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Learn from industry professionals with real-world experience and proven
                                teaching expertise.
                            </p>
                        </div>
                    </div>

                    {/* Additional Feature 2 */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="aspect-video bg-gradient-to-br from-red-50 to-orange-50">
                            <img
                                src="/api/placeholder/400/300"
                                alt="Community support"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">COMMUNITY SUPPORT</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Join a vibrant community of learners and get help when you need it from
                                peers and mentors.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
