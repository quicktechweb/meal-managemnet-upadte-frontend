import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";

import InstituteDashboardSidebar from "../Components/admin/InstituteDashboardSidebar";
const InstituteLayout = () => {
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
          fixed top-0 left-0 z-50 h-screen overflow-y-auto w-[260px] bg-white
          transform transition-transform duration-300 ease-in-out
          ${isOpenSidebar ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 
        `}
      >
        <InstituteDashboardSidebar setIsOpenSidebar={setIsOpenSidebar} />
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
            {/* Profile */}
            {/* <div className="relative">
              <img
                src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setIsOpens(!isOpens)}
              />

              {isOpens && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <ul>
                    <Link
                      to={"/"}
                      className="px-4 py-2 block hover:bg-gray-100 cursor-pointer"
                    >
                      Profile Settings
                    </Link>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div> */}

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

                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-gray-800 leading-tight">
                    Institute Admin
                  </h4>
                </div>
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

        {/* Page Content */}
        <div className="p-2 lg:p-4 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default InstituteLayout;
