import React from "react";
import { Link } from "react-router-dom";

export const restaurants = [
  {
    id: 1,
    name: "La Dolce Vita",
    location: "Downtown",
    cuisine: "Italian",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    tag: "Must Visit",
    items: [
      {
        id: 1,
        name: "Chicken Khichuri",
        image:
          "https://images.deliveryhero.io/image/fd-bd/Products/Common%20DLP/7185878.jpg",
        price: 240,
        oldPrice: 260,
        save: 20,
      },
      {
        id: 1,
        name: "Chicken Khichuri",
        image:
          "https://images.deliveryhero.io/image/fd-bd/Products/Common%20DLP/7185878.jpg",
        price: 240,
        oldPrice: 260,
        save: 20,
      },
      {
        id: 1,
        name: "Chicken Khichuri",
        image:
          "https://images.deliveryhero.io/image/fd-bd/Products/Common%20DLP/7185878.jpg",
        price: 240,
        oldPrice: 260,
        save: 20,
      },
      {
        id: 1,
        name: "Chicken Khichuri",
        image:
          "https://images.deliveryhero.io/image/fd-bd/Products/Common%20DLP/7185878.jpg",
        price: 240,
        oldPrice: 260,
        save: 20,
      },
      {
        id: 1,
        name: "Chicken Khichuri",
        image:
          "https://images.deliveryhero.io/image/fd-bd/Products/Common%20DLP/7185878.jpg",
        price: 240,
        oldPrice: 260,
        save: 20,
      },
      {
        id: 1,
        name: "Chicken Khichuri",
        image:
          "https://images.deliveryhero.io/image/fd-bd/Products/Common%20DLP/7185878.jpg",
        price: 240,
        oldPrice: 260,
        save: 20,
      },
    ],
  },
  {
    id: 2,
    name: "Sakura Spirits",
    location: "Waterfront",
    cuisine: "Japanese",

    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=600&q=80",
    tag: "Top Rated",
    items: [
      {
        id: 1,
        name: "Chicken Khichuri",
        image:
          "https://images.deliveryhero.io/image/fd-bd/Products/Common%20DLP/7185878.jpg",
        price: 240,
        oldPrice: 260,
        save: 20,
      },
    ],
  },
  {
    id: 3,
    name: "The Urban Grill",
    location: "Midtown",
    cuisine: "Steakhouse",

    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80",
    tag: "Popular",
    items: [
      {
        id: 1,
        name: "Chicken Khichuri",
        image:
          "https://images.deliveryhero.io/image/fd-bd/Products/Common%20DLP/7185878.jpg",
        price: 240,
        oldPrice: 260,
        save: 20,
      },
    ],
  },
  {
    id: 4,
    name: "Neon Bao",
    location: "Old Town",
    cuisine: "Asian Fusion",

    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    tag: "Trending",
    items: [
      {
        id: 1,
        name: "Chicken Khichuri",
        image:
          "https://images.deliveryhero.io/image/fd-bd/Products/Common%20DLP/7185878.jpg",
        price: 240,
        oldPrice: 260,
        save: 20,
      },
    ],
  },
  {
    id: 4,
    name: "Neon Bao",
    location: "Old Town",
    cuisine: "Asian Fusion",

    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    tag: "Trending",
    items: [
      {
        id: 1,
        name: "Chicken Khichuri",
        image:
          "https://images.deliveryhero.io/image/fd-bd/Products/Common%20DLP/7185878.jpg",
        price: 240,
        oldPrice: 260,
        save: 20,
      },
    ],
  },
];

const Restaurant = () => {
  return (
    <div className="min-h-screen  font-sans">
      {/* --- RESTAURANT --- */}
      <main className="max-w-7xl mx-auto ">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className="text-2xl font-bold text-slate-800">All Canteens</h2>
        </div>

        <div className=" flex flex-wrap gap-4">
          {restaurants.map((res) => (
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
      </main>

      {/* near by restaurant */}
      <main className="max-w-7xl mx-auto  mt-5">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className="text-2xl font-bold text-slate-800">
            Near by Canteens
          </h2>
        </div>

        <div className=" flex flex-wrap gap-4">
          {restaurants.map((res) => (
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
      </main>
    </div>
  );
};

export default Restaurant;
