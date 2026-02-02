import React, { useState } from "react";
import { Phone, Mail, Users, Building2, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { X, User, MapPin } from "lucide-react";

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
      name: "Kartik Banik Shishir",
      username: "kartik_banik",
      phone: "01517834543",
      email: "kartik@gmail.com",
      role: "Hall Admin",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kartik",
    },
    {
      id: 1,
      name: "Naymur Rahman",
      username: "naymur_rahman",
      phone: "01712345678",
      email: "naymur@gmail.com",
      role: "user",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",
    },
    {
      id: 2,
      name: "Shakil Ahmad",
      username: "shakil_ahmad",
      phone: "01712345678",
      email: "sakil@gmail.com",
      role: "user",
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Shakil",
    },
  ],
};

const SingleHallProfile = () => {
  const [openMembers, setOpenMembers] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);

  const [showAddHallMember, setShowAddHallMember] = useState(false);

  const handleViewMembers = (hall) => {
    setSelectedHall(hall);
    setOpenMembers(true);
  };

  const [isManagingRole, setIsManagingRole] = useState(false);
  const [hallMembers, setHallMembers] = useState(hall.members);

  const handleRoleChange = (id, role) => {
    const adminCount = hallMembers.filter(
      (m) => m.role === "Hall Admin",
    ).length;

    const current = hallMembers.find((m) => m.id === id);

    if (
      current.role === "Hall Admin" &&
      role !== "Hall Admin" &&
      adminCount === 1
    ) {
      alert("At least one Hall Admin is required.");
      return;
    }

    setHallMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role } : m)),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-300 p-6 flex gap-6 items-center">
        <img src={hall.img} className="w-28 h-28 rounded-2xl" />
        <div>
          <h1 className="text-2xl font-bold">{hall.hall_name}</h1>
          <p className="text-sm">
            <span className="font-semibold">Admin:</span> {hall.name}
          </p>
          <p className="flex items-center gap-2 text-gray-500">
            <Building2 size={16} /> {hall.institute_name}
          </p>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="flex gap-1 items-center">
              <Phone size={14} /> {hall.phone}
            </span>
            <span className="flex gap-1 items-center">
              <Mail size={14} /> {hall.email}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-300 p-5 rounded-xl flex gap-4">
          <Users className="text-indigo-600" />
          <div>
            <p className="text-sm text-gray-500">Total Members</p>
            <p className="text-xl font-bold">{hallMembers.length}</p>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-5 rounded-xl flex gap-4">
          <Utensils className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Total Mess</p>
            <p className="text-xl font-bold">{hall.mess.length}</p>
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

      {/* Members */}
      <div className="bg-white rounded-2xl border border-gray-300">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300">
          <h2 className="text-lg font-bold">Hall Members</h2>
          <div className="flex gap-3.5 items-center">
            <button
              onClick={() => setShowAddHallMember(true)}
              className={`px-4 py-2 text-sm flex items-center justify-center rounded-lg cursor-pointer bg-indigo-600 text-white
              `}
            >
              <TiPlus /> Add Member
            </button>

            <button
              onClick={() => setIsManagingRole((p) => !p)}
              className={`px-4 py-2 text-sm rounded-lg cursor-pointer ${
                isManagingRole ? "bg-indigo-600 text-white" : "bg-gray-100"
              }`}
            >
              {isManagingRole ? "Done" : "Manage Role"}
            </button>
          </div>
        </div>

        <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {hallMembers.map((member) => (
            <div
              key={member.id}
              className="relative border  border-gray-300 rounded-xl p-4"
            >
              {/* Role */}
              <div className="absolute top-2 right-2">
                {isManagingRole ? (
                  <select
                    value={member.role}
                    onChange={(e) =>
                      handleRoleChange(member.id, e.target.value)
                    }
                    className="text-xs border border-gray-300 rounded-lg px-2 py-1"
                  >
                    <option value="Hall Admin">Hall Admin</option>
                    <option value="user">User</option>
                  </select>
                ) : (
                  <span className="text-xs bg-indigo-500 text-white px-2 py-1 rounded-2xl">
                    {member.role}
                  </span>
                )}
              </div>

              <div className="flex gap-3 items-center">
                <img src={member.img} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="font-semibold w-[100px]">{member.name}</h3>
                  <p className="text-xs text-gray-500">@{member.username}</p>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                <p>{member.email}</p>
                <p>{member.phone}</p>
              </div>

              <Link
                to="/dashboard/profile"
                className="block mt-3 text-center text-xs py-2 bg-indigo-50 text-indigo-600 rounded-lg"
              >
                View Profile
              </Link>
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

      {showAddHallMember && (
        <AddHallMemberModal onClose={() => setShowAddHallMember(false)} />
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
        <h4 className="font-semibold   w-[100px] text-sm">{member.name}</h4>
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

const AddHallMemberModal = ({ onClose }) => {
  const submit = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Add Hall Member</h3>
            <p className="text-sm text-gray-500">
              Fill in the member information below
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <Input
              label="Full Name"
              placeholder="Member name"
              icon={<User size={16} />}
            />
            <Input label="Username" placeholder="Username" />

            {/* Contact */}
            <Input
              label="Email"
              placeholder="Email address"
              icon={<Mail size={16} />}
            />
            <Input
              label="Phone"
              placeholder="Phone number"
              icon={<Phone size={16} />}
            />

            {/* Parents */}
            <Input label="Father's Name" placeholder="Father name" />
            <Input label="Mother's Name" placeholder="Mother name" />

            {/* Guardian */}
            <Input label="Guardian Name" placeholder="Guardian name" />
            <Input label="Date of Birth" type="date" />

            {/* Personal */}
            <Input label="Nationality" placeholder="Nationality" />
            <Input label="Religion" placeholder="Religion" />

            <Input label="Gender" placeholder="Gender" />

            {/* Address */}
            <Input
              label="Present Address"
              placeholder="Present address"
              icon={<MapPin size={16} />}
            />
            <Input
              label="Permanent Address"
              placeholder="Permanent address"
              icon={<MapPin size={16} />}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-300 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="px-5 py-2 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save Member
          </button>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, type = "text", placeholder, icon }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-600">{label}</label>
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full border border-gray-300  rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
          icon ? "pl-9" : ""
        }`}
      />
    </div>
  </div>
);

export default SingleHallProfile;
