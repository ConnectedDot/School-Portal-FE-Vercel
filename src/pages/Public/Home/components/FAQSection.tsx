const FAQSection = () => (
  <section className="py-20 bg-gray-50 border-b">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="w-20 h-1 bg-brand-500 mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about admissions, academics, student life, and more.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-gray-900 mb-2">How do I apply for admission?</h3>
            <p className="text-gray-700">Visit our Admissions section and complete the online application form. Follow the instructions and submit all required documents.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-gray-900 mb-2">What programs are offered?</h3>
            <p className="text-gray-700">We offer primary, secondary, and international programs, as well as a variety of extracurricular activities and clubs.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-gray-900 mb-2">How can parents access the student portal?</h3>
            <p className="text-gray-700">Parents can log in to the portal using their credentials to monitor student progress, attendance, and communicate with teachers.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-bold text-gray-900 mb-2">Who do I contact for guidance and counseling?</h3>
            <p className="text-gray-700">Our guidance counselors are available for academic, personal, and career support. Visit the Guidance section for more information.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FAQSection;
