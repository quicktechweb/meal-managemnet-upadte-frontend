import { useState, useRef, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const menuData = [
  {
    label: "Al Abadan Kitchen",
    items: ["Kitchen 1", "Kitchen 2", "Kitchen 3", "Kitchen 4", "Kitchen 5"],
  },
  {
    label: "Canteen/Restaurants",
    items: ["All", "Bangladeshi", "Chinese", "Indian", "Fast Food"],
  },
  {
    label: "Meal",
    items: [
      "All Wise Routine",
      "Day Wise Routine",
      "Weekly Plan",
      "Custom Diet",
    ],
  },
];

const MenuRow = ({ label, items }) => {
  const [labelActive, setLabelActive] = useState(false);
  const [activeChip, setActiveChip] = useState(null);
  const [page, setPage] = useState(0);

  const pageSize = 3;
  const totalPages = Math.ceil(items.length / pageSize);
  const visibleItems = items.slice(page * pageSize, page * pageSize + pageSize);

  const handleChipSelect = (index) => {
    const realIndex = page * pageSize + index;
    setActiveChip((prev) => (prev === realIndex ? null : realIndex));
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-2 py-1.5 shrink-0 border border-gray-200">
      {/* Single label button with toggle */}
      <button
        onClick={() => setLabelActive((prev) => !prev)}
        className={`text-xs sm:text-sm whitespace-nowrap px-3 py-1 rounded-full border transition-all duration-150 shrink-0
          ${
            labelActive
              ? "bg-gray-900 text-white border-gray-900"
              : "bg-white text-gray-500 border-gray-200 hover:text-gray-700 hover:bg-gray-50"
          }`}
      >
        {label}
      </button>

      <div className="w-px h-5 bg-gray-200 shrink-0" />

      {/* Left arrow */}
      <button
        onClick={() => setPage((p) => p - 1)}
        disabled={page === 0}
        className={`flex-shrink-0 w-6 h-6 rounded-full border border-gray-200 bg-white text-gray-400
          flex items-center justify-center transition-all duration-150
          ${page === 0 ? "hidden" : "hover:bg-gray-50 hover:text-gray-700 cursor-pointer"}`}
      >
        <IoIosArrowBack size={12} />
      </button>

      {/* Chips — fixed 3 slots */}
      <div className="flex gap-1.5">
        {visibleItems.map((item, i) => {
          const realIndex = page * pageSize + i;
          return (
            <button
              key={realIndex}
              onClick={() => handleChipSelect(i)}
              className={`text-xs sm:text-sm whitespace-nowrap px-2.5 py-1 sm:px-3.5 rounded-full border transition-all duration-150 shrink-0
                ${
                  activeChip === realIndex
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700"
                }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page >= totalPages - 1}
        className={`flex-shrink-0 w-6 h-6 rounded-full border border-gray-200 bg-white text-gray-400
          flex items-center justify-center transition-all duration-150
          ${page >= totalPages - 1 ? "hidden" : "hover:bg-gray-50 hover:text-gray-700 cursor-pointer"}`}
      >
        <IoIosArrowForward size={12} />
      </button>
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
      {showLeft && (
        <button
          onClick={() => scrollOuter(-1)}
          className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 bg-white
            text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex items-center justify-center
            transition-all duration-150 cursor-pointer shadow-sm"
        >
          <IoIosArrowBack />
        </button>
      )}

      <div
        ref={outerTrackRef}
        className="flex items-center gap-4 xxs:max-w-[200px] xs:max-w-[260px] sm:max-w-[450px]  md:max-w-[600px] lg:max-w-[780px]  xl:max-w-[1000px] llxl:!max-w-[1120px] lxl:!max-w-[1200px] 2xl:!max-w-full  overflow-x-auto flex-1"
        style={{ scrollbarWidth: "none" }}
      >
        {menuData.map((row, index) => (
          <MenuRow key={index} label={row.label} items={row.items} />
        ))}
      </div>

      {showRight && (
        <button
          onClick={() => scrollOuter(1)}
          className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 bg-white
            text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex items-center justify-center
            transition-all duration-150 cursor-pointer shadow-sm"
        >
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
}
