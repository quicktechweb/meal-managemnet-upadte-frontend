const RideSharing = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-10 text-center">
        
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-black leading-tight">
          Earn with your bike, car, or bicycle
        </h1>

        {/* Sub heading */}
        <p className="mt-4 text-gray-600 text-sm md:text-base">
          Join the country’s largest ride-sharing platform
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <button className="bg-red-500 hover:bg-red-600 transition text-white px-8 py-3 rounded-md text-sm md:text-base flex items-center gap-2 mx-auto">
            Start Ride
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Illustration */}
      <div className="w-full mt-10">
        <img
          src="https://pathao.com/bn/wp-content/uploads/sites/6/2018/12/Pathao-ecosystem.jpg"
          alt="Pathao Ecosystem"
          className="w-full object-contain"
        />
      </div>
    </section>
  );
};

export default RideSharing;
