import React from "react";

const SpecialOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Buy 1 Get 1 FREE",
      subtitle: "On all Classic Burgers",
      code: "BOGO50",
      bgGradient: "bg-gradient-to-r from-orange-500 to-red-500",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
    },
    {
      id: 2,
      title: "20% OFF Weekend",
      subtitle: "For orders over $30",
      code: "WEEKEND20",
      bgGradient: "bg-gradient-to-r from-gray-900 to-gray-700",
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
    },
    {
      id: 3,
      title: "Free Delivery 🛵",
      subtitle: "New users only",
      code: "FREEDEL",
      bgGradient: "bg-gradient-to-r from-green-500 to-emerald-600",
      img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
    },
  ];

  return (
    <section id="offers" className="pt-8 px-6 bg-white">
      <div className="flex flex-col md:flex-row justify-between items-end mb-6">
        <div>
          <h2 className="text-blue-500 text-[14px] md:text-base font-bold tracking-wider uppercase lg:mb-2">
            Today's Deals
          </h2>
          <h3 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-gray-900">
            Special Offers For You
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`${offer.bgGradient} rounded-3xl p-4 lg:p-8 text-white relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group`}
          >
            {/* Background Decorative Circle */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>

            <div className="relative z-10 w-2/3">
              <span className="bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block shadow-sm">
                Limited Time
              </span>
              <h4 className="text-xl lg:text-3xl font-extrabold mb-2 leading-tight">
                {offer.title}
              </h4>
              <p className="text-white/80 text-sm mb-6">{offer.subtitle}</p>

              <div className="bg-black/20 backdrop-blur-sm border border-white/30 rounded-xl p-3 inline-block">
                <span className="text-xs text-white/80 block mb-1">
                  Promo Code:
                </span>
                <span className="font-mono font-bold text-base md:text-lg tracking-widest text-white border-dashed border-b-2 border-white/50">
                  {offer.code}
                </span>
              </div>
            </div>

            {/* Offer Image */}
            <img
              src={offer.img}
              alt={offer.title}
              className="absolute -bottom-8 -right-8 w-44 h-44 object-cover rounded-full border-8 border-white/20 shadow-xl group-hover:rotate-12 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <div className=" mt-3 text-center md:hidden">
        <button className="text-orange-500 font-bold hover:text-orange-600 transition">
          View All Offers &rarr;
        </button>
      </div>
    </section>
  );
};

export default SpecialOffers;
