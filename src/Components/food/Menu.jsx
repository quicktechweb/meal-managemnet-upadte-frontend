import React from "react";

const Menu = () => {
  const categories = ["All", "Burgers", "Pizza", "Sushi", "Desserts", "Drinks"];

  const menuItems = [
    {
      id: 1,
      name: "Double Cheese Burger",
      price: "৳12.50",
      rating: "4.8",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
      desc: "Beef, Cheese, Lettuce, Tomato",
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      price: "৳15.00",
      rating: "4.9",
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
      desc: "Mozzarella, Pepperoni, Tomato Sauce",
    },
    {
      id: 3,
      name: "Spicy Noodles",
      price: "৳10.99",
      rating: "4.7",
      img: "https://images.unsplash.com/photo-1552611052-33e04de081de?w=500&q=80",
      desc: "Chili, Garlic, Soy Sauce, Veggies",
    },
    {
      id: 4,
      name: "Chocolate Cake",
      price: "৳8.50",
      rating: "4.9",
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80",
      desc: "Dark Chocolate, Cream, Berries",
    },
  ];

  return (
    <section id="menu" className="pt-8 px-6 xl:px-10 bg-gray-50">
      <div className="flex justify-between items-end mb-6 xl:mb-12">
        <div>
          <h2 className="text-blue-500 font-bold tracking-wider uppercase mb-2">
            Our Menu
          </h2>
          <h3 className="text-4xl xl:text-5xl font-extrabold text-gray-900">
            Popular Categories
          </h3>
        </div>
      </div>

      <div className="flex overflow-x-auto space-x-4 mb-4 xl:mb-10  no-scrollbar">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-semibold border-2 transition ${idx === 0 ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-600 border-gray-200 hover:border-blue-500 hover:text-blue-500"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 xl:gap-8">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition p-2 xl:p-4 group"
          >
            <div className="h-48 rounded-xl overflow-hidden mb-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-base xl:text-xl font-bold text-gray-800">
                {item.name}
              </h4>
              <span className="text-sm flex font-bold bg-orange-100 text-orange-600 px-2 py-1 rounded">
                <span>⭐</span> {item.rating}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4">{item.desc}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-black text-gray-900">
                {item.price}
              </span>
              <button className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition">
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
