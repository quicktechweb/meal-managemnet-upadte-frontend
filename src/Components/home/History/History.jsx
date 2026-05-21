import { Clock, CheckCircle2, Rocket } from "lucide-react";

const historyData = [
  {
    id: 1,
    title: "New Service Launch",
    description: "We are launching a new shifting service feature.",
    status: "Upcoming",
    date: "2026-05-25",
  },
  {
    id: 2,
    title: "System Update",
    description: "Performance improvements and bug fixes.",
    status: "Completed",
    date: "2026-05-10",
  },
  {
    id: 3,
    title: "Maintenance Break",
    description: "Server maintenance for stability.",
    status: "Upcoming",
    date: "2026-05-28",
  },
];

const History = () => {
  return (
    <div className="min-h-screen   bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-10">
      
      {/* Header */}
      <div className="mb-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          History Timeline
        </h1>
        <p className="text-gray-500 mt-2">
          Track system updates, launches, and maintenance events
        </p>
      </div>

      {/* Timeline */}
      <div className="relative border-l border-gray-200 ml-3 space-y-8">

        {historyData.map((item) => (
          <div key={item.id} className="relative pl-8">

            {/* Dot */}
            <span className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-sm"></span>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition p-5">

              {/* Top row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {item.status === "Completed" ? (
                    <CheckCircle2 className="text-green-500 w-5 h-5" />
                  ) : (
                    <Rocket className="text-yellow-500 w-5 h-5" />
                  )}

                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h2>
                </div>

                {/* Badge */}
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium
                    ${
                      item.status === "Upcoming"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Footer */}
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-4 h-4" />
                {item.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;