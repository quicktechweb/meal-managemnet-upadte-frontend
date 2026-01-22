import React from "react";
import { restaurants } from "../Restaurant/Restaurent";
import { Link } from "react-router-dom";

const FavouriteCanteen = () => {
  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-3xl font-extrabold text-gray-900">
        My Favourite Canteens
      </h4>

      <div className=" flex flex-wrap gap-4">
        {restaurants
          ?.filter((item) => item?.isFavourite)
          .map((res) => (
            <Link
              to={`/dashboard/canteens/${res.id}`}
              key={res.id}
              className="group relative bg-white overflow-hidden shadow-sm hover:shadow-2xl w-[198px] transition-all duration-500 border border-gray-100"
            >
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                  {res.tag}
                </span>
              </div>

              <div className="relative h-40 overflow-hidden">
                <img
                  src={res.image}
                  alt={res.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="pb-3 pt-1 p-3">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-orange-500 transition-colors">
                    {res.name}
                  </h3>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-2 font-medium">
                  <span>{res.cuisine}</span>
                  <span className="mx-2 text-gray-300">•</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center bg-slate-100 px-3 py-1 rounded-full">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="ml-1 text-sm font-bold text-slate-700">
                      {res.rating}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-400 text-xs font-semibold">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                    {res.location}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default FavouriteCanteen;
