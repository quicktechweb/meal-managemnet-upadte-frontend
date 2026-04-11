import React, { useState, useRef, useEffect, useMemo } from "react";
import { Controller, useWatch } from "react-hook-form";
import { ChevronDown } from "lucide-react";

/* =======================
   Custom Select Component
======================= */
const CustomSelect = ({
  label = "Select",
  options = [],
  value,
  onChange,
  onCreate,
  allowCreate = false,
  placeholder = "Write or Select",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [inputValue, setInputValue] = useState(value || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateInput, setShowCreateInput] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setShowCreateInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const filteredOptions = useMemo(() => {
    return options.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputValue(val);
    onChange && onChange(val);
  };

  const handleUpdate = () => {
    if (!newItem.trim()) return;

    onCreate && onCreate(newItem);
    onChange && onChange(newItem);

    setNewItem("");
    setShowCreateInput(false);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-[90%] px-3 py-2 outline-none text-gray-600"
        />

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-[10%] flex items-center justify-center border-l border-gray-200 bg-gray-50"
        >
          <ChevronDown size={18} />
        </button>
      </div>

      {isOpen && (
        <div className="border border-gray-300 absolute z-40 bg-white w-full rounded-xl mt-1 shadow-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full px-3 py-2 outline-none"
          />

          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onChange(item);
                    setInputValue(item);
                    setIsOpen(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-400">
                No results found
              </div>
            )}
          </div>

          {allowCreate && (
            <>
              {!showCreateInput ? (
                <div className="p-2 border-t border-gray-300">
                  <button
                    type="button"
                    onClick={() => setShowCreateInput(true)}
                    className="w-full bg-[#3170A6] text-white py-1 rounded"
                  >
                    Create +
                  </button>
                </div>
              ) : (
                <div className="p-2 border-t border-gray-300 space-y-2">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="New item..."
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={handleUpdate}
                    className="w-full bg-[#3170A6] text-white py-1 rounded"
                  >
                    Add
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

/* =======================
   Dynamic Dropdown
======================= */
const DynamicDropdown = ({ control }) => {
  const occupation = useWatch({ control, name: "occupation" });
  const institution = useWatch({ control, name: "institution" });
  const designation = useWatch({ control, name: "designation" });
  const degree = useWatch({ control, name: "degree" });

  const [options, setOptions] = useState({
    occupation: ["Business", "Job", "Study"],
    institution: ["Company", "University"],
    designation: ["Manager", "Developer"],
    degree: ["CSE", "EEE"],
    year: ["1st Year", "2nd Year"],
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
      (category === "institution" && occupation) ||
      (category === "designation" && institution) ||
      (category === "degree" && designation) ||
      (category === "year" && degree);

    if (!visible) return null;

    return (
      <Controller
        name={category}
        control={control}
        rules={{
          required: category === "year" ? false : `${label} is required`,
        }}
        render={({ field, fieldState }) => (
          <div className="w-full">
            <CustomSelect
              options={options[category]}
              value={field.value || ""}
              onChange={field.onChange}
              allowCreate={true}
              onCreate={(val) => {
                handleCreate(category, val);
                field.onChange(val);
              }}
              placeholder={label}
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
    <div className="flex flex-col gap-3 w-full bg-gray-100 p-3 rounded-xl">
      {renderDropdown("occupation", "Select Occupation")}
      {renderDropdown("institution", "Select Institution")}
      {renderDropdown("designation", "Select Designation")}
      {renderDropdown("degree", "Select Degree")}
      {renderDropdown("year", "Select Year")}
    </div>
  );
};

export default DynamicDropdown;
