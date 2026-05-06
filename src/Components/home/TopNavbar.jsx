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
} from "lucide-react";
import { FiMenu } from "react-icons/fi";
import HomePopover from "./HomePopover";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { useLayoutSwitch } from "../../providers/LayoutSwitchProvider";

import { CiMenuFries } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import useInstituteAuth from "../../Hooks/useInstituteAuth";
import { Search, Bell, Camera, MapPin } from "lucide-react";
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
  const handleNavigation = (slug) => {};
  return (
    <button
      onClick={() => handleNavigation(slug)}
      className={`relative w-[55px] xs:w-[65px] sm:w-[110px] md:w-[55px] lg:w-[80px] xl:w-[100px]  llxl:!w-[110px]  lxl:!w-[117px] 2xl:!w-40  h-10 2xl:h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 group 
      ${
        special
          ? "bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white  hover:scale-105 hover:-translate-y-1"
          : active
            ? " text-blue-600 "
            : " text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:-translate-y-1 "
      }`}
    >
      {/* icon */}
      <div className="flex  flex-col sm:flex-row md:flex-col  lg:flex-row items-center gap-1 xl:gap-2 justify-center ">
        <span>{icon}</span>
        <h3 className="font-semibold hidden sm:block text-[10px] lg:text-[12px] 2xl:text-lg ">
          {label}
        </h3>
      </div>
    </button>
  );
};

const TopNavbar = () => {
  const { data } = useGetWebsiteData();
  const { user } = useInstituteAuth();

  const {
    openPopup,
    setOpenPopup,
    selectedMenu,
    setSelectedMenu,
    setDaywiseSelect,
    hideSidebar,
    setHideSidebar,
  } = useLayoutSwitch();

  return (
    <div className="sticky top-0 z-50 w-full ">
      <div className="bg-white  mx-auto flex items-center gap-0 2xl:gap-0 h-auto py-2">
        {/* LEFT */}

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

        {/* divider */}
        <div className="w-px h-9 bg-gradient-to-b from-transparent via-gray-200 to-transparent flex-shrink-0" />

        {/* CENTER */}
        <div className="flex  w-full  items-center  gap-2 2xl:gap-6 ">
          <div className="flex flex-col gap-1 xl:gap-2 ">
            {/* top icons */}
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

            {/* bottom icons */}

            {/* <div className="flex  gap-1">
            
              {!selectedMenu && (
                <IconButton icon={<Utensils size={16} />} label={"A Food"} />
              )}

              {selectedMenu === "food" && (
                <IconButton icon={<Utensils size={16} />} label={"A Food"} />
              )}

              {selectedMenu === "e-commerce" && (
                <IconButton
                  icon={<ShoppingCart size={16} />}
                  label={"Ecommerce"}
                />
              )}

              {selectedMenu === "ride" && (
                <IconButton icon={<Bike size={16} />} label={"A Rider"} />
              )}

              {bottomIcons.map((item, i) => (
                <IconButton key={i} {...item} />
              ))}

              <div className="md:hidden flex">
                {mobileBottomIcons.map((item, i) => (
                  <IconButton key={i} {...item} />
                ))}
              </div>
            </div> */}

            <div className="md:flex hidden gap-1 ">
              {bottomIcons.map((item, i) => {
                const resolvedItem = item.dynamic
                  ? (menuTypeMap[selectedMenu] ?? menuTypeMap["default"])
                  : item;

                return <IconButton key={i} {...resolvedItem} />;
              })}
            </div>

            <div className="md:hidden flex gap-1 ">
              {mobileBottomIcons.map((item, i) => {
                const resolvedItem = item.dynamic
                  ? (menuTypeMap[selectedMenu] ?? menuTypeMap["default"])
                  : item;

                return <IconButton key={i} {...resolvedItem} />;
              })}
            </div>

            {/* bottom icons */}
          </div>

          {/* <div
            onClick={() => {
              setSidebarOpen(true);
              document.body.style.overflow = "hidden";
            }}
            className="text-xl lg:text-3xl font-bold md:hidden mt-2.5"
          >
            <CiMenuFries />
          </div> */}

          {/* RIGHT PROFILE */}
          <div className="shrink-0">
            <div className="rounded-2xl  flex flex-col items-center   hover:-translate-y-1 transition-all duration-300 shrink-0 ">
              <div className=" rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shrink-0">
                <img
                  src="https://i.pravatar.cc/100"
                  alt="profile"
                  className="w-[45px] h-[45px]  rounded-full object-cover shrink-0"
                />
              </div>

              <div className="text-center hidden sm:block">
                <h3 className="text-sm whitespace-nowrap font-semibold text-gray-800">
                  Al abadan
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b border-gray-100  mx-auto  flex items-center xxs:gap-[15px]  md:gap-[20px] lg:gap-[40px]  xl:gap-[50px] llxl:gap-[50px]  lxl:gap-[60px] 2xl:gap-[66px] h-auto py-2">
        <div className="ml-4 md:ml-5 lg:ml-7">
          <div
            onClick={() => setHideSidebar((prev) => !prev)}
            className="text-2xl xl:text-4xl font-semibold cursor-pointer hover:text-blue-500 transition"
          >
            <FiMenu />
          </div>
        </div>
        <MenuCategorySlider />
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
