import { useRef, useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaChevronDown,
  FaQrcode,
  FaBars,
  FaTimes,
  FaMobileAlt,
  FaHeadphonesAlt,
  FaClock,
  FaGamepad,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [catOpen, setCatOpen] = useState(false);
  const [accOpen, setAccOpen] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const timer = useRef(null);

  const categories = [
    {
      name: "Mobile Phones",
      icon: <FaMobileAlt className="w-5 h-5 mr-2 text-gray-600" />,
      sub: [
        { title: "Android Phones", children: ["Samsung", "Xiaomi", "OnePlus"] },
        { title: "iPhones", children: ["iPhone 15", "iPhone 14", "iPhone SE"] },
        { title: "Accessories", children: ["Cases", "Screen Guards"] },
      ],
    },
    {
      name: "Accessories",
      icon: <FaHeadphonesAlt className="w-5 h-5 mr-2 text-gray-600" />,
      sub: [
        { title: "Chargers", children: ["Fast Chargers", "Wireless Pads"] },
        { title: "Headphones", children: ["Over-Ear", "TWS Earbuds"] },
        { title: "Cables", children: ["USB-C", "Lightning"] },
      ],
    },
    {
      name: "Wearables",
      icon: <FaClock className="w-5 h-5 mr-2 text-gray-600" />,
      sub: [
        { title: "Smartwatches", children: ["Apple Watch", "Galaxy Watch"] },
        { title: "Fitness Bands", children: ["Mi Band", "Fitbit"] },
        { title: "VR Glasses", children: ["Oculus", "HTC Vive"] },
      ],
    },
    {
      name: "Gaming",
      icon: <FaGamepad className="w-5 h-5 mr-2 text-gray-600" />,
      sub: [
        { title: "Consoles", children: ["PS5", "Xbox", "Nintendo Switch"] },
        { title: "Games", children: ["Action", "Sports", "RPG"] },
        { title: "Accessories", children: ["Controllers", "Headsets"] },
      ],
    },
  ];


   const handleEnter = () => {
    clearTimeout(timer.current);
    setOpen(true);
  };

  const handleLeave = () => {
    // slight delay so user can move cursor diagonally without flicker
    timer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <>
      {/* === Sticky Header === */}
      <header className="sticky top-0 z-50 bg-white  shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between py-3">
          {/* Logo */}
         <Link to="/">
          <div className="flex items-center gap-4">
            <img
              className="h-10 w-24"
              src="https://i.ibb.co.com/VY92LX2H/Logo-Lucky-Shop1.png"
              alt="Sellular Logo"
            />
          </div>
          </Link>

          {/* ===== Mega Categories ===== */}
       <div
      className="relative hidden md:block ms-4"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* === Trigger Button === */}
      <button className="flex items-center gap-1 text-md font-medium text-gray-800 hover:text-black focus:outline-none">
        Categories
        <FaChevronDown
          className={`ml-1 text-md transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* === Mega Menu === */}
      <div
        className={`absolute left-0 top-full mt-5 bg-white shadow-2xl border border-gray-200 rounded-xl overflow-hidden
          transition-all duration-300 ease-out
          ${
            open
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
      >
        <div className="flex w-[850px] h-[400px]">
          {/* ===== Left Column with Icons ===== */}
          <ul className="w-1/3 bg-gray-50 border-r border-gray-200 overflow-y-auto">
            {categories.map((cat, idx) => (
              <li
                key={cat.name}
                onMouseEnter={() => setActive(idx)}
                className={`flex items-center px-5 py-3 text-sm cursor-pointer transition-colors duration-200
                ${
                  active === idx
                    ? "bg-white text-black font-semibold shadow-inner"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {cat.icon}
                {cat.name}
              </li>
            ))}
          </ul>

          {/* ===== Right Panel: Sub + Child ===== */}
          <div className="flex-1 bg-white p-6 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {categories[active].name}
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {categories[active].sub.map((subItem) => (
                <div key={subItem.title}>
                  <h4 className="font-medium text-gray-700 mb-2">
                    {subItem.title}
                  </h4>
                  <ul className="space-y-1">
                    {subItem.children.map((child) => (
                      <li key={child}>
                        <a
                          href="#"
                          className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                        >
                          {child}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

          {/* ===== Search Bar ===== */}
          <div className="hidden lg:flex flex-1 mx-12 relative">
            <input
              type="text"
              placeholder="Search our global search engine for products, categories"
              className="w-full border border-gray-300 rounded-full py-2.5 pl-14 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black transition"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <FaSearch className="text-white text-sm" />
            </div>
          </div>

          {/* ===== Winner Link ===== */}
          <div>
            <Link to="/winnerstatics">
              <h2 className="text-xl font-semibold me-5">Winner</h2>
            </Link>
          </div>

          {/* ===== Right Icons ===== */}
          <div className="hidden lg:flex items-center gap-6 relative">
            {/* App Download */}
            <div
              className="relative"
              onMouseEnter={() => setAppOpen(true)}
              onMouseLeave={() => setAppOpen(false)}
            >
              <button className="bg-black text-white text-sm font-semibold py-2 px-5 rounded-md hover:opacity-90 transition flex items-center gap-2">
                <FaQrcode className="text-lg" /> Download Our App
              </button>
              {appOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md border border-gray-200 z-50 flex p-4 w-[360px]">
                  <div className="w-28 h-28 border border-gray-300 flex items-center justify-center rounded-md">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://play.google.com/store"
                      alt="QR Code"
                      className="w-24 h-24"
                    />
                  </div>
                  <div className="ml-4 flex flex-col justify-between">
                    <p className="text-sm font-semibold text-gray-800">
                      Download the AliExpress app
                    </p>
                    <p className="text-xs text-gray-500">
                      Scan the QR code to download
                    </p>
                    <div className="flex gap-2 mt-3">
                      <a
                        href="https://apps.apple.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="h-10"
                      >
                        <img
                          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                          alt="App Store"
                          className="h-10"
                        />
                      </a>
                      <a
                        href="https://play.google.com/store"
                        target="_blank"
                        rel="noreferrer"
                        className="h-10"
                      >
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                          alt="Google Play"
                          className="h-10"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Account */}
            <div className="relative">
              <button
                onClick={() => setAccOpen(!accOpen)}
                className="flex items-center gap-1 text-md font-medium text-gray-800 hover:text-black focus:outline-none"
              >
                Account <FaChevronDown className="text-md" />
              </button>
              {accOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200 z-50">
                  <ul className="text-sm text-gray-700">
                    <Link to="login">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Sign In
                    </li></Link>
                   <Link to="/registration">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Register
                    </li></Link>
                  </ul>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/orderreview">
            <div className="relative">
              <FaShoppingCart className="text-xl text-black cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                0
              </span>
            </div></Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <button onClick={() => setMobileMenu(!mobileMenu)}>
              {mobileMenu ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* ===== Mobile Dropdown ===== */}
        {mobileMenu && (
          <div className="lg:hidden bg-white border-t shadow-md px-6 py-4 space-y-4">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border border-gray-300 rounded-full py-2.5 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <FaSearch className="text-gray-500" />
              </div>
            </div>

            {/* Categories Accordion */}
            <div>
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center justify-between w-full text-md font-medium text-gray-800 py-2"
              >
                Categories <FaChevronDown />
              </button>
              {catOpen && (
                <ul className="ml-4 text-sm text-gray-700 space-y-2">
                  {categories.map((c) => (
                    <li key={c.name} className="cursor-pointer">
                      {c.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Winner Link */}
            <Link to="/winnerstatics">
              <h2 className="text-xl font-semibold">Winner</h2>
            </Link>

            {/* App Download (mobile) */}
            <div>
              <button
                onClick={() => setAppOpen(!appOpen)}
                className="bg-black text-white w-full py-2 rounded-md flex items-center justify-center gap-2"
              >
                <FaQrcode /> Download Our App
              </button>
              {appOpen && (
                <div className="mt-3 bg-white shadow-lg rounded-md border border-gray-200 p-4 flex flex-col items-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://play.google.com/store"
                    alt="QR Code"
                    className="w-28 h-28"
                  />
                  <p className="text-sm font-semibold text-gray-800 mt-2">
                    Download the AliExpress app
                  </p>
                  <p className="text-xs text-gray-500">
                    Scan the QR code to download
                  </p>
                </div>
              )}
            </div>

            {/* Account Accordion */}
            <div>
              <button
                onClick={() => setAccOpen(!accOpen)}
                className="flex items-center justify-between w-full text-md font-medium text-gray-800 py-2"
              >
                Account <FaChevronDown />
              </button>
              {accOpen && (
                <ul className="ml-4 text-sm text-gray-700 space-y-2">
                  <Link to="/login"><li className="cursor-pointer">Sign In</li></Link>
                 <Link to="/register"> <li className="cursor-pointer">Register</li></Link>
                </ul>
              )}
            </div>

            {/* Cart */}
            <Link to="/orderreview">
             <div className="relative inline-block">
              <FaShoppingCart className="text-2xl text-black cursor-pointer" />
              <span className="absolute -top-2 left-5 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                0
              </span>
            </div>
            </Link>
           
          </div>
        )}
      </header>

      {/* === Marquee === */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-1 overflow-hidden relative shadow-md">
        <div className="flex whitespace-nowrap animate-marquee">
          <h3 className="text-lg font-semibold tracking-wide px-8">
            🏆 Winner coupon name <span className="text-yellow-400">Tamal Sarkar</span> 🔥
          </h3>
          <h3 className="text-lg font-semibold tracking-wide px-8">
            🎉 Big Offer Coming Soon — <span className="text-green-400">Don’t Miss Out!</span>
          </h3>
          <h3 className="text-lg font-semibold tracking-wide px-8">
            🛒 50% Discount For <span className="text-pink-400">New Users</span> 🚀
          </h3>
        </div>
      </div>
    </>
  );
}
