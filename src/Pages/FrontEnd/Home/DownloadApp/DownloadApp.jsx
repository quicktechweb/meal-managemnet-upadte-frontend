import { FaApple, FaGooglePlay } from "react-icons/fa";

const DownloadApp = () => {
  return (
    <section className="relative w-full overflow-visible mt-10 lg:mt-20">
      {/* Background wrapper (SHORT HEIGHT) */}
      <div className="relative h-[200px] md:h-[420px] w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(https://i.ibb.co.com/tT2fgXh4/hero-bg-3.jpg)",
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
        <div className="relative z-10 max-w-7xl mx-auto lg:px-6 px-3  h-full grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Left content */}
          <div className="text-white md:pt-0">
            <h2 className="text-2xl lg:text-5xl font-bold  lg:mb-4">
              Download Our App
            </h2>

            <p className="text-sm md:text-base text-white/90 max-w-md mb-4 lg:mb-8">
              Conveniently transform frictionless mindshare after orthogonal
              manufactured products.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-purple-700 px-6 py-1.5 lg:py-3 rounded-full font-medium cursor-pointer flex items-center gap-3 hover:scale-105 transition text-xs lg:text-base ">
                <FaApple className="text-xs lg:text-base" />
                App Store
              </button>

              <button className="border border-white px-6 py-1.5 lg:py-3 rounded-full font-medium flex items-center gap-3 cursor-pointer text-xs lg:text-base hover:bg-white hover:text-purple-700 transition">
                <FaGooglePlay className="text-xs lg:text-base" />
                Play Store
              </button>
            </div>
          </div>

          {/* Right image container */}
          <div className="relative hidden md:block">
            <img
              src="https://i.ibb.co.com/GQkq02kp/hand-with-app.png"
              alt="App Preview"
              className="
                absolute 
                right-0 
                bottom-[-210px] 
                max-w-[550px] 
                h-[370px]
                drop-shadow-2xl
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
