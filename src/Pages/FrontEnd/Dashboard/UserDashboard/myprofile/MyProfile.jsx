import React, { useState } from "react";
import {
  Phone,
  Mail,
  Edit3,
  Users,
  ExternalLink,
  Trash2,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

import MessDetailsModal from "../../../../../Components/MessDetailsModal";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

const schedule = [
  {
    day: "Sat",
    morning: "Alu Vorta + Dal",
    afternoon: "Murgi + Mach/Mangsho + Dal",
    night: "Bhat, Alu (Dim-er shonge)",
  },
  {
    day: "Sun",
    morning: "Shobji Parota/Pitha",
    afternoon: "Mach (Bhaji/Porha) + Dal",
    night: "Murgir Jhol + Bhaja Shobji",
  },
  {
    day: "Mon",
    morning: "Nesco/Soup + Bhat/Parota",
    afternoon: "Gosht & Murgi + Bhat/Dal (Soup/Mukhar)",
    night: "Bhat, Dal + Alu Vorta",
  },
  {
    day: "Tue",
    morning: "Alu Vorta + Dal",
    afternoon: "Mach (Bhaji/Porha) + Dal",
    night: "Bhat + Dim",
  },
  {
    day: "Wed",
    morning: "Nesco/Shobji + Dal",
    afternoon: "Murgi + Mach + Dal",
    night: "Bhat, Alu (Dim-er shonge)",
  },
  {
    day: "Thu",
    morning: "Alu, Piaj Vorta + Dal",
    afternoon: "Mach (Bhaji/Porha) + Dal",
    night: "Murgir Jhol + Shobji Lettuce",
  },
  {
    day: "Fri",
    morning: "Ruti/Shobji/Dal",
    afternoon: "Gorur Mangsho/Prani Jhol",
    night: "Bhat, Dim + Shobji (Shak, Mushroom)",
  },
];

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

const me = {
  id: 0,
  name: "Quick Tech",
  phone: " 01517834534",
  img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sakil",
};

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("day", { header: "Day" }),
  columnHelper.accessor("morning", { header: "Morning" }),
  columnHelper.accessor("afternoon", { header: "Afternoon" }),
  columnHelper.accessor("night", { header: "Night" }),
];

