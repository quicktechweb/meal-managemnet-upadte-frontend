import React from 'react'

const BannerSkeleton = () => {
  return (
    <section className="relative h-[480px] md:h-[500px] lg:h-[720px] bg-gradient-to-r from-purple-700 to-indigo-700 overflow-hidden">
      <div className="max-w-7xl h-full flex flex-col justify-center mx-auto px-5 lg:px-7 2xl:px-10 pt-28 animate-pulse">
        <div className="h-8 bg-white/30 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-white/20 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-white/20 rounded w-1/4 mb-6"></div>

        <div className="flex gap-4">
          <div className="h-10 w-32 bg-white/30 rounded-full"></div>
          <div className="h-10 w-32 bg-white/20 rounded-full"></div>
        </div>
      </div>

      <div className="absolute right-10 xl:right-60 top-24 hidden lg:block animate-pulse">
        <div className="w-[380px] h-[550px] bg-white/20 rounded-xl"></div>
      </div>
    </section>
  );
}

export default BannerSkeleton