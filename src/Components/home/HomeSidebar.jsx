import { useState } from "react";
import NavItem from "./NavItem";
import {
  MdOutlineRestaurantMenu,
  MdOutlineFoodBank,
  MdLogout,
} from "react-icons/md";
import { BiDish } from "react-icons/bi";
import { RiStarSmileLine } from "react-icons/ri";
import {
  CiShop,
  CiCreditCard1,
  CiShoppingCart,
  CiUndo,
  CiClock2,
  CiChat1,
  CiSettings,
  CiCircleQuestion,
  CiMail,
} from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";

const mainNav = [
  {
    icon: <FaUserCircle size={14} />,
    label: "Profile",
    link:"/dashboards/profile",
    sectionId: "",
  },
  {
    icon: <AiOutlineHome size={14} />,
    label: "Home",
    link:"/",
    sectionId: "",
  },
  {
    icon: <RiStarSmileLine size={14} />,
    label: "Why Choose Us",
    link:"/whychooseus",
    sectionId: "",
  },
  {
    icon: <MdOutlineFoodBank size={14} />,
    label: "Feature ",
    link:"/featutes",
    sectionId: "",
  },
  {
    icon: <CiCreditCard1 size={14} />,
    label: "Balance",
    link:"/balance",
    sectionId: "",
  },
  {
    icon: <CiShoppingCart size={14} />,
    label: "Order",
    link:"/dashboards/routines",
    sectionId: "",
  },
  {
    icon: <CiUndo size={14} />,
    label: "Return",
    link: "/returnpart",
    sectionId: "",
  },
  {
    icon: <CiClock2 size={14} />,
    label: "History",
    link:"/history",
    sectionId: "",
  },
  {
    icon: <CiChat1 size={14} />,
    label: "Review",
    link: "/reviewspart",
    sectionId: "",
  },
  {
    icon: <CiCircleQuestion size={14} />,
    label: "Faq",
    link:"/faq",
    sectionId: "",
  },
  {
    icon: <CiSettings size={14} />,
    label: "Settings & Privacy",
    link:"/settingsprivacy",
    sectionId: "",
  },
  {
    icon: <FiHelpCircle size={14} />,
    label: "Help & Support",
    link:"/helpsupport",
    sectionId: "",
  },
  {
    icon: <CiMail size={14} />,
    label: "Contact Us",
    link:"/contactus",
    sectionId: "",
  },
  {
    icon: <CiChat1 size={14} />,
    label: "Feedback",
    link:"/feedback",
    sectionId: "",
  },
  {
    icon: <MdLogout size={14} />,
    label: "Log Out",
    sectionId: "",
  },
];

const HomeSidebar = ({ hideSidebar, visible, hideOffset }) => {
  const [active, setActive] = useState("Home");

  const handleClick = (item) => {
    setActive(item.label);
    const el = document.getElementById(item.sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`${hideSidebar ? "w-[200px] xl:w-[180px]" : "w-0"} 
      duration-300 bg-white border-r border-gray-100 shadow-sm
      lg:h-[calc(100vh-80px)] fixed z-[9999] lg:z-auto lg:sticky lg:top-20 self-start shrink-0
      flex flex-col overflow-y-auto  h-screen lg:min-h-screen transition-all`}
      style={{
        transform: visible ? "translateY(0)" : `translateY(-${hideOffset}px)`,
      }}
    >
      <div className="flex-1 overflow-y-auto h-full px-0 pb-14 scrollbar-thin">
        {mainNav.map((item) => (
          <NavItem
            key={item.label}
            {...item}
            active={active === item.label}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSidebar;
