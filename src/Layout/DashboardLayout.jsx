import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/common/Sidebar";
import { Bell, Search, Menu } from "lucide-react";
import useInstituteAuth from "../Hooks/useInstituteAuth";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  const { user } = useInstituteAuth();

  useEffect(() => {
    if (showBalance) {
      const timer = setTimeout(() => {
        setShowBalance(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showBalance]);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Mobile backdrop overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top navbar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 md:px-6 gap-3 shrink-0">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Menu size={16} className="text-gray-500" />
          </button>

          <div className="ml-auto flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative w-9 h-9 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Bell size={16} className="text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
            </button>

            {/* Avatar */}
            {/* <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center cursor-pointer shrink-0">
              <span className="text-white text-sm font-semibold">U</span>
            </div> */}
            {user?.user?.role === "user" && (
              <div className="flex flex-col">
                <h4 className="text-[15px] font-bold text-gray-800 leading-tight">
                  {user?.user?.information?.full_name}
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
                        {user?.user?.balance}
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
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
