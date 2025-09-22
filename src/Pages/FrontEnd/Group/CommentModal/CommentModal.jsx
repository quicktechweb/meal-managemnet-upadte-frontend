import { IoSend } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { FaComment, FaRegCopy, FaShare } from "react-icons/fa";
import PropTypes from "prop-types";

const CommentModal = ({ isOpen, onClose, post }) => {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 p-4 md:p-0 z-50 flex items-center justify-center">
      <div className="bg-white w-[700px] max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6 relative">
        
        {/* Close Button */}
        <button className="absolute top-2 right-3 text-gray-500 text-xl" onClick={onClose}>
          ✕
        </button>

        {/* Post Header */}
        <div className="flex items-start gap-3 p-4">
          <img className="w-10 h-10 rounded-full" src="https://i.ibb.co/H1z5yXL/download-4.jpg" />
          <div className="flex-1 -ms-10">
            <div className="font-semibold ms-9 text-sm">
              নিজের বানার মতো একটা গল্প - উদ্যোগ তৈরির প্রতিষ্ঠান
            </div>
            <div className="text-xs ms-9 text-gray-600">{post.author} · {post.time}</div>
            <p className="text-sm text-gray-800 mt-2 whitespace-pre-line">{post.content}</p>

            {post.img && (
              <img className="mt-3 rounded w-full object-cover" src={post.img} alt="post" />
            )}

            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>❤️ {post.likes}</span>
              <span>{post.comments.length} comments</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 mt-4 flex justify-between text-sm text-gray-500 items-center gap-4">
          <button className="hover:underline flex items-center gap-1">
            <BiSolidLike className="text-lg" /> Like
          </button>
          <button className="hover:underline flex items-center gap-1">
            <FaComment className="text-lg" /> Comment
          </button>
          <button className="hover:underline flex items-center gap-1">
            <FaRegCopy className="text-lg" /> Copy
          </button>
          <button className="hover:underline flex items-center gap-1">
            <FaShare className="text-lg" /> Share
          </button>
        </div>

        {/* Comment List */}
        <div className="mt-5 border-t pt-4">
          {post.comments.map((comment, idx) => (
            <div key={idx} className="flex gap-2 mb-4">
              <img src="https://i.ibb.co/H1z5yXL/download-4.jpg" className="w-8 h-8 rounded-full" />
              <div>
                <p className="text-sm font-semibold">{comment.name}</p>
                <p className="text-sm">{comment.text}</p>
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

        {/* Comment Input */}
        <div className="flex gap-2 mt-4">
          <img src="https://i.ibb.co/H1z5yXL/download-4.jpg" className="w-8 h-8 rounded-full" />
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
    </div>
  );
};

CommentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  post: PropTypes.shape({
    author: PropTypes.string,
    time: PropTypes.string,
    content: PropTypes.string,
    img: PropTypes.string,
    likes: PropTypes.number,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        text: PropTypes.string,
        time: PropTypes.string,
      })
    ),
  }),
};

export default CommentModal;
