import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";

const CustomSelect = ({
  label = "Select",
  options = [],
  value,
  onChange,
  onCreate,
  allowCreate = false,
  placeholder = "Add option...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState("");
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

  // filter
  const filteredOptions = useMemo(() => {
    return options.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm]);

  // add new item
  const handleUpdate = () => {
    if (!newItem.trim()) return;

    onCreate && onCreate(newItem);
    setNewItem("");
    setShowCreateInput(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-200 rounded-xl px-3 py-2 flex justify-between items-center cursor-pointer bg-white"
      >
        <span className={`${!value ? "text-gray-500" : "text-gray-600"}`}>
          {value || `Select ${label}`}
        </span>

        <ChevronDown size={18} />
      </div>

      {isOpen && (
        <div className="border absolute z-40 border-gray-200 border-t-0 bg-white w-full rounded-b-xl shadow-md">
          {/* search */}
          <div className="p-3 border-b border-gray-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none"
            />
          </div>

          {/* options */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
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

          {/* create */}
          {allowCreate && (
            <>
              {!showCreateInput && (
                <div className="px-3 py-2 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowCreateInput(true)}
                    className="border border-[#3170A6] rounded-lg px-3 py-1 text-sm bg-[#3170A6] text-white"
                  >
                    Create +
                  </button>
                </div>
              )}

              {showCreateInput && (
                <div className="px-3 py-2 border-t border-gray-200 flex flex-col gap-2 items-start">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="border border-[#3170A6] rounded-lg px-3 py-1 text-sm bg-[#3170A6] text-white"
                  >
                    Update
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

export default CustomSelect;
