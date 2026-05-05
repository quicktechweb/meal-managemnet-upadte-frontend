import {
  FiSmile,
  FiLayers,
  FiHeadphones,
  FiRefreshCcw,
  FiCode,
  FiDroplet,
} from "react-icons/fi";

const Features = ({ isLoading, chooseusData = [], chooseImage }) => {
  const leftFeatures = [
    {
      icon: <FiSmile />,
      color: "bg-pink-100 text-pink-500",
      title: chooseusData?.[0]?.title,
      desc: chooseusData?.[0]?.description,
    },
    {
      icon: <FiLayers />,
      color: "bg-purple-100 text-purple-500",
      title: chooseusData?.[1]?.title,
      desc: chooseusData?.[1]?.description,
    },
    {
      icon: <FiHeadphones />,
      color: "bg-green-100 text-green-500",
      title: chooseusData?.[2]?.title,
      desc: chooseusData?.[2]?.description,
    },
  ];

  const rightFeatures = [
    {
      icon: <FiRefreshCcw />,
      color: "bg-orange-100 text-orange-500",
      title: chooseusData?.[3]?.title,
      desc: chooseusData?.[3]?.description,
    },
    {
      icon: <FiCode />,
      color: "bg-blue-100 text-blue-500",
      title: chooseusData?.[4]?.title,
      desc: chooseusData?.[4]?.description,
    },
    {
      icon: <FiDroplet />,
      color: "bg-red-100 text-red-500",
      title: chooseusData?.[5]?.title,
      desc: chooseusData?.[5]?.description,
    },
  ];

  const renderFeature = (item, index) => (
    <div
      key={index}
      className="flex flex-col xl:flex-row gap-2.5 lg:gap-5 items-start group"
    >
      <div
        className={`w-10 md:w-14 xl:w-20 h-10 md:h-12 shrink-0 rounded-lg flex items-center justify-center text-lg lg:text-xl ${item.color}
        transition-all duration-300 group-hover:scale-110`}
      >
        {item.icon}
      </div>

      <div>
        <h4 className="text-base lg:text-lg font-semibold text-gray-900">
          {item.title}
        </h4>
        <p className="lg:mt-2 text-gray-500 text-xs lg:text-sm leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );

  if (isLoading || !chooseusData?.length) {
    return (
      <section className="lg:py-7 bg-white">
        <div className=" px-4 md:px-6 text-center animate-pulse">
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
  }

  return (
    <section id="why-choose-us" className="lg:py-7 bg-white">
      <div className=" px-4 md:px-6 text-center">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Why Choose Us
        </h2>
        <p className="mt-2.5 md:mt-5 max-w-full md:max-w-3xl mx-auto text-gray-500 leading-tight lg:leading-relaxed text-sm md:text-base">
          We focus on delivering value, reliability, and efficiency. Our
          solutions are designed to help you succeed quickly and effortlessly.
        </p>

        {/* CONTENT */}
        <div className="mt-5  grid grid-cols-1 lg:grid-cols-3 gap-2.5 md:gap-5 lg:gap-10 items-center">
          <div className="space-y-3.5  text-left">
            {leftFeatures.map(renderFeature)}
          </div>

          <div className="flex justify-center">
            <img
              src={chooseImage?.banner_image}
              alt="mobile"
              className="w-[250px] h-[360px] lg:h-auto lg:w-[320px]"
            />
          </div>

          <div className="space-y-3.5  text-left">
            {rightFeatures.map(renderFeature)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
