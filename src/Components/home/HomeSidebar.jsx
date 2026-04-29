import { useState } from "react";
import NavItem from "./NavItem";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineRestaurantMenu, MdOutlineFoodBank } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import { RiStarSmileLine } from "react-icons/ri";
import { CiShop } from "react-icons/ci";

const mainNav = [
  { icon: <AiOutlineHome size={16} />, label: "Home", sectionId: "home" },
  {
    icon: <MdOutlineRestaurantMenu size={16} />,
    label: "Meal",
    sectionId: "features",
    badge: "New",
  },
  {
    icon: <BiDish size={16} />,
    label: "Why Choose Us",
    sectionId: "why-choose-us",

    badgeRed: true,
  },
  {
    icon: <RiStarSmileLine size={16} />,
    label: "Review",
    sectionId: "testimonial",
  },
  { icon: <MdOutlineFoodBank size={16} />, label: "Food", sectionId: "food" },
  { icon: <CiShop size={16} />, label: "E-Commerce", sectionId: "ecommerce" },
  { icon: <CiShop size={16} />, label: "App", sectionId: "app" },
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
      h-[calc(100vh-80px)] sticky top-20 self-start shrink-0
      flex flex-col overflow-hidden transition-all`}
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
