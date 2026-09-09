const AdmissionsSection = () => (
  <section className="py-20 bg-white border-b">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Admissions</h2>
        <div className="w-20 h-1 bg-brand-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join our vibrant learning community! Learn about our admission process, requirements, and how to apply for the next academic session.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 rounded-xl p-8 shadow">
          <h3 className="text-2xl font-bold text-brand-500 mb-2">How to Apply</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Review admission requirements for your program</li>
            <li>Complete the online application form</li>
            <li>Submit required documents</li>
            <li>Attend entrance examination/interview</li>
            <li>Receive admission decision</li>
          </ul>
          <a href="/apply" className="inline-block mt-6 bg-brand-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-600 transition-colors">Apply Now</a>
        </div>
        <div className="bg-gray-50 rounded-xl p-8 shadow flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-brand-500 mb-2">Admission Requirements</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Completed application form</li>
            <li>Birth certificate</li>
            <li>Previous academic records</li>
            <li>Passport photograph</li>
            <li>Entrance exam/interview (where applicable)</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default AdmissionsSection;
