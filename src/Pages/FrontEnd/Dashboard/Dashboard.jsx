import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";
// import useTitle from "../hooks/useTitle";
import DashboardSideBar from "./DashboardSideBar/DashboardSideBar";
import { CartSidebar } from "../../../Components/CartSidebar";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
// import useFirebase from "../Hooks/useFirebase";

const Dashboard = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpens, setIsOpens] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleCart = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    document.body.style.overflow = newState ? "hidden" : "visible";
  };
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
