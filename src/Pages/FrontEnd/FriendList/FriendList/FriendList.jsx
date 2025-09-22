import  { useState } from "react";

const friends = [
  {
    name: "Maya Roberts",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    online: true,
  },
  {
    name: "James Park",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    online: false,
  },
  {
    name: "Elena Zhou",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    online: true,
  },
  {
    name: "Victor K.",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    online: false,
  },
  {
    name: "Linda S.",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    online: false,
  },
];

const FriendList = () => {
  const [search, setSearch] = useState("");

  const filtered = friends.filter(friend =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search friends"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Friend List Box */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filtered.map((friend, index) => (
            <div key={index}>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-800 font-medium">{friend.name}</p>
                    <div className="flex items-center space-x-1 text-sm">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          friend.online ? "bg-green-500" : "bg-gray-400"
                        }`}
                      ></span>
                      <span className="text-gray-500">
                        {friend.online ? "Online" : "Offline"}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="px-3 py-2 text-sm   shadow-[0_1px_5px_rgba(0,0,0,0.15)] rounded-md hover:bg-gray-100">
                  Message
                </button>
              </div>
              {/* Divider line */}
              {index !== filtered.length - 1 && <hr className="border-gray-200" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FriendList;
