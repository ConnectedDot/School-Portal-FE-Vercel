const NewsSection = () => {
    const newsItems = [
        {
            title: 'Admission Portal Now Open for 2025/2026 Academic Session',
            excerpt: 'Applications are now being accepted for all programs. Apply now to secure your place.',
            date: 'Nov 10, 2025',
            views: 2543,
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop',
            link: '/news/admission-2025-open',
        },
        {
            title: 'School Wins National Academic Excellence Award',
            excerpt: 'Our school has been recognized for outstanding academic performance and innovation.',
            date: 'Nov 05, 2025',
            views: 1876,
            image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600&h=400&fit=crop',
            link: '/news/excellence-award',
        },
        {
            title: 'New STEM Laboratory Inaugurated',
            excerpt: 'State-of-the-art science and technology facility opens to enhance learning experience.',
            date: 'Oct 28, 2025',
            views: 3421,
            image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop',
            link: '/news/stem-lab-opening',
        },
        {
            title: 'Important: School Resumption Date Announced',
            excerpt: 'Students are to resume for the new term on January 8th, 2026. Please make necessary preparations.',
            date: 'Oct 20, 2025',
            views: 5234,
            image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=400&fit=crop',
            link: '/news/resumption-date',
        },
        {
            title: 'Students Excel in National Mathematics Olympiad',
            excerpt: 'Five of our students won medals at the national mathematics competition.',
            date: 'Oct 15, 2025',
            views: 2109,
            image: 'https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=600&h=400&fit=crop',
            link: '/news/math-olympiad',
        },
        {
            title: 'Parent-Teacher Conference Scheduled',
            excerpt: 'Join us for the upcoming PTA meeting to discuss student progress and school development.',
            date: 'Oct 10, 2025',
            views: 1654,
            image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop',
            link: '/news/pta-meeting',
        },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Latest News</h2>
                        <div className="w-24 h-1 bg-primary"></div>
                    </div>
                    <a
                        href="/news"
                        className="hidden md:inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                    >
                        SEE ALL NEWS
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                {/* News Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsItems.map((item, index) => (
                        <article
                            key={index}
                            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {item.date}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        {item.views.toLocaleString()}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2">{item.excerpt}</p>
                                <a
                                    href={item.link}
                                    className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                                >
                                    Read More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Mobile See All Button */}
                <div className="mt-8 text-center md:hidden">
                    <a
                        href="/news"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                    >
                        SEE ALL NEWS
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
