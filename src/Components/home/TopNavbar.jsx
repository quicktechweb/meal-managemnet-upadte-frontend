import React from "react";
import { useGetWebsiteData } from "../../api/admin/admin.api";
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
import { FiMenu } from "react-icons/fi";
import HomePopover from "./HomePopover";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { useLayoutSwitch } from "../../providers/LayoutSwitchProvider";

import { CiMenuFries } from "react-icons/ci";
import { CalendarDays, List, ClipboardList, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useInstituteAuth from "../../Hooks/useInstituteAuth";

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

const mobiletopIcons = [
  { icon: <Search size={16} />, label: "Search" },
  { icon: <Camera size={16} />, label: "Camera" },
  { icon: <MdOutlineDocumentScanner size={16} />, label: "Scanner" },
  { icon: <PlusCircle size={16} />, label: "Add", special: true },

  { icon: <Mic size={16} />, label: "Voice" },
  { icon: <Bell size={16} />, label: "Notifications", badge: true },

  { icon: "৳", label: "Currency" },
];

const smmobiletopIcons = [
  { icon: <Search size={16} /> },
  { icon: <PlusCircle size={16} />, special: true },
  { icon: <Heart size={16} /> },
  { icon: <Search size={16} /> },
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

const mobilebottomIcons = [
  { icon: <Utensils size={16} />, label: "A Food" },
  { icon: <Home size={16} />, label: "Home", active: true },
  { icon: <Bell size={16} />, label: "Notifications" },
  { icon: <Menu size={16} />, label: "Menu" },
  { icon: <ShoppingCart size={18} />, label: "Cart" },

  { icon: <Globe size={16} />, label: "Language" },
  { icon: <MapPin size={16} />, label: "Location" },
];

const smmobilebottomIcons = [
  { icon: <Home size={16} />, active: true },

  { icon: <ShoppingCart size={18} /> },

  { icon: <Globe size={16} /> },
  { icon: <MapPin size={16} /> },
];

// meal
const mealBottomIcons = [
  { icon: <Home size={16} />, label: "Home", slug: "home", path: "/" },
  {
    icon: <CalendarDays size={16} />,
    label: "Day Wise Meal",
    slug: "day-wise-meal",
    path: "/",
  },
  {
    icon: <List size={16} />,
    label: "All Wise Meal",
    slug: "all-wise-meal",
    path: "/",
  },
  {
    icon: <ClipboardList size={18} />,
    label: "Routine",
    slug: "routine",
    path: "/",
  },
  {},
  // { icon: <Wallet size={16} />, label: "Wallet", slug: "wallet", path: "/" },
];

const IconButton = ({
  icon,
  label,
  special,
  active,
  slug,
  path,
  setSelectedMenu,
  setDaywiseSelect,
  user,
}) => {
  const navigate = useNavigate();
  const handleNavigation = (slug) => {
    if (slug === "home") {
      navigate(`/`);
      setSelectedMenu("");
    }

    if (slug === "day-wise-meal") {
      if (!user) {
        navigate("/register/user");
      } else if (user?.role === "user") {
        navigate("/dashboards/routines#meal-activity");
        setDaywiseSelect("day-wise");
      }
    }

    if (slug === "all-wise-meal") {
      if (!user) {
        navigate("/register/user");
      } else if (user?.role === "user") {
        navigate("/dashboards/routines#meal-activity");
        setDaywiseSelect("show-all");
      }
    }

    if (slug === "routine") {
      if (!user) {
        navigate("/register/user");
      } else if (user?.role === "user") {
        navigate("/dashboards/routines#package-menu-list");
      } else if (user?.role === "institute") {
        navigate("/dashboards/routines");
      }
    }
  };
  return (
    <button
      onClick={() => handleNavigation(slug)}
      className={`relative w-[45px] sm:w-[55px] md:w-[60px] lg:w-[82px] xl:w-[108px] 2xl:w-40  h-10 2xl:h-14 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 group 
      ${
        special
          ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white  hover:scale-105 hover:-translate-y-1"
          : active
            ? " text-blue-600 "
            : " text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:-translate-y-1 "
      }`}
    >
      {/* icon */}
      <div className="flex flex-col lg:flex-row items-center gap-1 xl:gap-2 justify-center ">
        <span>{icon}</span>
        <h3 className="font-semibold text-[10px] lg:text-[12px] 2xl:text-lg ">
          {label}
        </h3>
      </div>
    </button>
  );
};

const TopNavbar = ({ setHideSidebar, setSidebarOpen }) => {
  const { data } = useGetWebsiteData();
  const { user } = useInstituteAuth();

  console.log();

  const {
    openPopup,
    setOpenPopup,
    selectedMenu,
    setSelectedMenu,
    setDaywiseSelect,
  } = useLayoutSwitch();

  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full ">
      <div className="mx-auto px-3.5 xl:px-7 flex items-center gap-2 2xl:gap-8 h-auto py-2">
        {/* LEFT */}
        <div className="flex flex-col-reverse items-center gap-1.5  lg:gap-5">
          <div
            onClick={() => setHideSidebar((prev) => !prev)}
            className="text-2xl xl:text-3xl font-semibold cursor-pointer hover:text-blue-500 transition"
          >
            <FiMenu />
          </div>

          <div
            onClick={() => {
              setOpenPopup((prev) => !prev);
              document.body.style.overflow = "hidden";
            }}
            className="cursor-pointer h-10 md:h-16 w-[60px] lg:w-[80px] xl:w-[100px] shrink-0"
          >
            <img
              src={data?.logoUrl}
              alt={data?.siteName}
              className="w-full h-full shrink-0 transition-all duration-300 hover:scale-110 "
            />
          </div>
        </div>

        {/* divider */}
        <div className="w-px h-9 bg-gradient-to-b from-transparent via-gray-200 to-transparent flex-shrink-0" />

        {/* CENTER */}
        <div className="flex  w-full justify-between md:justify-normal  gap-2 2xl:gap-6 ">
          <div className="flex flex-col gap-1 xl:gap-2 ">
            {/* top icons */}
            <div className="md:flex hidden gap-1">
              {topIcons.map((item, i) => (
                <IconButton key={i} {...item} />
              ))}
            </div>
            <div className="hidden sm:flex md:hidden gap-1">
              {mobiletopIcons.map((item, i) => (
                <IconButton key={i} {...item} />
              ))}
            </div>

            <div className="flex sm:hidden gap-1">
              {smmobiletopIcons.map((item, i) => (
                <IconButton key={i} {...item} />
              ))}
            </div>

            {!selectedMenu && (
              <div className="hidden sm:flex md:hidden gap-1">
                {mobilebottomIcons.map((item, i) => (
                  <IconButton key={i} {...item} />
                ))}
              </div>
            )}

            <div className="flex sm:hidden gap-1">
              {smmobilebottomIcons.map((item, i) => (
                <IconButton key={i} {...item} />
              ))}
            </div>

            {/* bottom icons */}
            {!selectedMenu && (
              <div className="md:flex hidden gap-1">
                {bottomIcons.map((item, i) => (
                  <IconButton key={i} {...item} />
                ))}
              </div>
            )}

            {/* bottom icons */}
            {selectedMenu === "meal" && (
              <div className="md:flex hidden gap-1">
                {mealBottomIcons
                  .filter((item) => {
                    if (user?.user?.role === "institute") {
                      return !["day-wise-meal", "all-wise-meal"].includes(
                        item.slug,
                      );
                    }
                    return true;
                  })
                  .map((item, i) => (
                    <IconButton
                      key={i}
                      {...item}
                      setSelectedMenu={setSelectedMenu}
                      setDaywiseSelect={setDaywiseSelect}
                      user={user?.user}
                    />
                  ))}
              </div>
            )}
          </div>

          <div
            onClick={() => {
              setSidebarOpen(true);
              document.body.style.overflow = "hidden";
            }}
            className="text-xl lg:text-3xl font-bold md:hidden mt-2.5"
          >
            <CiMenuFries />
          </div>

          {/* RIGHT PROFILE */}
          <div className="md:block hidden">
            <div className="rounded-2xl  flex flex-col items-center gap-2  hover:-translate-y-1 transition-all duration-300 ">
              <div className="relative">
                <div className=" rounded-full bg-gradient-to-tr from-blue-500 to-purple-500">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt="profile"
                    className="w-10 h-10 lg:w-14 lg:h-14 rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center hidden sm:block">
                <h3 className="text-sm whitespace-nowrap font-semibold text-gray-800">
                  Al abadan
                </h3>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* popover */}
      {openPopup && <HomePopover />}

      {openPopup && (
        <div
          className="fixed inset-0 w-full h-full z-40 backdrop-blur-sm"
          onClick={() => {
            setOpenPopup(false);
            document.body.style.overflow = "visible";
          }}
        />
      )}

      {/* mobile menu */}
    </div>
  );
};

export default TopNavbar;
