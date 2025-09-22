import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const slides = [
  {
    id: 1,
    title: "Boost Your Health with NOW Supplements",
    buttonText: "See Collection",
    img1: "https://sellularr.netlify.app/images/bann.webp",
  },
  {
    id: 2,
    title: "Fresh & Healthy Food Collection",
    buttonText: "Shop Now",
    img1: "https://sellularr.netlify.app/images/middle.webp",
  },
  {
    id: 4,
    title: "Stay Fit with Premium Products",
    buttonText: "Discover",
    img1: "https://sellularr.netlify.app/images/bann.webp",
  },
];

const ProductCarousel = () => {
  const [index, setIndex] = useState(0);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);

  // Auto slide every 8s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="px-5 md:px-0">
      <div className="relative w-full md:max-w-6xl  mx-auto rounded-2xl shadow-lg mt-5 overflow-hidden">
      <div className="relative h-64 sm:h-80  md:h-[20rem] lg:h-[22rem]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100 z-10" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <img
              src={slide.img1}
              alt="Product"
              className="w-full h-full object-cover opacity-70"
            />

            {/* Text Overlay */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-11/12 sm:w-3/4 md:w-1/2 p-4 sm:p-6 md:p-8 text-white rounded-lg">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
                {slide.title}
              </h2>
              <button className="bg-gradient-to-r from-[#8CD005] to-[#19745B] text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition duration-300">
                {slide.buttonText} <span>&rarr;</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-white/80 p-2 sm:p-3 rounded-full shadow-md hover:bg-white z-20"
      >
        <MdChevronLeft className="text-xl sm:text-2xl text-gray-700" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-white/80 p-2 sm:p-3 rounded-full shadow-md hover:bg-white z-20"
      >
        <MdChevronRight className="text-xl sm:text-2xl text-gray-700" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${
              index === i ? "bg-yellow-400 scale-125" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  </div>
  );
};

export default ProductCarousel;
