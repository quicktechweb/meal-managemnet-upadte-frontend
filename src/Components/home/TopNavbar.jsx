import React, { useState } from "react";
import { useGetWebsiteData } from "../../api/admin/admin.api";

import { FiMenu } from "react-icons/fi";

import {
  Search,
  Camera,
  PlusCircle,
  Heart,
  Scan,
  Mic,
  Bell,
  MapPin,
  DollarSign,
  Globe,
  Utensils,
  Home,
  Menu,
  ShoppingCart,
  User,
} from "lucide-react";
import HomePopover from "./HomePopover";

const topIcons = [
  { icon: <Search size={24} />, label: "search" },
  { icon: <Camera size={24} />, label: "camera" },
  { icon: <PlusCircle size={24} />, label: "" },
  { icon: <Heart size={24} />, label: "for u" },
  { icon: <Scan size={24} />, label: "scanner" },
  { icon: <Mic size={24} />, label: "voice mode" },
  { icon: <Bell size={24} />, label: "notification" },
  { icon: <MapPin size={24} />, label: "location" },
  { icon: <DollarSign size={24} />, label: "currency" },
  { icon: <Globe size={24} />, label: "language" },
];

const bottomIcons = [
  { icon: <Utensils size={24} />, label: "A FOOD" },
  { icon: <Home size={24} />, label: "home" },
  { icon: <Bell size={24} />, label: "notification" },
  { icon: <Menu size={24} />, label: "menu" },
  { icon: <ShoppingCart size={24} />, label: "add to cart" },
  { icon: <Heart size={24} />, label: "for u" },
];

const TopNavbar = ({ setHideSidebar }) => {
  const { data } = useGetWebsiteData();

  const [open, setOpen] = useState(false);

  return (
    <div className="top-navbar bg-white shadow h-auto sticky top-0 z-50 w-full">
      <div className=" mx-auto px-6 py-2 flex gap-20 items-center ">
        {/* LOGO */}

        <div className="flex items-center gap-5">
          <div
            onClick={() => setHideSidebar((prev) => !prev)}
            className="text-3xl font-semibold cursor-pointer"
          >
            <FiMenu />
          </div>
          <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
            <img
              src={data?.logoUrl}
              alt={data?.siteName}
              className="h-16 w-[100px] transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>

        {/* Desktop Menu */}

        <div className="icon-container w-full flex justify-start mt-4">
          <div className="flex gap-6 ">
            {/* LEFT SIDE */}
            <div className="flex flex-col gap-2">
              {/* Top Row */}
              <div className="flex flex-wrap gap-3">
                {topIcons.map((item, index) => (
                  <div className="text-gray-600 w-10 h-10 bg-gray-50 flex items-center justify-center rounded-xl group-hover:text-blue-600">
                    {item.icon}
                  </div>
                ))}
              </div>

              {/* Bottom Row */}
              <div className="flex flex-wrap gap-3">
                {bottomIcons.map((item, index) => (
                  <div className="text-gray-600 bg-gray-50 flex items-center justify-center w-10 h-10  rounded-xl group-hover:text-green-600">
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {open && <HomePopover />}

      {/* Click outside to close */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
};

export default TopNavbar;
