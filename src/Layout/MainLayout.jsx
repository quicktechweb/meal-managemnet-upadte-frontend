import React, { useEffect, useRef, useState } from "react";
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
  ChevronUp,
  ChevronDown,
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
  const { hideSidebar, setHideSidebar } = useLayoutSwitch();

  const { openPopup, setOpenPopup } = useLayoutSwitch();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // mobile bottom bar toggle
  const [mobileBarOpen, setMobileBarOpen] = useState(false);

  const [navVisible, setNavVisible] = useState(true);

  const firstBarRef = useRef(null);

  const [hideOffset, setHideOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setHideSidebar(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const update = () => {
      const height = firstBarRef.current?.offsetHeight ?? 0;

      setHideOffset(height);
    };

    update();

    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const updateNavHeight = () => {
      const navbar = document.querySelector(".navbar-wrapper");

      const height = navbar?.offsetHeight ?? 0;

      document.documentElement.style.setProperty(
        "--navbar-height",
        `${height}px`,
      );
    };

    updateNavHeight();

    window.addEventListener("resize", updateNavHeight);

    return () => window.removeEventListener("resize", updateNavHeight);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 768) return;

      setNavVisible(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full relative">
      {/* Top Navbar */}
      <TopNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setHideSidebar={setHideSidebar}
        navVisible={navVisible}
        hideOffset={hideOffset}
        firstBarRef={firstBarRef}
      />

      {/* Main Layout */}
      <div className="flex">
        <HomeSidebar
          hideSidebar={hideSidebar}
          hideOffset={hideOffset}
          visible={navVisible}
        />

        <div className="w-full min-w-0 transition-all duration-300 pb-[80px] md:pb-0">
          <Outlet />
        </div>
      </div>

      {/* Home Popup */}
      {openPopup && <HomePopover />}

      {openPopup && (
        <div
          className="fixed inset-0 w-full h-full z-40 backdrop-blur-sm"
          onClick={() => setOpenPopup(false)}
        />
      )}

      {/* Menu Sidebar */}
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

      {/* ================================= */}
      {/* MOBILE BOTTOM TOGGLE NAVBAR */}
      {/* ================================= */}

      <div className="md:hidden fixed bottom-0 left-0 w-full z-50">
        {/* Right Toggle Button */}
        <div className="flex justify-end px-4 mb-2">
          <button
            onClick={() => setMobileBarOpen((prev) => !prev)}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white shadow-xl flex items-center justify-center active:scale-95 transition-all duration-300"
          >
            {mobileBarOpen ? (
              <ChevronDown size={22} />
            ) : (
              <ChevronUp size={22} />
            )}
          </button>
        </div>

        {/* Bottom Bar */}
        <div
          className={`
            bg-white border-t border-gray-200 shadow-2xl
            overflow-hidden transition-all duration-300
            ${mobileBarOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="flex flex-col items-center pb-safe">
            {/* Top Icons */}
            <div className="flex overflow-x-auto scrollbar-hide px-3 gap-0">
              {topIcons.map(({ icon, label, special }) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-1 px-1 xs:px-2.5 py-1.5 flex-shrink-0 min-w-[50px] xs:min-w-[54px] rounded-xl active:scale-90 transition-transform"
                >
                  <div
                    className={`w-9 h-9 rounded-[10px] flex items-center justify-center border border-gray-100
                      ${
                        special
                          ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 border-transparent text-white shadow-md"
                          : "bg-gray-50 text-gray-700"
                      }`}
                  >
                    {icon}
                  </div>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-100 mx-3 my-0.5 w-full" />

            {/* Bottom Icons */}
            <div className="flex overflow-x-auto scrollbar-hide px-3 gap-0 pb-2">
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
      </div>
    </div>
  );
};

export default MainLayout;
