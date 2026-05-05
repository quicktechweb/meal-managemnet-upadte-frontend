import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import TopNavbar from "../Components/home/TopNavbar";
import HomeSidebar from "../Components/home/HomeSidebar";
import HomePopover from "../Components/home/HomePopover";
import { useLayoutSwitch } from "../providers/LayoutSwitchProvider";
import MenuSidebar from "../Components/home/MenuSidebar";
import {
  Bot,
  Camera,
  Globe,
  Grid,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Mic,
  Package,
  PlusCircle,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const topIcons = [
  { icon: <Package size={16} />, label: "Product" },
  { icon: <Grid size={16} />, label: "Category" },

  { icon: <Mic size={16} />, label: "Voice Mode" },
  { icon: <PlusCircle size={16} />, label: "Add", special: true },
  { icon: <ShoppingCart size={18} />, label: "Cart" },
  { icon: <Truck size={16} />, label: "Track Order" },
  { icon: <MessageCircle size={16} />, label: "Live Chat" },
];

const bottomIcons = [
  { icon: <MdOutlineDocumentScanner size={16} />, label: "Scanner" },
  { icon: <Camera size={16} />, label: "Camera" },
  { icon: <Heart size={16} />, label: "For you" },
  { icon: <Bot size={16} />, label: "AI" },
  { icon: <FaBangladeshiTakaSign size={16} />, label: "Currency" },
  { icon: <MapPin size={16} />, label: "Location" },
  { icon: <Globe size={16} />, label: "Language" },
];

const MainLayout = () => {
  const [hideSidebar, setHideSidebar] = useState(true);
  const { openPopup, setOpenPopup } = useLayoutSwitch();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setHideSidebar(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full relative ">
      <TopNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setHideSidebar={setHideSidebar}
      />
      <div className={`flex `}>
        <HomeSidebar hideSidebar={hideSidebar} />
        {/* <div
          className={`side-bar ${hideSidebar ? "w-[250px]" : "w-0"}  duration-300 bg-white shadow-xl h-[calc(100vh-80px)] sticky top-20 self-start overflow-y-auto shrink-0`}
        ></div> */}

        {/* Main content */}
        <div className="grow w-full">
          <Outlet />
        </div>
      </div>

      {/* popover */}
      {openPopup && <HomePopover />}

      {openPopup && (
        <div
          className="fixed inset-0 w-full h-full z-40 backdrop-blur-sm"
          onClick={() => setOpenPopup(false)}
        />
      )}

      <MenuSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 w-full h-full z-50 backdrop-blur-sm"
          onClick={() => {
            setSidebarOpen(false);
            document.body.style.overflow = "visible";
          }}
        />
      )}

      {/* mobile bottom bar */}
      <div className="bg-white block md:hidden fixed bottom-0 w-full border-t border-gray-200 z-10 pb-safe">
        {/* Row label */}

        {/* Top icon row */}
        <div className="flex overflow-x-auto scrollbar-hide px-3 gap-0">
          {topIcons.map(({ icon, label, special }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-1 px-1 xs:px-2.5 py-1.5 flex-shrink-0 min-w-[50px] xs:min-w-[54px] rounded-xl active:scale-90 transition-transform"
            >
              <div
                className={`w-9 h-9 rounded-[10px] flex items-center justify-center border border-gray-100
          ${special ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 border-transparent text-white shadow-md" : "bg-gray-50 text-gray-700"}`}
              >
                {icon}
              </div>
            </button>
          ))}
        </div>

        <div className="h-px bg-gray-100 mx-3 my-0.5" />

        {/* Bottom icon row */}
        <div className="flex overflow-x-auto scrollbar-hide px-3 gap-0 pb-1">
          {bottomIcons.map(({ icon, label }) => (
            <button
              key={label}
              className="flex flex-col items-center gap-1 px-1 xs:px-2.5 py-1.5 flex-shrink-0 min-w-[50px] xs:min-w-[54px] rounded-xl active:scale-90 transition-transform"
            >
              <div className="w-9 h-9 rounded-[10px] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                {icon}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
