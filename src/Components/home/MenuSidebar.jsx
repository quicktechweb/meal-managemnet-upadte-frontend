import React from "react";

import {
  Search,
  Camera,
  PlusCircle,
  Heart,
  Mic,
  Bell,
  MapPin,
  Globe,
  Utensils,
  Home,
  Menu,
  ShoppingCart,
} from "lucide-react";
import { MdOutlineDocumentScanner } from "react-icons/md";
const topIcons = [
  { icon: <Search size={16} />, label: "Search" },
  { icon: <Camera size={16} />, label: "Camera" },

  { icon: <Heart size={16} />, label: "For you" },
  { icon: <MdOutlineDocumentScanner size={16} />, label: "Scanner" },
  { icon: <PlusCircle size={16} />, label: "Add", special: true },
  { icon: <Mic size={16} />, label: "Voice" },
  { icon: <Bell size={16} />, label: "Notifications", badge: true },
  { icon: <MapPin size={16} />, label: "Location" },
  { icon: "৳", label: "Currency" },
];

const bottomIcons = [
  { icon: <Utensils size={16} />, label: "A Food" },
  { icon: <Home size={16} />, label: "Home", active: true },
  { icon: <Bell size={16} />, label: "Notifications" },
  { icon: <Menu size={16} />, label: "Menu" },
  { icon: <ShoppingCart size={18} />, label: "Cart" },
  { icon: <Heart size={16} />, label: "For you" },
  { icon: <Globe size={16} />, label: "Language" },
];

const MenuSidebar = ({ isOpen, setIsOpen }) => {
  const IconItem = ({ icon, label, active, special, badge }) => {
    return (
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group
        ${
          special
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md"
            : active
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
        }`}
      >
        <div className="relative">
          <span className="group-hover:scale-110 transition">{icon}</span>

          {/* badge */}
          {badge && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </div>

        {label && <span className="font-medium text-sm">{label}</span>}
      </div>
    );
  };

  return (
    <>
      {/* overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 w-full h-full z-40 backdrop-blur-sm"
          onClick={() => {
            setIsOpen(false);
            document.body.style.overflow = "visible";
          }}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 shadow-xl transition-all duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:shadow-none`}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center justify-center border-b">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            My Panel
          </h2>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto">
          {/* TOP ICONS */}
          <div className="p-3 space-y-1">
            {topIcons.map((item, i) => (
              <IconItem key={i} {...item} />
            ))}
          </div>

          {/* divider */}
          <div className="mx-3 my-2 h-px bg-gray-200" />

          {/* BOTTOM ICONS */}
          <div className="p-3 space-y-1">
            {bottomIcons.map((item, i) => (
              <IconItem key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSidebar;
