import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";

const CustomSelect = ({
  label = "Select",
  options = [],
  value,
  onChange,
  onCreate,
  allowCreate = false,
  placeholder = "Type or select...",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [searchTerm, setSearchTerm] = useState(value || "");
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
    setSearchTerm(value || "");
  }, [value]);

  const filteredOptions = useMemo(() => {
    return options.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    onChange && onChange(val);
  };

  const handleUpdate = () => {
    if (!newItem.trim()) return;

    onCreate && onCreate(newItem);
    // onChange && onChange(newItem);

    // setSearchTerm(newItem);
    setNewItem("");
    setShowCreateInput(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* input + button */}
      <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white">
        {/* input */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-[90%] px-3 py-2 outline-none text-gray-600 disabled:cursor-not-allowed"
        />

        {/* dropdown button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className="w-[10%] flex items-center justify-center gap-2 border-l border-gray-200 bg-gray-50 hover:bg-gray-100 disabled:cursor-not-allowed"
        >
          {/* <span className="text-sm text-gray-600">{label}</span> */}
          <ChevronDown size={18} />
        </button>
      </div>

      {isOpen && (
        <div className="border absolute z-40 border-gray-200 bg-white w-full rounded-xl mt-1 shadow-md">
          {/* options */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSearchTerm(item);
                    onChange && onChange(item);
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

          {/* create option */}
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
                <div className="px-3 py-2 border-t border-gray-200 flex flex-col gap-2">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add option..."
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
