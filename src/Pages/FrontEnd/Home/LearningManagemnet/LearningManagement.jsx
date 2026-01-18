import { BookOpen, CheckCircle, CreditCard, Star } from "lucide-react";

const LearningManagement = () => {
  return (
    <section className="w-full bg-white max-w-6xl mx-auto ">
          <div>
              <h2 className="text-3xl text-center md:text-4xl font-bold mb-4">
          Learning Management System
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 max-w-2xl mx-auto mb-16 text-center">
          Rapidiously morph transparent internal or sources Whereas resource
          sucking e-business. Conveniently innovate compelling internal.
        </p>
        </div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        
        {/* LEFT IMAGE SECTION */}
        <div className="relative flex justify-center">
          
          {/* Orange Background Card */}
          <div className="absolute left-16 top-10 w-72 h-96 bg-orange-500 rounded-2xl z-0"></div>

          {/* Girl Image */}
          <img
            src="https://appbeats.themetags.com/img/image-10.png" // 🔁 replace with your image path
            alt="Student"
            className="relative z-10 w-72  rounded-xl"
          />

          {/* Floating Alert Card */}
          <div className="absolute bottom-8 -right-10 bg-white shadow-xl rounded-xl p-5 w-64 z-20">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 text-orange-500 flex items-center justify-center rounded-full">
                ✉️
              </div>
              <div>
                <p className="font-semibold text-sm">New Message Alert</p>
                <p className="text-xs text-gray-400">15 min ago</p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                📚
              </div>
              <p className="text-sm font-medium">
                84,434 Courses in <br />
                <span className="text-gray-500">941 Subjects</span>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT SECTION */}
        <div>
          <p className="text-orange-500 font-semibold mb-3">
            Join over 20,000+ Global Students
          </p>

          <h1 className="text-4xl font-bold leading-tight mb-6">
            Get instant alert on <br /> your inbox
          </h1>

          <p className="text-gray-600 mb-8 max-w-lg">
            Build your skill from world class universities and companies.
            You can learn online and earn certifications and degrees.
            Build your skill from world class universities and companies.
            You can learn online and earn certifications and degrees.
            Build your skill from world class universities and companies.
            You can learn online and earn certifications and degrees.
          </p>

          <button className="px-8 py-3 border border-purple-500 text-purple-600 rounded-full font-semibold hover:bg-purple-500 hover:text-white transition">
            Learn More
          </button>
        </div>

      </div>


     <div className="w-full bg-white py-6">
  <div className="max-w-5xl mx-auto ">
    
    {/* ROW */}
    <div className="flex flex-wrap items-center justify-start text-gray-800 space-x-6">

      {/* Item 1 */}
      <div className="flex items-center gap-1 font-semibold">
        <CheckCircle className="text-green-500" size={18} />
        <span>Free Course</span>
      </div>

      {/* Item 2 */}
      <div className="flex items-center gap-1 font-semibold">
        <CheckCircle className="text-green-500" size={18} />
        <span>Discount Course</span>
      </div>

      {/* Item 3 */}
      <div className="flex items-center gap-1 font-semibold">
        <CheckCircle className="text-green-500" size={18} />
        <span>On-Demand</span>
      </div>

    </div>

  </div>
</div>


       <div className="relative  z-30">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">

          {/* Item 1 */}
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <BookOpen className="text-purple-600" size={22} />
            </div>
            <div>
              <p className="font-semibold text-sm">
                84,434 Courses in
              </p>
              <p className="text-gray-500 text-sm">
                941 Subjects
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Star className="text-green-600" size={22} />
            </div>
            <div>
              <p className="font-semibold text-sm">
                Rated Excellent on
              </p>
              <p className="text-gray-500 text-sm">
                Trustpilot
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <CreditCard className="text-red-500" size={22} />
            </div>
            <div>
              <p className="font-semibold text-sm">
                Pay by Installments
              </p>
              <p className="text-gray-500 text-sm">
                (0% APR)
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
    </section>
  );
};

export default LearningManagement;
