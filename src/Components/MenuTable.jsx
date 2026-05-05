import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useInstituteAuth from "../Hooks/useInstituteAuth";
import { useInstituteUserAdminData } from "../api/cms/user.hook";

const columnHelper = createColumnHelper();

const MenuTable = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { user, loading } = useInstituteAuth();
  const { data } = useInstituteUserAdminData(user?.user?.institute_id);

  const routine = data?.routine;

  const { mealTypes, groupedSchedule } = React.useMemo(() => {
    const types =
      routine?.meal_type_lists?.map((m) => ({
        type: m.meal_type,
        start: m.start_time,
        end: m.end_time,
      })) || [];

    const weekDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const sorted = [
      ...weekDays.slice(weekDays.indexOf(weekDays[new Date().getDay()])),
      ...weekDays.slice(0, weekDays.indexOf(weekDays[new Date().getDay()])),
    ];

    const schedule = sorted.map((day) => {
      const meals = routine?.schedule_lists?.filter((s) => s.day === day) || [];
      const row = { day };
      types.forEach((meal) => {
        const found = meals.find((m) => m.meal_type === meal.type);
        row[meal.type] = {
          items:
            found?.items?.map((i) => `${i.title} (৳${i.price})`).join(", ") ||
            "-",
          alternativeItems:
            found?.alternative_items?.map((alternative_item) =>
              alternative_item
                ?.map((item) => `${item?.title} (৳${item?.price})`)
                .join(", "),
            ) || null,
        };
      });
      return row;
    });

    return { mealTypes: types, groupedSchedule: schedule };
  }, [routine]);

  const columns = React.useMemo(() => {
    return [
      columnHelper.accessor("day", {
        header: "Day",
        headerText: "Day",
        cell: (info) => info.getValue(),
      }),
      ...mealTypes.map((meal, index) =>
        columnHelper.accessor(meal.type, {
          id: `${meal.type}-${index}`,
          headerText: `${meal.type} (${meal.start} - ${meal.end})`,
          header: () => (
            <div>
              <div>{meal.type}</div>
              <div className="text-xs font-normal">
                {meal.start} - {meal.end}
              </div>
            </div>
          ),
          cell: (info) => {
            const value = info.getValue();
            return (
              <div>
                <span>{value?.items || "-"}</span>
                {value?.alternativeItems?.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    <span className="font-semibold text-orange-400">Alt: </span>
                    {value.alternativeItems.join(" | ")}
                  </div>
                )}
              </div>
            );
          },
        }),
      ),
    ];
  }, [mealTypes]);

  const table = useReactTable({
    data: groupedSchedule,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="shadow-xl">
      <h4 className="text-lg font-semibold mb-3">Menu Lists</h4>

      <div className="w-full">
        {/* Accordion Toggle */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex justify-between items-center bg-orange-500 p-3 lg:p-4 text-white rounded-t-md cursor-pointer font-bold transition-colors hover:bg-orange-600 text-sm lg:text-base"
        >
          <span>Weekly Meal Lists</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[2000px] border border-gray-300" : "max-h-0"
          }`}
        >
          {/* ══ DESKTOP TABLE (md+) ══ */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-orange-500">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left font-semibold text-white border-b border-orange-400"
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
                    className="hover:bg-orange-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-3 border-b border-gray-200 text-sm"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ══ MOBILE CARDS (< md) ══ */}
          <div className="md:hidden divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => {
              // First cell is "day", rest are meal types
              const [dayCell, ...mealCells] = row.getVisibleCells();
              const dayValue = flexRender(
                dayCell.column.columnDef.cell,
                dayCell.getContext(),
              );

              return (
                <div key={row.id} className="bg-white">
                  {/* Day Header */}
                  <div className="bg-orange-500 px-4 py-2.5">
                    <p className="text-white font-bold text-sm">{dayValue}</p>
                  </div>

                  {/* Meal rows */}
                  <div className="divide-y divide-gray-100">
                    {mealCells.map((cell) => {
                      const label =
                        cell.column.columnDef.headerText ??
                        cell.column.columnDef.header?.toString();
                      const cellValue = flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      );

                      return (
                        <div key={cell.id} className="px-4 py-3 flex gap-3">
                          {/* Label */}
                          <div className="w-28 shrink-0">
                            <span className="text-xs font-bold text-orange-500 leading-tight">
                              {label}
                            </span>
                          </div>
                          {/* Value */}
                          <div className="flex-1 text-sm text-gray-700 text-right">
                            {cellValue}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {table.getRowModel().rows.length === 0 && (
            <div className="p-6 text-center text-gray-500 text-sm">
              No schedule available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuTable;
