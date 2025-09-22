import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaComment, FaRegCopy, FaShare } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import CommentModal from "../../CommentModal/CommentModal";

const GroupDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalsOpen, setIsModalsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const { id } = useParams(); // Get post ID from URL

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalsOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalsOpen(false);
  };

  const groupData = {
    name: "To-Let Mohammadpur টু-লেট মোহাম্মদপুর",
    members: "90.8K",
    privacy: "Public group",
    coverImage:
      "https://t4.ftcdn.net/jpg/03/26/08/53/360_F_326085309_CFH8PpadfnL2OQ7Gi411XW0B21YumxKo.jpg",
    about:
      "আমাদের এই গ্রুপটি শুধুমাত্র মোহাম্মদপুর এবং আশেপাশের এলাকায় টু-লেট বিষয়ক পোস্টের জন্য। কোনো বিজ্ঞাপন বা প্রমোশনাল পোস্ট এপ্রুভ করা হবে না।",
  };

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

  const post = posts.find((p) => p.id === id);

  return (
    <div className="flex bg-gray-100 min-h-screen pt-16">
      {/* Left Sidebar */}
      <div className="w-[300px] md:block hidden bg-white shadow-[0_2px_18px_rgba(0,0,0,0.15)] p-4 sticky top-16 h-screen overflow-y-auto">
        <img src={groupData.coverImage} alt="group" className="w-full h-32 object-cover rounded" />
        <h2 className="text-lg font-bold mt-3">{groupData.name}</h2>
      </div>

      {/* Right Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="h-[300px] bg-white shadow-sm">
           <img className="w-full h-72" src={groupData.coverImage}/>
        </div>

        <div className="bg-white px-6 py-4 shadow-sm">
          <h2 className="text-2xl font-bold">{groupData.name}</h2>
          <p className="text-sm text-gray-600 mt-1">
            {groupData.privacy} · {groupData.members} members
          </p>
          <div className="flex gap-3 mt-3">
            <button className="px-4 py-1 bg-blue-100 text-blue-700 rounded text-sm font-semibold">Invite</button>
            <button className="px-4 py-1 bg-gray-100 text-gray-800 rounded text-sm font-semibold">Share</button>
            <button className="px-4 py-1 bg-green-600 text-white rounded text-sm font-semibold">Joined</button>
          </div>
        </div>

        <div className="bg-white px-6 py-3 flex gap-6 text-sm font-medium">
          <button className="text-blue-600 border-b-2 border-blue-600 pb-1">Discussion</button>
          <button className="text-gray-600 hover:text-blue-600">People</button>
          <button className="text-gray-600 hover:text-blue-600">Media</button>
          <button className="text-gray-600 hover:text-blue-600">Files</button>
        </div>

        {/* Write Something */}
        <div className="max-w-4xl mx-auto">
          <div onClick={() => setIsModalOpen(true)} className="bg-white mx-6 mt-4 p-4 rounded shadow-sm cursor-pointer">
            <p className="text-gray-600">Write something...</p>
          </div>

          {/* Create Post Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-md p-4">
                <h3 className="text-lg font-bold mb-3">Create Post</h3>
                <textarea rows="4" placeholder="What's on your mind?" className="w-full p-2 border rounded resize-none text-sm" />
                <div className="flex justify-end mt-3">
                  <button onClick={() => setIsModalOpen(false)} className="mr-2 px-4 py-1 border rounded text-sm">Cancel</button>
                  <button className="px-4 py-1 bg-blue-600 text-white rounded text-sm">Post</button>
                </div>
              </div>
            </div>
          )}

          {/* About */}
          <div className="bg-white mx-6 mt-4 p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-sm text-gray-700 whitespace-pre-line">{groupData.about}</p>
          </div>

          {/* Single Post */}
          {post && (
            <div className="px-6 py-4 space-y-6">
              <div className="bg-white rounded shadow-sm ">
                <div className="flex items-start gap-3 p-4">
                  <img src="https://i.ibb.co/H1z5yXL/download-4.jpg" className="w-8 h-8 rounded-full" />
                  <div className="flex-1 -ms-10 ">
                    <div className="text-sm ms-9 font-semibold">{post.groupname}</div>
                    <div className="text-xs ms-9 text-gray-600">{post.author} · {post.time}</div>
                    <p className="mt-2  text-sm text-gray-800">{post.content}</p>
                    {post.img && <img src={post.img} alt="post" className="mt-4 rounded md:w-full h-64 object-cover " />}
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>❤️ {post.likes}</span>
                      <span>{post.comments.length} comments</span>
                    </div>
                  </div>
                </div>

                {/* Post Actions */}
                 <div className="border-t border-gray-200 px-4 py-2 text-gray-600 text-sm cursor-pointer"></div>
                <div className="px-4 pb-2 flex  justify-between md:ms-7 md:me-7 text-sm text-gray-500">
                  <button className="hover:underline flex"><BiSolidLike className="text-lg me-1" /> Like</button>
                  <button className="hover:underline flex" onClick={() => openModal(post)}><FaComment className="text-lg me-1" /> Comment</button>
                  <button className="hover:underline flex "><FaRegCopy className="text-lg me-1" /> Copy</button>
                  <button className="hover:underline flex"><FaShare className="text-lg me-1" /> Share</button>
                </div>
                <div className="border-t border-gray-200 px-4 py-2 text-gray-600 text-sm cursor-pointer">View more answers</div>

                {/* Comments */}
                <div className="px-4 py-2">
                  {post.comments.map((comment, i) => (
                    <div key={i} className="flex gap-2 mt-2">
                      <img src="https://i.ibb.co/H1z5yXL/download-4.jpg" className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-sm font-medium">{comment.name}</p>
                        <p className="text-sm text-gray-700">{comment.text}</p>
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

                {/* Add Comment */}
                <div className="flex items-center gap-2 p-4 ">
                  <img src="https://i.ibb.co/H1z5yXL/download-4.jpg" className="w-8 h-8 rounded-full" />
                  <div className="relative flex-1">
                    <input type="text" placeholder="Answer as Maruful Tamal" className="w-full bg-gray-100 p-2 rounded-md text-sm" />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600"><IoSend /></button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Comment Modal */}
          <CommentModal isOpen={isModalsOpen} onClose={closeModal} post={selectedPost} />
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
