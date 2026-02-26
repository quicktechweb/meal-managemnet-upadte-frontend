import React from 'react'

const AppSkeleton = () => {
  return (
    <section className="relative w-full overflow-visible mt-10 lg:mt-20">
      <div className="relative h-[200px] md:h-[420px] w-full overflow-hidden bg-gradient-to-l from-[#3264f5] via-[#4a54e0] to-[#7202bb]">
        <div className="relative z-10 max-w-7xl mx-auto lg:px-6 px-3 h-full grid grid-cols-1 md:grid-cols-2 items-center animate-pulse">
          {/* Left Skeleton */}
          <div className="text-white">
            <div className="h-8 lg:h-12 bg-white/40 rounded w-2/3 mb-4"></div>

            <div className="h-4 bg-white/30 rounded w-full mb-2"></div>
            <div className="h-4 bg-white/30 rounded w-5/6 mb-6"></div>

            <div className="flex gap-4">
              <div className="h-10 w-32 bg-white/40 rounded-full"></div>
              <div className="h-10 w-32 bg-white/30 rounded-full"></div>
            </div>
          </div>

          {/* Right Image Skeleton */}
          <div className="relative hidden md:block">
            <div className="absolute right-0 bottom-[-210px] w-[400px] h-[370px] bg-white/30 rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppSkeleton