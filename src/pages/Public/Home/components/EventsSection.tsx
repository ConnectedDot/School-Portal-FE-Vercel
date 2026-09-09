const EventsSection = () => (
  <section className="py-20 bg-gray-50 border-b">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Events & Calendar</h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with upcoming school events, activities, and important dates throughout the year.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-8 shadow">
          <h3 className="text-xl font-bold text-orange-600 mb-2">Upcoming Events</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>School Resumption: Jan 8, 2026</li>
            <li>PTA Meeting: Feb 15, 2026</li>
            <li>Inter-house Sports: Mar 10, 2026</li>
            <li>Graduation Ceremony: July 20, 2026</li>
          </ul>
          <a href="/events" className="inline-block mt-6 text-orange-600 font-semibold hover:underline">View All Events</a>
        </div>
        <div className="bg-white rounded-xl p-8 shadow flex flex-col justify-center">
          <h3 className="text-xl font-bold text-orange-600 mb-2">Academic Calendar</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>First Term: Sept - Dec</li>
            <li>Second Term: Jan - Mar</li>
            <li>Third Term: Apr - July</li>
          </ul>
          <a href="/academics/calendar" className="inline-block mt-6 text-orange-600 font-semibold hover:underline">View Calendar</a>
        </div>
      </div>
    </div>
  </section>
);

export default EventsSection;
