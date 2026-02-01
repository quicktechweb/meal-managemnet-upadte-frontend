import React from "react";
import Marquee from "react-fast-marquee";

const Headline = () => {
  return (
    <div className="h-[50px] rounded-md bg-white overflow-hidden flex items-center px-4 mx-auto shadow">
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        <span className="text-black">
          🚨 Notice: Hostel will remain closed on Friday due to maintenance.
          Website • New offers available now • Please check updates regularly
        </span>
      </Marquee>
    </div>
  );
};

export default Headline;
