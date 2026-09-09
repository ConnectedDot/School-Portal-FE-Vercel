const ClubsSection = () => (
  <section className="py-20 bg-white border-b">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Clubs & Activities</h2>
        <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover a variety of clubs and extracurricular activities that enrich student life and foster personal growth.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-xl p-8 shadow">
          <h3 className="text-xl font-bold text-green-700 mb-2">Student Clubs</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Science Club</li>
            <li>Literary & Debate Club</li>
            <li>Music & Arts Club</li>
            <li>Sports Club</li>
            <li>ICT Club</li>
          </ul>
          <a href="/clubs" className="inline-block mt-6 text-green-700 font-semibold hover:underline">Explore Clubs</a>
        </div>
        <div className="bg-gray-50 rounded-xl p-8 shadow flex flex-col justify-center">
          <h3 className="text-xl font-bold text-green-700 mb-2">Activities</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Excursions & Field Trips</li>
            <li>Community Service</li>
            <li>Competitions</li>
            <li>Workshops & Seminars</li>
          </ul>
          <a href="/activities" className="inline-block mt-6 text-green-700 font-semibold hover:underline">See Activities</a>
        </div>
      </div>
    </div>
  </section>
);

export default ClubsSection;
