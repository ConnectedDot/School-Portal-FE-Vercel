const SkillsCloudSection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <p className="text-blue-600 font-semibold mb-2">WHY CHOOSE US</p>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                        <span className="text-blue-600">KING OF THE</span> SKILL
                    </h2>
                    <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
                        Learn by doing as you get hard—or better your tech experience has guided with wings of
                        you're a techie or engineer who's been tech-deep in it since the Commodore 64.
                    </p>
                    <p className="mt-2 text-gray-600 max-w-3xl mx-auto text-sm">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua suspendisse ultrices gravida risus commodo viverra maecenas accumsan lacus vel.
                    </p>
                </div>

                {/* Three Column Layout */}
                <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
                    {/* Left Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-blue-600 mb-3">CERTIFIABLY AWESOME</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Prepare to ace your next certification with hands-on experience and
                            expert-led content.
                        </p>
                    </div>

                    {/* Center Card - Featured */}
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 shadow-2xl transform md:scale-110 z-10">
                        <div className="text-center text-white">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white/30">
                                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">BUILD SKILLS YOUR WAY</h3>
                            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                                Choose from instructor-led courses, self-paced learning, or blended options
                                that fit your schedule and learning style.
                            </p>
                            <button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                                EXPLORE PATHS
                            </button>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-blue-600 mb-3">CLOUD TRAINABLE</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Practice in real cloud environments without the cost or complexity of
                            setup.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillsCloudSection;
