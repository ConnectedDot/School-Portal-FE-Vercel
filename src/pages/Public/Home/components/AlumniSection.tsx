const AlumniSection = () => (
  <section className="py-20 bg-white border-b">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Alumni</h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with our alumni network, discover success stories, and learn how our graduates are making an impact.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-xl p-8 shadow">
          <h3 className="text-xl font-bold text-orange-600 mb-2">Alumni Network</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Success stories</li>
            <li>Mentorship opportunities</li>
            <li>Events & reunions</li>
            <li>Career support</li>
          </ul>
          <a href="/alumni" className="inline-block mt-6 text-orange-600 font-semibold hover:underline">Join Alumni Network</a>
        </div>
        <div className="bg-gray-50 rounded-xl p-8 shadow flex flex-col justify-center">
          <h3 className="text-xl font-bold text-orange-600 mb-2">Get Involved</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Share your story</li>
            <li>Become a mentor</li>
            <li>Support school initiatives</li>
          </ul>
          <a href="/alumni/involved" className="inline-block mt-6 text-orange-600 font-semibold hover:underline">Get Involved</a>
        </div>
      </div>
    </div>
  </section>
);

export default AlumniSection;
