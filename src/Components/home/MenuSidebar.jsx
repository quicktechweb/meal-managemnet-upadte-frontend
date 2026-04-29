import React from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { icon: <Users size={20} />, label: "Users" },
  { icon: <ShoppingCart size={20} />, label: "Orders" },
  { icon: <Settings size={20} />, label: "Settings" },
];

const MenuSidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-[260px] bg-white z-50 shadow-xl transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:shadow-none`}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center justify-center border-b">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            My Panel
          </h2>
        </div>

        {/* MENU */}
        <div className="p-3 space-y-2">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
              text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
            >
              <span className="group-hover:scale-110 transition">
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-4 w-full px-3">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-red-500 hover:bg-red-50 transition">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSidebar;
