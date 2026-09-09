const GuidanceSection = () => (
  <section className="py-20 bg-gray-50 border-b">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Guidance & Counseling</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our guidance counselors support students in academic, personal, and career development, ensuring holistic growth.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Student Support</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Academic counseling</li>
            <li>Personal development</li>
            <li>Career guidance</li>
            <li>Peer mentoring</li>
          </ul>
          <a href="/guidance" className="inline-block mt-6 text-blue-700 font-semibold hover:underline">Meet Our Counselors</a>
        </div>
        <div className="bg-white rounded-xl p-8 shadow flex flex-col justify-center">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Resources</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Workshops & Seminars</li>
            <li>Parent support</li>
            <li>Online resources</li>
          </ul>
          <a href="/guidance/resources" className="inline-block mt-6 text-blue-700 font-semibold hover:underline">View Resources</a>
        </div>
      </div>
    </div>
  </section>
);

export default GuidanceSection;
