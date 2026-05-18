import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({
  icon,
  label,
  badge,
  badgeRed,
  active,
  onClick,
  link,
}) => {
  return (
    <Link to={link || "#"} className="block">
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-1.5 px-2 py-2 rounded-xl mb-0.5 
        transition-colors text-left group border-none cursor-pointer
        ${active ? "bg-[#f0eeff]" : "hover:bg-gray-100"}`}
      >
        <div
          className={`w-[26px] h-[26px] xl:w-[30px] xl:h-[30px] rounded-[9px] flex items-center 
          justify-center shrink-0 text-base transition-colors
          ${
            active
              ? "bg-[#ede9ff]"
              : "bg-gray-100 group-hover:bg-gray-200"
          }`}
        >
          {icon}
        </div>

        <span
          className={`text-[12px] xl:text-[13.5px] font-medium flex-1 whitespace-nowrap
          ${
            active
              ? "text-[#5b48f0] font-semibold"
              : "text-gray-600 group-hover:text-gray-900"
          }`}
        >
          {label}
        </span>

        {badge && (
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full text-white
            ${badgeRed ? "bg-red-500" : "bg-[#5b48f0]"}`}
          >
            {badge}
          </span>
        )}
      </button>
    </Link>
  );
};

export default NavItem;