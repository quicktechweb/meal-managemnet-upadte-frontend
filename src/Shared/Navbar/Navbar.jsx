"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import LanguageDropdown from "../LanguageDropdown";
import useAuth from "../../Hooks/useAuth";
import { IoMdClose } from "react-icons/io";

import { FaUtensils, FaShoppingBag } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [navbarModalOpen, setNavbarModalOpen] = useState(false);

  const { user } = useAuth();

  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Why Choose Us", link: "/#why-choose-us" },
    { name: "Features", link: "/#features" },
    // { name: "Meal", link: "/meal" },
    // { name: "Ride", link: "/ride" },
    { name: "Reviews", link: "/#testimonial" },
    { name: "Food", link: "/#food" },
    { name: "FAQ", link: "/faq" },
  ];

  return (
    <>
      <nav
        className={`w-full z-50 transition-all duration-500 ${
          scrolled ||
          location?.pathname === "/faq" ||
          location?.pathname === "/contact-us" ||
          location?.pathname === "/register/user" ||
          location?.pathname === "/register/mess" ||
          location?.pathname === "/menu-details" ||
          location?.pathname === "/login" ||
          location?.pathname === "/privecy-policy" ||
          location?.pathname === "/terms-and-conditions"
            ? "fixed top-0 bg-gradient-to-r from-purple-700 to-blue-600 shadow-lg backdrop-blur"
            : "absolute top-0 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center text-white">
          {/* LOGO */}
          <Link to={"/"} className="font-semibold flex items-center">
            <img
              src="https://i.ibb.co/8gMntgXX/Gemini-Generated-Image-m517mjm517mjm7.png"
              alt="Appbeats Logo"
              className="h-16 lg:h-16 object-contain transition-transform duration-300 hover:scale-110"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-8 text-md font-medium  items-center opacity-90">
            {menuItems.map((item) =>
              item.link === "/login" ? (
                <Link key={item.name} to={item.link}>
                  <li className="hover:opacity-100 cursor-pointer">
                    {item.name}
                  </li>
                </Link>
              ) : (
                <Link key={item.name} to={item.link}>
                  <li
                    key={item.name}
                    className="hover:opacity-100 cursor-pointer"
                  >
                    {item.name}
                  </li>
                </Link>
              ),
            )}

            {user ? (
              <div className="flex items-center gap-3 text-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition">
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
                  <h4 className="text-sm font-semibold text-white">
                    {user?.user?.name}
                  </h4>
                  <p className="text-xs text-white">@{user?.user?.username}</p>
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

          {/* Mobile Hamburger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                document.body.style.overflow = "hidden";
              }}
              className="text-white text-2xl cursor-pointer focus:outline-none"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-black/70 backdrop-blur-sm z-40 transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="w-3/4 max-w-xs bg-gradient-to-b from-purple-700 to-blue-600 h-full p-6 text-white shadow-lg relative">
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                document.body.style.overflow = "visible";
              }}
              className="absolute cursor-pointer  top-5 right-5 w-10 h-10 rounded-full bg-gray-300 text-black hover:bg-gray-200"
            >
              ✕
            </button>
            <ul className="flex flex-col gap-3 lg:gap-6 mt-10 text-lg font-medium">
              {menuItems.map((item) =>
                item.link === "/login" ? (
                  <Link
                    key={item.name}
                    to={item.link}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <li className="hover:text-yellow-300 transition">
                      {item.name}
                    </li>
                  </Link>
                ) : (
                  <li
                    key={item.name}
                    className="hover:text-yellow-300 cursor-pointer transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </li>
                ),
              )}
            </ul>
            {/* <Link to={"/login"} className="hover:text-yellow-300 transition">
            Login
          </Link> */}
          </div>
        </div>
      </nav>
    </>
  );
}

//  {
//    navbarModalOpen && <NavbarModal handleClose={handleClose} />;
//  }

// const NavbarModal = ({ handleClose }) => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

//       {/* Modal */}
//       <div className="relative w-full max-w-md mx-4 rounded-2xl bg-white shadow-2xl p-6 animate-scaleIn">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <h2></h2>
//           <button
//             onClick={handleClose}
//             className="text-gray-400 hover:text-gray-700 transition"
//           >
//             <IoMdClose size={22} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="text-center space-y-2 mb-6">
//           <h4 className="text-2xl font-bold text-gray-900">
//             Get Started With Us
//           </h4>
//           <p className="text-sm text-gray-500">
//             Choose a service and begin your journey
//           </p>
//         </div>

//         {/* Actions */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           <button onClick={handleClose}>
//             <Link
//               to="/register/user"
//               className="group flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-medium text-gray-800 hover:bg-black hover:text-white transition-all shadow-sm"
//             >
//               <FaUtensils className="text-lg group-hover:scale-110 transition" />
//               Meal Service
//             </Link>
//           </button>

//           <button onClick={handleClose}>
//             <Link
//               to="/auth/all-access-register"
//               className="group flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 font-medium text-gray-800 hover:bg-black hover:text-white transition-all shadow-sm"
//             >
//               <FaShoppingBag className="text-lg group-hover:scale-110 transition" />
//               Ecommerce
//             </Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
