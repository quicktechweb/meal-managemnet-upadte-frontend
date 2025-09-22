import PropTypes from "prop-types";
import {
  FaStore,
  FaBell,
  FaInbox,
  FaShieldAlt,
  FaShoppingBag,
  FaTags,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const listings = [
  {
    id:"1",
    price: "$30,000",
    title: "2017 Tesla model x (100d)",
    location: "San Ramon, CA",
    miles: "84K miles",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0XPzxEQhki_-sG3q-usXw_p1EOvKBleyU5u9mee2Xex0X5axsek6Ju24TPP9qkg3IP0w&usqp=CAU",
  },
  {
    id:"2",
    price: "$11,000",
    title: "2022 Toyota corolla hybrid",
    location: "San Mateo, CA",
    miles: "136K miles",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0XPzxEQhki_-sG3q-usXw_p1EOvKBleyU5u9mee2Xex0X5axsek6Ju24TPP9qkg3IP0w&usqp=CAU",
  },
  {
    id:"3",
    price: "$700",
    title: "Apple Tech Bundle – MacBook Pro 15” + iPad Pro 11”",
    location: "Santa Clara, CA",
    miles: "",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0XPzxEQhki_-sG3q-usXw_p1EOvKBleyU5u9mee2Xex0X5axsek6Ju24TPP9qkg3IP0w&usqp=CAU",
  },
  {
    id:"4",
    price: "$700",
    title: "Apple Tech Bundle – MacBook Pro 15” + iPad Pro 11”",
    location: "Santa Clara, CA",
    miles: "",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0XPzxEQhki_-sG3q-usXw_p1EOvKBleyU5u9mee2Xex0X5axsek6Ju24TPP9qkg3IP0w&usqp=CAU",
  },
  {
    id:"5",
    price: "$700",
    title: "Apple Tech Bundle – MacBook Pro 15” + iPad Pro 11”",
    location: "Santa Clara, CA",
    miles: "",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0XPzxEQhki_-sG3q-usXw_p1EOvKBleyU5u9mee2Xex0X5axsek6Ju24TPP9qkg3IP0w&usqp=CAU",
  },
  {
    id:"6",
    price: "$700",
    title: "Apple Tech Bundle – MacBook Pro 15” + iPad Pro 11”",
    location: "Santa Clara, CA",
    miles: "",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0XPzxEQhki_-sG3q-usXw_p1EOvKBleyU5u9mee2Xex0X5axsek6Ju24TPP9qkg3IP0w&usqp=CAU",
  },
  {
    id:"7",
    price: "$700",
    title: "Apple Tech Bundle – MacBook Pro 15” + iPad Pro 11”",
    location: "Santa Clara, CA",
    miles: "",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0XPzxEQhki_-sG3q-usXw_p1EOvKBleyU5u9mee2Xex0X5axsek6Ju24TPP9qkg3IP0w&usqp=CAU",
  },
  {
    id:"8",
    price: "$700",
    title: "Apple Tech Bundle – MacBook Pro 15” + iPad Pro 11”",
    location: "Santa Clara, CA",
    miles: "",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0XPzxEQhki_-sG3q-usXw_p1EOvKBleyU5u9mee2Xex0X5axsek6Ju24TPP9qkg3IP0w&usqp=CAU",
  },
  // You can add more items here...
];

const Marketplace = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen text-gray-800 mt-16 p-3 gap-4">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-[0_2px_18px_rgba(0,0,0,0.15)] p-4 space-y-4 overflow-y-auto  rounded">
        <h1 className="text-2xl font-bold">Marketplace</h1>

        <input
          type="text"
          placeholder="Search Marketplace"
          className="w-full p-2 shadow-md rounded text-sm"
        />

        <div className="space-y-1 text-sm md:block hidden">
          <SidebarItem icon={<FaStore />} text="Browse all" active />
          <SidebarItem icon={<FaBell />} text="Notifications" />
          <SidebarItem icon={<FaInbox />} text="Inbox" />
          <SidebarItem icon={<FaShieldAlt />} text="Marketplace access" />
          <SidebarItem icon={<FaShoppingBag />} text="Buying" />
          <SidebarItem icon={<FaTags />} text="Selling" />
        </div>

        <Link to="/createlisting">
          <button className="w-full bg-blue-100 text-blue-700 font-semibold p-2 rounded hover:bg-blue-200 text-sm mt-2">
            + Create new listing
          </button>
        </Link>

        <div className="mt-6 text-sm">
          <p className="text-xs text-gray-500">Location</p>
          <p className="text-blue-600">San Francisco, California · Within 65 km</p>
        </div>

        <div className="mt-6 text-sm">
          <p className="text-xs text-gray-500">Categories</p>
          <p>Vehicles</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-2 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold">Todays picks</h2>
          <p className="text-sm text-blue-600">San Francisco · 65 km</p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {listings.map((item, idx) => (
           <>
           <Link to={`/marketplace/${item.id}`}>
            <div
              key={idx}
              className="bg-white rounded-md overflow-hidden shadow hover:shadow-md transition"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <p className="font-semibold">{item.price}</p>
                <p className="text-sm">{item.title}</p>
                <p className="text-xs text-gray-500">{item.location}</p>
                {item.miles && (
                  <p className="text-xs text-gray-500">{item.miles}</p>
                )}
              </div>
            </div></Link></>
          ))}
        </div>
      </main>
    </div>
  );
};

// Sidebar item helper component
const SidebarItem = ({ icon, text, active }) => (
  <button
    className={`flex items-center w-full p-2 rounded hover:bg-gray-100 gap-2 ${
      active ? "text-blue-600 font-semibold" : ""
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{text}</span>
  </button>
);

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default Marketplace;


