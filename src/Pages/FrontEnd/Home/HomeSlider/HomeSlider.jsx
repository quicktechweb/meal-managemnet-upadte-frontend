import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight, MdSearch } from "react-icons/md";

const slides = [
  {
    id: 1,
    title: "Hair Serum Essential",
    buttonText: "Shop Now",
    img: "https://sellularr.netlify.app/images/banner.png", // your banner
  },
  {
    id: 2,
    title: "Boost Your Look with Premium Products",
    buttonText: "Shop Now",
    img: "https://sellularr.netlify.app/images/ban.webp",
  },
  {
    id: 3,
    title: "Exclusive Beauty Essentials",
    buttonText: "Shop Now",
    img: "https://sellularr.netlify.app/images/banner.png",
  },
];

export default function HomeSlider() {
  const [current, setCurrent] = useState(0);

  // Auto slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.img}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay + Content */}
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
            {/* Logo */}
            <div className="mb-4">
              <img
                src="https://i.ibb.co.com/VY92LX2H/Logo-Lucky-Shop1.png" // replace with your logo
                alt="Logo"
                className="mx-auto h-14"
              />
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {slide.title}
            </h1>

            {/* Button */}
            <button className="bg-[#19745B] hover:bg-yellow-600 text-white px-6 py-2 rounded-md font-semibold transition mb-6">
              {slide.buttonText}
            </button>

            {/* Search Bar */}
           <div className="flex w-full max-w-2xl bg-white rounded-full overflow-hidden shadow-lg">
  <input
    type="text"
    placeholder="Search from 300M+ Premium Products Around the World"
    className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
  />
  <button className="bg-black hover:bg-yellow-500 transition-colors duration-300 w-12 h-9 flex items-center justify-center rounded-full m-2">
    <MdSearch className="text-white" size={22} />
  </button>
</div>

          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60 z-20"
      >
        <MdChevronLeft size={30} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black/40 p-2 rounded-full text-white hover:bg-black/60 z-20"
      >
        <MdChevronRight size={30} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 flex justify-center w-full space-x-2 z-20">
        {slides.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              index === current ? "bg-yellow-500" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
