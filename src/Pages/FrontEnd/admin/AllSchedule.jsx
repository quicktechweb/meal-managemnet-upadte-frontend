import React from "react";
import {
  useDeleteSchedule,
  useScheduleAdminData,
} from "../../../api/admin/admin.api";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Coffee, Sun, Moon, Plus, UtensilsCrossed } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const dayOrder = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const AllSchedule = () => {
  const { data, isLoading } = useScheduleAdminData();

  const { mutateAsync, isPending } = useDeleteSchedule();

  const Schedules = data?.data || [];

  const handleDelete = async (day) => {
    console.log(day, "day");
    await mutateAsync(day?._id);
  };

  const MealCell = ({ items, type }) => {
    const config = {
      breakfast: {
        icon: <Coffee size={14} />,
        color: "text-amber-600 bg-amber-50",
      },
      lunch: {
        icon: <Sun size={14} />,
        color: "text-emerald-600 bg-emerald-50",
      },
      dinner: {
        icon: <Moon size={14} />,
        color: "text-indigo-600 bg-indigo-50",
      },
    };

    return (
      <td className="py-4 px-4 align-top">
        <div
          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md mb-2 font-bold text-[10px] uppercase tracking-wider ${config[type].color}`}
        >
          {config[type].icon} {type}
        </div>
        <div className="space-y-1.5 flex flex-wrap max-w-[200px]">
          {items?.map((item) => (
            <div
              key={item._id}
              className="group flex flex-col border-l-2 border-slate-100 pl-3 hover:border-violet-400 transition-colors"
            >
              <span className="text-sm font-medium text-slate-700 leading-tight">
                {item.title}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                ৳{item.price}
              </span>
            </div>
          ))}
          {!items?.length && (
            <span className="text-xs text-slate-300 italic">Not scheduled</span>
          )}
        </div>
      </td>
    );
  };

  return (
    <div className="p-4 md:p-8 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Weekly <span className="text-violet-600">Menu</span> Matrix
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage and view your weekly meal distribution
            </p>
          </div>

          <Link
            to="/admin/dashboard/add-schedule"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold shadow-lg shadow-violet-200 transition-all active:scale-95"
          >
            <Plus size={18} />
            Add New Schedule
          </Link>
        </div>

        {/* Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-bottom border-slate-200">
                  <th className="py-5 px-6 text-sm font-bold text-slate-600 uppercase tracking-wider w-32">
                    Day
                  </th>
                  <th className="py-5 px-4 text-sm font-bold text-slate-600 uppercase tracking-wider">
                    Breakfast
                  </th>
                  <th className="py-5 px-4 text-sm font-bold text-slate-600 uppercase tracking-wider">
                    Lunch
                  </th>
                  <th className="py-5 px-4 text-sm font-bold text-slate-600 uppercase tracking-wider">
                    Dinner
                  </th>
                  <th className="py-5 px-4 text-sm font-bold text-slate-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Schedules.map((day) => (
                  <tr
                    key={day._id}
                    className="hover:bg-slate-50/30 transition-colors"
                  >
                    <td className="py-6 px-6 align-top">
                      <div className="flex flex-col">
                        <span className="text-lg font-bold text-slate-800">
                          {day.day}
                        </span>
                      </div>
                    </td>

                    <MealCell items={day.breakfast?.items} type="breakfast" />
                    <MealCell items={day.lunch?.items} type="lunch" />
                    <MealCell items={day.dinner?.items} type="dinner" />
                    <td className="flex items-center gap-2.5 justify-center mt-5">
                      <Link
                        to={`/admin/dashboard/update-schedule/${day?._id}`}
                        className="text-xl cursor-pointer hover:text-violet-700  duration-300"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(day)}
                        disabled={isPending}
                        className="text-xl duration-300 hover:text-red-600 cursor-pointer"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Empty State */}
          {!Schedules.length && !isLoading && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-400">
              <UtensilsCrossed size={48} className="mb-4 opacity-20" />
              <p className="font-medium">No meal schedule records found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AllSchedule;
