"use client";

import { useEffect, useState } from "react";
import { HeroBottomSvg } from "../../../../svg/SvgContainer";
import BannerSkeleton from "../../../../Components/skeleton/BannerSkeleton";

const Bannerparts = ({ bannerData = [], isLoading }) => {
  const [active, setActive] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Reset slider when new data arrives
  useEffect(() => {
    if (!bannerData?.length) return;

    setActive(0);
    setIsReady(true);

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % bannerData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData]);

  if (isLoading || !bannerData?.length) {
    return <BannerSkeleton />;
  }

  return (
    <section
      id="home"
      className="relative h-[480px] md:h-[500px] lg:h-[720px] bg-gradient-to-r from-purple-700 to-indigo-700 overflow-hidden"
    >
      {/* BACKGROUND SLIDER */}
      {bannerData.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 will-change-opacity ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `
              linear-gradient(to left,
                rgba(50,100,245,0.90),
                rgba(74,84,232,0.88),
                rgba(91,66,219,0.85),
                rgba(104,44,203,0.88),
                rgba(114,2,187,0.90)
              ),
              url(${slide?.banner_bg})
            `,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* CONTENT */}
      {isReady && (
        <div className="relative z-10  px-5 lg:px-7 2xl:px-10 pt-28 2xl:pt-32 flex h-[560px]  text-white">
          <div className="transition-all duration-700">
            <h1 className="text-2xl lg:text-3xl 2xl:text-5xl font-semibold leading-tight max-w-xl lg:mt-8 2xl:mt-16">
              {bannerData[active]?.title}
            </h1>

            <p className="mt-3 2xl:mt-6 text-sm sm:text-base lg:text-lg max-w-lg opacity-90">
              {bannerData[active]?.description}
            </p>

            <div className="mt-5 2xl:mt-10 flex flex-col sm:flex-row gap-3 2xl:gap-6">
              <button className="bg-white text-purple-700 text-xs sm:text-base px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold cursor-pointer">
                Download Now
              </button>

              <button className="bg-white/10 border border-white text-xs sm:text-base px-4 sm:px-8 py-2 sm:py-3 rounded-full font-semibold cursor-pointer">
                Contact with us
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RIGHT HERO IMAGE */}
      <div className="absolute right-10 xl:right-60 top-24 z-20 hidden lg:block w-[480px] h-[520px]">
        {bannerData.map((slide, i) => (
          <img
            key={i}
            src={slide?.banner_image}
            alt="hero app"
            className={`absolute top-0 left-0 w-[350px] h-[550px] transition-all duration-1000 ${
              i === active
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-24"
            }`}
          />
        ))}
      </div>

      {/* BOTTOM SHAPE */}
      <div className="absolute left-0 right-0 bottom-[-2px] z-[1] w-full">
        <HeroBottomSvg />
      </div>
    </section>
  );
};

export default Bannerparts;
