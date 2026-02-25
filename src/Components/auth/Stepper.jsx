import { FaUser, FaUtensils, FaConciergeBell } from "react-icons/fa";

const Stepper = ({ step }) => {
  const steps = [
    { id: 1, label: "Information", icon: <FaUser /> },
    { id: 2, label: "Service", icon: <FaUtensils /> },
    { id: 3, label: "Routine", icon: <FaConciergeBell /> },
  ];

  return (
    <nav aria-label="Progress" className="w-full mb-5 mt-2">
      <ol className="flex items-center justify-between w-full">
        {steps.map((item, index) => {
          const isCompleted = step > item.id;
          const isActive = step === item.id;

          return (
            <li
              key={item.id}
              className={`flex items-center  ${index !== steps.length - 1 ? "flex-1" : ""}`}
            >
              <div className="flex flex-col items-center">
                <div
                  aria-current={isActive ? "step" : undefined}
                  className={`w-8 h-8 md:w-8 md:h-8 flex items-center justify-center 
                  rounded-full transition-all duration-300 flex-shrink-0
                  ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isActive
                        ? "bg-gradient-to-r from-orange-500 to-orange-500 text-white shadow-lg scale-110"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? (
                    <span className="text-sm">✓</span>
                  ) : (
                    <span className="text-sm">{item.icon}</span>
                  )}
                </div>

                <span
                  className={`mt-2 text-xs md:text-sm whitespace-nowrap ${isActive ? "text-indigo-600 font-semibold" : "text-gray-400"}`}
                >
                  {item.label}
                </span>
              </div>

              {/* CONNECTING LINE */}
              {index !== steps.length - 1 && (
                <div className="flex-1 px-2 md:px-4 self-center -mt-5">
                  {" "}
                  <div
                    className={`h-1 rounded-full transition-all duration-500 ${isCompleted ? "bg-green-500" : "bg-gray-200"}`}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Stepper;