const MyProfile = () => {
  const [messMembers, setMessMembers] = useState(initialMembers);
  const [messDetails, setMessDetails] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const table = useReactTable({
    data: schedule,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleMessDetails = (member) => {
    setMessDetails(member);
    document.body.style.overflow = "hidden";
  };

  const handleDeleteMember = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        setMessMembers((prev) => prev.filter((m) => m.id !== id));

        Swal.fire("Deleted!", "Member has been removed.", "success");
      }
    });
  };

  const handleAddMember = (member) => {
    setMessMembers((prev) => [...prev, member]);
    setShowAddModal(false);
  };

  const handleEdit = (member) => {
    setShowAddModal(false);
  };

  const [selectedMeals, setSelectedMeals] = useState([]);

  const hasSelectedMeal = (memberId) => {
    return selectedMeals.some((m) => m.id === memberId);
  };

  const allMembers = [me, ...messMembers];

  const isAllMealsSelected = allMembers.every((member) =>
    hasSelectedMeal(member.id),
  );

  return (
    <div className="pr-4 pt-4 pb-4 antialiased text-gray-800 flex flex-col gap-4">
      {/* Header */}
      <ScrollToTop />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h4 className="text-2xl font-bold">My Profile</h4>
          <p className="text-sm text-gray-500">
            Manage your account settings and information.
          </p>
        </div>

        <button
          onClick={() => setShowEditModal(true)}
          className="flex cursor-pointer items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Edit3 size={16} />
          Edit Profile
        </button>
      </div>
      <div className="p-6 bg-white  rounded-2xl ">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8 items-center">
          <div className="space-y-1 flex items-center gap-4 ">
            <div className="w-14 h-14 rounded-full border-2 border-indigo-100 group-hover:border-indigo-400 transition-colors duration-300">
              <img
                src={me?.img}
                alt={"hello"}
                className="w-full h-full rounded-full bg-gray-50 object-cover"
              />{" "}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                {" "}
                <Mail size={14} />
                <h6 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  {" "}
                  Full Name{" "}
                </h6>{" "}
              </div>
              <p className="text-gray-900 font-semibold text-lg">
                {" "}
                {me?.name}{" "}
              </p>{" "}
            </div>
          </div>{" "}
          {/* Phone Number */}
          <div className="space-y-1">
            {" "}
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              {" "}
              <Phone size={14} />{" "}
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {" "}
                Phone Number{" "}
              </h6>{" "}
            </div>{" "}
            <p className="text-gray-900 font-semibold text-lg">
              {me?.phone}
            </p>{" "}
          </div>{" "}
          {/* Email */}{" "}
          <div className="space-y-1">
            {" "}
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              {" "}
              <Mail size={14} />{" "}
              <h6 className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {" "}
                Email{" "}
              </h6>{" "}
            </div>{" "}
            <p className="text-gray-900 font-semibold text-lg">
              {" "}
              quicktech@gmail.com{" "}
            </p>{" "}
          </div>
          <div className="space-y-1">
            <button
              onClick={() => handleMessDetails(me)}
              className="cursor-pointer  w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gray-50 text-gray-600 text-xs font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-200"
            >
              View Details
              <ExternalLink size={12} />
            </button>
          </div>
        </div>{" "}
      </div>

      <div className="">
        {/* DESKTOP TABLE */}
        <div className="w-full ">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex justify-between items-center bg-white p-2 lg:p-4 text-black rounded-t-md cursor-pointer font-bold transition-colors hover:bg-white/40 text-xs lg:text-base"
          >
            <span>Weekly Meal Lists</span>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {/* Expandable Container */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden  ${isExpanded ? "max-h-[1000px] border border-gray-300" : "max-h-0"}`}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm sm:text-base">
                <thead className="bg-orange-500/30 text-black hidden md:table-header-group">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-4 py-3 text-left font-semibold text-black/80 border-b border-gray-300"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 flex flex-col md:table-row mb-4 md:mb-0 border md:border-none rounded-lg md:rounded-none"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-2 md:py-3 border-gray-300 md:border-b flex justify-between md:table-cell"
                        >
                          {/* Mobile Label */}
                          <span className="font-bold text-orange-600 md:hidden mr-4">
                            {cell.column.columnDef.header?.toString()}:
                          </span>
                          {/* Data */}
                          <span className="text-right md:text-left">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Member Section Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-indigo-600" />
            <h5 className="text-xl font-bold">Mess Member List</h5>
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
          {messMembers.map((member) => (
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

      {isAllMealsSelected && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowOrderModal(true)}
            className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 cursor-pointer transition"
          >
            Placed Order
          </button>
        </div>
      )}

      {/* Details Modal */}
      {messDetails && (
        <MessDetailsModal
          member={messDetails}
          selectedMeals={selectedMeals}
          setSelectedMeals={setSelectedMeals}
          setMessDetails={setMessDetails}
        />
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <AddMemberModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddMember}
        />
      )}

      {/* edit modal */}
      {showEditModal && (
        <EditProfileModal
          onClose={() => setShowEditModal(false)}
          onEdit={handleEdit}
        />
      )}

      {showOrderModal && (
        <OrderModal
          onClose={() => setShowOrderModal(false)}
          selectedMeals={selectedMeals}
        />
      )}
    </div>
  );
};

export default MyProfile;

// add member modal

const AddMemberModal = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const submitHandler = () => {
    if (!name || !phone) return;

    onAdd({
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

        <h3 className="text-lg font-bold mb-4">Add New Member</h3>

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
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
};

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

// order modal
const OrderModal = ({ onClose, selectedMeals }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Confirm Order
        </h2>

        {/* User Info Form */}
        <div className="space-y-3 mb-6">
          <input
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            value={me.name}
            placeholder="Name"
          />
          <input
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            value={me.email}
            placeholder="Email"
          />
          <input
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            value={me.phone}
            placeholder="Phone"
          />
        </div>

        {/* Order Information */}
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-700">
            Order Information
          </h3>

          {selectedMeals?.map((member) => (
            <div
              key={member.id}
              className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2 shadow-sm hover:shadow-md transition"
            >
              {/* Member Header */}
              <div className="flex items-center gap-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{member.name}</h4>
                  <p className="text-gray-500 text-sm">{member.phone}</p>
                </div>
              </div>

              {/* Meal Info */}
              <div className="mt-2 space-y-2">
                {member.mealInfo.map((info, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-100 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-gray-600 text-sm">{info.date}</p>
                      <p className="text-gray-700 font-medium">
                        Meals: {info.meals.join(", ")}
                      </p>
                    </div>
                    <div className="text-green-600 font-semibold">
                      ${info.total}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Confirm Button */}
        <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-emerald-600 hover:to-green-500 transition-all">
          Confirm Order
        </button>
      </div>
    </div>
  );
};
