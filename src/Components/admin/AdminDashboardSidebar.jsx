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
import { FaUser } from "react-icons/fa";

const AdminDashboardSidebar = ({ setIsOpenSidebar }) => {
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Sidebar configuration
  const sidebarItems = [
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
      key: "Home",
      title: "Home",
      roles: ["admin"],
      icon: FaClipboardList,
      permissionKey: "Home",
    },
    {
      key: "Schedule",
      title: "Schedule",
      roles: ["admin"],
      icon: FaClipboardList,
      permissionKey: "schedule",
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
      roles: ["admin"],
      icon: FaClipboardList,
      permissionKey: "service",
      links: [
        {
          title: "Service",
          icon: FaShoppingBag,
          path: "/admin/dashboard/service",
        },
      ],
    },
  ];

  return (
    <>
      <div className="w-full overflow-hidden">
        <section className="flex flex-col gap-2 text-black ">
          {/* Dashboard Home */}
          <NavLink
            onClick={() => setIsOpenSidebar(false)}
            to={"/dashboard/dashboard"}
          >
            <div className="shadow -ms-16 flex items-center justify-center gap-2 font-bold p-3 mt-4 duration-300 active:scale-75 md:pr-0">
              <FaHome className="text-xl text-[#6C51AA]" />
              <h2 className="font-semibold  ">Dashboard - Home</h2>
            </div>
          </NavLink>

          <div
            className={`grid overflow-hidden transition-all duration-300 ease-in-out`}
          >
            <div className="overflow-hidden">
              <NavLink onClick={() => setIsOpenSidebar(false)} to="/">
                <div className="dashboardNavLink -[3px] flex items-center gap-2  p-2 ml-3 mt-2 hover:scale-110 duration-300 active:scale-75 pr-0">
                  <FaSellcast className="text-sm text-[#6C51AA]" />
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
                              ? "text-[#6c51aa]/50"
                              : "text-[#6C51AA]"
                          } transition-colors`}
                        />
                        <h4
                          className={`font-medium text-sm ${
                            openSections[item.key]
                              ? "text-[#6C51AA]"
                              : "text-gray-900"
                          }`}
                        >
                          {item.title}
                        </h4>
                      </div>

                      {/* Right section: static arrow icon */}
                      <ChevronRight
                        size={16}
                        className={`text-[#6C51AA] transition-transform duration-300 ${
                          openSections[item.key]
                            ? "rotate-90 text-[#6C51AA]"
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
                      {item?.links &&
                        item.links.map((link) => (
                          <NavLink
                            key={link.path}
                            onClick={() => setIsOpenSidebar(false)}
                            to={link.path}
                            className={"inline-block"}
                          >
                            <div className="dashboardNavLink border-l-[3px] flex items-center gap-2 bg-white p-1 ml-8 mt-2 hover:scale-110 duration-300 active:scale-75 pr-0">
                              {/* <FaSellcast className="text-xl text-[#01c0c9]" /> */}
                              {link.icon && (
                                <link.icon className="text-sm text-[#6C51AA]" />
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

AdminDashboardSidebar.propTypes = {
  setIsOpenSidebar: PropTypes.func.isRequired,
};

export default AdminDashboardSidebar;
