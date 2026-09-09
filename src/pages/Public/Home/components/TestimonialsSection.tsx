const TestimonialsSection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                <span className="text-blue-600">TRUSTED BY</span>
                                <br />
                                PARTNERS AND
                                <br />
                                CUSTOMERS
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Our award-winning library earns a treasure trove of tech
                                skill 30% of your flagships.
                            </p>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua quis ipsum suspendisse
                            ultrices gravida risus commodo viverra maecenas accumsan lacus vel
                            facilisis volutpat est velit egestas.
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <p className="text-4xl font-bold text-blue-600 mb-2">500+</p>
                                <p className="text-gray-600 text-sm">Enterprise Clients</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <p className="text-4xl font-bold text-blue-600 mb-2">98%</p>
                                <p className="text-gray-600 text-sm">Satisfaction Rate</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <p className="text-4xl font-bold text-blue-600 mb-2">1M+</p>
                                <p className="text-gray-600 text-sm">Active Learners</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg">
                                <p className="text-4xl font-bold text-blue-600 mb-2">50+</p>
                                <p className="text-gray-600 text-sm">Countries Served</p>
                            </div>
                        </div>
                    </div>

                    {/* Right - Testimonial Card */}
                    <div className="relative">
                        {/* Large Quote Icon Background */}
                        <div className="absolute -top-8 -left-8 text-blue-200 opacity-20 text-9xl font-serif">"</div>

                        <div className="relative bg-white rounded-2xl shadow-2xl p-8 lg:p-10">
                            {/* Quote Icon */}
                            <div className="flex items-start mb-6">
                                <div className="flex-shrink-0">
                                    <svg className="w-12 h-12 text-blue-500" fill="currentColor" viewBox="0 0 32 32">
                                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Testimonial Text */}
                            <blockquote className="mb-6">
                                <p className="text-gray-700 text-lg leading-relaxed italic">
                                    "This platform has transformed how our team approaches learning.
                                    The hands-on labs and real-world scenarios have accelerated our
                                    cloud adoption journey significantly. Highly recommended!"
                                </p>
                            </blockquote>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                                <div className="flex-shrink-0">
                                    <img
                                        src="/api/placeholder/60/60"
                                        alt="Raymond Patel"
                                        className="w-14 h-14 rounded-full border-2 border-blue-200"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">RAYMOND PATEL</h4>
                                    <p className="text-sm text-gray-600">CTO, Tech Innovations Inc.</p>
                                    <div className="flex gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Company Logos */}
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-4 text-center">TRUSTED BY LEADING COMPANIES</p>
                                <div className="flex items-center justify-center gap-8 opacity-60">
                                    <div className="text-2xl font-bold text-gray-400">TECH</div>
                                    <div className="text-2xl font-bold text-gray-400">CLOUD</div>
                                    <div className="text-2xl font-bold text-gray-400">INNOVATE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
