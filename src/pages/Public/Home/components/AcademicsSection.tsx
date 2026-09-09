const AcademicsSection = () => (
  <section className="py-20 bg-gray-50 border-b">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Academics</h2>
        <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our academic programs, curriculum, and commitment to excellence in teaching and learning.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl p-8 shadow">
          <h3 className="text-xl font-bold text-green-700 mb-2">Curriculum</h3>
          <p className="text-gray-700 mb-4">Our curriculum is designed to foster critical thinking, creativity, and lifelong learning.</p>
          <a href="/academics/curriculum" className="text-green-700 font-semibold hover:underline">Learn More</a>
        </div>
        <div className="bg-white rounded-xl p-8 shadow">
          <h3 className="text-xl font-bold text-green-700 mb-2">Departments</h3>
          <p className="text-gray-700 mb-4">We offer a wide range of departments including Science, Arts, Technology, and more.</p>
          <a href="/academics/departments" className="text-green-700 font-semibold hover:underline">View Departments</a>
        </div>
        <div className="bg-white rounded-xl p-8 shadow">
          <h3 className="text-xl font-bold text-green-700 mb-2">Academic Calendar</h3>
          <p className="text-gray-700 mb-4">Stay updated with important dates and events throughout the school year.</p>
          <a href="/academics/calendar" className="text-green-700 font-semibold hover:underline">View Calendar</a>
        </div>
      </div>
    </div>
  </section>
);

export default AcademicsSection;
