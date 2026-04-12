import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import TopNavbar from "../Components/home/TopNavbar";
import HomeSidebar from "../Components/home/HomeSidebar";

const MainLayout = () => {
  const [hideSidebar, setHideSidebar] = useState(true);

  return (
    <div>
      <TopNavbar setHideSidebar={setHideSidebar} />
      <div className={`flex  `}>
        <HomeSidebar hideSidebar={hideSidebar} />
        {/* <div
          className={`side-bar ${hideSidebar ? "w-[250px]" : "w-0"}  duration-300 bg-white shadow-xl h-[calc(100vh-80px)] sticky top-20 self-start overflow-y-auto shrink-0`}
        ></div> */}

        {/* Main content */}
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
