import { FaUtensils, FaUsers, FaChartPie } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const stats = [
  {
    icon: FaUtensils,
    title: "Daily Meal Control",
    desc: "Breakfast, lunch & dinner tracking",
  },
  {
    icon: FaUsers,
    title: "Member Management",
    desc: "Individual meal & balance tracking",
  },
  {
    icon: FaChartPie,
    title: "Clear Reports",
    desc: "Monthly cost & meal summaries",
  },
];

const MealSystemLanding = () => {
  return (
    <section className="relative py-8 md:py-16 lg:py-32 overflow-hidden">
      {/* Background shapes */}
      <div className="absolute -top-24 -right-24 md:-right-32 lg:-right-40 w-[600px] h-[500px] bg-orange-100 rounded-full blur-3xl opacity-60" />
      <div className="absolute -bottom-40 -left-24 md:-left-32 lg:-left-40 w-[500px] h-[500px] bg-yellow-100 rounded-full blur-3xl opacity-50" />

      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10 lg:gap-20 items-center">
        {/* LEFT CONTENT */}
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 px-4 py-1 text-xs  lg:text-sm font-semibold text-orange-700 bg-orange-100 rounded-full ">
            <FaUtensils /> Smart Meal Management System
          </span>

          <h1 className="text-2xl lg:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Run Your Meal System <br />
            <span className="text-orange-600">Smarter, Clearer & Faster</span>
          </h1>

          <p className="text-sm lg:text-lg text-gray-600 max-w-xl">
            A complete meal management solution for mess, hostel, office
            canteen, and meal services. Track meals daily, manage members,
            calculate costs automatically, and stay fully transparent.
          </p>

          {/* VALUE POINTS */}
          <div className="mt-5 lg:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 xl:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="flex flex-col 2xl:flex-row items-start gap-3 p-4 bg-white rounded-xl shadow hover:shadow-xl transition"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <stat.icon className="text-orange-600 text-xl  shrink-0 lg:text-2xl mt-1" />
                <div>
                  <p className="font-semibold text-sm lg:text-base  text-gray-800">
                    {stat.title}
                  </p>
                  <p className="text-xs lg:text-sm text-gray-500">
                    {stat.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 lg:mt-12 flex flex-wrap gap-2 lg:gap-4">
            <Link to="/dashboard/mealmanagement">
              <button className="px-8 py-2 lg:py-3 bg-orange-600 text-white font-semibold rounded-xl shadow-lg hover:bg-orange-700 hover:scale-105 transform transition cursor-pointer text-sm lg:text-base">
                Food
              </button>
            </Link>
            {/* <Link to={"/dashboard/userOrder"}>
              <button className="px-8 py-2 lg:py-3 border cursor-pointer border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition text-sm lg:text-base">
                My order
              </button>
            </Link> */}
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1551218808-94e220e084d2"
              alt="Meal Management"
              className="w-full h-[300px] lg:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>

          {/* Floating stats */}
          <motion.div
            className="absolute -bottom-6 left-6 bg-white rounded-xl shadow-xl px-3  lg:px-6 py-2 lg:py-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <p className="text-xs lg:text-sm text-gray-500">
              Today’s Meals Served
            </p>
            <p className="text-base md:text-lg lg:text-xl  font-bold text-gray-900">
              146 Plates
            </p>
          </motion.div>

          <motion.div
            className="absolute top-3  lg:top-6 -right-3 lg:-right-6 bg-white rounded-xl shadow-xl px-3  lg:px-6 py-2 lg:py-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs lg:text-sm text-gray-500">Monthly Expense</p>
            <p className="text-base md:text-lg lg:text-xl font-bold text-orange-600 ">
              ৳ 82,450
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MealSystemLanding;
