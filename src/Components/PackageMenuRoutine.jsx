import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import useInstituteAuth from "../Hooks/useInstituteAuth";
import { useInstituteUserAdminData } from "../api/cms/user.hook";
import { useLocation } from "react-router-dom";

const columnHelper = createColumnHelper();

const PackageMenuRoutine = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { user, loading } = useInstituteAuth();
  const { data } = useInstituteUserAdminData(user?.user?.institute_id);

  console.log(data);

  const routine = data?.packages;

  console.log(data?.packages?.package_type_lists);

  const { mealTypes, groupedSchedule } = React.useMemo(() => {
    const types =
      routine?.package_type_lists?.map((m) => ({
        type: m.package_type,
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
      ...weekDays.slice(
        weekDays.indexOf(
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][new Date().getDay()],
        ),
      ),
      ...weekDays.slice(
        0,
        weekDays.indexOf(
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][new Date().getDay()],
        ),
      ),
    ];

    const schedule = sorted.map((day) => {
      const meals =
        routine?.package_routine?.filter((s) => s.day === day) || [];

      const row = { day };
      types.forEach((meal) => {
        const found = meals.find((m) => m.package_title === meal.type);

        row[meal.type] = {
          items:
            found?.package_item?.map((i) => `${i.title}`).join(", ") || "-",
          package_price: found?.package_price,
          alternative_items:
            found?.alternative_items?.map((i) => `${i.title}`) ?? [],
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
              <div className="bg-white shadow-md rounded-2xl p-2 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center ">
                  <h4 className="text-lg font-semibold ">Package Items - </h4>
                  <span className="block text-sm font-semibold text-gray-500 ">
                    {value?.items || "-"}
                  </span>
                </div>
                <div className="mt-1">
                  {value?.alternative_items?.length > 0 ? (
                    value.alternative_items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-1 text-sm text-gray-500"
                      >
                        <span className="font-semibold text-orange-400">
                          Alternative items {idx + 1}:
                        </span>
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      No alternative items added
                    </p>
                  )}
                </div>
                <h4 className="text-sm font-semibold text-gray-800">
                  Package Price
                </h4>

                <p className="text-2xl font-bold text-green-600 mt-1">
                  ৳ {value?.package_price}
                </p>
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

  const sectionRef = useRef(null);

  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#package-menu-list" && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [location.hash]);

  return (
    <div id="package-menu-list" ref={sectionRef} className="shadow-xl">
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
            isExpanded ? "max-h-[1200px] border border-gray-300" : "max-h-0"
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

export default PackageMenuRoutine;
