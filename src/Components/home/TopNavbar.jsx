import React, { useState } from "react";
import { useGetWebsiteData } from "../../api/admin/admin.api";
import useAuth from "../../Hooks/useAuth";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import LanguageDropdown from "../../Shared/LanguageDropdown";
import { GiMeal } from "react-icons/gi";

const menuItems = [
  { name: "Home", link: "/" },
  { name: "Why Choose Us", link: "why-choose-us" },
  { name: "Features", link: "features" },
  // { name: "Meal", link: "/meal" },
  // { name: "Ride", link: "/ride" },
  { name: "Reviews", link: "testimonial" },
  { name: "Food", link: "food" },
  { name: "FAQ", link: "/faq" },
];

const TopNavbar = ({ setHideSidebar }) => {
  const { data } = useGetWebsiteData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = (item) => {
    if (item.link.startsWith("/")) {
      navigate(item.link);
    } else {
      const el = document.getElementById(item.link);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="top-navbar bg-white shadow h-20 sticky top-0 z-50 w-full">
      <div className=" mx-auto px-6 py-2 flex justify-between items-center ">
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
        <ul className="hidden lg:flex gap-8 text-md font-medium  items-center opacity-90">
          {menuItems.map((item) =>
            item.link === "/login" ? (
              // <Link key={item.name} to={item.link}>
              <li
                onClick={handleClick}
                className="hover:opacity-100 cursor-pointer"
              >
                {item.name}
              </li>
            ) : (
              // </Link>
              // <Link key={item.name} to={item.link}>
              <li
                onClick={() => handleClick(item)}
                key={item.name}
                className="hover:opacity-100 cursor-pointer"
              >
                {item.name}
              </li>
              // </Link>
            ),
          )}

          {user ? (
            <div className="flex items-center gap-3  px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition">
              {/* Avatar */}
              <img
                src={
                  user?.user?.image ||
                  "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png"
                }
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border"
              />

              {/* User Info */}
              <div className="leading-tight">
                <h4 className="text-sm font-semibold ">{user?.user?.name}</h4>
                <p className="text-xs ">@{user?.user?.username}</p>
              </div>
            </div>
          ) : (
            <Link
              to={"#login"}
              className="px-5 py-2 rounded-lg cursor-pointer bg-black text-white text-sm font-medium hover:bg-gray-800 transition shadow-sm"
            >
              Login
            </Link>
          )}
          <LanguageDropdown />
        </ul>
      </div>

      {open && (
        <div
          className="absolute top-14 left-2 w-[340px] bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
          style={{
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            animation: "fadeDown 0.18s ease both",
          }}
        >
          <style>{`
            @keyframes fadeDown {
              from { opacity: 0; transform: translateY(-8px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <span className="text-[15px] font-medium text-[#202124]">
              Website
            </span>
          </div>

          {/* Favorites grid */}
          <div className="grid grid-cols-3 px-2 pb-2">
            <button className=" cursor-pointer flex flex-col items-center gap-1.5 py-4 rounded-xl transition-colors">
              <div className="w-[52px] h-[52px] bg-gray-100 rounded-full flex items-center justify-center">
                <GiMeal />
              </div>
              <span className="text-[12px] font-semibold text-[#202124]">
                Meal
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#e8eaed] mx-4 mb-2" />
        </div>
      )}

      {/* Click outside to close */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}
    </div>
  );
};

export default TopNavbar;
