import React, { useState } from "react";
import {
  Phone,
  Mail,
  Edit3,
  ExternalLink,
  Users,
  Utensils,
  Zap,
  Receipt,
  Globe,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

const instituteHall = [
  {
    id: 1,
    username: "naymur_1",
    institute_id: 1,
    institute_name: "Quick Tech",
    email: "naymur@gmail.com",
    name: "Naymur Rahman",
    hall_name: "karjon hall",
    hall_id: 1,
    phone: "01517834324",
    members: [
      {
        id: 1,
        name: "Naymur Rahman",
        username: "naymur_rahman",
        email: "naymur@gmail.com",
        phone: "01712345678",
        fathersName: "Abdul Rahman",
        mothersName: "Fatema Begum",
        guardiansName: "Abdul Rahman",
        dateOfBirth: "1998-06-15",
        nationality: "Bangladeshi",
        religion: "Islam",
        maritalStatus: "Unmarried",
        city: "Dhaka",
        presentAddress: "House 12, Road 5, Dhanmondi, Dhaka",
        permanentAddress: "Village: Mirpur, District: Dhaka",
        institutionName: "Quick Tech Institute",
        hall_id: 1,
        hall_name: "karjon_hall",
        img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",
      },
      {
        id: 2,
        name: "Shakil Ahmad",
        username: "shakil_ahmad",
        email: "sakil@gmail.com",
        phone: "01712345678",
        fathersName: "Abdul Rahman",
        mothersName: "Fatema Begum",
        guardiansName: "Abdul Rahman",
        dateOfBirth: "1998-06-15",
        nationality: "Bangladeshi",
        religion: "Islam",
        maritalStatus: "Unmarried",
        city: "Dhaka",
        presentAddress: "House 12, Road 5, Dhanmondi, Dhaka",
        permanentAddress: "Village: Mirpur, District: Dhaka",
        institutionName: "Quick Tech Institute",
        hall_id: 1,
        hall_name: "karjon_hall",
        img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",
      },
    ],
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",
  },
];

const instituteData = {
  id: 0,
  username: "quicktech_1",
  institute_name: "Quick Tech Institute",
  phone: "+880 1517 834534",
  email: "quicktech@gmail.com",
  total_member: 20,
  provide_meal: "Outside Catering",
  electricity_bill: true,
  staff_bill: true,
  address: "123 Tech Avenue, Silicon Tower",
  img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakil",
};

const InstituteProfile = () => {
  const [deleteMode, setDeleteMode] = useState(false);

  const [openMembers, setOpenMembers] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);

  const handleViewMembers = (hall) => {
    setSelectedHall(hall);
    setOpenMembers(true);
  };

  const [showEditModal, setShowEditModal] = useState(false);

  // Helper component for Stat Cards
  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {label}
          </p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className=" max-w-7xl mx-auto antialiased text-gray-800 flex flex-col gap-4">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Institute Profile
          </h1>
          <p className="text-gray-500">
            Manage your institution's public identity and operational details.
          </p>
        </div>
        <button
          onClick={() => setShowEditModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-100 cursor-pointer"
        >
          <Edit3 size={18} />
          Edit Profile
        </button>
      </div>

      {/* 2. Top Banner / Main Info */}
      <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        <div className="relative">
          <img
            src={instituteData.img}
            alt="Profile"
            className="w-32 h-32 rounded-3xl bg-indigo-50 border-4 border-white shadow-xl object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900">
            {instituteData.institute_name}
          </h2>
          <p className="text-indigo-600 font-medium mb-4">
            @{instituteData.username}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-400" />
              {instituteData.email}
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-400" />
              {instituteData.phone}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-700 font-semibold transition-colors">
            <Globe size={18} />
            Visit Website
          </button>
        </div>
      </div>

      {/* 3. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={Users}
          label="Total Members"
          value={instituteData.total_member}
          color="bg-blue-500"
        />
        <StatCard
          icon={Utensils}
          label="Meal Provision"
          value={instituteData.provide_meal}
          color="bg-orange-500"
        />
        <StatCard
          icon={ShieldCheck}
          label="Verification"
          value="Verified"
          color="bg-emerald-500"
        />
      </div>

      {/* 4. Detailed Operations Section */}
      <div className="w-full gap-8">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Receipt className="text-indigo-600" size={20} />
            Billing & Compliance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
              <span className="font-medium">Electricity Responsibility</span>
              <StatusBadge active={instituteData.electricity_bill} />
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl">
              <span className="font-medium">Staff Payroll Managed</span>
              <StatusBadge active={instituteData.staff_bill} />
            </div>
          </div>
        </div>
      </div>

      {/* 5. all member lists */}

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-indigo-600" />
            <h5 className="text-xl font-bold">Institute Hall List</h5>
          </div>

          {/* <div className="flex gap-2">
            <button
              onClick={() => setDeleteMode((p) => !p)}
              className={`px-4 py-2 rounded-lg text-sm cursor-pointer font-medium transition ${
                deleteMode
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-red-100"
              }`}
            >
              {deleteMode ? "Cancel Delete" : "Delete Member"}
            </button>

            <button
              // onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
            >
              Add Member
            </button>
          </div> */}
        </div>

        {/* Member Cards */}
        <div className="flex flex-wrap gap-6">
          {instituteHall.map((hall) => (
            <div
              key={hall.id}
              className="group relative w-[280px] rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* Decorative bg */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-indigo-100 rounded-full group-hover:scale-150 transition-transform duration-500" />

              {/* Header */}
              <div className="p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <img
                    src={hall.img}
                    alt={hall.institute_name}
                    className="w-10 h-10 rounded-full"
                  />
                </div>

                <div className="z-30">
                  <h3 className="text-lg font-bold text-gray-800">
                    {hall.hall_name}
                  </h3>
                  <p className="text-sm text-gray-500">{hall.institute_name}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Info */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Members</span>
                  <span className="font-semibold text-indigo-600">
                    {hall.members.length}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={14} className="text-gray-400" />
                  {hall.phone}
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={14} className="text-gray-400" />
                  {hall.email}
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 pt-0 flex gap-3">
                <button
                  onClick={() => handleViewMembers(hall)}
                  className="flex-1 cursor-pointer text-xs font-semibold py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  View Members
                </button>

                <Link
                  to={"/dashboard/hall-profile"}
                  className="flex-1 cursor-pointer text-xs font-semibold py-2 rounded-lg flex items-center justify-center bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}

          {openMembers && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      {selectedHall?.hall_name} Members
                    </h2>
                    <p className="text-sm text-gray-500">
                      Total {selectedHall?.members.length} members
                    </p>
                  </div>

                  <button
                    onClick={() => setOpenMembers(false)}
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {selectedHall?.members.map((member) => (
                      <MemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ active }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-bold ${active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
  >
    {active ? "INSTITUTE COVERED" : "NOT COVERED"}
  </span>
);

export default InstituteProfile;

// const AddMemberModal = ({ onClose, onAdd }) => {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");

//   const submitHandler = () => {
//     if (!name || !phone) return;

//     onAdd({
//       id: Date.now(),
//       name,
//       phone,
//       img: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
//       <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 cursor-pointer right-4 text-gray-400 hover:text-gray-600"
//         >
//           <X size={18} />
//         </button>

//         <h3 className="text-lg font-bold mb-4">Add New Member</h3>

//         <div className="space-y-2">
//           <input
//             type="file"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2"
//           />

//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2"
//           />

//           <input
//             type="text"
//             placeholder="Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2"
//           />
//         </div>

//         <div className="flex justify-end gap-2 mt-6">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 cursor-pointer rounded bg-gray-100"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={submitHandler}
//             className="px-4 py-2 rounded bg-indigo-600 cursor-pointer text-white"
//           >
//             Add Member
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// edit member modal

const EditProfileModal = ({ onClose, onEdit }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submitHandler = () => {
    if (!name || !phone) return;

    onEdit({
      id: Date.now(),
      name,
      phone,
      img: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 cursor-pointer right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-bold mb-4">Edit Your Profile</h3>

        <div className="space-y-2">
          <input
            type="file"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2"
          />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 cursor-pointer rounded bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={submitHandler}
            className="px-4 py-2 rounded bg-indigo-600 cursor-pointer text-white"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

const MemberCard = ({ member }) => {
  return (
    <div className="group relative rounded-xl border border-gray-100 bg-white p-4 shadow-sm hover:shadow-md transition">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <img
          src={member.img}
          alt={member.name}
          className="w-12 h-12 rounded-full border"
        />

        <div>
          <h4 className="font-semibold text-gray-800">{member.name}</h4>
          <p className="text-xs text-gray-500">@{member.username}</p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Phone size={14} className="text-gray-400" />
          {member.phone}
        </div>

        <div className="flex items-center gap-2">
          <Mail size={14} className="text-gray-400" />
          {member.email}
        </div>

        <div className="text-xs text-gray-500">🎓 {member.institutionName}</div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex gap-2">
        <Link
          to={"/dashboard/profile"}
          className="flex-1 text-xs flex items-center justify-center py-2 rounded-lg bg-indigo-50 text-indigo-600 font-bold hover:bg-indigo-100"
        >
          Profile
        </Link>
      </div>
    </div>
  );
};
