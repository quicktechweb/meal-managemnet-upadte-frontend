
const requests = [
  {
    name: "Olivia Leone",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Alex Kim",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Samira Q.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
];

const FriendRequest= () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white shadow-[0_2px_18px_rgba(0,0,0,0.15)] rounded-lg w-full max-w-xl p-1 m-2">
        {requests.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex items-center space-x-4">
              <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border"
              />
              <span className="font-medium">{user.name}</span>
            </div>
            <div className="flex space-x-3">
              <button className="bg-[#0D162A] text-white px-4 py-2 rounded-md hover:bg-[#1e2a46] transition">
                Accept
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendRequest;
