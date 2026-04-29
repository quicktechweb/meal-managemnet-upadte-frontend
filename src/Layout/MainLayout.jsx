import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import TopNavbar from "../Components/home/TopNavbar";
import HomeSidebar from "../Components/home/HomeSidebar";
import HomePopover from "../Components/home/HomePopover";
import { useLayoutSwitch } from "../providers/LayoutSwitchProvider";
import MenuSidebar from "../Components/home/MenuSidebar";

const MainLayout = () => {
  const [hideSidebar, setHideSidebar] = useState(true);
  const { openPopup, setOpenPopup } = useLayoutSwitch();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setHideSidebar(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <TopNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
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
      {openPopup && <HomePopover />}

      {openPopup && (
        <div
          className="fixed inset-0 w-full h-full z-40 backdrop-blur-sm"
          onClick={() => setOpenPopup(false)}
        />
      )}

      <MenuSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
    </div>
  );
};

export default MainLayout;
