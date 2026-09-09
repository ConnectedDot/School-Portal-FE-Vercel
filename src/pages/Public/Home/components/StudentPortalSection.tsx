const StudentPortalSection = () => (
  <section className="py-20 bg-white border-b">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Portal</h2>
        <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Access grades, assignments, schedules, and important updates through our secure student portal.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-xl p-8 shadow">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Portal Features</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>View grades and transcripts</li>
            <li>Check class schedules</li>
            <li>Submit assignments</li>
            <li>Receive school notifications</li>
          </ul>
          <a href="/portal/login" className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Login to Portal</a>
        </div>
        <div className="bg-gray-50 rounded-xl p-8 shadow flex flex-col justify-center">
          <h3 className="text-xl font-bold text-blue-700 mb-2">Parent Access</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Monitor student progress</li>
            <li>Communicate with teachers</li>
            <li>View attendance records</li>
          </ul>
          <a href="/portal/parent" className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Parent Login</a>
        </div>
      </div>
    </div>
  </section>
);

export default StudentPortalSection;
