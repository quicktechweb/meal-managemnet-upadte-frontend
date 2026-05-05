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
    icon: <FaUserCircle size={16} />,
    label: "Profile",
    sectionId: "",
  },
  {
    icon: <AiOutlineHome size={16} />,
    label: "Home",
    sectionId: "",
  },
  {
    icon: <RiStarSmileLine size={16} />,
    label: "Why Choose Us",
    sectionId: "",
  },
  {
    icon: <MdOutlineFoodBank size={16} />,
    label: "Feature Video",
    sectionId: "",
  },
  {
    icon: <CiCreditCard1 size={16} />,
    label: "Balance",
    sectionId: "",
  },
  {
    icon: <CiShoppingCart size={16} />,
    label: "Order",
    sectionId: "",
  },
  {
    icon: <CiUndo size={16} />,
    label: "Return",
    sectionId: "",
  },
  {
    icon: <CiClock2 size={16} />,
    label: "History",
    sectionId: "",
  },
  {
    icon: <CiChat1 size={16} />,
    label: "Review",
    sectionId: "",
  },
  {
    icon: <CiCircleQuestion size={16} />,
    label: "Faq",
    sectionId: "",
  },
  {
    icon: <CiSettings size={16} />,
    label: "Settings & Privacy",
    sectionId: "",
  },
  {
    icon: <FiHelpCircle size={16} />,
    label: "Help & Support",
    sectionId: "",
  },
  {
    icon: <CiMail size={16} />,
    label: "Contact Us",
    sectionId: "",
  },
  {
    icon: <CiChat1 size={16} />,
    label: "Feedback",
    sectionId: "",
  },
  {
    icon: <MdLogout size={16} />,
    label: "Log Out",
    sectionId: "",
  },
];

const HomeSidebar = ({ hideSidebar }) => {
  const [active, setActive] = useState("Home");

  const handleClick = (item) => {
    setActive(item.label);
    const el = document.getElementById(item.sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className={`${hideSidebar ? "w-[200px] xl:w-[260px]" : "w-0"} 
      duration-300 bg-white border-r border-gray-100 shadow-sm
      lg:h-[calc(100vh-80px)] fixed z-[9999] lg:z-auto lg:sticky lg:top-20 self-start shrink-0
      flex flex-col overflow-hidden min-h-screen transition-all`}
    >
      <div className="flex-1 overflow-y-auto px-2.5 py-2 scrollbar-thin">
        {mainNav.map((item) => (
          <NavItem
            key={item.label}
            {...item}
            active={active === item.label}
            onClick={() => handleClick(item)}
          />
        ))}
        <div className="h-px bg-gray-100 my-2 mx-2" />
      </div>
    </div>
  );
};

export default HomeSidebar;
