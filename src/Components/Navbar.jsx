import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import useAuth from "../Hooks/useAuth";

const menu = [
  {
    title: "Home",
    pathname: "/",
  },
  {
    title: "Reviews",
    pathname: "",
  },
  {
    title: "FAQ",
    pathname: "/faq",
  },
  {
    title: "Contact Us",
    pathname: "/contact-us",
  },
];

const Navbar = ({ setIsOpen, isOpen, onCategoryOpen }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { user } = useAuth();

  console.log(user);

  const handleCart = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    document.body.style.overflow = newState ? "hidden" : "visible";
  };
  return (
    <div className="w-full fixed z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-[80px] flex items-center justify-between">
        {/* category menu */}

        <button
          onClick={onCategoryOpen}
          className="lg:hidden px-2 py-2 border rounded-md text-[#C78436]  cursor-pointer text-[22px] font-black "
        >
          <FiMenu />
        </button>

        {/* LOGO */}
        <Link to={"/"} className="flex items-center">
          <img
            src="https://i.ibb.co/8gMntgXX/Gemini-Generated-Image-m517mjm517mjm7.png"
            alt="Appbeats Logo"
            className="h-12 lg:h-14 object-contain transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* MENU */}
        <ul className="hidden lg:flex gap-8 text-sm font-medium text-gray-700">
          {menu.map((item) => (
            <NavLink
              to={item?.pathname}
              key={item}
              className="cursor-pointer hover:text-black transition"
            >
              {item?.title}
            </NavLink>
          ))}
        </ul>

        {user ? (
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition">
            {/* Avatar */}
            <img
              src={
                user?.user?.avatar ||
                "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png"
              }
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border"
            />

            {/* User Info */}
            <div className="leading-tight">
              <h4 className="text-sm font-semibold text-gray-800">
                {user?.user?.name}
              </h4>
              <p className="text-xs text-gray-500">@{user?.user?.username}</p>
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg bg-black text-white text-sm font-medium
               hover:bg-gray-800 transition shadow-sm"
          >
            Login
          </Link>
        )}

        {/* CART */}
        <div
          onClick={handleCart}
          className="relative flex items-center justify-center"
        >
          <IoCartOutline className="text-2xl cursor-pointer" />

          <span className="absolute -top-2 -right-3 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-xs text-white">
            {cartItems?.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
