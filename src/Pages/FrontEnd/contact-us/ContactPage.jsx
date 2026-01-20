import React from "react";
import { Mail, Phone, MapPin, Send, Globe } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl shadow-2xl bg-white">
        {/* Contact Information */}
        <div className="bg-indigo-700 p-5  md:p-10 lg:p-16 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-xl md:text-2xl  lg:text-4xl font-extrabold tracking-tight">
              Let's talk.
            </h2>
            <p className="mt-2 lg:mt-4 text-indigo-100 text-sm md:text-base lg:text-lg">
              Have a query in mind or just want to say hi? We'd love to hear
              from you.
            </p>

            <div className="mt-3 md:mt-6 lg:mt-12 space-y-3 lg:space-y-6">
              <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="bg-indigo-600 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-indigo-200">
                    Email us at
                  </p>
                  <p className="font-medium text-sm lg:text-base">
                    quick@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="bg-indigo-600 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className=" text-indigo-200 text-xs lg:text-sm">Call us</p>
                  <p className="font-medium text-sm lg:text-base">
                    +8801524563254
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="bg-indigo-600 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className=" text-indigo-200 text-xs lg:text-sm">
                    Visit us
                  </p>
                  <p className="font-medium text-sm lg:text-base">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 md:mt-6 lg:mt-12 flex space-x-3 lg:space-x-6">
            <Globe className="w-6 h-6 cursor-pointer hover:text-indigo-300 transition-colors" />
            <span className="text-indigo-200 font-medium text-sm lg:text-base italic">
              Follow our journey
            </span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="p-5  md:p-10 lg:p-16">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <select className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all">
                <option>General Inquiry</option>
                <option>Project Proposal</option>
                <option>Technical Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="4"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center space-x-2 py-2 lg:py-4 px-6 border border-transparent text-sm lg:text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02] "
            >
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
