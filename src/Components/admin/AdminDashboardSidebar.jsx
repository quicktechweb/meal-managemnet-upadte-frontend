import { useState } from "react";
import {
  FaHome,
  FaClipboardList,
  FaSellcast,
  FaSignOutAlt,
  FaShoppingBag,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { ChevronRight } from "lucide-react";

const AdminDashboardSidebar = ({ setIsOpenSidebar }) => {
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
      key: "Schedule",
      title: "Schedule",
      icon: FaClipboardList,
      links: [
        {
          title: "All Schedule",
          icon: FaShoppingBag,
          path: "/admin/dashboard/all-schedule",
        },
      ],
    },
    {
      key: "Service",
      title: "Service",
      icon: FaClipboardList,
      links: [
        {
          title: "Service",
          icon: FaShoppingBag,
          path: "/admin/dashboard/service",
        },
      ],
    },
    {
      key: "Feature",
      title: "Feature",
      icon: FaClipboardList,
      links: [
        {
          title: "Feature",
          icon: FaShoppingBag,
          path: "/admin/dashboard/features",
        },
      ],
    },
    {
      key: "Notices",
      title: "Notices",
      icon: FaClipboardList,
      links: [
        {
          title: "All Notices",
          icon: FaShoppingBag,
          path: "/admin/dashboard/notices",
        },
      ],
    },
    {
      key: "LiveKitchen",
      title: "Live Kitchen",
      icon: FaClipboardList,
      links: [
        {
          title: "Live Kitchen Video Lists",
          icon: FaShoppingBag,
          path: "/admin/dashboard/live-kitchen",
        },
      ],
    },
    {
      key: "CMS",
      title: "CMS",
      icon: FaClipboardList,
      links: [
        {
          title: "Banner",
          icon: FaShoppingBag,
          path: "/admin/dashboard/banner",
        },
        {
          title: "Choose Us",
          icon: FaShoppingBag,
          path: "/admin/dashboard/choose-us",
        },
        {
          title: "App",
          icon: FaShoppingBag,
          path: "/admin/dashboard/app-section",
        },
        {
          title: "Pages",
          icon: FaShoppingBag,
          path: "/admin/dashboard/pages",
        },
      ],
    },
  ];

  return (
    <div className="w-full p-3">
      <section className="flex flex-col gap-3">
        {/* Dashboard Home */}
        <NavLink
          to="/admin/dashboard"
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
          onClick={() => (window.location.href = "/")}
          className="flex items-center gap-2 mt-4 text-red-500 hover:scale-105 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </section>
    </div>
  );
};

AdminDashboardSidebar.propTypes = {
  setIsOpenSidebar: PropTypes.func.isRequired,
};

export default AdminDashboardSidebar;
