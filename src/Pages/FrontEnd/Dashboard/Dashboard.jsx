import { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";
// import useTitle from "../hooks/useTitle";
import DashboardSideBar from "./DashboardSideBar/DashboardSideBar";
import { CartSidebar } from "../../../Components/CartSidebar";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
// import useFirebase from "../Hooks/useFirebase";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import { useIndividualUserPermission } from "../../../api/cms/user.hook";
const Dashboard = () => {
  const { data } = useIndividualUserPermission();

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleCart = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    document.body.style.overflow = newState ? "hidden" : "visible";
  };

  const [showBalance, setShowBalance] = useState(false);
  const balance = 1250;

  useEffect(() => {
    if (showBalance) {
      const timer = setTimeout(() => {
        setShowBalance(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showBalance]);
  return (
    <div className="relative min-h-screen bg-gray-100 flex">
      <ScrollRestoration />
      {/* ===== Overlay (mobile only) ===== */}
      {isOpenSidebar && (
        <div
          onClick={() => setIsOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* ===== Sidebar (Drawer) ===== */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-[260px] bg-white
          transform transition-transform duration-300 ease-in-out
          ${isOpenSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 
        `}
      >
        <DashboardSideBar setIsOpenSidebar={setIsOpenSidebar} />
      </aside>

      {/* ===== Main Content ===== */}
      <main
        className={`
          transition-all duration-300
       lg:ml-[260px] grow
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow">
          <div className="flex items-center gap-3">
            {/* Toggle button (mobile only) */}
            <button
              onClick={() => setIsOpenSidebar(true)}
              className="lg:hidden text-2xl text-[#FF6600]"
            >
              <FaBars />
            </button>

            {/* <h2 className="text-xl md:text-2xl font-bold">Dashboard</h2> */}
          </div>

          <div className="flex gap-8 items-center">
            <div
              onClick={handleCart}
              className="relative flex items-center justify-center"
            >
              <IoCartOutline className="text-2xl cursor-pointer" />

              <span className="absolute -top-2 -right-3 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-xs text-white">
                {cartItems?.length}
              </span>
            </div>

            <div className="flex  relative items-center justify-center">
              {/* Container */}
              <div className="flex items-center gap-3 lg:w-[240px]">
                {/* Profile Image */}
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="relative cursor-pointer"
                >
                  <img
                    src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png"
                    alt="profile"
                    className="w-12 h-12 rounded-full border-2 border-orange-500 p-0.5"
                  />
                </div>

                {/* Text Section */}
                {user ? (
                  <div className="flex flex-col">
                    <h4 className="text-[15px] font-bold text-gray-800 leading-tight">
                      {user?.user?.name}
                    </h4>

                    {/* Animated Balance Pill */}
                    <div
                      onClick={() => setShowBalance(!showBalance)}
                      className="relative mt-1 cursor-pointer overflow-hidden bg-white border border-pink-100 rounded-full flex items-center px-2"
                    >
                      {/* The Currency Symbol (Static) */}
                      <span className="text-orange-600 font-bold text-xs mr-2 z-10">
                        ৳
                      </span>

                      <AnimatePresence mode="wait">
                        {showBalance ? (
                          <motion.span
                            key="balance"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="text-sm font-bold text-orange-600"
                          >
                            0
                          </motion.span>
                        ) : (
                          <motion.span
                            key="tap"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="text-[11px] font-medium text-orange-600 whitespace-nowrap"
                          >
                            Tap for balance
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {!showBalance && (
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            repeatDelay: 1,
                            ease: "linear",
                          }}
                          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg]"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <h4 className="text-[15px] font-bold text-gray-800 leading-tight">
                      Quick Tech
                    </h4>

                    {/* Animated Balance Pill */}
                    <div
                      onClick={() => setShowBalance(!showBalance)}
                      className="relative mt-1 cursor-pointer overflow-hidden bg-white border border-pink-100 rounded-full flex items-center px-2"
                    >
                      {/* The Currency Symbol (Static) */}
                      <span className="text-orange-600 font-bold text-xs mr-2 z-10">
                        ৳
                      </span>

                      <AnimatePresence mode="wait">
                        {showBalance ? (
                          <motion.span
                            key="balance"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="text-sm font-bold text-orange-600"
                          >
                            {balance}
                          </motion.span>
                        ) : (
                          <motion.span
                            key="tap"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="text-[11px] font-medium text-orange-600 whitespace-nowrap"
                          >
                            Tap for balance
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {!showBalance && (
                        <motion.div
                          initial={{ x: "-100%" }}
                          animate={{ x: "200%" }}
                          transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            repeatDelay: 1,
                            ease: "linear",
                          }}
                          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg]"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
              {open && (
                <div
                  ref={popupRef}
                  className="absolute top-16 left-0 w-[200px] z-30 rounded-lg border border-gray-200 bg-white shadow-lg"
                >
                  <ul className="text-sm text-gray-700">
                    <Link
                      to={"/dashboard/profile"}
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      View Profile
                    </Link>
                    <Link
                      to={"/dashboard/change-password"}
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Change Password
                    </Link>
                    <li className="px-4 py-2 cursor-pointer block bg-black text-white rounded-bl-md rounded-br-md">
                      Log out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <CartSidebar
          isOpen={isOpen}
          onClose={() => {
            document.body.style.overflow = "visible";
            setIsOpen(false);
          }}
        />
        {/* Page Content */}
        <div className="p-2 lg:p-4 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
