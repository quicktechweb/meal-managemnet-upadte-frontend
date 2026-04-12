import React from "react";
import { useGetWebsiteData } from "../../api/admin/admin.api";
import useAuth from "../../Hooks/useAuth";
import { FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import LanguageDropdown from "../../Shared/LanguageDropdown";

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

  return (
    <div className="top-navbar bg-white shadow h-20 sticky top-0 z-50">
      <div className=" mx-auto px-6 py-2 flex justify-between items-center ">
        {/* LOGO */}

        <div className="flex items-center gap-5">
          <div
            onClick={() => setHideSidebar((prev) => !prev)}
            className="text-3xl font-semibold cursor-pointer"
          >
            <FiMenu />
          </div>
          <img
            src={data?.logoUrl}
            alt={data?.siteName}
            className="h-16 w-[100px] transition-transform duration-300 hover:scale-110"
          />
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
    </div>
  );
};

export default TopNavbar;
