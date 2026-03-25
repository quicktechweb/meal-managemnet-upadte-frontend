import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const schedule2 = [
  {
    day: "Sat",
    morning: ["Alu Vorta + Dal", "Egg + Ruti"],
    afternoon: ["Murgi + Mangsho + Dal", "Murgi + Mach + Dal"],
    night: ["Bhat, Alu (Dim-er shonge)", "Dal + Shobji"],
  },
  {
    day: "Sun",
    morning: ["Shobji Parota / Pitha", "Egg + Ruti"],
    afternoon: ["Mach (Bhaji/Porha) + Dal", "Murgi + Mangsho + Dal"],
    night: ["Murgir Jhol + Bhaja Shobji", "Bhat, Alu (Dim-er shonge)"],
  },
  {
    day: "Mon",
    morning: ["Nesco/Soup + Bhat/Parota"],
    afternoon: ["Gosht & Murgi + Bhat/Dal (Soup/Mukhar)"],
    night: ["Bhat, Dal + Alu Vorta"],
  },
  {
    day: "Tue",
    morning: ["Alu Vorta + Dal"],
    afternoon: ["Mach (Bhaji/Porha) + Dal"],
    night: ["Bhat + Dim"],
  },
  {
    day: "Wed",
    morning: ["Shobji + Dal / Nesco + Dal", "Bhat, Alu (Dim-er shonge)"],
    afternoon: ["Murgi + Mach + Dal", "Bhat, Alu (Dim-er shonge)"],
    night: ["Bhat, Alu (Dim-er shonge)", "Bhat, Alu (Dim-er shonge)"],
  },
  {
    day: "Thu",
    morning: ["Alu, Piaj Vorta + Dal", "Shobji + Dal / Nesco + Dal"],
    afternoon: ["Mach + Dal", "Murgi + Mach + Dal"],
    night: ["Murgir Jhol + Shobji Lettuce", "Bhat, Alu (Dim-er shonge)"],
  },
  {
    day: "Fri",
    morning: ["Ruti + Shobji/ Ruti + Dal"],
    afternoon: ["Gorur Mangsho/Prani Jhol"],
    night: ["Bhat, Dim + Shobji (Shak, Mushroom)"],
  },
];

// schedule_lists: [
//   {
//     day: "Sat",
//     meal_type: "Breakfast",
//     start_time: "09:00",
//     end_time: "11:00",
//     items: [
//       { title: "Vat", price: 20, _id: "69b7b78642d61b4ae80e3c45" },
//       { title: "Dal", price: 30, _id: "69b7b78642d61b4ae80e3c46" },
//       { title: "Goru", price: 130, _id: "69b7b78642d61b4ae80e3c47" },
//       {
//         title: "Kacchi Biriyani",
//         price: 190,
//         _id: "69b7b78642d61b4ae80e3c48",
//       },
//     ],
//     _id: "69b7b78642d61b4ae80e3c44",
//   },
//   {
//     day: "Sun",
//     meal_type: "Breakfast",
//     start_time: "09:00",
//     end_time: "11:00",
//     items: [
//       { title: "Vat", price: 20, _id: "69b7b78642d61b4ae80e3c4a" },
//       { title: "Dal", price: 30, _id: "69b7b78642d61b4ae80e3c4b" },
//       { title: "Goru", price: 130, _id: "69b7b78642d61b4ae80e3c4c" },
//     ],
//     _id: "69b7b78642d61b4ae80e3c49",
//   },
// ];

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("day", { header: "Day" }),
  columnHelper.accessor("morning", { header: "Morning" }),
  columnHelper.accessor("afternoon", { header: "Afternoon" }),
  columnHelper.accessor("night", { header: "Night" }),
];

const MenuTable = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const table = useReactTable({
    data: schedule2,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="shadow-xl">
      <h4 className="text-lg font-semibold mb-3">Menu Lists</h4>
      <div className="w-full ">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex justify-between items-center bg-orange-500 p-2 lg:p-4 text-white rounded-t-md cursor-pointer font-bold transition-colors hover:bg-orange-600 text-xs lg:text-base"
        >
          <span>Weekly Meal Lists</span>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden  ${
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
                        className="px-4 py-3 text-left font-semibold text-white border-b border-black"
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
                        className="px-4 py-2 md:py-3 border-black md:border-b flex justify-between md:table-cell"
                      >
                        <span className="font-bold text-orange-600 md:hidden mr-4">
                          {cell.column.columnDef.header?.toString()}:
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuTable;
