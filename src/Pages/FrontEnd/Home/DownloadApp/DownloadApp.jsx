import { FaApple, FaGooglePlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const DownloadApp = ({ appData, isLoading }) => {
  if (isLoading || !appData) {
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

  return (
    <section className="relative w-full overflow-visible mt-10 lg:mt-20">
      <div className="relative h-[200px] md:h-[420px] w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${appData?.bg_app})`,
          }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-l 
          from-[#3264f5e6] 
          via-[#4a54e0e0] 
          to-[#7202bbe6]"
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto lg:px-6 px-3 h-full grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Left content */}
          <div className="text-white">
            <h2 className="text-2xl lg:text-5xl font-bold lg:mb-4">
              {appData?.title}
            </h2>

            <p
              dangerouslySetInnerHTML={{ __html: appData?.description }}
              className="[&_h1]:text-xl [&_h2]:text-xl [&_h3]:text-xl [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-bold [&_ul]:list-disc [&_ul]:list-inside [&_ol]:list-decimal [&_ol]:list-inside line-clamp-2"
            />

            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                to={appData?.apple_store_url}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-purple-700 px-6 py-1.5 lg:py-3 rounded-full font-medium flex items-center gap-3 hover:scale-105 transition text-xs lg:text-base"
              >
                <FaApple />
                App Store
              </Link>

              <Link
                to={appData?.play_store_url}
                target="_blank"
                rel="noreferrer"
                className="border border-white px-6 py-1.5 lg:py-3 rounded-full font-medium flex items-center gap-3 text-xs lg:text-base hover:bg-white hover:text-purple-700 transition"
              >
                <FaGooglePlay />
                Play Store
              </Link>
            </div>
          </div>

          {/* Right image */}
          <div className="relative hidden md:block">
            <img
              src={appData?.img_app}
              alt="App Preview"
              className="absolute right-0 bottom-[-210px] max-w-[550px] h-[370px] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
