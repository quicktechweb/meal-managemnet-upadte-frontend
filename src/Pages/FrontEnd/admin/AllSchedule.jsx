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

  const schedules = data?.data || [];

  const handleDelete = async (day) => {
    await mutateAsync(day?._id);
  };

  const allMealTypes = [
    ...new Set(
      schedules.flatMap((s) => s.meals?.map((m) => m.mealType?.toLowerCase())),
    ),
  ];

  const MealCell = ({ items = [], type }) => {
    return (
      <td className="py-4 px-4 align-top">
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
        {/* Header */}
        <div className="flex justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Weekly <span className="text-violet-600">Menu</span>
          </h1>

          <Link
            to="/admin/dashboard/add-schedule"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-xl"
          >
            <Plus size={18} />
            Add Schedule
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-slate-200">
                  <th className="py-5 px-6 text-sm font-bold">Day</th>

                  {allMealTypes.map((type) => (
                    <th key={type} className="py-5 px-4 text-sm font-bold">
                      {type}
                    </th>
                  ))}

                  <th className="py-5 px-4 text-sm font-bold">Action</th>
                </tr>
              </thead>

              <tbody>
                {schedules.map((day) => (
                  <tr key={day._id} className="hover:bg-slate-50">
                    <td className="py-6 px-6 font-bold">{day.day}</td>

                    {allMealTypes.map((type) => {
                      const meal = day.meals?.find(
                        (m) => m.mealType?.toLowerCase() === type,
                      );

                      return (
                        <MealCell
                          key={type}
                          items={meal?.items || []}
                          type={type}
                        />
                      );
                    })}

                    <td className="flex gap-2 justify-center mt-5">
                      <Link to={`/admin/dashboard/update-schedule/${day?._id}`}>
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(day)}
                        disabled={isPending}
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!schedules.length && !isLoading && (
            <div className="py-20 text-center text-slate-400">
              No schedule found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllSchedule;
