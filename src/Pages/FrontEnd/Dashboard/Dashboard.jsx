import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet } from "react-router-dom";
// import useTitle from "../hooks/useTitle";
import DashboardSideBar from "./DashboardSideBar/DashboardSideBar";
// import useFirebase from "../Hooks/useFirebase";

const Dashboard = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpens, setIsOpens] = useState(false);

  return (
    <div className="relative min-h-screen bg-gray-100 flex">
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
       lg:ml-[250px]
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

            <h2 className="text-xl md:text-2xl font-bold">Dashboard</h2>
          </div>

          {/* Profile */}
          <div className="relative">
            <img
              src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={() => setIsOpens(!isOpens)}
            />

            {isOpens && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                <ul>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Profile Settings
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
