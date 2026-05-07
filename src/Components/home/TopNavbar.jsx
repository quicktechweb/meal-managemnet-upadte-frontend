import React from "react";
import { useGetWebsiteData } from "../../api/admin/admin.api";
import {
  Heart,
  Globe,
  Utensils,
  Home,
  Menu,
  ShoppingCart,
  Package,
  Grid,
  PlusCircle,
  Truck,
  Video,
  MessageCircle,
  Bike,
  Search,
  Bell,
  Camera,
  MapPin,
} from "lucide-react";
import { FiMenu } from "react-icons/fi";
import HomePopover from "./HomePopover";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { useLayoutSwitch } from "../../providers/LayoutSwitchProvider";
import { useNavigate } from "react-router-dom";
import useInstituteAuth from "../../Hooks/useInstituteAuth";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import MenuCategorySlider from "./MenuSlider";

const topIcons = [
  { icon: <Search size={16} />, label: "Search" },
  { icon: <Home size={16} />, label: "Home" },
  { icon: <Bell size={16} />, label: "Notifications", badge: true },
  { icon: <Heart size={16} />, label: "For you" },
  { icon: <PlusCircle size={16} />, label: "Add", special: true },
  { icon: <MdOutlineDocumentScanner size={16} />, label: "Scanner" },
  { icon: <Camera size={16} />, label: "Camera" },
  { icon: <MapPin size={16} />, label: "Location" },
  { icon: <FaBangladeshiTakaSign size={16} />, label: "Currency" },
  { icon: <Globe size={16} />, label: "Language" },
];

const mobileTopIcons = [
  { icon: <Search size={16} />, label: "Search" },
  { icon: <Home size={16} />, label: "Home" },
  { icon: <PlusCircle size={16} />, label: "Add", special: true },
  { icon: <Bell size={16} />, label: "Notifications", badge: true },
];

const menuTypeMap = {
  default: { icon: <Utensils size={16} />, label: "A Food" },
  food: { icon: <Utensils size={16} />, label: "A Food" },
  "e-commerce": { icon: <ShoppingCart size={16} />, label: "Ecommerce" },
  ride: { icon: <Bike size={16} />, label: "A Rider" },
};

const bottomIcons = [
  { dynamic: true },
  { icon: <Home size={16} />, label: "Home" },
  { icon: <Package size={16} />, label: "Product" },
  { icon: <Grid size={16} />, label: "Category" },
  { icon: <PlusCircle size={16} />, label: "Add", special: true },
  { icon: <ShoppingCart size={18} />, label: "Cart" },
  { icon: <Truck size={16} />, label: "Track Order" },
  { icon: <Video size={16} />, label: "Video" },
  { icon: <MessageCircle size={16} />, label: "Live Chat" },
  { icon: <Menu size={16} />, label: "Menu" },
];

const mobileBottomIcons = [
  { dynamic: true },
  { icon: <Home size={16} />, label: "Home", active: true },
  { icon: <Video size={16} />, label: "Video" },
  { icon: <Menu size={16} />, label: "Menu" },
];

const IconButton = ({ icon, label, special, active, slug }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {}}
      className={`relative w-[65px] xs:w-[75px] sm:w-[120px] md:w-[59px] lg:w-[82px] xl:w-[106px] llxl:!w-[115px] lxl:!w-[120px] 2xl:!w-42 h-7 md:h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 group
        ${
          special
            ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white hover:scale-105 hover:-translate-y-1"
            : active
              ? "text-blue-600"
              : "text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:-translate-y-1"
        }`}
    >
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-1 xl:gap-2 justify-center">
        <span>{icon}</span>
        <h3 className="font-semibold hidden sm:block text-[10px] lg:text-[12px] 2xl:text-lg">
          {label}
        </h3>
      </div>
    </button>
  );
};

const TopNavbar = ({ navVisible, hideOffset, firstBarRef }) => {
  const { data } = useGetWebsiteData();
  const { user } = useInstituteAuth();
  const { openPopup, setOpenPopup, selectedMenu, setHideSidebar } =
    useLayoutSwitch();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const translateY = !navVisible && isMobile ? `-${hideOffset}px` : "0px";

  return (
    <div
      className="navbar-wrapper sticky top-0 z-50 w-full transition-transform duration-300"
      style={{ transform: `translateY(${translateY})` }}
    >
      {/* First bar */}
      <div
        ref={firstBarRef}
        className="bg-white mx-auto flex items-center gap-0 2xl:gap-0 h-auto py-2"
      >
        {/* Logo */}
        <div
          onClick={() => {
            setOpenPopup((prev) => !prev);
            document.body.style.overflow = "hidden";
          }}
          className="cursor-pointer h-10 sm:h-[50px] lg:h-16 w-[50px] md:w-[60px] lg:w-[80px] xl:w-[100px] shrink-0"
        >
          <img
            src={data?.logoUrl}
            alt={data?.siteName}
            className="w-full h-full shrink-0 transition-all duration-300 hover:scale-110"
          />
        </div>

        {/* Divider */}
        <div className="w-px h-9 bg-gradient-to-b from-transparent via-gray-200 to-transparent flex-shrink-0" />

        {/* Center */}
        <div className="flex w-full items-center">
          <div className="flex flex-col gap-1 xl:gap-2">
            <div className="md:flex hidden gap-1">
              {topIcons.map((item, i) => (
                <IconButton key={i} {...item} />
              ))}
            </div>
            <div className="md:hidden flex gap-1">
              {mobileTopIcons.map((item, i) => (
                <IconButton key={i} {...item} />
              ))}
            </div>
            <div className="md:flex hidden gap-1">
              {bottomIcons.map((item, i) => {
                const resolvedItem = item.dynamic
                  ? (menuTypeMap[selectedMenu] ?? menuTypeMap["default"])
                  : item;
                return <IconButton key={i} {...resolvedItem} />;
              })}
            </div>
            <div className="md:hidden flex gap-1">
              {mobileBottomIcons.map((item, i) => {
                const resolvedItem = item.dynamic
                  ? (menuTypeMap[selectedMenu] ?? menuTypeMap["default"])
                  : item;
                return <IconButton key={i} {...resolvedItem} />;
              })}
            </div>
          </div>

          {/* Profile */}
          <div className="shrink-0">
            <div className="rounded-2xl flex flex-col items-center hover:-translate-y-1 transition-all duration-300 shrink-0">
              <div className="rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shrink-0">
                <img
                  src="https://i.pravatar.cc/100"
                  alt="profile"
                  className="w-7 h-7 md:w-[45px] md:h-[45px] rounded-full object-cover shrink-0"
                />
              </div>
              <div className="text-center hidden sm:block">
                <h3 className="text-xs md:text-sm whitespace-nowrap font-semibold text-gray-800">
                  Al abadan
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second bar */}
      <div className="bg-white border-b border-gray-100 mx-auto flex items-center xxs:gap-0 md:gap-[20px] lg:gap-[40px] xl:gap-[50px] llxl:gap-[50px] lxl:gap-[60px] 2xl:gap-[66px] h-auto py-2">
        <div className="ml-4 xxs:mr-1.5 md:mr-0 md:ml-5 lg:ml-7">
          <div
            onClick={() => setHideSidebar((prev) => !prev)}
            className="text-2xl xl:text-4xl font-semibold cursor-pointer hover:text-blue-500 transition"
          >
            <FiMenu />
          </div>
        </div>
        <MenuCategorySlider />
      </div>

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
