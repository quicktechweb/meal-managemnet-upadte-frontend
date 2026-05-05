import React from "react";

const AppDownload = () => {
  return (
    <section id="app" className="pt-8 px-6  bg-white">
      <div className="bg-gray-900 rounded-[3rem] p-10 xl:p-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>

        {/* Text Content */}
        <div className="md:w-1/2 text-white z-10 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-4xl xl:text-5xl font-extrabold mb-3 xl:mb-6 leading-tight">
            Get The <span className="text-blue-500">Alabadan Food</span> App
          </h2>
          <p className="text-gray-400 mb-4 xl:mb-8 text-sm xl:text-lg max-w-lg mx-auto md:mx-0">
            Order your favorite meals on the go. Download our app to get a **20%
            discount** on your first order and track your delivery in real-time!
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <button className="bg-white text-gray-900  xl:px-6 py-3.5 rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-gray-100 transition shadow-lg">
              <svg
                className="w-8 h-8"
                viewBox="0 0 384 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
              </svg>
              <div className="text-left">
                <span className="block text-[10px] pr-2 font-medium leading-none mb-1">
                  Download on the
                </span>
                <span className="block text-xs  xl:text-lg font-bold leading-none">
                  App Store
                </span>
              </div>
            </button>

            <button className="bg-gray-800 border border-gray-700 text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-gray-700 transition shadow-lg">
              <svg
                className="w-8 h-8 text-green-400"
                viewBox="0 0 512 512"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"></path>
              </svg>
              <div className="text-left">
                <span className="block text-[10px] font-medium leading-none mb-1">
                  GET IT ON
                </span>
                <span className="block text-lg font-bold leading-none">
                  Google Play
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Custom Phone Mockup UI */}
        <div className="h-[300px] md:h-auto md:w-1/2 flex justify-center z-10 perspective-1000">
          <div className="relative w-[280px] h-[580px] bg-gray-50 rounded-[3rem] border-[12px] border-gray-800 shadow-2xl overflow-hidden transform rotate-y-[-15deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-500 ease-out">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-gray-800 rounded-b-2xl z-20"></div>

            {/* App Header */}
            <div className="bg-white pt-10 pb-4 px-5 shadow-sm rounded-b-3xl">
              <p className="text-xs text-gray-500 font-medium">Delivering to</p>
              <h4 className="text-sm font-bold text-gray-900 flex items-center">
                <span className="text-blue-500 mr-1">📍</span> Dhaka, BD
              </h4>

              {/* Search Bar Mockup */}
              <div className="mt-4 bg-gray-100 rounded-full py-2 px-4 flex items-center">
                <span className="text-gray-400 text-sm">
                  🔍 What are you craving?
                </span>
              </div>
            </div>

            {/* App Body Content */}
            <div className="px-5 py-4 h-full overflow-y-auto no-scrollbar pb-24">
              {/* Promo Banner Mockup */}
              <div className="bg-blue-500 rounded-2xl p-4 text-white relative overflow-hidden mb-6 shadow-md">
                <div className="relative z-10 w-2/3">
                  <h5 className="font-bold text-lg leading-tight mb-1">
                    Get 20% OFF
                  </h5>
                  <p className="text-[10px] mb-3">On your first order</p>
                  <button className="bg-white text-blue-500 text-xs font-bold px-3 py-1.5 rounded-full">
                    Order Now
                  </button>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80"
                  alt="Burger"
                  className="absolute right-[-20px] bottom-[-20px] w-28 h-28 object-cover rounded-full border-4 border-blue-400"
                />
              </div>

              {/* Categories Mockup */}
              <h5 className="font-bold text-sm text-gray-800 mb-3">
                Categories
              </h5>
              <div className="flex space-x-3 mb-6 overflow-x-hidden">
                {["🍔", "🍕", "🍣", "🥗"].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl flex-shrink-0"
                  >
                    {emoji}
                  </div>
                ))}
              </div>

              {/* Popular Item Mockup */}
              <h5 className="font-bold text-sm text-gray-800 mb-3">
                Popular Now
              </h5>
              <div className="bg-white rounded-2xl p-3 shadow-sm flex items-center space-x-3 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=100&q=80"
                  alt="Pizza"
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h6 className="font-bold text-sm text-gray-900">
                    Pepperoni Pizza
                  </h6>
                  <p className="text-blue-500 font-bold text-sm">$15.00</p>
                </div>
                <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-lg">
                  +
                </div>
              </div>
            </div>

            {/* Bottom Nav Bar Mockup */}
            <div className="absolute bottom-0 left-0 w-full bg-white h-16 flex justify-around items-center border-t border-gray-100 px-4 pb-2 z-20">
              <div className="text-blue-500 flex flex-col items-center">
                <span className="text-xl">🏠</span>
                <div className="w-1 h-1 bg-blue-500 rounded-full mt-1"></div>
              </div>
              <div className="text-gray-400 text-xl grayscale opacity-50">
                ❤️
              </div>
              <div className="text-gray-400 text-xl grayscale opacity-50 relative">
                🛒
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="text-gray-400 text-xl grayscale opacity-50">
                👤
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
