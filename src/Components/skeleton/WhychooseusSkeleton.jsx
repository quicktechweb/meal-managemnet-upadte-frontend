import React from "react";

const WhychooseusSkeleton = () => {
  return (
    <section className="lg:py-7 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center animate-pulse">
        {/* Heading Skeleton */}
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-10"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Left Skeleton */}
          <div className="space-y-6 text-left">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Center Image Skeleton */}
          <div className="flex justify-center">
            <div className="w-[250px] h-[360px] bg-gray-200 rounded-xl"></div>
          </div>

          {/* Right Skeleton */}
          <div className="space-y-6 text-left">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhychooseusSkeleton;
