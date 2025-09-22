import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUserFriends, FaUserPlus } from "react-icons/fa";

const friendRequests = [
  { name: "Rezwana Hossain", img: "https://i.ibb.co/H1z5yXL/download-4.jpg" },
  { name: "Tahomina Akter", img: "https://i.ibb.co/H1z5yXL/download-4.jpg", info: "Followed by 2.2K" },
  { name: "MD Habib", img: "https://i.ibb.co/H1z5yXL/download-4.jpg" },
  { name: "Shihab Uddin", img: "https://i.ibb.co/H1z5yXL/download-4.jpg", info: "Followed by 4.1K" },
];

const suggestions = [
  { name: "Respite Nursing Home", img: "https://i.ibb.co/H1z5yXL/download-4.jpg", info: "Followed by 5.1K" },
  { name: "S K Babul", img: "https://i.ibb.co/H1z5yXL/download-4.jpg", info: "Followed by 5K" },
  { name: "Mohammad Juwel", img: "https://i.ibb.co/H1z5yXL/download-4.jpg", info: "Followed by 5.5K" },
  { name: "Md Yeasin Arafat Oysti", img: "https://i.ibb.co/H1z5yXL/download-4.jpg" },
  { name: "Zahira Mark", img: "https://i.ibb.co/H1z5yXL/download-4.jpg", info: "1 mutual friend" },
  { name: "Engi MD Sohel Rana", img: "https://i.ibb.co/H1z5yXL/download-4.jpg", info: "Followed by 2.9K" },
  { name: "Mahi Ahmed", img: "https://i.ibb.co/H1z5yXL/download-4.jpg" },
  { name: "Mohammad Hossain", img: "https://i.ibb.co/H1z5yXL/download-4.jpg" },
  { name: "Sanowar Hossain", img: "https://i.ibb.co/H1z5yXL/download-4.jpg", info: "Followed by 5K" },
];

const Friend = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Friend requests", path: "#", icon: <FaUserFriends /> },
    { name: "Suggestions", path: "#", icon: <FaUserPlus /> },
  ];

  const renderCard = (user, i, type = "suggestion") => (
    <div key={i} className="bg-white rounded-lg shadow p-2 flex flex-col h-full">
      <img src={user.img} alt={user.name} className="rounded w-full h-40 object-cover" />
      <div className="mt-2 flex flex-col flex-grow justify-between">
        <div>
          <h4 className="font-medium text-sm">{user.name}</h4>
          {user.info && <p className="text-xs text-gray-500">{user.info}</p>}
        </div>
        <div className="mt-2 flex flex-wrap gap-2 justify-between">
          {type === "suggestion" ? (
            <>
              <button className="bg-blue-100 text-blue-700 text-sm font-medium rounded flex-1 py-1">Add friend</button>
              <button className="bg-gray-200 text-sm rounded flex-1 py-1">Remove</button>
            </>
          ) : (
            <>
              <button className="bg-blue-600 text-white text-sm rounded flex-1 py-1">Confirm</button>
              <button className="bg-gray-200 text-sm rounded flex-1 py-1">Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 mt-12">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white p-4  md:border-b-0 ">
        <h2 className="text-xl font-semibold mb-4">Friends</h2>
        <ul className="space-y-2 text-gray-700 text-sm">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                if (item.path !== "#") navigate(item.path);
              }}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-100 ${
                activeTab === item.name ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              <span className="text-xl text-gray-600">{item.icon}</span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 space-y-8">
        {(activeTab === "Home" || !activeTab) && (
          <>
            {/* Friend Requests */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Friend requests</h3>
                <a href="#" className="text-sm text-blue-500 hover:underline">See all</a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {friendRequests.map((user, i) => renderCard(user, i, "request"))}
              </div>
            </section>

            {/* Suggestions */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">People you may know</h3>
                <a href="#" className="text-sm text-blue-500 hover:underline">See all</a>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {suggestions.map((user, i) => renderCard(user, i, "suggestion"))}
              </div>
            </section>
          </>
        )}

        {activeTab === "Friend requests" && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Friend requests</h3>
              <a href="#" className="text-sm text-blue-500 hover:underline">See all</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {friendRequests.map((user, i) => renderCard(user, i, "request"))}
            </div>
          </section>
        )}

        {activeTab === "Suggestions" && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">People you may know</h3>
              <a href="#" className="text-sm text-blue-500 hover:underline">See all</a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {suggestions.map((user, i) => renderCard(user, i, "suggestion"))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Friend;
