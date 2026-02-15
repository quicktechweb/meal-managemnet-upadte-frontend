import React, { useState } from "react";
import {
  Phone,
  Mail,
  Edit3,
  Globe,
  Users,
  Utensils,
  ShieldCheck,
  MapPin,
  User,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { TiPlus } from "react-icons/ti";

/* -------------------- MOCK DATA -------------------- */
const instituteData = {
  username: "quicktech_1",
  email: "quicktech@gmail.com",
  phone_number: "+8801517834534",
  address: "123 Tech Avenue, Silicon Tower, Dhaka",
  institute_name: "Quick Tech Institute",
  memberList: [
    {
      name: "Naymur Rahman",
      username: "naymur_rahman",
      email: "naymur@gmail.com",
      password: "Password@123",
      phone: "01712345678",
      fathersName: "Abdul Rahman",
      mothersName: "Fatema Begum",
      guardiansName: "Abdul Rahman",
      dateOfBirth: "1998-06-15",
      nationality: "Bangladeshi",
      religion: "Islam",
      education: "BSc in Computer Science",
      maritalStatus: "Unmarried",
      city: "Dhaka",
      presentAddress: "House 12, Road 5, Dhanmondi, Dhaka",
      permanentAddress: "Village: Mirpur, District: Dhaka",
      institutionName: "Dhaka University",
      hostelBranch: "Karjon Hall",
      occupation: {
        post_name: "Junior Developer",
        company_name: "BJIT",
      },
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",
    },
  ],
  hall: [
    {
      id: 1,
      name: "Karjon Hall",
      email: "hall@gmail.com",

      username: "karjon_1",
      phone_number: "+8801711111111",
      occupation_type: "student",
      occupation: {
        department_name: "CSE",
        year: "2nd Year",
      },
      member: [
        {
          id: 0,
          name: "Karjon Hall",
          email: "hall@gmail.com",
          role: "Hall Admin",
          username: "karjon_1",
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
      institute_info: {
        institute_name: "Quick Tech Institute",
        institute_address: "Silicon Tower, Dhaka",
      },
    },
  ],
};

/* Avatar fallback */
const avatar =
  "https://ui-avatars.com/api/?background=EEF2FF&color=4F46E5&name=";

/* -------------------- MAIN COMPONENT -------------------- */
const InstituteProfile = () => {
  const [profile, setProfile] = useState(instituteData);
  const [openMembers, setOpenMembers] = useState(false);
  const [selectedHall, setSelectedHall] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [instituteMember, setInstituteMember] = useState(false);
  const [showAddHall, setShowAddHall] = useState(false);

  const handleViewMembers = (hall) => {
    setSelectedHall(hall);
    setOpenMembers(true);
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-5 rounded-2xl border border-gray-300 shadow-sm">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Institute Profile</h1>
          <p className="text-gray-500">Manage your institution details</p>
        </div>

        <button
          onClick={() => setShowEditModal(true)}
          className="flex cursor-pointer items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl"
        >
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      {/* Top Info */}
      <div className="bg-white rounded-3xl p-6 flex gap-6 items-center border border-gray-300">
        <img
          src={`${avatar}${profile.institute_name}`}
          alt="Institute"
          className="w-28 h-28 rounded-2xl"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold">{profile.institute_name}</h2>
          <p className="text-indigo-600">@{profile.username}</p>

          <div className="flex gap-6 mt-3 text-sm text-gray-600">
            <span className="flex gap-2 items-center">
              <Mail size={14} /> {profile.email}
            </span>
            <span className="flex gap-2 items-center">
              <Phone size={14} /> {profile.phone_number}
            </span>
          </div>
        </div>

        <button className="px-5 py-3 bg-gray-100 rounded-xl flex items-center gap-2">
          <Globe size={16} /> Website
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <StatCard
          icon={Utensils}
          label="Meal Service"
          value="Enabled"
          color="bg-orange-500"
        />
        <StatCard
          icon={ShieldCheck}
          label="Verification"
          value="Verified"
          color="bg-emerald-500"
        />
      </div>

      {/* Hall List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-indigo-600" />
            <h3 className="text-xl font-bold">Institute Member List</h3>
          </div>

          <button
            onClick={() => setInstituteMember(true)}
            className="flex cursor-pointer items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl"
          >
            <TiPlus />
            Add Member
          </button>
        </div>

        <div className="flex flex-wrap gap-6">
          {profile?.memberList?.map((hall) => (
            <div
              key={hall.id}
              className="w-[280px] bg-white rounded-2xl border border-gray-300 shadow-sm"
            >
              <div className="py-3 px-3 flex gap-4 items-center">
                <img
                  src={`${avatar}${hall.name}`}
                  alt={hall.name}
                  className="w-12 h-12 rounded-xl"
                />
                <div>
                  <h4 className="font-bold">{hall.name}</h4>
                  <p className="text-sm text-gray-500"></p>
                </div>
              </div>

              <div className="border-t border-gray-300 py-3 px-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Hall Name</span>
                  <span className="font-semibold text-indigo-600">
                    {hall?.hostelBranch}
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <Phone size={14} /> {hall.phone}
                </div>

                <div className="flex gap-2 items-center">
                  <Mail size={14} /> {hall.email}
                </div>
              </div>

              <div className="px-4 pb-2 flex gap-2">
                <Link
                  to="/dashboard/profile"
                  className="flex-1 bg-gray-100 text-center text-xs py-2 rounded-lg"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hall List */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="text-indigo-600" />
            <h3 className="text-xl font-bold">Institute Hall List</h3>
          </div>

          <button
            onClick={() => setShowAddHall(true)}
            className="flex cursor-pointer items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-xl"
          >
            <TiPlus />
            Add Hall
          </button>
        </div>

        <div className="flex flex-wrap gap-6">
          {profile.hall.map((hall) => (
            <div
              key={hall.id}
              className="w-[280px] bg-white rounded-2xl border border-gray-300 shadow-sm"
            >
              <div className="py-3 px-3 flex gap-4 items-center">
                <img
                  src={`${avatar}${hall.name}`}
                  alt={hall.name}
                  className="w-12 h-12 rounded-xl"
                />
                <div>
                  <h4 className="font-bold">{hall.name}</h4>
                  <p className="text-sm text-gray-500">
                    {hall.institute_info.institute_name}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-300 py-3 px-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Members</span>
                  <span className="font-semibold text-indigo-600">
                    {hall.member.length}
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <Phone size={14} /> {hall.phone_number}
                </div>

                <div className="flex gap-2 items-center">
                  <Mail size={14} /> {hall.email}
                </div>
              </div>

              <div className="px-4 pb-2 flex gap-2">
                <button
                  onClick={() => handleViewMembers(hall)}
                  className="flex-1 cursor-pointer bg-indigo-600 text-white text-xs py-2 rounded-lg"
                >
                  View Members
                </button>

                <Link
                  to="/dashboard/hall-profile"
                  className="flex-1 bg-gray-100 text-center text-xs py-2 rounded-lg"
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Members Modal */}
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

      {showEditModal && (
        <EditProfileModal
          institute={profile}
          onClose={() => setShowEditModal(false)}
          onSave={setProfile}
        />
      )}

      {showAddHall && <AddHallModal onClose={() => setShowAddHall(false)} />}

      {instituteMember && (
        <AddInstituteMemberModal onClose={() => setInstituteMember(false)} />
      )}
    </div>
  );
};

export default InstituteProfile;

/* -------------------- MEMBER CARD -------------------- */
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

/* -------------------- EDIT MODAL -------------------- */
const EditProfileModal = ({ onClose }) => {
  const [name, setName] = useState(institute.institute_name);
  const [phone, setPhone] = useState(institute.phone_number);
  const [email, setEmail] = useState(institute.email);

  const submit = () => {
    onSave({
      ...institute,
      institute_name: name,
      phone_number: phone,
      email,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md">
        <h3 className="font-bold mb-4">Edit Institute</h3>

        <div className="space-y-3">
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="cursor-pointer text-xs bg-gray-300 px-3 font-medium rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="bg-indigo-600 text-xs cursor-pointer font-semibold text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const AddHallModal = ({ onClose }) => {
  const submit = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold ">Add Hall</h3>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="space-y-3">
          <input
            type="file"
            name=""
            id=""
            placeholder="Upload Hall Image"
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Enter Hall Name"
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            className="cursor-pointer text-xs bg-gray-300 px-3 font-medium rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="bg-indigo-600 text-xs cursor-pointer font-semibold text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// add member modal

const AddInstituteMemberModal = ({ onClose }) => {
  const submit = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
          <div>
            <h3 className="text-lg font-bold text-gray-800">Add Member</h3>
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

            <div className="space-y-1 flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">
                Select Hall Name
              </label>
              <select className="border px-3 py-2 rounded border-gray-300">
                <option value="hall-1">Hall 1</option>
                <option value="hall-2">Hall 2</option>
                <option value="hall-3">Hall 3</option>
              </select>
            </div>
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
