// Sidebar.jsx
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Shield,
  Key,
  ShoppingCart,
  Wrench,
  Calendar,
  Settings,
  X,
  Wallet,
  ChevronDown,
} from "lucide-react";
import { MdOutlineInventory2 } from "react-icons/md";

import { usePermission } from "../../Hooks/usePermission";
import { SIDEBAR_ITEMS } from "../../data/sidebar";

import { useGetWebsiteData } from "../../api/admin/admin.api";
import useInstituteAuth from "../../Hooks/useInstituteAuth";
import { useState } from "react";

const ICON_MAP = {
  LayoutDashboard,
  Users,
  Shield,
  Key,
  ShoppingCart,
  Wrench,
  Calendar,
  Settings,
  Wallet,
  MdOutlineInventory2,
};

const Sidebar = ({ isOpen, onClose }) => {
  const { hasPermission, loading } = usePermission();

  const { data } = useGetWebsiteData();

  const { user } = useInstituteAuth();

  console.log(hasPermission);

  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isInstitute = user?.user?.role === "institute";

  if (loading) {
    return (
      <aside className="fixed z-30 inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col p-5 gap-1 lg:relative lg:z-auto">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="h-10 rounded-xl bg-gray-100 animate-pulse mb-1"
          />
        ))}
      </aside>
    );
  }

  const visibleItems = isInstitute
    ? SIDEBAR_ITEMS
    : SIDEBAR_ITEMS.filter((item) => {
        if (item.excludeRoles?.includes(user?.user?.role)) return false;

        return hasPermission(item.permission);
      });

  return (
    <aside
      className={`
        fixed z-30 inset-y-0 left-0
        w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:z-auto lg:shadow-sm
      `}
    >
      {/* Logo area */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-center">
        <Link
          to={"/"}
          className="flex items-center cursor-pointer shrink-0 gap-2.5"
        >
          <img
            src={data?.logoUrl}
            alt={data?.siteName}
            className="h-16 w-[100px] shrink-0 transition-all duration-300 hover:scale-110 "
          />
        </Link>

        <button
          onClick={onClose}
          className="lg:hidden w-7 h-7 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-2">
          Menu
        </p>
        {visibleItems.map((item) => {
          const Icon = ICON_MAP[item.icon];
          const hasChildren = item.children && item.children.length > 0;
          const isMenuOpen = openMenus[item.label];

          // Check if any child route is active to keep parent highlighted
          const isChildActive =
            hasChildren &&
            item.children.some((child) => location.pathname === child.path);

          if (hasChildren) {
            return (
              <div key={item.label} className="flex flex-col gap-0.5">
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group w-full ${
                    isChildActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 shrink-0 ${
                      isChildActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {Icon && <Icon size={16} />}
                  </span>
                  <span>{item.label}</span>
                  <ChevronDown
                    size={16}
                    className={`ml-auto transition-transform duration-200 ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Items */}
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isMenuOpen
                      ? "grid-rows-[1fr] opacity-100 mt-1"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden flex flex-col gap-0.5 pl-8 pr-2">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        end
                        onClick={onClose}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                            isActive
                              ? "text-blue-600 bg-blue-50/50"
                              : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-blue-600" : "bg-gray-300"}`}
                            />
                            <span>{child.label}</span>
                          </>
                        )}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          // Normal Item Rendering (No Dropdown)
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-150 shrink-0 ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  >
                    {Icon && <Icon size={16} />}
                  </span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom user area */}
      <div className="px-3 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-700 truncate">
              {user?.user?.information?.name_of_institute ??
                user?.user?.information?.full_name}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {user?.user?.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
