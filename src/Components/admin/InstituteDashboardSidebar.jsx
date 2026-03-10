import { useState } from "react";
import {
  FaHome,
  FaClipboardList,
  FaSellcast,
  FaSignOutAlt,
  FaShoppingBag,
} from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ChevronRight } from "lucide-react";
import useAuth from "../../Hooks/useAuth";

const InstituteDashboardSidebar = ({ setIsOpenSidebar }) => {
  const { clearToken } = useAuth();

  const navigate = useNavigate();

  const [openSections, setOpenSections] = useState({});
  const location = useLocation();

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const sidebarItems = [
    {
      key: "Meal management",
      title: "Meal Management",
      icon: FaClipboardList,
      links: [
        {
          title: "Meal Settings",
          icon: FaShoppingBag,
          path: "/institute/dashboard/meal-management",
        },
      ],
    },
    {
      key: "user management",
      title: "User Management",
      icon: FaClipboardList,
      links: [
        {
          title: "Permission Settings",
          icon: FaShoppingBag,
          path: "/institute/dashboard/permission-settings",
        },
        {
          title: "User Institute",
          icon: FaShoppingBag,
          path: "/institute/dashboard/user-institute",
        },
      ],
    },
  ];

  return (
    <div className="w-full p-3">
      <section className="flex flex-col gap-3">
        {/* Dashboard Home */}
        <NavLink
          to="/institute/dashboard"
          onClick={() => setIsOpenSidebar(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded-md transition ${
              isActive ? "bg-[#6C51AA]/10 text-[#6C51AA]" : "hover:bg-gray-100"
            }`
          }
        >
          <FaHome />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        {/* Website Home */}
        <NavLink
          to="/"
          onClick={() => setIsOpenSidebar(false)}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition"
        >
          <FaSellcast />
          <span>Website Home</span>
        </NavLink>

        {/* Dynamic Items */}
        {sidebarItems.map((item) => {
          const isOpen = openSections[item.key];

          return (
            <div key={item.key}>
              {/* Parent */}
              <div
                onClick={() => toggleSection(item.key)}
                className="flex items-center justify-between p-2 cursor-pointer rounded-md hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-2">
                  <item.icon />
                  <span className="font-medium">{item.title}</span>
                </div>

                <ChevronRight
                  size={16}
                  className={`transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
              </div>

              {/* Children */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-96 mt-1" : "max-h-0"
                }`}
              >
                {item.links.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpenSidebar(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 ml-6 p-2 rounded-md text-sm transition ${
                        isActive
                          ? "bg-[#6C51AA]/10 text-[#6C51AA]"
                          : "hover:bg-gray-100"
                      }`
                    }
                  >
                    <link.icon />
                    {link.title}
                  </NavLink>
                ))}
              </div>
            </div>
          );
        })}

        {/* Logout */}
        <button
          onClick={() => {
            clearToken();
            navigate("/");
          }}
          className="flex items-center gap-2 mt-4 text-red-500 hover:scale-105 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </section>
    </div>
  );
};

InstituteDashboardSidebar.propTypes = {
  setIsOpenSidebar: PropTypes.func.isRequired,
};

export default InstituteDashboardSidebar;
