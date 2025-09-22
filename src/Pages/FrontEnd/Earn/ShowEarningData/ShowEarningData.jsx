import { FaChartLine } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 150 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 300 },
  { name: "May", value: 350 },
  { name: "Jun", value: 250 },
];

const ShowEarningData = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 pt-20">
      {/* Current Earnings */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-xl p-6 shadow-lg flex justify-between items-center">
        <div>
          <p className="text-sm">Current Earnings</p>
          <h2 className="text-3xl font-bold mt-2">$1,850</h2>
          <p className="text-sm">Total earnings</p>
        </div>
        <FaChartLine className="text-3xl" />
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-xl p-4 shadow border">
        <h3 className="text-gray-800 font-semibold mb-4">📊 Performance Overview</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6D6DFF" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monetization Progress */}
      <div className="bg-white rounded-xl p-4 shadow border space-y-2">
        <h3 className="text-red-500 font-medium">🎥 Monetization Progress</h3>
        <p className="text-sm text-gray-600">Progress toward $1,000 goal</p>
        <div className="flex justify-between font-bold text-gray-800">
          <span>$1,000</span>
          <span>/ $1,000</span>
        </div>
        <div className="w-full bg-gray-200 h-3 rounded-full">
          <div className="bg-gradient-to-r from-indigo-500 to-pink-500 h-3 rounded-full w-full"></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="bg-white rounded-xl p-4 shadow border space-y-3">
        <button className="w-full bg-gray-900 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
          View Earning Details
        </button>
        <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition">
          Learn How to Increase Earnings
        </button>
      </div>
    </div>
  );
};

export default ShowEarningData;
