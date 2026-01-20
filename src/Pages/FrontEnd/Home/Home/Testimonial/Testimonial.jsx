import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const testimonials = [
  {
    text: "Assertively procrastinate distributed relationships whereas equity invested intellectual capital everything energistically underwhelm proactive.",
    name: "Austin Cesar",
    company: "ThemeTags",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    text: "Intrinsically facilitate functional imperatives without next-generation meta-services. Compellingly revolutionize worldwide users via-as in enterprise best practices.",
    name: "Pirtle Karol",
    company: "ThemeTags",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "Interactively grow backend scenarios through one paradigms. Distinctively and communicate efficient information without effective meta-services.",
    name: "Aminul Islam",
    company: "ThemeTags",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    text: "Intrinsically facilitate functional imperatives without next-generation meta-services. Compellingly revolutionize worldwide users via-as in enterprise best practices.",
    name: "Pirtle Karol",
    company: "ThemeTags",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "Interactively grow backend scenarios through one paradigms. Distinctively and communicate efficient information without effective meta-services.",
    name: "Aminul Islam",
    company: "ThemeTags",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const Testimonial = () => {
  return (
    <section className="bg-white mt-7 md:-mt-24 mb-8t md:mb-16">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 text-center">
        {/* Heading */}
        <h2 className="text-2xl lg:text-4xl font-bold mb-2 lg:mb-4">
          Testimonials What Clients Say
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 max-w-2xl text-sm lg:text-base mx-auto mb-4 md:mb-8 lg:mb-16">
          Rapidiously morph transparent internal or sources Whereas resource
          sucking e-business. Conveniently innovate compelling internal.
        </p>

        {/* Slider */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                {/* Card */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-left">
                  <p className="text-gray-600 text-sm mb-3 lg:mb-6 leading-tight lg:leading-relaxed">
                    {item.text}
                  </p>

                  {/* Stars */}
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-orange-400 text-sm" />
                    ))}
                  </div>

                  <p className="text-sm font-medium text-gray-700">
                    5.0 <span className="text-gray-400">BizBite</span>
                  </p>
                </div>

                {/* Speech arrow */}
                <div className="absolute left-10 -bottom-3 w-6 h-6 bg-gray-50 rotate-45"></div>

                {/* User */}
                <div className="flex items-center gap-4 mt-4 lg:mt-8 text-left">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.company}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
