import React from "react";

const Review = () => {
  return (
    <section id="reviews" className="py-8 px-6 lg:px-10 bg-white">
      <div className="text-center mb-16">
        <h2 className="text-orange-500 font-bold tracking-wider uppercase mb-2">
          Testimonials
        </h2>
        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          What Our Customers Say
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-orange-50 p-8 rounded-3xl relative">
            <div className="text-orange-300 text-6xl absolute top-4 left-4 opacity-50">
              "
            </div>
            <p className="text-gray-700 relative z-10 italic mb-6 mt-4">
              "The food was absolutely amazing! Delivered hot and way faster
              than I expected. Highly recommended!"
            </p>
            <div className="flex items-center space-x-4">
              <img
                src={`https://i.pravatar.cc/150?img=${item * 10}`}
                alt="User"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h5 className="font-bold text-gray-900">Sarah Jenkins</h5>
                <div className="flex text-orange-500 text-sm">⭐⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
