import React from "react";

const SectionHeader = ({ icon: Icon, title, color }) => {
  return (
    <div className={`flex items-center gap-2 mb-4 pb-2 border-b-2 ${color}`}>
      <Icon size={15} className="text-gray-500" />
      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">
        {title}
      </h4>
    </div>
  );
};

export default SectionHeader;
