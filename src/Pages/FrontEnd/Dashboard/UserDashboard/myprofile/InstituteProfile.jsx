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

const initialMembers = [
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
  const [instituteMembers, setInstituteMembers] = useState(initialMembers);
  const [deleteMode, setDeleteMode] = useState(false);

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
            <h5 className="text-xl font-bold">Institute Member List</h5>
          </div>

          <div className="flex gap-2">
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
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
            >
              Add Member
            </button>
          </div>
        </div>

        {/* Member Cards */}
        <div className="flex flex-wrap  gap-6">
          {instituteMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 relative overflow-hidden w-[200px]"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-indigo-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
              {/* Delete Icon */}
              {deleteMode && (
                <>
                  <div className="w-full rounded-2xl  bg-red-300/50 absolute top-0 left-0 right-0 bottom-0 z-40"></div>

                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="absolute cursor-pointer top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 text-2xl rounded-full text-red-600 hover:bg-red-600 z-50 bg-red-100 hover:text-white"
                  >
                    <Trash2 size={20} />
                  </button>
                </>
              )}

              <div className="relative flex flex-col items-center text-center">
                <div className="w-14 h-14 mb-2 rounded-full p-1 border-2 border-indigo-100 group-hover:border-indigo-400 transition-colors duration-300">
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

                <button
                  onClick={() => handleMessDetails(member)}
                  className="cursor-pointer  w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-50 text-gray-600 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-200"
                >
                  View Details
                  <ExternalLink size={12} />
                </button>
              </div>
            </div>
          ))}
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

// const OrderModal = ({ onClose, selectedMeals }) => {
//   console.log(selectedMeals);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       name: me?.name,
//       email: me?.email,
//       phone: me?.phone,
//     },
//   });

//   const onSubmit = (data) => {
//     const payload = {
//       user: data,
//       order: selectedMeals,
//     };

//     console.log("Order Submitted:", payload);

//     // onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto p-4">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white rounded-3xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto shadow-xl"
//       >
//         {/* Close button */}
//         <button
//           type="button"
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//           onClick={onClose}
//         >
//           <FaTimes size={20} />
//         </button>

//         <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//           Confirm Order
//         </h2>

//         {/* User Info Form */}
//         <div className="space-y-3 mb-6">
//           <div>
//             <input
//               className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
//               placeholder="Name"
//               {...register("name", { required: "Name is required" })}
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
//             )}
//           </div>

//           <div>
//             <input
//               className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
//               placeholder="Email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /^\S+@\S+$/i,
//                   message: "Invalid email address",
//                 },
//               })}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.email.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <input
//               className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
//               placeholder="Phone"
//               {...register("phone", {
//                 required: "Phone number is required",
//                 minLength: {
//                   value: 10,
//                   message: "Phone number must be at least 10 digits",
//                 },
//               })}
//             />
//             {errors.phone && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.phone.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Order Information */}
//         {/* Order Information */}
//         <div className="space-y-5 mb-6">
//           <h3 className="text-lg font-semibold text-gray-700">
//             Order Information
//           </h3>

//           {selectedMeals?.map((member) => (
//             <div
//               key={member.id}
//               className="border rounded-2xl p-4 space-y-4 shadow-sm"
//             >
//               {/* Member Header */}
//               <div className="flex items-center gap-4">
//                 <img
//                   src={member.img}
//                   alt={member.name}
//                   className="w-12 h-12 rounded-full border"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-gray-800">{member.name}</h4>
//                   <p className="text-sm text-gray-500">{member.phone}</p>
//                 </div>
//               </div>

//               {/* Meal Dates */}
//               {member.mealInfo.map((info, idx) => (
//                 <div key={idx} className="bg-gray-50 rounded-xl p-4 space-y-3">
//                   {/* Date */}
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm font-medium text-gray-600">
//                       📅 {info.date}
//                     </p>
//                     <p className="font-semibold text-green-600">
//                       ৳ {info.total}
//                     </p>
//                   </div>

//                   {/* Meals */}
//                   <div className="grid gap-3">
//                     {info.meals.map((meal, i) => (
//                       <div
//                         key={i}
//                         className="flex justify-between items-start bg-white border rounded-lg p-3"
//                       >
//                         <div>
//                           <p className="capitalize font-medium text-gray-700">
//                             🍽 {meal.type}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {meal.items.join(", ")}
//                           </p>
//                         </div>
//                         <p className="font-semibold text-gray-800">
//                           ৳ {meal.price}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-emerald-600 hover:to-green-500 transition-all"
//         >
//           Confirm Order
//         </button>
//       </form>
//     </div>
//   );
// };
