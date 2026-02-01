import { useState } from "react";
import {
  FiGitBranch,
  FiGrid,
  FiPenTool,
  FiAward,
  FiArrowRight,
} from "react-icons/fi";

import { motion } from "framer-motion";
import { FaUtensils } from "react-icons/fa";
import { GrRestaurant } from "react-icons/gr";
import { PiBowlFoodBold } from "react-icons/pi";
import { Link, NavLink } from "react-router-dom";

/* DATA */
const steps = [
  {
    id: 1,
    title: "Food",
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

const stats = [
  {
    id: 1,
    title: "Cloud Kitchen",
    description: "Delivery-first kitchen serving.",
    pathname: "/dashboard/foods",
    icon: FaUtensils,
  },
  {
    id: 2,
    title: "Canteens",
    description: "Affordable daily meals for everyone.",
    pathname: "/dashboard/canteens",
    icon: GrRestaurant,
  },
  {
    id: 3,
    title: "Meal",
    description: "Fresh, tasty, and hygienic meals",
    pathname: "/register/user",
    icon: PiBowlFoodBold,
  },
];

const ProcessSection = () => {
  const [active, setActive] = useState(steps[0]);

  const scrollToId = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="mt-5 bg-white max-w-6xl mx-auto">
      {/* HEADING */}
      <div className="text-center mb-5 md:mb-10 lg:mb-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 px-4">
          Quick & Easy Process With Best Features
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-full md:max-w-2xl mx-auto">
          Rapidiously morph transparent internal or sources Whereas resource
          sucking e-business. Conveniently innovate compelling internal.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* STEPS */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-16 mb-5 md:mb-10">
          {steps.map((step) => {
            const isActive = active.id === step.id;

            return (
              <button
                key={step.id}
                onClick={() => {
                  return (
                    step?.id === 1 && scrollToId("menu"),
                    setActive(step)
                  );
                }}
                className="flex flex-col cursor-pointer items-center gap-1.5 lg:gap-3 focus:outline-none group"
              >
                <div
                  className={`w-8 h-8  sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-sm sm:text-lg lg:text-xl transition
                    ${
                      isActive
                        ? "bg-purple-100 text-purple-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                >
                  {step.icon}
                </div>

                <span
                  className={`text-xs sm:text-sm font-medium ${
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

        {/* <div className=" flex items-center justify-center gap-2.5">
          {active?.subMenu?.map((sub) => (
            <NavLink
              to={sub?.pathname}
              className="px-6 py-3 bg-gradient-to-r from-[#874F9E] to-[#ea83fc] text-white hover:from-[#ea83fc] hover:to-[#874F9E] font-semibold rounded-full shadow-md transition duration-300"
            >
              {sub?.title}
            </NavLink>
          ))} */}
        {/* </div> */}
        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* LEFT */}
          <div>
            <span className="text-3xl lg:text-6xl font-bold text-purple-600">
              {active.number}
            </span>

            <h3 className="mt-3 lg:mt-6 text-2xl lg:text-5xl font-semibold text-gray-900">
              {active.heading}
            </h3>

            <p
              id="menu"
              className="mt-3 lg:mt-6 text-sm lg:text-base text-gray-500 max-w-md"
            >
              {active.desc1}
            </p>

            <p className="mt-2 lg:mt-4  text-sm lg:text-base text-gray-500 max-w-md">
              {active.desc2}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3 ">
              {stats.map((stat, index) => (
                <div key={index} className="card  rounded-xl  ">
                  <div className="card__content flex flex-col 2xl:flex-row items-start gap-3 p-2 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl shadow hover:shadow-xl transition">
                    <Link
                      className="flex flex-col items-center sm:items-start w-full gap-1.5"
                      to={stat?.pathname}
                    >
                      <stat.icon className="text-purple-600 text-[18px] sm:text-xl shrink-0 lg:text-2xl mt-1" />
                      <div>
                        <p className="font-semibold text-[10px] whitespace-nowrap lg:text-base text-gray-800">
                          {stat.title}
                        </p>
                        <p className="text-xs hidden sm:block text-gray-500">
                          {stat.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}

              <div className="col-span-full flex items-center justify-center mt-2">
                <Link
                  to={"/menu-details"}
                  className="w-[120px] flex items-center justify-center cursor-pointer py-2 text-xs font-medium rounded-md bg-purple-800 hover:bg-transparent hover:text-black hover:outline hover:outline-purple-800 text-white duration-300 hover:scale-110"
                >
                  See Details
                </Link>
              </div>
            </div>

            {/* <a
              href="#"
              className="inline-flex items-center gap-2 mt-3 lg:mt-6 text-purple-600 font-medium hover:gap-3 transition-all text-xs lg:text-base"
            >
              Learn more about this <FiArrowRight />
            </a> */}
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
