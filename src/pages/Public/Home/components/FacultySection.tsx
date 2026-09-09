const FacultySection = () => (
  <section className="py-20 bg-white border-b">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Faculty</h2>
        <div className="w-20 h-1 bg-orange-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Meet our dedicated and highly qualified faculty members who inspire and guide our students every day.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-xl p-8 shadow">
          <h3 className="text-xl font-bold text-orange-600 mb-2">Our Teachers</h3>
          <p className="text-gray-700 mb-4">Our teachers are passionate educators committed to student success and personal growth.</p>
          <a href="/faculty/teachers" className="text-orange-600 font-semibold hover:underline">Meet the Team</a>
        </div>
        <div className="bg-gray-50 rounded-xl p-8 shadow">
          <h3 className="text-xl font-bold text-orange-600 mb-2">Professional Development</h3>
          <p className="text-gray-700 mb-4">We invest in ongoing training and development to ensure our faculty stay at the forefront of education.</p>
          <a href="/faculty/development" className="text-orange-600 font-semibold hover:underline">Learn More</a>
        </div>
      </div>
    </div>
  </section>
);

export default FacultySection;
