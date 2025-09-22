import { useState } from "react";

const blockedUsers = [
  {
    username: "annalise_j",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    username: "martin99",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    username: "sunnyDays",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    username: "ben_doer",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const BlockUser = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = blockedUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search blocked users"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Blocked Users List */}
        <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
          {filteredUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-gray-800 font-medium">{user.username}</span>
              </div>
              <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100">
                Unblock
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockUser;
