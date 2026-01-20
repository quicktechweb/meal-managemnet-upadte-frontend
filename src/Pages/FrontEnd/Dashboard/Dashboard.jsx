import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Outlet } from "react-router-dom";
// import useTitle from "../hooks/useTitle";
import DashboardSideBar from "./DashboardSideBar/DashboardSideBar";
// import useFirebase from "../Hooks/useFirebase";

const Dashboard = () => {
  //   useTitle("Dashboard Home");
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpens, setIsOpens] = useState(false);
  // const { admin,subadmin } = useFirebase();
  // console.log(subadmin)

  const toggleDropdown = () => {
    setIsOpens(!isOpens);
  };
  // const value = 1;
  return (
    <div className="flex flex-row-reverse gap-4 relative">
      {/* { (admin || subadmin) && 

( */}

      <>
        <div
          className={`${
            // isOpenSidebar ? "w-full md:w-[20%]" : "w-0 md:w-[20%]"
            isOpenSidebar ? "w-[20%]" : "w-0 md:w-[20%]"
          } h-[calc(100vh-0px)] fixed top-0 left-0 bg-white z-50 overflow-y-scroll duration-300 transition-all ease-in-out`}
        >
          <div className="w-full">
            <div className="hidden md:flex items-center gap-5">
              <img
                className="w-64 h-12 ms-3 mt-2"
                src="https://i.ibb.co/8gMntgXX/Gemini-Generated-Image-m517mjm517mjm7.png"
              />
            </div>
            <DashboardSideBar setIsOpenSidebar={setIsOpenSidebar} />
          </div>
        </div>
        {/* Side Bar End  */}
        {/* Main Content Start */}
        {/* isOpenSidebar ? "w-full md:w-[20%]" : "w-0 md:w-[20%]" */}
        {/* <div className="w-full ml-[20%]"> */}
        <div
          className={`${
            isOpenSidebar ? "w-[80%]" : "w-full md:w-[80%]"
          } duration-300 transition-all ease-in-out`}
        >
          <div className="">
            <div className=" flex justify-between shadow-xl md:pl-16 py-4 md:py-1">
              <div className="flex justify-center items-center text-center print:hidden">
                {!isOpenSidebar ? (
                  <FaBars
                    onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                    className="block md:hidden text-2xl text-[#FF6600] mx-4 font-semibold"
                  />
                ) : (
                  <FaTimes
                    onClick={() => setIsOpenSidebar(!isOpenSidebar)}
                    className="block md:hidden text-2xl text-[#FF6600] mx-4 font-semibold"
                  />
                )}
                <h2 className="text-black font-bold text-lg md:text-3xl p-3 print:hidden">
                  Dashboard
                </h2>
              </div>
              <div className="hidden md:flex justify-center items-center p-5 ms-24">
                <div className="relative">
                  {/* <input
                  type="text"
                  placeholder="Search..."
                  className="pl-16 pr-10  py-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                /> */}

                  {/* <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                </div>
              </div>
              {/* <div className="flex justify-center items-center">
     <FaBell className="text-black text-3xl mt-2 " />
     </div> */}
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center">
                  {/* <div className="notification-icon">
    <FaBell className="icon" />
    <span className="value">{value}</span>
  </div> */}
                </div>
                <div className="container mx-auto px-4 flex justify-between items-center">
                  <div className="relative print:hidden">
                    {/* Profile Image */}
                    <img
                      src="https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_640.png"
                      alt="Profile"
                      className="w-8 md:w-12 h-8 md:h-12 rounded-full cursor-pointer text-3xl"
                      onClick={toggleDropdown}
                    />
                    {/* Dropdown Menu */}
                    {isOpens && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                        <ul className="py-1">
                          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-xl font-semibold">
                            Profile Settings
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-xl font-semibold">
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <Outlet></Outlet>
          </div>
        </div>
      </>
      {/* ) */}

      {/* } */}
    </div>
  );
};

export default Dashboard;
