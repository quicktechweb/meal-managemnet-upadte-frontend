import { ChevronDown } from "lucide-react";
import React from "react";

export const inputCls =
  "w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition";
const SelectField = ({ placeholder, options, ...props }) => {
  return (
    <div className="relative">
      <select
        className={`${inputCls} appearance-none pr-8 cursor-pointer`}
        defaultValue=""
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  );
};

export default SelectField;
