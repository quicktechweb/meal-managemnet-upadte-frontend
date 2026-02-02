import React, { useState } from "react";
import { Phone, Mail, Users, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { X, User, MapPin } from "lucide-react";
const mess = {
  mess_name: "Quick Tech mess",
  institute_name: "Quick Tech Institute",
  name: "Kartik Banik Shishir",
  phone: "01517834324",
  email: "kartik@gmail.com",
  img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",
  members: [
    {
      id: 0,
      name: "kartik banik shishir",
      username: "kartik_banik",
      phone: "01517834543",
      email: "kartik@gmail.com",
      role: "mess Admin",
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

const SingleMessProfile = () => {
  const [showAddMessMember, setShowAddMessMember] = useState(false);

  return (
    <div className=" space-y-3">
      {/* Header Section */}
      <div className="relative bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100 rounded-full -translate-y-16 translate-x-16" />

        <div className="relative p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <img
            src={mess.img}
            alt={mess.mess_name}
            className="w-28 h-28 rounded-2xl border border-gray-300 bg-indigo-50"
          />

          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              {mess.mess_name}
            </h1>
            <h3 className="text-sm mt-1 text-gray-900">
              <span className="font-semibold ">Admin Name :</span> {mess?.name}
            </h3>
            <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-2 mt-1">
              <Building2 size={16} /> {mess.institute_name}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone size={14} /> {mess.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} /> {mess.email}
              </div>
            </div>
          </div>

          {/* <button className="px-5 py-2 text-sm font-semibold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
            Edit mess
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
              {mess.members.length}
            </p>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
          <h2 className="text-lg font-bold text-gray-800">Mess Members</h2>
          <button
            onClick={() => setShowAddMessMember(true)}
            className={`px-4 py-2 text-sm flex items-center justify-center rounded-lg cursor-pointer bg-indigo-600 text-white
              `}
          >
            + Add Member
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mess.members.map((member) => (
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

      {showAddMessMember && (
        <AddMessMemberModal onClose={() => setShowAddMessMember(false)} />
      )}
    </div>
  );
};

const AddMessMemberModal = ({ onClose }) => {
  const submit = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Add Mess Member</h3>
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
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-100"
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

export default SingleMessProfile;
