import React from "react";
import { User, Phone, Mail, Edit3, Users, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const MyProfile = () => {
  // Sample data for the list - you can map through your actual data here
  const messMembers = [
    {
      id: 1,
      name: "Naymur Rahman",
      phone: "01517834324",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",
    },
    {
      id: 2,
      name: "Sakil Ahmed",
      phone: "01712345678",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakil",
    },
  ];

  return (
    <div className="pr-4 pt-4 pb-4 antialiased text-gray-800">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-gray-100 gap-4">
        <div>
          <h4 className="text-2xl font-bold tracking-tight">My Profile</h4>
          <p className="text-sm text-gray-500">
            Manage your account settings and information.
          </p>
        </div>

        <button className="flex cursor-pointer items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md active:scale-95">
          <Edit3 size={16} />
          Edit Profile
        </button>
      </div>

      <div></div>

      {/* Profile Information Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-10">
        <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-200">
          <h5 className="font-semibold text-gray-700">General Information</h5>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-1 flex items-center gap-4 ">
              <div className="w-14 h-14  rounded-full border-2 border-indigo-100 group-hover:border-indigo-400 transition-colors duration-300">
                <img
                  src={"https://api.dicebear.com/7.x/avataaars/svg?seed=Sakil"}
                  alt={"hello"}
                  className="w-full h-full rounded-full bg-gray-50 object-cover"
                />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-400 mb-1">
                  <Mail size={14} />
                  <h6 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    Full Name
                  </h6>
                </div>
                <p className="text-gray-900 font-semibold text-lg">
                  Quick Tech
                </p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Phone size={14} />
                <h6 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Phone Number
                </h6>
              </div>
              <p className="text-gray-900 font-semibold text-lg">01517834534</p>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Mail size={14} />
                <h6 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Email
                </h6>
              </div>
              <p className="text-gray-900 font-semibold text-lg">
                quicktech@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mess Member List Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Users size={20} className="text-indigo-600" />
          <h5 className="text-xl font-bold">Mess Member List</h5>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {messMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />

              <div className="relative flex flex-col items-center text-center">
                <div className="w-20 h-20 mb-4 rounded-full p-1 border-2 border-indigo-100 group-hover:border-indigo-400 transition-colors duration-300">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full rounded-full bg-gray-50 object-cover"
                  />
                </div>

                <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {member.name}
                </h3>

                <div className="flex items-center gap-1.5 text-gray-500 mt-1">
                  <Phone size={13} className="text-gray-400" />
                  <p className="text-sm font-medium">{member.phone}</p>
                </div>

                <Link className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-50 text-gray-600 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-200">
                  View Details
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
