import React from "react";

const SectionTitle = ({ title, subTitle, className }) => {
  return (
    <h2 className="text-4xl ">
      <span className={`text-[#FF6F61] ${className}`}>{title}</span> {subTitle}
    </h2>
  );
};

export default SectionTitle;
