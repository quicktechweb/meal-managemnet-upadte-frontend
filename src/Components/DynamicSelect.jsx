import React, { useState, useRef, useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { ChevronDown } from "lucide-react";

const DynamicDropdown = ({ control }) => {
  const watchedValues = useWatch({ control });

  const [options, setOptions] = useState({
    occupation: ["Business", "Job", "Study"],
    institution: ["Institution", "Company"],
    designation: ["Designation", "Department"],
    year: ["2024", "2025", "2026"],
  });

  const [isOther, setIsOther] = useState({
    occupation: false,
    institution: false,
    designation: false,
    year: false,
  });

  const handleCreate = (category, value) => {
    if (!value.trim()) return;

    setOptions((prev) => ({
      ...prev,
      [category]: [...prev[category], value],
    }));
  };

  const renderDropdown = (category, label) => {
    const visible =
      category === "occupation" ||
      (category === "institution" && watchedValues?.occupation) ||
      (category === "designation" && watchedValues?.institution) ||
      (category === "year" && watchedValues?.designation);

    if (!visible) return null;

    return (
      <Controller
        name={category}
        control={control}
        rules={{ required: `${label} is required` }}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <CustomStepDropdown
              category={category}
              label={label}
              options={options[category]}
              value={field.value || ""}
              onChange={field.onChange}
              onCreate={(val) => {
                handleCreate(category, val);
                field.onChange(val);
              }}
              isOther={isOther[category]}
              setIsOther={(val) =>
                setIsOther((prev) => ({ ...prev, [category]: val }))
              }
            />

            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </div>
        )}
      />
    );
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {renderDropdown("occupation", "Select Occupation")}
      {renderDropdown("institution", "Select Institution/Company")}
      {renderDropdown("designation", "Select Designation/Department")}
      {renderDropdown("year", "Select Year")}
    </div>
  );
};

const CustomStepDropdown = ({
  category,
  label,
  options,
  value,
  onChange,
  onCreate,
  isOther,
  setIsOther,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemCreate = () => {
    if (!newItem.trim()) return;
    onCreate(newItem);
    setNewItem("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {isOther ? (
        <input
          type="text"
          value={value}
          autoFocus
          placeholder={`Enter ${category}`}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => value && setIsOther(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value) {
              setIsOther(false);
            }
          }}
          className="w-full border border-[#3170A6] rounded-xl px-3 py-2 focus:outline-none"
        />
      ) : (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="border border-gray-200 rounded-xl px-3 py-2 flex justify-between items-center cursor-pointer bg-gray-50 text-gray-500"
        >
          <span>{value || label}</span>
          <ChevronDown size={18} />
        </div>
      )}

      {isOpen && !isOther && (
        <div className="absolute z-40 bg-white w-full shadow-lg rounded-b-xl border border-gray-200">
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                onChange(item);
                setIsOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </div>
          ))}

          <div className="px-3 py-2 border-t">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Type new item..."
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-between px-3 py-2">
            <button
              onClick={() => {
                setIsOther(true);
                setIsOpen(false);
              }}
              className="px-3 py-1 border rounded-lg text-sm"
            >
              Other
            </button>

            <button
              onClick={handleItemCreate}
              className="px-3 py-1 bg-[#3170A6] text-white rounded-lg text-sm"
            >
              Create +
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DynamicDropdown;
