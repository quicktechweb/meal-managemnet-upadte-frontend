import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    title: "24 Medium Square...",
    price: 1.33,
    oldPrice: 5.21,
    discount: "−74%",
    rating: 4.9,
    sold: "3000+ sold",
    shop: "Dollar Express",
    save: "Save $3.88",
    img: "https://luckyshop.com.bd/storage/media/1755612936_0720751_vivo-topping-whipping-cream-11-ltr.webp",
  },
  {
    id: 2,
    title: "Airs Pro Wireless...",
    price: 0.99,
    oldPrice: 9.62,
    discount: "−89%",
    rating: 4.3,
    sold: "10,000+ sold",
    shop: "Tech Store",
    save: "New shoppers save $8.63",
    img: "https://luckyshop.com.bd/storage/media/1755612794_0251747_kazi-farms-chicken-strips-250gm.jpeg",
  },
  {
    id: 3,
    title: "60D80D100D Thic...",
    price: 2.26,
    oldPrice: 4.91,
    discount: "−54%",
    rating: 4.9,
    sold: "2000+ sold",
    shop: "Beauty Hub",
    save: "Save $2.65",
    img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp",
  },
  {
    id: 4,
    title: "Continuous Fire Pistol...",
    price: 0.99,
    oldPrice: 10.5,
    discount: "−90%",
    rating: 5.0,
    sold: "160 sold",
    shop: "Toys World",
    save: "New shoppers save $9.59",
    img: "https://luckyshop.com.bd/storage/media/1755612458_0732214_mr-noodles-magic-masala-28-pcs-box.webp",
  },
  {
    id: 5,
    title: "Women Short Smart Wallet",
    price: 1.33,
    oldPrice: 5.39,
    discount: "−75%",
    rating: 4.9,
    sold: "4000+ sold",
    shop: "Dollar Express",
    save: "Save $4.06",
    img: "https://luckyshop.com.bd/storage/media/1755610807_0320334_kidstar-baby-diaper-small-66pcs-3-8-kg.jpeg",
  },
  {
    id: 6,
    title: "Wireless Earbuds Pro",
    price: 3.99,
    oldPrice: 12.5,
    discount: "−68%",
    rating: 4.7,
    sold: "2500+ sold",
    shop: "Sound Hub",
    save: "Save $8.51",
    img: "https://luckyshop.com.bd/storage/media/1755612590_0720823_kelloggs-froot-loops-285gm.webp",
  },
];

const LatestDeals = () => {
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(5);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(2); // Mobile/Tablet
      } else {
        setItemsPerView(5); // Desktop
      }
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => nextSlide(), 8000);
    return () => clearInterval(interval);
  }, [itemsPerView]);

  const nextSlide = () =>
    setIndex((prev) => (prev + itemsPerView) % products.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - itemsPerView + products.length) % products.length);

  const visibleProducts = Array.from({ length: itemsPerView }, (_, i) => {
    return products[(index + i) % products.length];
  });

  return (
    <div className="bg-white py-6 px-6 md:px-20 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Latest Deals</h2>
       <Link to="/alllatestdeals">
        <button className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white text-sm font-semibold px-4 py-2 rounded shadow hover:opacity-90 transition">
          View All
        </button>
        </Link>
      </div>

      <div className="relative flex items-center">
        <button
          onClick={prevSlide}
          className="absolute -left-4 z-10 bg-white shadow-[0_2px_18px_rgba(0,0,0,0.15)] hover:bg-gray-100 p-2 rounded-full"
        >
          <MdChevronLeft className="text-2xl text-gray-700" />
        </button>

        <div className="overflow-hidden w-full">
          <div
            className={`grid  mb-10 items-start transition-transform duration-700 ease-in-out ${
              itemsPerView === 2 ? "grid-cols-2" : "grid-cols-5"
            }`}
          >
            {visibleProducts.map((product) => (
              <Link to="/productdetails"
                key={product.id}
                className="group ms-2 me-2 mt-5 bg-white rounded-md overflow-hidden shadow-[0_2px_18px_rgba(0,0,0,0.15)] hover:shadow-lg transition transform hover:-translate-y-1 flex flex-col"
              >
                {/* Product Image */}
                {/* Product Image */}
<div className="relative h-40 w-full flex items-center justify-center bg-white">
  <img
    src={product.img}
    alt={product.title}
    className="max-h-full w-auto object-contain"
  />
  <button className="absolute bottom-2 right-2 bg-gradient-to-r from-[#8CD005] to-[#19745B] p-2 rounded-full shadow hover:opacity-90">
    <FiShoppingCart className="text-white" />
  </button>
</div>


                {/* Product Info */}
                <div className="p-2 flex-grow">
                  <div className="flex gap-1 mb-1 text-xs font-semibold">
                    <span className="bg-yellow-300 text-black px-1 rounded">Choice</span>
                    <span className="bg-red-500 text-white px-1 rounded">Sale</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {product.title}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-red-600 font-bold">${product.price}</p>
                    <p className="line-through text-gray-400 text-xs">
                      ${product.oldPrice}
                    </p>
                    <p className="text-red-500 text-xs">{product.discount}</p>
                  </div>
                  <div className="flex items-center text-xs text-gray-600 mt-1">
                    <FaStar className="text-yellow-400 mr-1" />
                    {product.rating}
                    <span className="ml-1">| {product.sold}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-1 shadow-[0_2px_18px_rgba(0,0,0,0.15)] mt-3 w-full">
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
    
    {/* Sold and Price - side by side on mobile */}
    <div className="flex w-full sm:w-2/3 justify-between mb-3 sm:mb-0">
      
      {/* Sold */}
      <div className="flex flex-col items-center w-1/2">
        <span className="text-xs font-bold text-green-600">26 / 26</span>
        <span className="text-[10px] text-gray-500">Sold</span>
      </div>

      {/* Price */}
      <div className="flex flex-col items-center w-1/2">
        <span className="text-sm font-bold text-yellow-600 ">৳ 500</span>
        <span className="text-[10px] text-gray-500 ">Coupon</span>
      </div>
    </div>

    {/* Remaining */}
    <div className="flex flex-col items-center w-full sm:w-1/3">
      <span className="text-xs font-bold text-gray-800">0</span>
      <span className="text-[10px] text-gray-500">Remaining</span>
    </div>
  </div>
</div>
                </div>

                {/* Hidden Buttons */}
                 {/* -------- Hover Buttons -------- */}
      <div className="overflow-hidden max-h-0 mb-2 group-hover:max-h-28 transition-all duration-500 px-2 flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();   // ⛔ stop navigation
            console.log("Buy Coupon:", product.id);
          }}
          className="w-full bg-[#19745B] text-white text-xs font-semibold py-2 rounded shadow hover:opacity-90 transition"
        >
          Buy Coupon
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();   // ⛔ stop navigation
            console.log("Add to Cart:", product.id);
          }}
          className="w-full bg-[#19745B] text-white text-xs font-semibold py-2 rounded shadow hover:opacity-90 transition"
        >
          Add to Cart
        </button>
      </div>
              </Link>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute -right-4 z-10 bg-white shadow hover:bg-gray-100 p-2 rounded-full"
        >
          <MdChevronRight className="text-2xl text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default LatestDeals;
