import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";

const CustomSelect = ({
  label = "Select",
  options = [],
  value,
  onChange,
  onCreate,
  allowCreate = false,
  showOther = false,
  otherLabel = "Other",
  placeholder = "add option...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [otherValue, setOtherValue] = useState("");

  const dropdownRef = useRef(null);

  // Close dropdown outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options
  const filteredOptions = useMemo(() => {
    return options.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm]);

  // Create new option
  const handleCreate = () => {
    if (!newItem.trim()) return;

    onCreate && onCreate(newItem);
    onChange && onChange(newItem);

    setNewItem("");
    setSearchTerm("");
    setIsOpen(false);
    setIsOtherSelected(false);
  };

  // When Other clicked
  const handleOther = () => {
    setIsOtherSelected(true);
    setOtherValue("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Header */}
      <div
        onClick={() => !isOtherSelected && setIsOpen(!isOpen)}
        className="border border-gray-200 rounded-xl px-3 py-2 flex justify-between items-center cursor-pointer bg-white"
      >
        {isOtherSelected ? (
          <input
            type="text"
            value={otherValue}
            autoFocus
            onChange={(e) => {
              setOtherValue(e.target.value);
              onChange && onChange(e.target.value);
            }}
            placeholder={
              isOtherSelected ? `${label} here...` : `Select ${label} here...`
            }
            className="w-full outline-none text-gray-600 bg-transparent"
          />
        ) : (
          <>
            <span className={`${!value ? "text-gray-500" : "text-gray-600"}`}>
              {value || (!isOtherSelected && `Select ${label}`)}
            </span>
            <ChevronDown size={18} />
          </>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="border absolute z-40 border-gray-200 border-t-0 bg-white w-full rounded-b-xl shadow-md">
          {/* Search */}
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3170A6]/20 focus:border-[#3170A6]"
            />
          </div>

          {/* Options */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setIsOtherSelected(false);
                    setOtherValue("");
                    onChange && onChange(item);
                    setIsOpen(false);
                    setSearchTerm("");
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

          {/* Create + Other */}
          {allowCreate && (
            <>
              <div className="px-3 py-2 border-t border-gray-200">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3170A6]/20 focus:border-[#3170A6]"
                />
              </div>

              <div className="flex justify-between px-3 py-2">
                {showOther && (
                  <button
                    type="button"
                    onClick={handleOther}
                    className="px-3 py-1 border border-[#3170A6] rounded-lg text-sm"
                  >
                    {otherLabel}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCreate}
                  className="border border-[#3170A6] rounded-lg px-3 py-1 text-sm bg-[#3170A6] text-white"
                >
                  Create +
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
