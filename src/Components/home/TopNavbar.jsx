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

const topIcons = [
  { icon: <Search size={18} />, label: "Search" },
  { icon: <Camera size={18} />, label: "Camera" },

  { icon: <Heart size={18} />, label: "For you" },
  { icon: <MdOutlineDocumentScanner size={18} />, label: "Scanner" },
  { icon: <PlusCircle size={18} />, label: "Add", special: true },
  { icon: <Mic size={18} />, label: "Voice" },
  { icon: <Bell size={18} />, label: "Notifications", badge: true },
  { icon: <MapPin size={18} />, label: "Location" },
  { icon: "৳", label: "Currency" },
];

const bottomIcons = [
  { icon: <Utensils size={18} />, label: "A Food" },
  { icon: <Home size={18} />, label: "Home", active: true },
  { icon: <Bell size={18} />, label: "Notifications" },
  { icon: <Menu size={18} />, label: "Menu" },
  { icon: <ShoppingCart size={18} />, label: "Cart" },
  { icon: <Heart size={18} />, label: "For you" },
  { icon: <Globe size={18} />, label: "Language" },
];

const IconButton = ({ icon, label, special, active, badge }) => {
  return (
    <div
      className={`relative w-36 h-14 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 group
      ${
        special
          ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white  hover:scale-105 hover:-translate-y-1"
          : active
            ? " text-blue-600 "
            : " text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:-translate-y-1 "
      }`}
    >
      {/* icon */}
      <div className="flex items-center gap-2 justify-center text-lg">
        <span>{icon}</span>
        <h3 className="font-semibold">{label}</h3>
      </div>

      {/* notification badge */}
      {badge && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white animate-pulse" />
      )}
    </div>
  );
};

const TopNavbar = ({ setHideSidebar }) => {
  const { data } = useGetWebsiteData();
  const { openPopup, setOpenPopup } = useLayoutSwitch();
  return (
    <div className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full ">
      <div className="mx-auto px-7 flex items-center gap-8 h-auto py-2">
        {/* LEFT */}
        <div className="flex flex-col-reverse items-center gap-5">
          <div
            onClick={() => setHideSidebar((prev) => !prev)}
            className="text-3xl font-semibold cursor-pointer hover:text-blue-500 transition"
          >
            <FiMenu />
          </div>

          <div
            onClick={() => {
              setOpenPopup((prev) => !prev);
              document.body.style.overflow = "hidden";
            }}
            className="cursor-pointer shrink-0"
          >
            <img
              src={data?.logoUrl}
              alt={data?.siteName}
              className="h-16 w-[100px] shrink-0 transition-all duration-300 hover:scale-110 "
            />
          </div>
        </div>

        {/* divider */}
        <div className="w-px h-9 bg-gradient-to-b from-transparent via-gray-200 to-transparent flex-shrink-0" />

        {/* CENTER */}
        <div className="flex items-center gap-6 ">
          <div className="flex flex-col gap-2 ">
            {/* top icons */}
            <div className="flex gap-1">
              {topIcons.map((item, i) => (
                <IconButton key={i} {...item} />
              ))}
            </div>

            {/* bottom icons */}
            <div className="flex gap-1">
              {bottomIcons.map((item, i) => (
                <IconButton key={i} {...item} />
              ))}
            </div>
          </div>

          {/* RIGHT PROFILE */}
          <div>
            <div className="w-28  rounded-2xl p-4 flex flex-col items-center gap-2  hover:-translate-y-1 transition-all duration-300 ">
              <div className="relative">
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-blue-500 to-purple-500">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt="profile"
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-sm font-semibold text-gray-800">
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
    </div>
  );
};

export default TopNavbar;
