import React from "react";
import Marquee from "react-fast-marquee";
import { useGetNotices } from "../api/admin/admin.api";

const Headline = () => {
  const { data } = useGetNotices();

  return (
    <div className="h-[50px] w-full rounded-md bg-white overflow-hidden flex items-center px-4 mx-auto shadow">
      <Marquee gradient={false} speed={50} pauseOnHover={true}>
        🚨 Notice:
        <span className="text-black">
          {data?.map((notice) => (
            <>{notice?.title}</>
          ))}
        </span>
      </Marquee>
    </div>
  );
};

export default Headline;
