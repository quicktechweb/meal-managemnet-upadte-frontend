// import React, { useState, useRef, useEffect } from "react";
// import { ChevronDown } from "lucide-react";

// const CustomSelect = ({
//   label = "Select",
//   options = [],
//   value,
//   onChange,
//   onCreate,
//   allowCreate = false,
//   placeholder = "Add new item (Write to add)",
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [newItem, setNewItem] = useState("");
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleCreate = () => {
//     if (!newItem.trim()) return;

//     onCreate && onCreate(newItem);
//     onChange && onChange(newItem);
//     setNewItem("");
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative " ref={dropdownRef}>
//       {/* Header */}
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         className="border border-gray-200 rounded-xl   px-3 py-2 flex justify-between items-center cursor-pointer bg-white"
//       >
//         <span>{value || label}</span>
//         <ChevronDown size={18} />
//       </div>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="border w-full absolute z-30 border-gray-200 border-t-0 bg-white">
//           {options.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => {
//                 onChange && onChange(item);
//                 setIsOpen(false);
//               }}
//               className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
//             >
//               {item}
//             </div>
//           ))}

//           {allowCreate && (
//             <>
//               <div className="px-3 py-2 border-gray-200 border-t">
//                 <input
//                   type="text"
//                   value={newItem}
//                   onChange={(e) => setNewItem(e.target.value)}
//                   placeholder={placeholder}
//                   className="w-full px-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-gray-400"
//                 />
//               </div>

//               <div className="flex justify-end px-3 py-2">
//                 <button
//                   onClick={handleCreate}
//                   className="border border-gray-300 rounded-xl px-3 py-1 text-sm hover:bg-gray-100"
//                 >
//                   Create +
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomSelect;
import React, { useState, useRef, useEffect } from "react";
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
  placeholder = "Add new item (Write to add)",
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

  const handleCreate = () => {
    if (!newItem.trim()) return;

    onCreate && onCreate(newItem);
    onChange && onChange(newItem);
    setNewItem("");
    setIsOpen(false);
  };

  const handleOther = () => {
    onChange && onChange(otherLabel);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="border border-gray-200 rounded-xl px-3 py-2 flex justify-between items-center cursor-pointer bg-gray-50/50 text-gray-400"
      >
        <span>{value || label}</span>
        <ChevronDown size={18} />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="border absolute z-40 border-gray-200 border-t-0 bg-gray-50 text-gray-400">
          {options.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                onChange && onChange(item);
                setIsOpen(false);
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </div>
          ))}

          {allowCreate && (
            <>
              {/* Input */}
              <div className="px-3 py-2 border-t">
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder={placeholder}
                  className="w-full px-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Bottom Buttons */}
              <div className="flex justify-between px-3 py-2">
                {showOther && (
                  <button
                    type="button"
                    onClick={handleOther}
                    className=" px-3 py-1 text-sm cursor-pointer text-black"
                  >
                    {otherLabel}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCreate}
                  className="border border-gray-200 rounded-xl px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer text-black"
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
