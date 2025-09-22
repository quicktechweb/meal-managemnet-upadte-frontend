import { FaUserFriends, FaClock, FaVideo, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecordDataEarn = () => {
  const navigate = useNavigate();

  const stats = {
    followers: 1000,
    watchTime: 2000, // hours
    videos: 3,
    views: 2000,
  };

  const requirements = {
    followers: 1000,
    watchTime: 2000, // hours
    videos: 3,
    views: 2000,
  };

  const getProgress = (current, required) =>
    Math.min((current / required) * 100, 100);

  const getColor = (current, required) => {
    if (current >= required) return "from-green-400 to-green-600";
    if (current >= required / 2) return "from-blue-400 to-blue-600";
    return "from-red-400 to-red-600";
  };

  const isEligible =
    stats.followers >= requirements.followers &&
    stats.watchTime >= requirements.watchTime &&
    stats.videos >= requirements.videos &&
    stats.views >= requirements.views;

  const items = [
    {
      label: "Followers",
      icon: <FaUserFriends className="text-blue-500 text-lg" />,
      value: stats.followers,
      required: requirements.followers,
      timeRange: "last 30 days",
    },
    {
      label: "Valid public watch hours",
      icon: <FaClock className="text-purple-500 text-lg" />,
      value: stats.watchTime,
      required: requirements.watchTime,
      timeRange: "last 365 days",
      unit: " hrs",
    },
    {
      label: "Video uploads",
      icon: <FaVideo className="text-pink-500 text-lg" />,
      value: stats.videos,
      required: requirements.videos,
      timeRange: "last 90 days",
    },
    {
      label: "Valid public Shorts views",
      icon: <FaEye className="text-yellow-500 text-lg" />,
      value: stats.views,
      required: requirements.views,
      timeRange: "last 90 days",
    },
  ];

  return (
    <div className="p-2">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6 mt-20 font-sans border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900">📊 Eligibility Status</h2>
        <p className="text-gray-500 text-sm mt-1">
          Showing data as of:{" "}
          <span className="font-medium text-gray-700">Aug 8, 2025</span>
        </p>

        {/* Progress Items */}
        <div className="mt-6 space-y-6">
          {items.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <div>
                    <p className="text-md text-gray-800 font-medium">
                      {item.label}: {item.value}
                      {item.unit || ""} / {item.required}
                      {item.unit || ""}
                    </p>
                    <p className="text-xs text-gray-500">{item.timeRange}</p>
                  </div>
                </div>
                <p
                  className={`text-xs font-medium ${
                    item.value >= item.required
                      ? "text-green-600"
                      : "text-gray-500"
                  }`}
                >
                  {Math.round(getProgress(item.value, item.required))}%
                </p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full bg-gradient-to-r ${getColor(
                    item.value,
                    item.required
                  )}`}
                  style={{
                    width: `${getProgress(item.value, item.required)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Apply Button */}
        {isEligible && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/earnapply")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300"
            >
              ✅ Earning Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordDataEarn;
