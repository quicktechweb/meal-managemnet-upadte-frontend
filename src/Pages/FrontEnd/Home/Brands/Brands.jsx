import { useState, useEffect } from "react";

const brands = [
  { id: 1, name: "A-Premium", img: "https://images.samsung.com/is/image/samsung/assets/us/about-us/brand/logo/mo/360_197_1.png?$720_N_PNG$" },
  { id: 2, name: "Gatorade", img: "https://download.logo.wine/logo/Sony_Mobile/Sony_Mobile-Logo.wine.png" },
  { id: 3, name: "Vetericyn", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6RACuKQ8sJxNXI17b6tLyd4vmhraPT5OYmw&s" },
  { id: 4, name: "Hasbro Gaming", img: "https://1000logos.net/wp-content/uploads/2021/08/Xiaomi-logo.jpg" },
  { id: 5, name: "Minwax", img: "https://www.logo.wine/a/logo/Oppo/Oppo-Logo.wine.svg" },
  { id: 6, name: "GNC", img: "https://download.logo.wine/logo/Vivo_(technology_company)/Vivo_(technology_company)-Logo.wine.png" },
  { id: 7, name: "Pepsi", img: "https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg" },
  { id: 8, name: "Coca-Cola", img: "https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png" },
  { id: 9, name: "Vetericyn", img: "https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg" },
  { id: 10, name: "Hasbro Gaming", img: "https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png" },
  { id: 11, name: "Minwax", img: "https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg" },
];

const Brands = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(7);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setItemsPerView(5); // Mobile
      } else if (width < 1024) {
        setItemsPerView(6); // Tablet
      } else {
        setItemsPerView(7); // Desktop
      }
    };

    updateItemsPerView(); // Initial call
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + 1 >= brands.length ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [brands.length]);

  // Get visible brands with wrapping logic
  const visibleBrands = [
    ...brands.slice(currentIndex, currentIndex + itemsPerView),
    ...brands.slice(0, Math.max(0, currentIndex + itemsPerView - brands.length))
  ];

  return (
    <div className="py-6 px-4 md:px-20">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Hottest Brands</h2>
      <div className="flex gap-4 justify-between items-center overflow-hidden">
        {visibleBrands.map((brand, index) => (
          <div
            key={brand.id}
            className={`flex flex-col items-center justify-center transition-transform duration-500 
              ${
                index === Math.floor(itemsPerView / 2)
                  ? "transform scale-110 rounded-xl"
                  : ""
              } 
              w-1/5 sm:w-1/6 lg:w-1/7 p-1
            `}
          >
            <img
              src={brand.img}
              alt={brand.name}
              className={`object-contain 
                ${index === Math.floor(itemsPerView / 2) ? "h-20" : "h-16"} 
                sm:h-20 lg:h-20
              `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
