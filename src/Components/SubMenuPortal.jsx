import React from "react";
import ReactDOM from "react-dom";

const SubMenuPortal = ({ category, position, onClose }) => {
  return ReactDOM.createPortal(
    <div
      onMouseLeave={onClose}
      style={{
        top: position.top,
        left: 300,
      }}
      className="fixed w-56 bg-white rounded-xl shadow-xl z-50"
    >
      <ul className="py-2">
        {category.submenu.map((sub) => (
          <li
            key={sub.label}
            className="flex justify-between items-center px-4 py-2 text-sm
            text-gray-600 hover:bg-orange-50 hover:text-[#c78436] cursor-pointer"
          >
            <span>{sub.label}</span>
            <span className="text-xs bg-gray-100 rounded-full px-2">
              {sub.count}
            </span>
          </li>
        ))}
      </ul>
    </div>,
    document.body,
  );
};

export default SubMenuPortal;
