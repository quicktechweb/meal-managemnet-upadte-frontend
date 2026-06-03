// Sidebar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  LogOut,
} from "lucide-react";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoIosSwitch } from "react-icons/io";

import { usePermission } from "../../Hooks/usePermission";
import { SIDEBAR_ITEMS } from "../../data/sidebar";

import { useGetWebsiteData } from "../../api/admin/admin.api";
import useInstituteAuth from "../../Hooks/useInstituteAuth";
import { useState } from "react";
import { FiCalendar, FiVideo } from "react-icons/fi";
import toast from "react-hot-toast";

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
  IoIosSwitch,
  MdOutlineInventory2,
};

const Sidebar = ({ isOpen, onClose }) => {
  const { hasPermission, loading } = usePermission();
  const { data } = useGetWebsiteData();
  const { user, clearToken  } = useInstituteAuth();
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState({});
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleLogout = () => {
  clearToken();
  toast.success("Logged out successfully");
  navigate("/auth/login");
  onClose?.();
};
  const isInstitute = user?.user?.role === "institute";

  if (loading) {
    return (
      <aside className="fixed z-30 inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col p-5 gap-1 lg:relative lg:z-auto">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="h-10 rounded-xl bg-gray-100 animate-pulse mb-1" />
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
    <>
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
          <Link to={"/"} className="flex items-center cursor-pointer shrink-0 gap-2.5">
            <img
              src={data?.logoUrl}
              alt={data?.siteName}
              className="h-16 w-[100px] shrink-0 transition-all duration-300 hover:scale-110"
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

            if (hasChildren) {
              return (
                <div key={item.label} className="flex flex-col gap-0.5">
                  {/* dropdown code */}
                </div>
              );
            }

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

          {/* Quick Links */}
          <div className="mt-4 px-1 flex flex-col gap-0.5">
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-1">
              Quick Links
            </p>
            <Link
              to="/dashboards/liveKitchen"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-green-50 hover:text-green-600 transition-all duration-150 group"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-green-50 text-green-400 group-hover:bg-green-100 shrink-0">
                <FiCalendar size={16} />
              </span>
              <span>Live Kitchen</span>
            </Link>
            <Link
              to="/dashboards/menu"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-150 group"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-50 text-red-400 group-hover:bg-red-100 shrink-0">
                <FiVideo size={16} />
              </span>
              <span>Routine</span>
            </Link>
            <Link
              to="/dashboards/mealonof"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-150 group"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-50 text-red-400 group-hover:bg-red-100 shrink-0">
                <FiVideo size={16} />
              </span>
              <span>MealPart</span>
            </Link>
            <Link
              to="/dashboards/balancehistory"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-green-50 hover:text-green-600 transition-all duration-150 group"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-green-50 text-green-400 group-hover:bg-green-100 shrink-0">
                <FiCalendar size={16} />
              </span>
              <span>Balance History</span>
            </Link>
            <Link
              to="/dashboards/mealfeedbackform"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-green-50 hover:text-green-600 transition-all duration-150 group"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-green-50 text-green-400 group-hover:bg-green-100 shrink-0">
                <FiCalendar size={16} />
              </span>
              <span>Feedback</span>
            </Link>
          </div>
        </nav>

        {/* Bottom user area + Logout */}
        <div className="px-3 py-4 border-t border-gray-100 flex flex-col gap-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-semibold">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {user?.user?.information?.name_of_institute ??
                  user?.user?.information?.full_name}
              </p>
              <p className="text-xs text-gray-400 truncate">{user?.user?.email}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-150 group w-full"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-400 group-hover:bg-red-100 group-hover:text-red-500 transition-all duration-150 shrink-0">
              <LogOut size={16} />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowLogoutConfirm(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl p-6 w-80 mx-4 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
              <LogOut size={22} className="text-red-500" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-semibold text-gray-800">Logout করবেন?</h3>
              <p className="text-sm text-gray-400 mt-1">আপনি কি সত্যিই logout করতে চান?</p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;