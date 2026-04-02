import React, { useState } from "react";
import { AllMealActivityCard } from "./AllMealActivityCard";
import { GuestCard } from "./GuestCard";
import useInstituteAuth from "../../../../../Hooks/useInstituteAuth";
import {
  useInstituteUserAdminData,
  useInstituteUserCreateMeal,
} from "../../../../../api/cms/user.hook";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export default function AllMealActivity({ allWise }) {
  const { user } = useInstituteAuth();

  const { mutateAsync, isPending } = useInstituteUserCreateMeal();

  const { data } = useInstituteUserAdminData(user?.user?.institute_id);

  const [mealData, setMealData] = useState({});

  const [guestMealData, setGuestMealData] = useState({});

  const routine = data?.routine;

  // const result =
  //   routine?.schedule_lists && routine.schedule_lists.length > 0
  //     ? Object.values(
  //         routine.schedule_lists.reduce((acc, curr) => {
  //           const key = curr.meal_type.toLowerCase();
  //           if (!acc[key]) {
  //             acc[key] = {
  //               mealType: key,
  //               start_time: curr.start_time,
  //               end_time: curr.end_time,
  //               items: curr.items,
  //               alternative_items: curr.alternative_items,
  //             };
  //           }
  //           // curr.items.forEach((item) => {
  //           //   const exists = acc[key].items.some((i) => i.title === item.title);
  //           //   if (!exists) {
  //           //     acc[key].items.push({
  //           //       meal_id: item._id || item.title,
  //           //       title: item.title,
  //           //       price: item.price,
  //           //       image: item.image,
  //           //       video: item.video,
  //           //       ingridents: item.ingridents,
  //           //     });
  //           //   }
  //           // });

  //           return acc;
  //         }, {}),
  //       )
  //     : [];

  const handleMealChange = (payload) => {
    setMealData((prev) => ({
      ...prev,
      [payload.mealType]: payload,
    }));
  };

  const handleGuestMealChange = (payload) => {
    setGuestMealData((prev) => ({
      ...prev,
      [payload.mealType]: payload,
    }));
  };

  const handleUpdate = async () => {
    const mealsArray = Object.values(mealData);

    const validMeals = mealsArray.filter(
      (meal) => Array.isArray(meal.items) && meal.items.length > 0,
    );

    if (!validMeals.length) {
      toast.error("Please select at least one meal.");
      return;
    }

    await mutateAsync(validMeals);
  };

  const handleGuestUpdate = () => {
    const payload = {
      guestMeals: Object.values(guestMealData),
    };
    console.log("Sending guest data to backend:", payload.guestMeals);
  };

  const weekNames = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  });
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const sortByToday = (data) => {
    const today = new Date().getDay();

    return data?.sort((a, b) => {
      const aIndex = weekDays.indexOf(a.day);
      const bIndex = weekDays.indexOf(b.day);

      return ((aIndex - today + 7) % 7) - ((bIndex - today + 7) % 7);
    });
  };

  const sortedMeals = sortByToday(routine?.schedule_lists);

  const getNext7Days = () => {
    const days = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      days.push(weekDays[d.getDay()]);
    }

    return days;
  };

  const [daySelectOption, setDaySelectOption] = useState(getNext7Days()[0]);

  const selectedMeals = sortedMeals?.filter(
    (item) => item?.day === daySelectOption,
  );

  console.log(selectedMeals);

  const [openIndex, setOpenIndex] = useState(null);
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedGroupIndex(index);
    if (openIndex === index) {
      setOpenIndex(null);
    }
  };

  const getMealTypeGradient = (type) => {
    switch (type?.toLowerCase()) {
      case "breakfast":
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "lunch":
        return "bg-gradient-to-r from-green-500 to-emerald-600";
      case "dinner":
        return "bg-gradient-to-r from-indigo-500 to-purple-600";
      default:
        return "bg-gradient-to-r from-blue-400 to-orange-500";
    }
  };

  return (
    <div className="space-y-4">
      <div className="max-w-7xl flex flex-col xl:flex-row gap-y-4 xl:gap-3">
        <aside className="bg-white p-3 rounded-xl shadow w-[260px] h-[350px]">
          <h2 className="flex items-center mb-2 justify-center gap-3 font-bold">
            <button>
              <FaCalendarAlt />
            </button>
            Meal Calendar
          </h2>
          <div className="flex flex-col justify-center ">
            {getNext7Days().map((plan, index) => {
              const isActiveDay = daySelectOption === plan;

              return (
                <button
                  onClick={() => setDaySelectOption(plan)}
                  className={`${isActiveDay ? "bg-orange-500 text-white rounded-md overflow-hidden" : "hover:bg-orange-100 hover:rounded-md "}border-b  border-gray-100 py-2 cursor-pointer `}
                >
                  {plan}
                </button>
              );
            })}
          </div>
        </aside>

        <div className="flex flex-col gap-3">
          {/* Header */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
            <div className="flex flex-col">
              <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
                Choose Your Meals
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Select your preferred meals for the selected date(s)
              </p>
            </div>
          </div>

          {/* Meal Cards */}
          <div className="flex flex-wrap gap-3">
            {selectedMeals?.map((meal, index) => (
              <div
                key={index}
                className="bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-lg w-full md:w-[350px] lg:w-[320px] xl:w-[330px]"
              >
                <div
                  className={`  px-3 py-3 rounded-xl text-white capitalize ${getMealTypeGradient(meal?.meal_type)} `}
                >
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-sm lg:text-lg">
                      {meal?.meal_type}
                    </h3>
                    <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs">
                      ৳0
                    </span>
                  </div>
                  <div className="flex font-semibold justify-center">
                    <p>{meal?.start_time}</p>-<p>{meal?.end_time}</p>
                  </div>
                </div>

                <div className="">
                  <button className="px-2 w-full flex cursor-pointer items-center gap-2.5 bg-gray-100 my-2 rounded-2xl">
                    <FaCheckCircle className="text-green-600 text-sm" />
                    {meal?.items?.map((item, index) => (
                      <div className="flex items-center gap-1">
                        <span className="font-semibold text-xs">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-orange-600">
                          (৳{item.price})
                        </span>{" "}
                        {data?.items?.length - 1 !== index && ","}
                      </div>
                    ))}
                  </button>

                  <div className="relative">
                    {/* Button */}
                    <button
                      type="button"
                      onClick={() =>
                        setOpenIndex(openIndex === index ? null : index)
                      }
                      className="bg-white py-1 px-2 shadow-md w-full my-2 rounded-md flex items-center justify-between border border-gray-200"
                    >
                      <span className="text-sm">
                        {selectedGroupIndex !== null
                          ? meal?.alternative_items?.[selectedGroupIndex]
                              ?.map((item) => `${item.title} (৳${item.price})`)
                              .join(", ")
                          : "Select Alternative Item"}
                      </span>

                      <ChevronDown
                        className={`transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                        size={18}
                      />
                    </button>

                    {/* Dropdown */}
                    {openIndex === index && (
                      <div className="absolute w-full z-50 rounded-md p-2 bg-white border border-gray-200 shadow-md">
                        {meal?.alternative_items?.map((alternative_item, i) => {
                          const isSelected = selectedGroupIndex === i;

                          return (
                            <div
                              key={i}
                              onClick={() => handleSelect(i)}
                              className={`flex flex-wrap gap-2 py-2 px-2 rounded cursor-pointer
                  ${
                    isSelected
                      ? "bg-blue-100 border border-blue-400"
                      : "hover:bg-gray-100"
                  }
                `}
                            >
                              {alternative_item?.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-1"
                                >
                                  <span className="font-semibold text-xs">
                                    {item.title}
                                  </span>
                                  <span className="text-[10px] text-orange-600">
                                    (৳{item.price})
                                  </span>
                                  {alternative_item.length - 1 !== index && ","}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* <Select
          isMulti
          options={itemOptions}
          value={selectedValues}
          getOptionValue={(opt) => opt.label}
          onChange={handleChange}
          placeholder={`Select ${title}...`}
          components={{
            Option: CustomOption,
            MultiValueLabel: CustomMultiValueLabel,
          }}
        /> */}
                </div>
              </div>
            ))}

            {/* {result?.map((meal) => (
              <AllMealActivityCard
                allWise={allWise}
                key={meal.mealType}
                title={meal.mealType}
                data={meal}
                onChange={handleMealChange}
                institute_id={user?.user?.institute_id}
                user_id={user?.user?._id}
              />
            ))}
             */}
          </div>

          <button
            onClick={handleUpdate}
            className="w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl cursor-pointer"
          >
            Update
          </button>

          {/* Guest Meal Header */}
          <div className="bg-white/90 rounded-3xl shadow-lg p-6 flex justify-between items-start sm:items-center flex-wrap">
            <div className="flex flex-col">
              <h1 className="text-xl xl:text-3xl font-extrabold text-gray-800">
                Choose Your Meals for Guest
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Select your preferred meals for the selected date(s)
              </p>
            </div>
          </div>

          {/* Guest Meal Cards */}
          <div className="flex flex-wrap gap-6">
            {/* {result?.map((meal) => (
              <GuestCard
                key={`guest-${meal.mealType}`}
                title={meal.mealType}
                data={meal}
                onChange={handleGuestMealChange}
              />
            ))} */}
          </div>

          <button
            onClick={handleGuestUpdate}
            className="w-1/3 mx-auto block bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-2xl cursor-pointer"
          >
            Update Guest Meals
          </button>
        </div>
      </div>

      {/* Weekly Summary Table */}
      {/* <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full">
          <thead className="bg-orange-500 text-white">
            <tr>
              <th className="px-4 py-3">Day</th>
              {result?.map((meal) => (
                <th key={meal.mealType} className="px-4 py-3 capitalize">
                  {meal.mealType}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekNames?.map((name) => (
              <tr key={name} className="border-b">
                <td className="text-center px-4 py-3 font-medium">{name}</td>

                {result?.map((meal) => {
                  const currentMeal = mealData[meal.mealType];
                  const currentGuestMeal = guestMealData[meal.mealType];

                  return (
                    <td key={meal.mealType} className="px-4 py-3 text-sm">
                      <div className="flex flex-col gap-1 items-center">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-700">
                            {currentMeal?.items?.length > 0
                              ? currentMeal.items.map((i) => i.title).join(", ")
                              : "—"}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[9px] text-white rounded ${
                              currentMeal?.meal_status
                                ? "bg-green-600"
                                : "bg-red-500"
                            }`}
                          >
                            {currentMeal?.meal_status ? "ON" : "OFF"}
                          </span>
                        </div>

                        {currentGuestMeal?.items?.length > 0 && (
                          <span className="text-[10px] text-gray-400">
                            Guest:{" "}
                            {currentGuestMeal.items
                              .map((i) => i.title)
                              .join(", ")}{" "}
                            x{currentGuestMeal.quantity}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
