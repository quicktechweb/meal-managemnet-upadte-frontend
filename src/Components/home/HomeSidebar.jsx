import { useState } from "react";
import NavItem from "./NavItem";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineRestaurantMenu, MdOutlineFoodBank } from "react-icons/md";
import { BiDish } from "react-icons/bi";
import { RiStarSmileLine } from "react-icons/ri";
import { CiShop } from "react-icons/ci";
import { useLayoutSwitch } from "../../providers/LayoutSwitchProvider";

import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { FaLaptop, FaMobileAlt, FaTshirt } from "react-icons/fa";
import SubMenuPortal from "../SubMenuPortal";
const mainNav = [
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

const mealNav = [
  {
    icon: <MdOutlineRestaurantMenu size={16} />,
    label: "Features",
    sectionId: "features",
    badge: "New",
  },
  {
    icon: <BiDish size={16} />,
    label: "How Its Works",
    sectionId: "how-its-works",
    badgeRed: true,
  },
  { icon: <MdOutlineFoodBank size={16} />, label: "Meal", sectionId: "meal" },
  {
    icon: <RiStarSmileLine size={16} />,
    label: "Review",
    sectionId: "review",
  },
];

export const categories = [
  {
    label: "Electronics",
    icon: <FaMobileAlt />,
    submenu: [
      { label: "Mobile Phones", count: 120 },
      { label: "Laptops", count: 80 },
      { label: "Accessories", count: 150 },
    ],
  },
  {
    label: "Fashion",
    icon: <FaTshirt />,
    submenu: [
      { label: "Men", count: 90 },
      { label: "Women", count: 110 },
      { label: "Kids", count: 70 },
    ],
  },
  {
    label: "Computers",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Meat",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Deli Meat",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Ice Cream",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Snacks",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },

  {
    label: "Coffee",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Meat",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Deli Meat",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Ice Cream",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
  {
    label: "Snacks",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },

  {
    label: "Coffee",
    icon: <FaLaptop />,
    submenu: [
      { label: "Desktop", count: 40 },
      { label: "Components", count: 65 },
    ],
  },
];

const foodNav = [
  {
    icon: <MdOutlineRestaurantMenu size={16} />,
    label: "Offers",
    sectionId: "offers",
    badge: "New",
  },
  {
    icon: <BiDish size={16} />,
    label: "How Its Works",
    sectionId: "how-it-works",
    badgeRed: true,
  },
  { icon: <MdOutlineFoodBank size={16} />, label: "Menu", sectionId: "menu" },
  { icon: <MdOutlineFoodBank size={16} />, label: "App", sectionId: "app" },
  {
    icon: <RiStarSmileLine size={16} />,
    label: "Review",
    sectionId: "reviews",
  },
];

const rideNav = [
  {
    icon: <MdOutlineRestaurantMenu size={16} />,
    label: "Features",
    sectionId: "features",
    badge: "New",
  },
  { icon: <MdOutlineFoodBank size={16} />, label: "App", sectionId: "app" },
  {
    icon: <RiStarSmileLine size={16} />,
    label: "Review",
    sectionId: "reviews",
  },
];

const HomeSidebar = ({ hideSidebar }) => {
  const [active, setActive] = useState("Home");

  const { selectedMenu } = useLayoutSwitch();

  const handleClick = (item) => {
    setActive(item.label);
    const el = document.getElementById(item.sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const [activeCategory, setActiveCategory] = useState(null);
  const [submenuPos, setSubmenuPos] = useState({ top: 0 });
  const [openMobileCat, setOpenMobileCat] = useState(null);

  const handleMouseEnter = (e, cat) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSubmenuPos({ top: rect.top });
    setActiveCategory(cat);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <div
      className={`${hideSidebar ? "w-[200px] xl:w-[260px]" : "w-0"} 
      duration-300 bg-white border-r border-gray-100 shadow-sm
      lg:h-[calc(100vh-80px)] fixed z-[9999] lg:z-auto lg:sticky lg:top-20 self-start shrink-0
      flex flex-col overflow-hidden min-h-screen transition-all`}
    >
      {!selectedMenu && (
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
      )}

      {selectedMenu === "meal" && (
        <div className="flex-1 overflow-y-auto px-2.5 py-2 scrollbar-thin">
          {mealNav.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              active={active === item.label}
              onClick={() => handleClick(item)}
            />
          ))}
          <div className="h-px bg-gray-100 my-2 mx-2" />
        </div>
      )}

      {selectedMenu === "e-commerce" && (
        <div className="w-full h-full overflow-y-auto  p-4">
          <h3 className="text-xl font-bold mb-4 block">Shop by Category</h3>

          <ul className="space-y-2">
            {categories.map((cat) => {
              const isOpenMobile = openMobileCat?.label === cat.label;

              return (
                <li key={cat.label}>
                  {/* Category Row */}
                  <div
                    onMouseEnter={(e) => handleMouseEnter(e, cat)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer
                            text-gray-700 hover:bg-[#c78436] hover:text-white transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="font-medium">{cat.label}</span>
                    </div>

                    {/* Icon change */}
                    <span className="">
                      {isOpenMobile ? <FaChevronDown /> : <FaChevronRight />}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {activeCategory && (
            <div className="block">
              <SubMenuPortal
                category={activeCategory}
                position={submenuPos}
                onClose={handleMouseLeave}
              />
            </div>
          )}
        </div>
      )}

      {selectedMenu === "food" && (
        <div className="flex-1 overflow-y-auto px-2.5 py-2 scrollbar-thin">
          {foodNav.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              active={active === item.label}
              onClick={() => handleClick(item)}
            />
          ))}
          <div className="h-px bg-gray-100 my-2 mx-2" />
        </div>
      )}

      {selectedMenu === "ride" && (
        <div className="flex-1 overflow-y-auto px-2.5 py-2 scrollbar-thin">
          {rideNav.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              active={active === item.label}
              onClick={() => handleClick(item)}
            />
          ))}
          <div className="h-px bg-gray-100 my-2 mx-2" />
        </div>
      )}
    </div>
  );
};

export default HomeSidebar;
