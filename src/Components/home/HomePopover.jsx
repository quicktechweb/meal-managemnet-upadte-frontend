import React from "react";
import { CiShop } from "react-icons/ci";
import { IoFastFood } from "react-icons/io5";
import { RiRidingFill } from "react-icons/ri";
import { GiMeal } from "react-icons/gi";
import { useLayoutSwitch } from "../../providers/LayoutSwitchProvider";
import { useNavigate } from "react-router-dom";

const menu = [
  {
    title: "Food",
    icon: IoFastFood,
    slug: "food",
  },
  {
    title: "E-commerce",
    icon: CiShop,
    slug: "e-commerce",
  },

  {
    title: "Ride",
    icon: RiRidingFill,
    slug: "ride",
  },
];

const HomePopover = () => {
  const { selectedMenu, setSelectedMenu, setOpenPopup } = useLayoutSwitch();
  const navigate = useNavigate();
  return (
    <div className="fixed top-14 left-2 w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <span className="text-[15px] font-medium text-[#202124]">Website</span>
      </div>

      {/* Favorites grid */}
      <div className="grid grid-cols-3 px-2 pb-2">
        {menu?.map((m) => (
          <button
            type="button"
            onClick={() => {
              navigate(`/?menu=${m.slug}`);
              setSelectedMenu(m.slug);
              setOpenPopup(false);
              document.body.style.overflow = "visible";
            }}
            className=" cursor-pointer flex flex-col items-center gap-1.5 py-4 rounded-xl transition-colors"
          >
            <div
              className={`w-[52px] h-[52px] ${selectedMenu === m.slug ? "bg-blue-200 " : "bg-gray-100"}  rounded-full flex items-center justify-center duration-300`}
            >
              {<m.icon />}
            </div>
            <span className="text-[12px] font-semibold text-[#202124]">
              {m.title}
            </span>
          </button>
        ))}

        {/* <button className=" cursor-pointer flex flex-col items-center gap-1.5 py-4 rounded-xl transition-colors">
          <div className="w-[52px] h-[52px] bg-gray-100 rounded-full flex items-center justify-center">
            <CiShop />
          </div>
          <span className="text-[12px] font-semibold text-[#202124]">
            E-commerce
          </span>
        </button>
        <button className=" cursor-pointer flex flex-col items-center gap-1.5 py-4 rounded-xl transition-colors">
          <div className="w-[52px] h-[52px] bg-gray-100 rounded-full flex items-center justify-center">
            <IoFastFood />
          </div>
          <span className="text-[12px] font-semibold text-[#202124]">Food</span>
        </button>
        <button className=" cursor-pointer flex flex-col items-center gap-1.5 py-4 rounded-xl transition-colors">
          <div className="w-[52px] h-[52px] bg-gray-100 rounded-full flex items-center justify-center">
            <RiRidingFill />
          </div>
          <span className="text-[12px] font-semibold text-[#202124]">Ride</span>
        </button> */}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#e8eaed] mx-4 mb-2" />
    </div>
  );
};

export default HomePopover;
