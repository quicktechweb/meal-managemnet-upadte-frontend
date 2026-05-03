import React from "react";

const Hero = () => {
  return (
    <section
      id="home"
      className="flex flex-col-reverse md:flex-row items-center justify-between px-6 lg:px-10 py-16 md:py-14 bg-blue-50"
    >
      <div className="md:w-1/2 space-y-6 mt-10 md:mt-0 text-center md:text-left">
        <span className="bg-blue-200 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
          🛵 #1 Food Delivery App
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">
          Craving Something <span className="text-blue-500">Delicious?</span>
        </h1>
        <p className="text-gray-600 text-lg md:pr-10">
          Order your favorite meals from the best restaurants in town. Hot,
          fresh, and delivered right to your door in under 30 minutes.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start pt-4">
          <button className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition shadow-lg hover:shadow-xl text-lg">
            Order Now
          </button>
        </div>
      </div>
      <div className="md:w-1/2 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Delicious Food Platter"
          className="rounded-full w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] object-cover shadow-2xl border-8 border-white"
        />
      </div>
    </section>
  );
};

export default Hero;
