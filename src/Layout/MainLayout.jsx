import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import TopNavbar from "../Components/home/TopNavbar";
import HomeSidebar from "../Components/home/HomeSidebar";
import HomePopover from "../Components/home/HomePopover";

const MainLayout = () => {
  const [hideSidebar, setHideSidebar] = useState(true);
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <TopNavbar
        open={open}
        setOpen={setOpen}
        setHideSidebar={setHideSidebar}
      />
      <div className={`flex `}>
        <HomeSidebar hideSidebar={hideSidebar} />
        {/* <div
          className={`side-bar ${hideSidebar ? "w-[250px]" : "w-0"}  duration-300 bg-white shadow-xl h-[calc(100vh-80px)] sticky top-20 self-start overflow-y-auto shrink-0`}
        ></div> */}

        {/* Main content */}
        <div className="grow w-full">
          <Outlet />
        </div>
      </div>

      {/* popover */}
      {open && <HomePopover />}

      {open && (
        <div
          className="fixed inset-0 w-full h-full z-40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default MainLayout;
