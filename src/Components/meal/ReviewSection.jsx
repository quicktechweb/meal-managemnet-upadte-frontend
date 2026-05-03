import React from "react";
// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper modules
import { Pagination, Autoplay } from "swiper/modules";
// Lucide icons
import { Star } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const ReviewCard = ({ stars, reviewText, avatarLetter, name, department }) => (
  <div className="bg-white p-4 lg:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-start h-full hover:shadow-md transition-shadow duration-300">
    {/* Star Rating */}
    <div className="flex items-center gap-1 mb-3 lg:mb-6">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-2.5 h-2.5 lg:w-5 lg:h-5 ${i < stars ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
        />
      ))}
    </div>

    {/* Review Text */}
    <p className="text-slate-600 leading-relaxed text-sm lg:text-base italic mb-4 lg:mb-8 grow">
      "{reviewText}"
    </p>

    {/* User Info */}
    <div className="flex items-center gap-2 lg:gap-4 mt-auto">
      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold uppercase">
        {avatarLetter}
      </div>
      <div>
        <h4 className="text-sm lg:text-base font-bold text-slate-900">
          {name}
        </h4>
        <p className="text-xs lg:text-sm text-slate-500">{department}</p>
      </div>
    </div>
  </div>
);

const ReviewsSection = () => {
  const reviews = [
    {
      stars: 5,
      reviewText:
        "Finally I can see what's for lunch before going to mess. Saves so much time!",
      avatarLetter: "R",
      name: "Rahul S.",
      department: "B.Tech CSE",
    },
    {
      stars: 5,
      reviewText:
        "Love the rating system. Mess food has actually improved since we started using this app.",
      avatarLetter: "P",
      name: "Priya M.",
      department: "M.Sc Physics",
    },
    {
      stars: 4,
      reviewText:
        "Super easy to use. I rate my meals daily now. The weekly menu view is really helpful.",
      avatarLetter: "A",
      name: "Amit K.",
      department: "B.Tech ECE",
    },

    {
      stars: 5,
      reviewText:
        "Great initiative. Now I can manage my food preferences easily.",
      avatarLetter: "S",
      name: "Sneha D.",
      department: "B.A English",
    },
    {
      stars: 4,
      reviewText:
        "The user interface is excellent. Highly recommended for all students.",
      avatarLetter: "J",
      name: "Joy B.",
      department: "B.Sc Math",
    },
  ];

  return (
    <section className="py-10 lg:py-20 px-6 bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-3 lg:mb-16 max-w-2xl mx-auto">
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-1.5 py-0.5 lg:px-3 lg:py-1 rounded-full tracking-wider">
            Reviews
          </span>
          <h2 className="text-2xl lg:text-5xl font-extrabold text-slate-900  mt-0.5 lg:mt-6 mb-1 lg:mb-4">
            What Students Say
          </h2>
          <p className="text-slate-500 text-sm lg:text-lg">
            Real feedback from real users
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-16"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="h-auto">
              <ReviewCard {...review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet-active {
          background-color: #0076fd !important; /* blue-600 */
        }
        .swiper-pagination {
          bottom: 0px !important;
        }
      `}</style>
    </section>
  );
};

export default ReviewsSection;
