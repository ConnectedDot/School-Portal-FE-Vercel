const LearnByDoingSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative z-10">
                            <img
                                src="/api/placeholder/600/500"
                                alt="Students collaborating"
                                className="rounded-2xl shadow-2xl w-full"
                            />
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute -top-6 -left-6 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 -z-10" />
                    </div>

                    {/* Right - Content */}
                    <div className="space-y-6 order-1 lg:order-2">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                <span className="text-blue-600">LEARN BY DOING</span>
                                <br />
                                GET YOUR OWN CLOUD
                            </h2>
                        </div>

                        <p className="text-gray-600 leading-relaxed text-lg">
                            Curated upskills issues you own curated handbooks, lorem area
                            indicative nunc vita vehid major magni. Quis velit malesuada malis, ac
                            tempore vitae vitae pulvinar magna. Duis pharetra luctus vestibulum.
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor
                            incididunt ut labore et dolore magna aliqua quis ipsum suspendisse ultrices
                            gravida risus commodo viverra maecenas accumsan.
                        </p>

                        {/* Feature List */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Hands-on Practice</h4>
                                    <p className="text-gray-600 text-sm">Get real-world experience in safe sandbox environments</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Instant Feedback</h4>
                                    <p className="text-gray-600 text-sm">Learn from mistakes and improve rapidly with immediate results</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Real Cloud Resources</h4>
                                    <p className="text-gray-600 text-sm">Work with actual cloud platforms and tools used by professionals</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LearnByDoingSection;
