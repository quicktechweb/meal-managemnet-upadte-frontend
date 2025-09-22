import { useState } from "react";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [privacy, setPrivacy] = useState("");
  const [friends, setFriends] = useState("");

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-100 pt-16">
      {/* Left Sidebar */}
      <div className="w-full lg:max-w-xs p-4 sm:p-6 bg-white">
        <p className="text-sm text-gray-500 mb-2">Groups &gt; Create group</p>
        <div className="flex items-center gap-2 mb-6">
          <img
            src="https://i.ibb.co/H1z5yXL/download-4.jpg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">Maruful Tamal</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />
        <select
          value={privacy}
          onChange={(e) => setPrivacy(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        >
          <option value="">Choose privacy</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        <input
          type="text"
          placeholder="Invite friends (optional)"
          value={friends}
          onChange={(e) => setFriends(e.target.value)}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        <p className="text-xs text-gray-500 mb-6">
          Suggested:{" "}
          <span className="text-blue-600">Rakib Hasan</span>,{" "}
          <span className="text-blue-600">Adil Hasan</span>,{" "}
          <span className="text-blue-600">Evan Islam</span>
        </p>
        <button className="w-full py-2 text-sm bg-blue-500 text-white rounded disabled:opacity-50" disabled>
          Create
        </button>
      </div>

      {/* Right Preview */}
      <div className="flex-1 flex justify-center p-4 sm:p-8">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow">
          <img className="w-full h-64" src="https://t4.ftcdn.net/jpg/03/26/08/53/360_F_326085309_CFH8PpadfnL2OQ7Gi411XW0B21YumxKo.jpg"/>
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {groupName || "Group name"}
            </h2>
            <p className="text-sm text-gray-600">
              {privacy ? `${privacy} group` : "Group privacy"} - 1 member
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-medium border-b border-gray-200 mt-4">
              <button className="py-2 text-gray-700 border-b-2 border-blue-600">About</button>
              <button className="py-2 text-gray-500">Posts</button>
              <button className="py-2 text-gray-500">Members</button>
              <button className="py-2 text-gray-500">Events</button>
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded">
              <div className="bg-white p-4 rounded">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <div className="flex flex-wrap justify-between text-sm text-gray-500">
                  <span>📷 Photo/video</span>
                  <span>🏷️ Tag people</span>
                  <span>😊 Feeling/activity</span>
                </div>
              </div>
              <div className="bg-white mt-4 p-4 rounded text-sm text-gray-500">
                About
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
