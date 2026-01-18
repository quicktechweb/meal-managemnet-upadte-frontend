import { useState } from "react";
import SubMenuPortal from "./SubMenuPortal";
import { FaChevronRight } from "react-icons/fa";

export const CategorySidebar = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [submenuPos, setSubmenuPos] = useState({ top: 0 });

  const handleMouseEnter = (e, cat) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSubmenuPos({ top: rect.top });
    setActiveCategory(cat);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <div
      className="flex fixed z-40 h-screen top-0 bg-white"
      onMouseLeave={handleMouseLeave}
    >
      {/* Sidebar */}
      <div className="w-[300px] pt-[90px] h-screen overflow-y-auto bg-white border-r border-gray-100 p-4 shadow">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          Shop by Category
        </h3>

        <ul className="space-y-2 ">
          {categories.map((cat) => (
            <li key={cat.label} onMouseEnter={(e) => handleMouseEnter(e, cat)}>
              <div
                className="flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer
                text-gray-700 hover:bg-[#c78436] hover:text-white transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{cat.icon}</span>
                  <span className="font-medium">{cat.label}</span>
                </div>
                <FaChevronRight className="text-xs" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {activeCategory && (
        <SubMenuPortal
          category={activeCategory}
          position={submenuPos}
          onClose={handleMouseLeave}
        />
      )}
    </div>
  );
};
