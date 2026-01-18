
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const BannerSlider = () => {
  const images = [
    "https://images.deliveryhero.io/image/adtech-display/campaigns/fp_bd/ec957268-ec8b-11f0-8136-0a03d4ad1092.jpeg?height=205&dpi=1",
    "https://images.deliveryhero.io/image/adtech-display/campaigns/fp_bd/df6eeb8e-eac7-11f0-8d1c-fe9992ee48d4.jpeg?height=205&dpi=1",
    "https://images.deliveryhero.io/image/adtech-display/campaigns/fp_bd/ec957268-ec8b-11f0-8136-0a03d4ad1092.jpeg?height=205&dpi=1",
    "https://images.deliveryhero.io/image/adtech-display/campaigns/fp_bd/ec957268-ec8b-11f0-8136-0a03d4ad1092.jpeg?height=205&dpi=1",
  ];
  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={10}
      navigation
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      loop={true}
      pagination={{ clickable: true }}
      modules={[Autoplay, Navigation, Pagination]}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`Slide ${index}`}
            className="max-w-[700px] w-full rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BannerSlider;
