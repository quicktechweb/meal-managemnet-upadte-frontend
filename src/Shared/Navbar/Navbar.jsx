"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Pages", link: "/pages" },
    { name: "Features", link: "/features" },
    { name: "Meal", link: "/meal" },
    { name: "Ride", link: "/ride" },
    { name: "Reviews", link: "/reviews" },
    { name: "Pricing", link: "/pricing" },
    { name: "FAQ", link: "/faq" },
    { name: "Login", link: "/login" },
  ];

  return (
    <nav
      className={`w-full z-50 transition-all duration-500 ${
        scrolled ||
        location?.pathname === "/faq" ||
        location?.pathname === "/contact-us"
          ? "fixed top-0 bg-gradient-to-r from-purple-700 to-blue-600 shadow-lg backdrop-blur"
          : "absolute top-0 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center text-white">
        {/* LOGO */}
        <div className="text-2xl font-semibold flex items-center">
          <img
            src="https://i.ibb.co/8gMntgXX/Gemini-Generated-Image-m517mjm517mjm7.png"
            alt="Appbeats Logo"
            className="h-16 lg:h-16 object-contain transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-8 text-md font-medium opacity-90">
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
        </div>
      </div>
    </nav>
  );
}
