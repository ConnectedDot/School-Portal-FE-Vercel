const LibrarySection = () => (
  <section className="py-20 bg-gray-50 border-b">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Library</h2>
        <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our well-equipped library, digital resources, and research support for students and faculty.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow">
          <h3 className="text-xl font-bold text-green-700 mb-2">Library Services</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Book lending and reference</li>
            <li>Digital library access</li>
            <li>Research assistance</li>
            <li>Study spaces</li>
          </ul>
          <a href="/library/services" className="inline-block mt-6 text-green-700 font-semibold hover:underline">Explore Services</a>
        </div>
        <div className="bg-white rounded-xl p-8 shadow flex flex-col justify-center">
          <h3 className="text-xl font-bold text-green-700 mb-2">Digital Resources</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>eBooks & Journals</li>
            <li>Online databases</li>
            <li>Learning platforms</li>
          </ul>
          <a href="/library/digital" className="inline-block mt-6 text-green-700 font-semibold hover:underline">Access Digital Library</a>
        </div>
      </div>
    </div>
  </section>
);

export default LibrarySection;
