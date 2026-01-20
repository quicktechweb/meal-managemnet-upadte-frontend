import { useState } from "react";
import SubMenuPortal from "./SubMenuPortal";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { X } from "lucide-react";

export const CategorySidebar = ({ categories, isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [submenuPos, setSubmenuPos] = useState({ top: 0 });
  const [openMobileCat, setOpenMobileCat] = useState(null);

  const handleMouseEnter = (e, cat) => {
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSubmenuPos({ top: rect.top });
    setActiveCategory(cat);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  const handleMobileToggle = (cat) => {
    setOpenMobileCat(openMobileCat?.label === cat.label ? null : cat);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white z-50 lg:z-40 flex
          w-[280px] lg:w-[250px] 2xl:w-[300px]
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-full h-full overflow-y-auto pt-2 lg:pt-22 p-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h3 className="text-lg font-bold">Categories</h3>
            <button className="cursor-pointer" onClick={onClose}>
              <X />
            </button>
          </div>

          <h3 className="text-xl font-bold mb-4 hidden lg:block">
            Shop by Category
          </h3>

          <ul className="space-y-2">
            {categories.map((cat) => {
              const isOpenMobile = openMobileCat?.label === cat.label;

              return (
                <li key={cat.label}>
                  {/* Category Row */}
                  <div
                    onMouseEnter={(e) => handleMouseEnter(e, cat)}
                    onClick={() => handleMobileToggle(cat)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer
                      text-gray-700 hover:bg-[#c78436] hover:text-white transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{cat.icon}</span>
                      <span className="font-medium">{cat.label}</span>
                    </div>

                    {/* Icon change */}
                    <span className="lg:hidden">
                      {isOpenMobile ? <FaChevronDown /> : <FaChevronRight />}
                    </span>
                    <FaChevronRight className="hidden lg:block text-xs" />
                  </div>

                  {/* Mobile Dropdown */}
                  {isOpenMobile && (
                    <ul className="lg:hidden ml-6 mt-1 space-y-1">
                      {cat.submenu.map((sub) => (
                        <li
                          key={sub.label}
                          className="flex cursor-pointer justify-between px-3 py-2 text-sm
                            text-gray-600 rounded-md
                            hover:bg-orange-50 hover:text-[#c78436]"
                        >
                          <span>{sub.label}</span>
                          <span className="text-xs bg-gray-100 rounded-full px-2">
                            {sub.count}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Desktop Submenu */}
        {activeCategory && (
          <div className="hidden lg:block">
            <SubMenuPortal
              category={activeCategory}
              position={submenuPos}
              onClose={handleMouseLeave}
            />
          </div>
        )}
      </div>
    </>
  );
};
