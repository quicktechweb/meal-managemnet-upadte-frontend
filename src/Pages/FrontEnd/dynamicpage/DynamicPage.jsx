import React from "react";
import { useParams } from "react-router-dom";
import { useSingleDynamicPage } from "../../../api/admin/admin.api";

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
    <div className="h-6 bg-gray-300 rounded w-full"></div>
    <div className="h-6 bg-gray-300 rounded w-full"></div>
    <div className="h-6 bg-gray-300 rounded w-5/6"></div>
    <div className="h-6 bg-gray-300 rounded w-2/3"></div>
  </div>
);

const DynamicPage = () => {
  const { slug } = useParams();
  const { data, isLoading } = useSingleDynamicPage(slug);

  return (
    <div className="min-h-screen px-4 py-10 mt-20">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <h3 className="text-primaryTextColor 2xl:text-5xl text-[30px] font-bold xl:leading-[62.4px] mb-2">
            {data?.title}
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: data?.content }}
            className="[&_h1]:text-xl [&_h2]:text-xl [&_h3]:text-xl [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-decimal [&_ol]:list-inside"
          ></div>
        </>
      )}
    </div>
  );
};

export default DynamicPage;
