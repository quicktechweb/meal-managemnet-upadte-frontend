import React, { useState } from "react";
import {
  Phone,
  Mail,
  Edit3,
  X,
  User,
  MapPin,
  Calendar,
  BookOpen,
  Heart,
  Shield,
} from "lucide-react";
import { MdOutlineAddCircleOutline } from "react-icons/md";

const me = {
  id: 1,
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
  hostelBranch: "Dhanmondi Hostel",
  img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naymur",
};

const MyProfile = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="p-3 lg:p-6 bg-gray-50 min-h-screen antialiased text-gray-800">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="text-xl lg:text-3xl font-extrabold text-gray-900">
            Account Profile
          </h4>
          <p className="text-xs lg:text-base text-gray-500">
            View and manage your personal identity and records.
          </p>
        </div>
        <div className="flex items-center gap-2 lg:gap-3.5">
          {/* <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-2.5 lg:px-5 py-1.5  lg:py-2.5 rounded-xl font-medium cursor-pointer hover:bg-indigo-700 transition-all whitespace-nowrap shadow-sm text-xs lg:text-base"
          >
            <MdOutlineAddCircleOutline size={12} />
            Add Member
          </button> */}
          <button
            onClick={() => setShowEditModal(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-2.5 lg:px-5 py-1.5  lg:py-2.5  rounded-xl font-medium cursor-pointer hover:bg-indigo-700 transition-all whitespace-nowrap shadow-sm text-xs lg:text-base"
          >
            <Edit3 size={12} />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Quick Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-4 lg:p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="relative mb-2 lg:mb-4">
              <img
                src={me.img}
                alt={me.name}
                className="w-32 h-32 rounded-full border-4 border-indigo-50 shadow-inner"
              />
              {/* <div className="absolute bottom-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div> */}
            </div>
            <h2 className="text-xl lg:text-2xl font-bold">{me.name}</h2>
            <p className="text-indigo-600 text-sm lg:text-base font-medium ">
              @{me.username}
            </p>

            <div className="w-full lg:mt-6 pt-3 lg:pt-6 border-t border-gray-100 space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={18} className="text-gray-400" />
                <span className="text-sm">{me.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-gray-400" />
                <span className="text-sm">{me.phone}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-500" /> Education
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Institution
                </p>
                <p className="text-gray-700 font-medium">
                  {me.institutionName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Details Grid */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2  border-b pb-4 border-gray-300">
              <User size={20} className="text-indigo-500" /> Personal Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              <InfoItem label="Father's Name" value={me.fathersName} />
              <InfoItem label="Mother's Name" value={me.mothersName} />
              <InfoItem
                label="Date of Birth"
                value={me.dateOfBirth}
                icon={<Calendar size={14} />}
              />
              <InfoItem label="Nationality" value={me.nationality} />
              <InfoItem label="Religion" value={me.religion} />
              <InfoItem
                label="Marital Status"
                value={me.maritalStatus}
                icon={<Heart size={14} />}
              />
              <InfoItem
                label="Guardian"
                value={me.guardiansName}
                icon={<Shield size={14} />}
              />
              <InfoItem label="Hostel Branch" value={me.hostelBranch} />
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b pb-4 border-gray-300">
              <MapPin size={20} className="text-indigo-500" />
              Address Information
            </h3>
            <div className="space-y-6">
              <div>
                <h6 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">
                  Present Address
                </h6>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
                  {me.presentAddress}
                </p>
              </div>
              <div>
                <h6 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">
                  Permanent Address
                </h6>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
                  {me.permanentAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal onClose={() => setShowEditModal(false)} />
      )}

      {showAddModal && (
        <AddMemberModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

// Reusable Info Component
const InfoItem = ({ label, value, icon }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-gray-400">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-widest">
        {label}
      </span>
    </div>
    <p className="text-gray-900 font-semibold">{value || "N/A"}</p>
  </div>
);

export default MyProfile;

// add member modal

const emptyMember = {
  name: "",
  username: "",
  email: "",
  password: "",
  phone: "",
  fathersName: "",
  mothersName: "",
  guardiansName: "",
  dateOfBirth: "",
  nationality: "",
  religion: "",
  education: "",
  maritalStatus: "",
  city: "",
  presentAddress: "",
  permanentAddress: "",
  institutionName: "",
  hostelBranch: "",
  img: "https://api.dicebear.com/7.x/avataaars/svg?seed=NewUser",
};

const AddMemberModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState(emptyMember);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Add New Member</h3>
            <p className="text-sm text-gray-500">Create a new member profile</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={submitHandler}
          className="p-6 overflow-y-auto space-y-6"
        >
          <div className="flex items-center gap-6 pb-6 border-b">
            <img
              src={formData.img}
              className="w-20 h-20 rounded-full border"
              alt="Preview"
            />
            <InputField
              label="Profile Image URL"
              name="img"
              type="file"
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <InputField
            label="Present Address"
            name="presentAddress"
            value={formData.presentAddress}
            onChange={handleChange}
            isTextArea
          />

          <InputField
            label="Permanent Address"
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            isTextArea
          />
        </form>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-semibold text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={submitHandler}
            className="px-6 py-2.5 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow"
          >
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
};

// edit member modal

const EditProfileModal = ({ onClose, onEdit }) => {
  const [formData, setFormData] = useState({ ...me });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onEdit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-3 border-b border-gray-300 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Edit Profile</h3>
            <p className="text-sm text-gray-500">
              Update your personal and academic information.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <form
          onSubmit={submitHandler}
          className="p-3 overflow-y-auto space-y-8"
        >
          {/* Section: Profile Picture */}
          <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
            <img
              src={formData.img}
              className="w-20 h-20 rounded-full bg-indigo-50 border-2 border-indigo-100"
              alt="Preview"
            />
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Profile Image URL
              </label>
              <input
                type="file"
                name="img"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* Section: Basic Info */}
          <div>
            <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
              Basic Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <InputField
                label="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
              <InputField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <InputField
                label="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                type="date"
              />
            </div>
          </div>

          {/* Section: Family & Identity */}
          <div>
            <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
              Family & Identity
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Father's Name"
                name="fathersName"
                value={formData.fathersName}
                onChange={handleChange}
              />
              <InputField
                label="Mother's Name"
                name="mothersName"
                value={formData.mothersName}
                onChange={handleChange}
              />
              <InputField
                label="Guardian's Name"
                name="guardiansName"
                value={formData.guardiansName}
                onChange={handleChange}
              />
              <InputField
                label="Nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
              <InputField
                label="Religion"
                name="religion"
                value={formData.religion}
                onChange={handleChange}
              />
              <InputField
                label="Marital Status"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Section: Academic & Address */}
          <div>
            <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-4">
              Academic & Location
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Institution"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                />
                <InputField
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                />
              </div>
              <InputField
                label="Present Address"
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleChange}
                isTextArea
              />
              <InputField
                label="Permanent Address"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                isTextArea
              />
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="p-3 border-t border-gray-300 bg-gray-50 flex justify-end gap-3 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-semibold text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={submitHandler}
            className="px-6 py-2.5 rounded-xl font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Reusable Input Sub-component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  isTextArea = false,
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-gray-700">{label}</label>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="2"
        className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-xl px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
      />
    )}
  </div>
);
