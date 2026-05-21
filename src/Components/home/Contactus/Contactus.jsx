import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Clock3,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import useAuth from "../../../Hooks/useAuth";

const Contactus = () => {
      const { user, loading, token } = useAuth();

console.log("token:", token);
console.log("loading:", loading);
console.log("user:", user);
console.log("name:", user?.name);
console.log("email:", user?.email);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">

      {/* Soft Background Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px]  rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-100 blur-[140px] rounded-full"></div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 py-10">

        {/* Navbar */}
        <div className="flex items-center justify-between mb-16">

          <h1 className="text-2xl font-bold tracking-tight">
            Support
          </h1>

          <button className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-black transition-all shadow-lg">
            Live Support
            <ArrowRight size={15} />
          </button>

        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>

            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-100">
              <Sparkles size={15} />
              Premium Customer Support
            </div>

            <h2 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight mb-6">
              Let’s solve
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {" "}your problems.
              </span>
            </h2>

            <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-10">
              Need help with your account, billing, integrations, or technical
              support? Our team is available 24/7 with fast and professional
              assistance.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">

              <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-3xl font-bold mb-1">24/7</h3>
                <p className="text-sm text-gray-500">Support</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-3xl font-bold mb-1">2min</h3>
                <p className="text-sm text-gray-500">Avg Reply</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-3xl font-bold mb-1">99%</h3>
                <p className="text-sm text-gray-500">Satisfaction</p>
              </div>

            </div>

            {/* Contact Cards */}
            <div className="space-y-4">

              <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">

                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Phone size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Phone Support
                  </p>

                  <h4 className="text-lg font-semibold">
                    +1 (800) 555-0199
                  </h4>
                </div>

              </div>

              <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">

                <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <Mail size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Email Address
                  </p>

                  <h4 className="text-lg font-semibold">
                    support@nexa.com
                  </h4>
                </div>

              </div>

              <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all">

                <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <MapPin size={24} />
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Office Location
                  </p>

                  <h4 className="text-lg font-semibold">
                    San Francisco, California
                  </h4>
                </div>

              </div>

            </div>

          </div>

          {/* Right Side Form */}
          <div className="relative">

            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-violet-100 blur-3xl rounded-[40px]"></div>

            <div className="relative bg-white border border-gray-200 rounded-[40px] p-8 md:p-10 shadow-2xl">

              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">

                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-600 mb-3 font-semibold">
                    Contact Form
                  </p>

                  <h3 className="text-3xl md:text-4xl font-bold">
                    Send a message
                  </h3>
                </div>

                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-100 text-sm font-medium">
                  <MessageCircle size={15} />
                  Online now
                </div>

              </div>

              <form className="space-y-6">

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm text-gray-600 mb-2 font-medium">
                      Full Name
                    </label>

                    <input
                      type="text"
                      placeholder="John Carter"
                      className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-2 font-medium">
                      Email Address
                    </label>

                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">
                    Subject
                  </label>

                  <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full h-14 bg-gray-50 border border-gray-200 rounded-2xl px-5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-2 font-medium">
                    Message
                  </label>

                  <textarea
                    rows="6"
                    placeholder="Write your message..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-4 pt-2">

                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Clock3 size={15} />
                    Average response time: 2 minutes
                  </div>

                  <button
                    type="submit"
                    className="h-14 px-7 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold flex items-center gap-2 hover:scale-[1.03] transition-all shadow-xl shadow-blue-200"
                  >
                    Send Message
                    <Send size={17} />
                  </button>

                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contactus;