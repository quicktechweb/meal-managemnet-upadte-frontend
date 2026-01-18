import {
  FiSmile,
  FiLayers,
  FiHeadphones,
  FiRefreshCcw,
  FiCode,
  FiDroplet,
} from "react-icons/fi";

const Features = () => {
  const leftFeatures = [
    {
      icon: <FiSmile />,
      color: "bg-pink-100 text-pink-500",
      title: "Trusted & Reliable",
      desc: "We prioritize trust and reliability, ensuring every service is delivered on time and to the highest standard.",
    },
    {
      icon: <FiLayers />,
      color: "bg-purple-100 text-purple-500",
      title: "Fast & Efficient",
      desc: "Our streamlined processes save you time while delivering results quickly and effectively.",
    },
    {
      icon: <FiHeadphones />,
      color: "bg-green-100 text-green-500",
      title: "Expert Support",
      desc: "A team of professionals is available 24/7 to help you with guidance, troubleshooting, and advice.",
    },
  ];

  const rightFeatures = [
    {
      icon: <FiRefreshCcw />,
      color: "bg-orange-100 text-orange-500",
      title: "Affordable & Transparent",
      desc: "No hidden fees or surprise costs—our pricing is fair and fully transparent for every service.",
    },
    {
      icon: <FiCode />,
      color: "bg-blue-100 text-blue-500",
      title: "Cutting-Edge Solutions",
      desc: "We use the latest technology and practices to provide innovative solutions that work.",
    },
    {
      icon: <FiDroplet />,
      color: "bg-red-100 text-red-500",
      title: "Customer Satisfaction Guaranteed",
      desc: "Your satisfaction is our priority, and we go the extra mile to ensure you’re happy with our service.",
    },
  ];

  const renderFeature = (item, index) => (
    <div key={index} className="flex gap-5 items-start group">
      {/* ICON */}
      <div
        className={`w-20 h-12 rounded-lg flex items-center justify-center text-xl ${item.color}
        transition-all duration-300 group-hover:scale-110`}
      >
        {item.icon}
      </div>

      {/* TEXT */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900">
          {item.title}
        </h4>
        <p className="mt-2 text-gray-500 text-sm leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* HEADING */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Why Choose Us
        </h2>
        <p className="mt-5 max-w-3xl mx-auto text-gray-500 leading-relaxed">
          We focus on delivering value, reliability, and efficiency. Our solutions
          are designed to help you succeed quickly and effortlessly.
        </p>

        {/* CONTENT */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* LEFT */}
          <div className="space-y-14 text-left">
            {leftFeatures.map(renderFeature)}
          </div>

          {/* CENTER IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://appbeats.themetags.com/img/image-10.png"
              alt="mobile"
              className="w-[320px]"
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-14 text-left">
            {rightFeatures.map(renderFeature)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
