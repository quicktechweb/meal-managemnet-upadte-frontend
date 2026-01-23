import { useState } from "react";
import {
  FaHome,
  FaClipboardList,
  FaDesktop,
  FaSellcast,
  FaSignOutAlt,
  FaShoppingBag,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
// import useAuth from "../../Hooks/useAuth";
import { ChevronRight } from "lucide-react";

import { IoRestaurant } from "react-icons/io5";
import { GrRestaurant } from "react-icons/gr";

const DashboardSideBar = ({ setIsOpenSidebar }) => {
  //  const {  user, userLogOut } = useAuth();
  //  const role = user?.newpartroles; // SUPERadmin, moderator, support, or user
  //  const newroles = user?.newpartuser; // SUPERadmin, moderator, support, or user
  // console.log("User role:", role);

  // State for toggling sections dynamically
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Sidebar configuration
  const sidebarItems = [
    {
      key: "Admin",
      title: "Admin",
      icon: FaHome,
      roles: ["SUPERadmin"],
      links: [
        // { title: "Make Admin", path: "/dashboard/makeadmin" },
        {
          title: "Super Admin",
          icon: FaDesktop,
          path: "/admin/dashboard/superadmin",
        },
      ],
    },

    //   {
    //   key: "CompanySettings",
    //   title: "CompanySettings",
    //   icon: FaCog,
    //   permissionKey: "Settings",
    //   links: [
    //      { title: "Footer",icon: FaDatabase, path: "/admin/dashboard/footerdashboard" },
    //    { title: "About",icon: FaInfoCircle, path: "/admin/dashboard/aboutadmin" },
    //     { title: "Contact",icon: FaPhone, path: "/admin/dashboard/contactadmin" },
    //     { title: "TermsCondition",icon: FaEnvelope, path: "/admin/dashboard/admintermcondition" },
    //     { title: "Shippings",icon: FaShippingFast, path: "/admin/dashboard/adminshippingpolicys" },
    //     { title: "Faq",icon: FaQuestionCircle, path: "/admin/dashboard/faqadmin" }
    //   ],
    // },

    {
      key: "Meal Management",
      title: "Meal Management",
      roles: ["user"],
      icon: FaClipboardList,
      permissionKey: "Meal Management",
      links: [
        {
          title: "Meal Management",
          icon: FaShoppingBag,
          path: "/dashboard/mealmanagement",
        },
      ],
    },
    {
      key: "My Order",
      title: "MyOrder",
      roles: ["user"],
      icon: FaClipboardList,
      permissionKey: "MyOrder",
      links: [
        { title: "MyOrder", icon: FaShoppingBag, path: "/dashboard/userOrder" },
      ],
    },

    {
      key: "Profile Manage",
      title: "Profile Manage",
      roles: ["user"],
      icon: FaClipboardList,
      links: [
        {
          title: "My Profile",
          icon: FaShoppingBag,
          path: "/dashboard/profile",
        },
      ],
    },

    {
      key: "Canteens",
      title: "Canteens",
      roles: ["user"],
      icon: FaClipboardList,
      links: [
        {
          title: "All Canteens",
          icon: IoRestaurant,
          path: "/dashboard/canteens",
        },
      ],
    },

    {
      key: "foods",
      title: "Foods",
      roles: ["user"],
      icon: FaClipboardList,
      links: [
        {
          title: "Foods",
          icon: IoRestaurant,
          path: "/dashboard/foods",
        },
      ],
    },

    {
      key: "favourite",
      title: "Favourite",
      roles: ["user"],
      icon: FaClipboardList,
      links: [
        {
          title: "Favourite Items",
          icon: IoRestaurant,
          path: "/dashboard/favourite-item",
        },
        {
          title: "Favourite Canteens",
          icon: GrRestaurant,
          path: "/dashboard/favourite-canteen",
        },
      ],
    },
  ];

  // Helper to check if the user can see a sidebar item
  // Helper to check if the user can see a sidebar item
  //  const canSee = (item) => {
  //   if (!role) return false; // no role, no access
  //  if (role === "SUPERadmin") {
  //     if (item.roles && item.roles.includes("user")) return false; // hide user-only menus
  //     return true;
  //   } // SUPERadmin sees everything

  //   // For Moderator/Support, check permissions
  //   if (role === "Moderator" || role === "Support") {
  //     return item.permissionKey ? user?.permissions?.[item.permissionKey]?.enabled : false;
  //   }

  //   // For normal user, check roles array
  //   if (newroles === "user") {
  //     return item.roles ? item.roles.includes("user") : false;
  //   }

  //   return false;
  // };

  return (
    <>
      <div className="w-full overflow-hidden">
        <section className="flex flex-col gap-2 text-black ">
          {/* Dashboard Home */}
          <NavLink onClick={() => setIsOpenSidebar(false)} to={"/dashboard"}>
            <div className="shadow -ms-16 flex items-center justify-center gap-2 font-bold p-3 mt-4 duration-300 active:scale-75 md:pr-0">
              <FaHome className="text-xl text-[#007cde]" />
              <h2 className="font-semibold  ">Dashboard - Home</h2>
            </div>
          </NavLink>

          <div
            className={`grid overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <div className="overflow-hidden">
              <NavLink onClick={() => setIsOpenSidebar(false)} to="/">
                <div className="dashboardNavLink -[3px] flex items-center gap-2  p-2 ml-3 mt-2 hover:scale-110 duration-300 active:scale-75 pr-0">
                  <FaSellcast className="text-sm text-[#007cde]" />
                  <h2 className="font-semibold ">Home</h2>
                </div>
              </NavLink>
            </div>
          </div>

          {/* Dynamic Sidebar Items */}
          {sidebarItems.map((item) => {
            // if (!canSee(item)) return null;
            return (
              <div
                key={item.key}
                className="grid overflow-hidden transition-all duration-300 ease-in-out"
              >
                <div className="overflow-hidden">
                  <div
                    onClick={() => toggleSection(item.key)}
                    className={`cursor-pointer border-l-[3px] ${
                      openSections[item.key]
                        ? "border-[#007cde]"
                        : "border-transparent"
                    }`}
                  >
                    <div className="ml-2 flex items-center justify-between bg-white hover:bg-gray-50 p-2 rounded-md transition-all duration-200 active:scale-95">
                      {/* Left section: icon + title */}
                      <div className="flex items-center gap-2">
                        <item.icon
                          className={`text-[18px] ${
                            openSections[item.key]
                              ? "text-gray-500"
                              : "text-[#007cde]"
                          } transition-colors`}
                        />
                        <h4
                          className={`font-medium text-sm ${
                            openSections[item.key]
                              ? "text-[#007cde]"
                              : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </h4>
                      </div>

                      {/* Right section: static arrow icon */}
                      <ChevronRight
                        size={16}
                        className={`text-[#007cde] transition-transform duration-300 ${
                          openSections[item.key]
                            ? "rotate-90 text-[#007cde]"
                            : ""
                        }`}
                      />
                    </div>
                  </div>

                  <div
                    className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
                      openSections[item.key]
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {item.links.map((link) => (
                        <NavLink
                          key={link.path}
                          onClick={() => setIsOpenSidebar(false)}
                          to={link.path}
                        >
                          <div className="dashboardNavLink border-l-[3px] flex items-center gap-2 bg-white p-1 ml-8 mt-2 hover:scale-110 duration-300 active:scale-75 pr-0">
                            {/* <FaSellcast className="text-xl text-[#01c0c9]" /> */}
                            {link.icon && (
                              <link.icon className="text-sm text-[#01c0c9]" />
                            )}
                            <h2 className="font-semibold ">{link.title}</h2>
                          </div>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Logout */}
          <button
            onClick={async () => {
              try {
                // await userLogOut();
                window.location.href = "/"; // instantly redirect to home
              } catch (error) {
                console.error("Logout failed:", error);
              }
            }}
            className="flex ms-5 font-bold items-center gap-2 text-[20px] hover:scale-105 transition-transform duration-200"
          >
            <FaSignOutAlt className="mt-1" /> LogOut
          </button>
        </section>
      </div>

      <div className="w-full h-[2px] bg-white mt-5"></div>
    </>
  );
};

DashboardSideBar.propTypes = {
  setIsOpenSidebar: PropTypes.func.isRequired,
};

export default DashboardSideBar;
