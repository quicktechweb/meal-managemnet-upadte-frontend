import { useState } from "react";
import {
  FiGitBranch,
  FiGrid,
  FiPenTool,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";

/* DATA */
const steps = [
  {
    id: 1,
    title: "Meal Management",
    number: "01.",
    heading: "Fully Branded Portal",
    desc1:
      "Manage daily meals, member consumption, and food records with complete accuracy and transparency.",
    desc2:
      "Automate meal counts, cost calculations, and monthly summaries in one smart platform.",
    image: "https://appbeats.themetags.com/img/dasboard-screen-1.png",
    cards: [
      "https://appbeats.themetags.com/img/process-card-1.png",
      "https://appbeats.themetags.com/img/process-card-2.png",
      "https://appbeats.themetags.com/img/process-card-3.png",
    ],
    icon: <FiGitBranch />,
  },
  {
    id: 2,
    title: "Ride Sharing",
    number: "02.",
    heading: "Content Collection",
    desc1:
      "Simplify ride bookings, driver assignments, and route planning through a centralized system.",
    desc2:
      "Track trips, manage users, and optimize transport efficiency in real-time.",
    image: "https://appbeats.themetags.com/img/dasboard-screen-2.png",
    cards: [
      "https://appbeats.themetags.com/img/process-card-2.png",
      "https://appbeats.themetags.com/img/process-card-3.png",
      "https://appbeats.themetags.com/img/process-card-1.png",
    ],
    icon: <FiGrid />,
  },
  {
    id: 3,
    title: "Learning Management",
    number: "03.",
    heading: "Modern UI Design",
    desc1:
      "Organize courses, lessons, and student progress using a modern learning management solution.",
    desc2:
      "Deliver engaging educational experiences with structured content and performance tracking.",
    image: "https://appbeats.themetags.com/img/dasboard-screen-3.png",
    cards: [
      "https://appbeats.themetags.com/img/process-card-3.png",
      "https://appbeats.themetags.com/img/process-card-1.png",
      "https://appbeats.themetags.com/img/process-card-2.png",
    ],
    icon: <FiPenTool />,
  },
  {
    id: 4,
    title: "Ecommerce Service",
    number: "04.",
    heading: "Go Live & Scale",
    desc1:
      "Launch and manage your online store with powerful product, order, and inventory tools.",
    desc2:
      "Scale your ecommerce business using analytics, customer insights, and automation.",
    image: "https://appbeats.themetags.com/img/dasboard-screen-4.png",
    cards: [
      "https://appbeats.themetags.com/img/process-card-1.png",
      "https://appbeats.themetags.com/img/process-card-2.png",
      "https://appbeats.themetags.com/img/process-card-3.png",
    ],
    icon: <FiAward />,
  },
];

const ProcessSection = () => {
  const [active, setActive] = useState(steps[0]);

  return (
    <section className="-mt-5 bg-white max-w-6xl mx-auto">
      {/* HEADING */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Quick & Easy Process With Best Features
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Rapidiously morph transparent internal or sources Whereas resource
          sucking e-business. Conveniently innovate compelling internal.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* STEPS */}
        <div className="flex flex-wrap justify-center gap-16 mb-20">
          {steps.map((step) => {
            const isActive = active.id === step.id;

            return (
              <button
                key={step.id}
                onClick={() => setActive(step)}
                className="flex flex-col items-center gap-3 focus:outline-none group"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition
                    ${
                      isActive
                        ? "bg-purple-100 text-purple-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                >
                  {step.icon}
                </div>

                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-purple-600" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </span>

                <div
                  className={`h-[2px] w-16 ${
                    isActive ? "bg-purple-600" : "bg-gray-200"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* LEFT */}
          <div>
            <span className="text-6xl font-bold text-purple-600">
              {active.number}
            </span>

            <h3 className="mt-6 text-5xl font-semibold text-gray-900">
              {active.heading}
            </h3>

            <p className="mt-6 text-gray-500 max-w-md">
              {active.desc1}
            </p>

            <p className="mt-4 text-gray-500 max-w-md">
              {active.desc2}
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 mt-6 text-purple-600 font-medium hover:gap-3 transition-all"
            >
              Learn more about this <FiArrowRight />
            </a>
          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center">
            <img
              src={active.image}
              alt=""
              className="w-[520px] relative z-10"
            />

            <img
              src={active.cards[0]}
              className="absolute -left-10 top-24 w-40 shadow-lg"
              alt=""
            />
            <img
              src={active.cards[1]}
              className="absolute right-0 top-14 w-44 shadow-lg"
              alt=""
            />
            <img
              src={active.cards[2]}
              className="absolute right-16 bottom-10 w-40 shadow-lg"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
