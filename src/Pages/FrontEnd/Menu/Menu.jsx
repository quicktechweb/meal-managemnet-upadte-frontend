import { BsCameraReelsFill } from "react-icons/bs";
import {
  FaCog,
  FaMoneyBillAlt,
  FaUserTie,
  FaBan,
  FaShieldAlt,
  FaSignOutAlt,
  FaHome,
  FaUserFriends,
  FaHospitalUser,
  FaCartArrowDown,
  FaBookReader,
  FaRegUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import { BiSolidBadge } from "react-icons/bi";

const Menu = () => {
  const menuItems = [
    { icon: <FaHome />, label: "Home", path: "/", bg: "bg-blue-500" },
    { icon: <FaRegUserCircle />, label: "Profile", path: "/profile", bg: "bg-purple-500" },
    { icon: <FaCog />, label: "Settings", path: "/settings", bg: "bg-gray-500" },
    { icon: <FaMoneyBillAlt />, label: "Earn", path: "/earn", bg: "bg-green-500" },
    { icon: <FaUserTie />, label: "Seller Account", path: "/orderlist", bg: "bg-yellow-500" },
    { icon: <FaBan />, label: "Blocking", path: "/blockusers", bg: "bg-red-500" },
    { icon: <FaShieldAlt />, label: "Deactivate", path: "/friendlist", bg: "bg-indigo-500" },
    { icon: <BsCameraReelsFill />, label: "Reels", path: "/reels", bg: "bg-pink-500" },
    { icon: <MdMessage />, label: "Message", path: "/chat", bg: "bg-teal-500" },
    { icon: <FaUserFriends />, label: "Friend", path: "/friend", bg: "bg-orange-500" },
    { icon: <FaHospitalUser />, label: "Group", path: "/group", bg: "bg-lime-500" },
    { icon: <FaCartArrowDown />, label: "Market Place", path: "/marketplace", bg: "bg-rose-500" },
    { icon: <FaBookReader />, label: "Market Book", path: "/allproductlist", bg: "bg-emerald-500" },
    { icon: <BiSolidBadge />, label: "Red Badge", path: "/twictVerified", bg: "bg-cyan-500" },
    { icon: <FaSignOutAlt />, label: "Logout", path: "/logout", bg: "bg-red-600" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2  p-4 pt-20 bg-white">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="flex flex-col items-center justify-center gap-2 bg-white rounded-xl 
          hover:bg-gray-700 hover:text-white transition-all duration-300 h-28 w-full shadow-[0_1px_6px_rgba(0,0,0,0.1)]"
        >
          {/* Icon container */}
          <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${item.bg}`}>
            <span className="text-white text-2xl">{item.icon}</span>
          </div>

          {/* Label */}
          <span className="text-black hover:text-white text-sm font-medium">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
