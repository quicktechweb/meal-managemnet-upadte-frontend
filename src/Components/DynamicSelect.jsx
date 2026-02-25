import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const DynamicDropdown = () => {
  const [options, setOptions] = useState({
    occupation: ["Business", "Job", "Study"],
    institution: ["Institution", "Company"],
    designation: ["Designation", "Department"],
    year: ["2024", "2025", "2026"],
  });

  const [selections, setSelections] = useState({
    occupation: "",
    institution: "",
    designation: "",
    year: "",
  });

  const [activeStep, setActiveStep] = useState("occupation");

  const steps = ["occupation", "institution", "designation", "year"];

  const handleSelect = (category, value) => {
    setSelections((prev) => ({ ...prev, [category]: value }));
    moveToNextStep(category);
  };

  const handleCreate = (category, value) => {
    if (!value.trim()) return;

    setOptions((prev) => ({
      ...prev,
      [category]: [...prev[category], value],
    }));

    setSelections((prev) => ({ ...prev, [category]: value }));
    moveToNextStep(category);
  };

  const handleOther = (category) => {
    const otherLabel = "Other";
    setSelections((prev) => ({ ...prev, [category]: otherLabel }));
    moveToNextStep(category);
  };

  const moveToNextStep = (current) => {
    const index = steps.indexOf(current);
    if (index < steps.length - 1) setActiveStep(steps[index + 1]);
  };

  const renderDropdown = (category, label) => {
    const isVisible =
      category === "occupation" ||
      (category === "institution" && selections.occupation) ||
      (category === "designation" && selections.institution) ||
      (category === "year" && selections.designation);

    if (!isVisible) return null;

    return (
      <CustomStepDropdown
        key={category}
        category={category}
        label={label}
        options={options[category]}
        value={selections[category]}
        onChange={(val) => handleSelect(category, val)}
        onCreate={(val) => handleCreate(category, val)}
        onOther={() => handleOther(category)}
        isActive={activeStep === category}
      />
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 ">
      {renderDropdown("occupation", "Select Occupation")}
      {renderDropdown("institution", "Select Institution/Company")}
      {renderDropdown("designation", "Select Designation/Dept")}
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
  onOther,
  isActive,
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
    onCreate && onCreate(newItem);
    setNewItem("");
    setIsOpen(false);
  };

  const handleOtherClick = () => {
    onOther && onOther();
    setIsOpen(false);
  };

  return (
    <div className="relative w-full " ref={dropdownRef}>
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-200 rounded-xl px-3 py-2 flex justify-between items-center cursor-pointer bg-gray-50/50 text-gray-500"
      >
        <span className="whitespace-nowrap">{value || label}</span>
        <ChevronDown size={18} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="border absolute z-40 border-gray-200 border-t-0 bg-gray-50 text-gray-400 w-full">
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                onChange && onChange(item);
                setIsOpen(false);
              }}
              className={`px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                item === value
                  ? "bg-gray-100 text-black font-semibold"
                  : "text-gray-600"
              }`}
            >
              {item}
            </div>
          ))}

          {/* Input for new item */}
          <div className="px-3 py-2 border-t">
            <input
              type="text"
              value={isActive ? newItem : ""}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Type new item..."
              className="w-full px-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Bottom Buttons: Other + Create */}
          <div className="flex justify-between px-3 py-2">
            <button
              onClick={handleOtherClick}
              className="px-3 py-1 border border-[#3170A6] rounded-lg text-sm text-black"
            >
              Other
            </button>
            <button
              onClick={handleItemCreate}
              className="border border-[#3170A6] rounded-lg px-3 py-1 text-sm bg-[#3170A6] text-white"
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
