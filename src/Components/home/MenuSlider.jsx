import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const menuData = [
  {
    label: "Meal",
    items: [
      "All Wise Routine",
      "Day Wise Routine",
      "Weekly Plan",
      "Custom Diet",
    ],
  },
  {
    label: "Cloud Kitchen",
    items: ["Canteen 1", "Canteen 2", "Canteen 3", "Canteen 4", "Canteen 5"],
  },
  {
    label: "Restaurants",
    items: ["All", "Bangladeshi", "Chinese", "Indian", "Fast Food"],
  },
];

const MenuRow = ({ label, items }) => {
  const [active, setActive] = useState(0);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const trackRef = useRef(null);
  const chipRefs = useRef([]);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 4);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    el?.addEventListener("scroll", updateArrows);
    const ro = new ResizeObserver(updateArrows);
    if (el) ro.observe(el);
    return () => {
      el?.removeEventListener("scroll", updateArrows);
      ro.disconnect();
    };
  }, []);

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 140, behavior: "smooth" });
  };

  const handleSelect = (index) => {
    setActive(index);
    chipRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  const ArrowBtn = ({ dir }) => (
    <button
      onClick={() => scroll(dir === "left" ? -1 : 1)}
      className={`flex-shrink-0 w-7 h-7 rounded-full border border-gray-200 bg-white
        text-gray-400 hover:bg-gray-50 hover:text-gray-700 flex items-center justify-center
        transition-all duration-150
        ${dir === "left" ? (showLeft ? "flex cursor-pointer" : "hidden") : showRight ? "flex cursor-pointer" : "hidden"}`}
    >
      {dir === "left" ? <IoIosArrowBack /> : <IoIosArrowForward />}
    </button>
  );

  return (
    <div className="flex items-center border-b border-gray-100 last:border-b-0 px-2 py-3 gap-2 bg-gray-100 rounded-2xl shrink-0">
      <span className="text-sm font-medium text-gray-800 pr-1 border-r border-gray-100 whitespace-nowrap shrink-0">
        {label}
      </span>

      <ArrowBtn dir="left" />

      <div
        ref={trackRef}
        className="flex gap-2 overflow-x-auto max-w-[400px] scrollbar-hide flex-1"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((item, i) => (
          <button
            key={i}
            ref={(el) => (chipRefs.current[i] = el)}
            onClick={() => handleSelect(i)}
            className={`text-sm whitespace-nowrap px-3.5 py-1.5 rounded-full border transition-all duration-150 shrink-0
              ${
                active === i
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      <ArrowBtn dir="right" />
    </div>
  );
};

export default function MenuCategorySlider() {
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const outerTrackRef = useRef(null);

  const updateOuterArrows = () => {
    const el = outerTrackRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 4);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateOuterArrows();
    const el = outerTrackRef.current;
    el?.addEventListener("scroll", updateOuterArrows);
    const ro = new ResizeObserver(updateOuterArrows);
    if (el) ro.observe(el);
    return () => {
      el?.removeEventListener("scroll", updateOuterArrows);
      ro.disconnect();
    };
  }, []);

  const scrollOuter = (dir) => {
    outerTrackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Category-level left arrow */}
      {showLeft && (
        <button
          onClick={() => scrollOuter(-1)}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 bg-white
            text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex items-center justify-center
            transition-all duration-150 cursor-pointer shadow-sm"
        >
          <IoIosArrowBack />
        </button>
      )}

      {/* Outer scrollable track — contains all MenuRows */}
      <div
        ref={outerTrackRef}
        className="flex items-center gap-4  overflow-x-auto flex-1"
        style={{ scrollbarWidth: "none" }}
      >
        {menuData.map((row, index) => (
          <MenuRow key={index} label={row.label} items={row.items} />
        ))}
      </div>

      {/* Category-level right arrow */}
      {showRight && (
        <button
          onClick={() => scrollOuter(1)}
          className="flex-shrink-0 w-8 h-8 rounded-full border border-gray-300 bg-white
            text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex items-center justify-center
            transition-all duration-150 cursor-pointer shadow-sm"
        >
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
}
