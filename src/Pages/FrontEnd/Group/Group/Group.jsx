import { IoSend } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { FaComment, FaRegCopy, FaShare } from "react-icons/fa";
import CommentModal from "../CommentModal/CommentModal";
import { useState } from "react";
import { Link } from "react-router-dom";

const Group = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };
  const groupsYouManage = [
    {
      name: "নিজের বানার মতো একটা গল্প",
      lastActive: "Last active 39 weeks ago",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrMR-qe1ociHqH2Yhbi9VZ1f4Owex5cAtRBnpwZXPiNv6uWjO5ZN5Hzz6wl1IfAvWaCQ&usqp=CAU",
    },
  ];

  const groupsYouJoined = [
    {
      name: "নিজের বানার মতো একটা গল্প",
      lastActive: "Last active about an hour ago",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrMR-qe1ociHqH2Yhbi9VZ1f4Owex5cAtRBnpwZXPiNv6uWjO5ZN5Hzz6wl1IfAvWaCQ&usqp=CAU",
    },
    {
      name: "AI Content Creation Academy ",
      lastActive: "Last active 17 minutes ago",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrMR-qe1ociHqH2Yhbi9VZ1f4Owex5cAtRBnpwZXPiNv6uWjO5ZN5Hzz6wl1IfAvWaCQ&usqp=CAU",
    },
    {
      name: "Next Level Developer's Community",
      lastActive: "Last active 3 hours ago",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrMR-qe1ociHqH2Yhbi9VZ1f4Owex5cAtRBnpwZXPiNv6uWjO5ZN5Hzz6wl1IfAvWaCQ&usqp=CAU",
    },
    {
      name: "Programming Hero Community",
      lastActive: "Last active 7 hours ago",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrMR-qe1ociHqH2Yhbi9VZ1f4Owex5cAtRBnpwZXPiNv6uWjO5ZN5Hzz6wl1IfAvWaCQ&usqp=CAU",
    },
  ];

  const posts = [
    {
      id: "1",
      author: "Nurunaher Akter Sony",
      groupname: "নিজের বানার মতো একটা গল্প - উদ্যোগ তৈরির প্রতিষ্ঠান",
      time: "6h",
      content:
        "আসসালামুয়ালাইকুম, আমি নূরুনাহার আক্তার (ছবি)। আমি, ইনফাল বাহার স্যার এর ফাউন্ডেশন এ রেজিস্ট্রেশন করতে চাই। কিন্তু কিভাবে করবো বুঝতে পারছি না। দয়া করে কেউ সাহায্য করুন।",
      img: "https://t4.ftcdn.net/jpg/03/26/08/53/360_F_326085309_CFH8PpadfnL2OQ7Gi411XW0B21YumxKo.jpg",
      likes: 7,
      comments: [
        {
          name: "Md Sajib Khan",
          text: "রেজিস্ট্রেশন করার জন্য ইনবক্সে মেসেজ করুন",
          time: "6h",
        },
        {
          name: "Md Nazmul Hassan",
          text: "নিজের বানার মতো একটা গল্প ফাউন্ডেশনে রেজিস্ট্রেশন করার জন্য নিচের তথ্য গুলো ইনবক্সে লিখে পুরন করে দিবেন",
          time: "6h",
        },
      ],
    },
    {
      id: "2",
      author: "To-Let @ Dhanmondi To Mohammadpur",
      groupname: "To-Let Mohammadpur",
      time: "6h",
      content:
        "আর্থিক অবস্থার দিক দিয়ে পরিবার এবং নিজের হাত খরচ নিজের চালাতে চাও এমন কোনো আছে আছে✋😉",
      likes: 4,
      comments: [
        {
          name: "Tabassum Kazi",
          text: "হ্যাঁ",
          time: "6h",
        },
      ],
    },
  ];

  return (
    <div className="flex w-full bg-gray-100 min-h-screen pt-16">
      <div className="w-[300px] p-4 bg-white h-screen overflow-y-auto md:block hidden scrollbar-hide">
        <h2 className="text-lg font-bold mb-3">Groups</h2>
        <input
          type="text"
          placeholder="Search groups"
          className="w-full p-2 mb-4 text-sm  rounded-md bg-gray-100"
        />
        <div className="space-y-2 text-sm font-medium">
          <div className="flex items-center gap-2 hover:bg-gray-200 rounded p-2 cursor-pointer">
            <span className="text-xl">📰</span> Your feed
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-200 rounded p-2 cursor-pointer">
            <span className="text-xl">🔍</span> Discover
          </div>
          <div className="flex items-center gap-2 hover:bg-gray-200 rounded p-2 cursor-pointer">
            <span className="text-xl">👥</span> Your groups
          </div>
        </div>
        <Link to="/creategroup">
          <button className="mt-4 w-full py-2 text-sm bg-blue-100 text-blue-700 rounded font-semibold">
            + Create new group
          </button>
        </Link>
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-700">
            Groups you manage
          </h3>
          {groupsYouManage.map((group, idx) => (
            <div key={idx} className="flex items-center gap-3 mb-3">
              <img
                src={group.avatar}
                alt="group avatar"
                className="w-10 h-10 rounded-md object-cover"
              />
              <div>
                <p className="text-sm font-medium leading-4">{group.name}</p>
                <p className="text-xs text-gray-500">{group.lastActive}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6 mb-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Groups youve joined
            </h3>
            <button className="text-xs text-blue-600 hover:underline">
              See all
            </button>
          </div>
          {groupsYouJoined.map((group, idx) => (
            <div key={idx} className="flex items-center gap-3 mb-3">
              <img
                src={group.avatar}
                alt="group avatar"
                className="w-10 h-10 rounded-md object-cover"
              />
              <div>
                <p className="text-sm font-medium leading-4">{group.name}</p>
                <p className="text-xs text-gray-500">{group.lastActive}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6 h-screen overflow-y-auto scrollbar-hide">
        <div className="max-w-3xl mx-auto space-y-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow-sm border border-gray-200"
            >
              <div className="flex items-start gap-3 p-4">
                <div className="w-8 h-8 rounded-full bg-gray-200">
                  <img src="https://i.ibb.co/H1z5yXL/download-4.jpg" />
                </div>
                <div className="flex-1 -ms-10">
                  <div className="text-sm ms-9 font-semibold">
                    {" "}
                    <Link to={`/group/${post.id}`}>
                      {post?.groupname}
                    </Link>
                  </div>
                  <div className="text-xs ms-9 text-gray-600">
                    {post.author} · {post.time}
                  </div>
                  <p className="text-left  text-sm text-gray-800 mt-2 whitespace-pre-line">
                    {post.content}
                  </p>
                  {post.img && (
                    <img
                      className="mt-5 mb-4 w-[1050px] h-[300px]    object-top rounded"
                      src={post.img}
                      alt="post"
                    />
                  )}
                  <div className="mt-2  flex justify-between text-xs text-gray-500">
                    <span>❤️ {post.likes}</span>
                    <span>{post.comments.length} comments</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-2 text-gray-600 text-sm cursor-pointer"></div>
              <div className="px-4 pb-2 justify-between md:ms-7 md:me-7 text-sm text-gray-500 flex items-center gap-4">
                <button className="hover:underline flex">
                  {" "}
                  <BiSolidLike className="text-lg me-1" />
                  Like
                </button>
                <button
                  className="hover:underline flex"
                  onClick={() => openModal(post)}
                >
                  <FaComment className="text-lg me-1" /> Comment
                </button>
                <CommentModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  post={selectedPost}
                />

                <button className="hover:underline flex">
                  <FaRegCopy className="text-lg me-1" /> Copy
                </button>
                <button className="hover:underline flex">
                  <FaShare className="text-lg me-1" /> Share
                </button>
              </div>
              <div className="border-t border-gray-200 px-4 py-2 text-gray-600 text-sm cursor-pointer">
                View more answers
              </div>
              <div className="px-4 pb-2">
                {post.comments.map((comment, idx) => (
                  <div key={idx} className="flex items-start gap-2 py-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200">
                      <img src="https://i.ibb.co/H1z5yXL/download-4.jpg" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{comment.name}</p>
                      <p className="text-sm text-gray-800">{comment.text}</p>
                      <div className="text-xs text-gray-500 flex gap-4">
                        <span>{comment.time}</span>
                        <button className="hover:underline">Like</button>
                        <button className="hover:underline">Reply</button>
                        <button className="hover:underline">Share</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-300">
                  <img
                    className="rounded-full"
                    src="https://i.ibb.co/H1z5yXL/download-4.jpg"
                  />
                </div>

                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Answer as Maruful Tamal"
                    className="w-full p-2 pr-10 text-sm bg-gray-200 rounded-md"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-medium">
                    <IoSend />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Group;
