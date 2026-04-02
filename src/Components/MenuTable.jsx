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
    console.log("types", types);

    const weekDays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
    const sorted = [
      ...weekDays.slice(
        weekDays.indexOf(
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"][new Date().getDay()],
        ),
      ),
      ...weekDays.slice(
        0,
        weekDays.indexOf(
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"][new Date().getDay()],
        ),
      ),
    ];

    const schedule = sorted.map((day) => {
      const meals = routine?.schedule_lists?.filter((s) => s.day === day) || [];
      const row = { day };
      types.forEach((meal) => {
        const found = meals.find((m) => m.meal_type === meal.type);

        console.log(found, "found alternative");

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

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="shadow-xl">
      <h4 className="text-lg font-semibold mb-3">Menu Lists</h4>

      <div className="w-full">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex justify-between items-center bg-orange-500 p-2 lg:p-4 text-white rounded-t-md cursor-pointer font-bold transition-colors hover:bg-orange-600 text-xs lg:text-base"
        >
          <span>Weekly Meal Lists</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isExpanded ? "max-h-[1000px] border border-gray-300" : "max-h-0"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm sm:text-base">
              <thead className="bg-orange-500 hidden md:table-header-group">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-3 text-left font-semibold text-white border-b border-gray-200"
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
                    className="hover:bg-gray-50 flex flex-col md:table-row mb-4 md:mb-0 border border-gray-200 md:border-none rounded-lg md:rounded-none"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-4 py-2 md:py-3 border-gray-300 md:border-b flex justify-between md:table-cell"
                      >
                        <span className="font-bold text-orange-600 md:hidden mr-4">
                          {cell.column.columnDef.headerText ??
                            cell.column.columnDef.header?.toString()}
                          :
                        </span>
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

            {table.getRowModel().rows.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No schedule available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTable;
