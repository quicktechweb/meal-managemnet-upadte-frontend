import React from "react";

const Categories = ({ categories2 }) => {
  return (
    <div className="w-full overflow-hidden py-2 lg:py-4 ">
      <div className="flex w-max animate-marquee gap-6">
        {[...categories2, ...categories2].map((cat, index) => (
          <div
            key={index}
            className="lg:w-[100px] h-[120px] flex-shrink-0 flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="w-full h-[80px] lg:h-[100px]  flex items-center justify-center rounded-3xl transition">
              <img
                src={cat.image}
                alt={cat.label}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h4 className="text-black text-[16px] lg:mt-2 text-center">
              {cat.label}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
