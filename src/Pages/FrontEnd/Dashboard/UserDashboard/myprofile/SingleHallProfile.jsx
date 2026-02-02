import React, { useState } from "react";
import { Phone, Mail, Users, Building2, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
const avatar =
  "https://ui-avatars.com/api/?background=EEF2FF&color=4F46E5&name=";
const hall = {
  hall_name: "Karjon Hall",
  institute_name: "Quick Tech Institute",
  name: "Kartik Banik Shishir",
  phone: "01517834324",
  email: "kartik@gmail.com",
  img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",

  mess: [
    {
      id: 1,
      name: "Quick Tech Mess",
      email: "mess@gmail.com",

      username: "mess_1",
      phone_number: "+8801711111111",
      occupation_type: "student",
      occupation: {
        department_name: "CSE",
        year: "2nd Year",
      },
      member: [
        {
          id: 0,
          name: "Quick Tech Mess",
          email: "quicktech@gmail.com",
          role: "Mess Admin",
          username: "mess_1",
          phone_number: "+8801711111111",
          occupation_type: "student",
          occupation: {
            department_name: "CSE",
            year: "2nd Year",
          },
        },
        {
          id: 1,
          name: "Hasan Mahmud",
          email: "hasan@gmail.com",
          role: "user",
          username: "hasan_mahmud",
          phone_number: "+8801711111111",
          occupation_type: "student",
          occupation: {
            department_name: "CSE",
            year: "2nd Year",
          },
        },
        {
          id: 2,
          name: "Rakib Hossain",
          email: "rakib@gmail.com",
          username: "rakib_h",
          role: "user",
          phone_number: "+8801722222222",
          occupation_type: "job_holder",
          occupation: {
            post_name: "Junior Developer",
            company_name: "BJIT",
          },
        },
      ],
      institute_info: {
        institute_name: "Quick Tech Institute",
        institute_address: "Silicon Tower, Dhaka",
      },
    },
  ],

  members: [
    {
      id: 0,
      name: "kartik banik shishir",
      username: "kartik_banik",
      phone: "01517834543",
      email: "kartik@gmail.com",
      role: "Hall Admin",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",
    },
    {
      id: 1,
      name: "Naymur Rahman",
      username: "naymur_rahman",
      email: "naymur@gmail.com",
      phone: "01712345678",
      role: "user",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",
    },
    {
      id: 2,
      name: "Shakil Ahmad",
      username: "shakil_ahmad",
      email: "sakil@gmail.com",
      phone: "01712345678",
      role: "user",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shakil",
    },
  ],
};

const SingleHallProfile = () => {
  const [openMembers, setOpenMembers] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);

  const handleViewMembers = (hall) => {
    setSelectedHall(hall);
    setOpenMembers(true);
  };

  return (
    <div className=" space-y-3">
      {/* Header Section */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100 rounded-full -translate-y-16 translate-x-16" />

        <div className="relative p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={hall.img}
            alt={hall.hall_name}
            className="w-28 h-28 rounded-2xl border bg-indigo-50"
          />

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              {hall.hall_name}
            </h1>
            <h3 className="text-sm mt-1 text-gray-900">
              <span className="font-semibold ">Admin Name :</span> {hall?.name}
            </h3>
            <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-2 mt-1">
              <Building2 size={16} /> {hall.institute_name}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone size={14} /> {hall.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} /> {hall.email}
              </div>
            </div>
          </div>

          {/* <button className="px-5 py-2 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
            Edit Hall
          </button> */}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-gray-300 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            <Users className="text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Members</p>
            <p className="text-xl font-bold text-gray-800">
              {hall.members.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-300 p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            <Users className="text-indigo-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Mess</p>
            <p className="text-xl font-bold text-gray-800">
              {hall.mess.length}
            </p>
          </div>
        </div>
      </div>

      {/* Institute Mess List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Utensils className="text-orange-500" />
          <h3 className="text-xl font-bold"> Mess List</h3>
        </div>

        <div className="flex flex-wrap gap-6">
          {hall.mess.map((mess) => (
            <div
              key={mess.id}
              className="w-[280px] bg-white rounded-2xl border border-gray-300 shadow-sm"
            >
              {/* Header */}
              <div className="py-3 px-3 flex gap-4 items-center">
                <img
                  src={`${avatar}${mess.name}`}
                  alt={mess.name}
                  className="w-12 h-12 rounded-xl"
                />
                <div>
                  <h4 className="font-bold">{mess.name}</h4>
                  <p className="text-sm text-gray-500">
                    {mess.institute_info.institute_name}
                  </p>
                </div>
              </div>

              {/* Info */}
              <div className="border-t border-gray-300 py-3 px-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Members</span>
                  <span className="font-semibold text-orange-600">
                    {mess.member.length}
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <Phone size={14} /> {mess.phone_number}
                </div>

                <div className="flex gap-2 items-center">
                  <Mail size={14} /> {mess.email}
                </div>
              </div>

              {/* Actions */}
              <div className="px-4 pb-2 flex gap-2">
                <button
                  onClick={() =>
                    handleViewMembers({
                      ...mess,
                      member: mess.member,
                    })
                  }
                  className="flex-1 cursor-pointer bg-orange-500 text-white text-xs py-2 rounded-lg"
                >
                  View Members
                </button>

                <Link
                  to="/dashboard/mess-profile"
                  className="flex-1 bg-gray-100 text-center text-xs py-2 rounded-lg"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Members Section */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
          <h2 className="text-lg font-bold text-gray-800">Hall Members</h2>
          {/* <button className="px-4 py-2 text-sm font-semibold rounded-lg bg-gray-100 hover:bg-gray-200">
            + Add Member
          </button> */}
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hall.members.map((member) => (
            <div
              key={member.id}
              className="rounded-xl border relative  border-gray-300 p-4 hover:shadow-md transition"
            >
              <div className="absolute text-xs top-2 right-2 bg-indigo-500 text-white px-2 py-1 rounded-2xl ">
                {member?.role}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-12 h-12 rounded-full bg-gray-100"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-xs text-gray-500">@{member.username}</p>
                </div>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p>{member.email}</p>
                <p>{member.phone}</p>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  to={"/dashboard/profile"}
                  className="flex-1 flex items-center justify-center text-xs py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  View
                </Link>
                {/* <button className="flex-1 text-xs py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                  Remove
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {openMembers && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white max-w-4xl w-full rounded-2xl">
            <div className="flex justify-between p-5 border-b border-gray-300">
              <div>
                <h3 className="font-bold">{selectedHall.name} Members</h3>
                <p className="text-sm text-gray-500">
                  Total {selectedHall.member.length}
                </p>
              </div>

              <button onClick={() => setOpenMembers(false)}>✕</button>
            </div>

            <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedHall.member.map((m) => (
                <MemberCard key={m.id} member={m} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MemberCard = ({ member }) => (
  <div className="border relative border-gray-300 rounded-xl p-4">
    <div className="absolute text-xs top-2 right-2 bg-indigo-500 text-white px-2 py-1 rounded-2xl ">
      {member?.role}
    </div>
    <div className="flex gap-3 items-center">
      <img src={`${avatar}${member.name}`} className="w-10 h-10 rounded-full" />
      <div>
        <h4 className="font-semibold w-[100px] text-sm">{member.name}</h4>
        <p className="text-xs text-gray-500">@{member.username}</p>
      </div>
    </div>

    <div className="mt-3 text-sm space-y-1">
      <div className="flex gap-2 items-center">
        <Phone size={14} /> {member.phone_number}
      </div>
      <div className="flex gap-2 items-center">
        <Mail size={14} /> {member.email}
      </div>

      {member.occupation_type === "student" && (
        <p className="text-xs">
          🎓 {member.occupation.department_name} • {member.occupation.year}
        </p>
      )}

      {member.occupation_type === "job_holder" && (
        <p className="text-xs">
          💼 {member.occupation.post_name} @ {member.occupation.company_name}
        </p>
      )}
    </div>

    <Link
      to="/dashboard/profile"
      className="block mt-3 text-center text-xs py-2 bg-indigo-50 text-indigo-600 rounded-lg"
    >
      Profile
    </Link>
  </div>
);
export default SingleHallProfile;
