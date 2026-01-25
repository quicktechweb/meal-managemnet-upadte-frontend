import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import VideoCard from "./VideoCard";

const VideoSlider = () => {
  const images = [
    "https://images.deliveryhero.io/image/adtech-display/campaigns/fp_bd/ec957268-ec8b-11f0-8136-0a03d4ad1092.jpeg?height=205&dpi=1",
    "https://images.deliveryhero.io/image/adtech-display/campaigns/fp_bd/df6eeb8e-eac7-11f0-8d1c-fe9992ee48d4.jpeg?height=205&dpi=1",
    "https://images.deliveryhero.io/image/adtech-display/campaigns/fp_bd/ec957268-ec8b-11f0-8136-0a03d4ad1092.jpeg?height=205&dpi=1",
    "https://images.deliveryhero.io/image/adtech-display/campaigns/fp_bd/ec957268-ec8b-11f0-8136-0a03d4ad1092.jpeg?height=205&dpi=1",
  ];
  return (
    <Swiper
      slidesPerView={1}
      navigation
      loop={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <VideoCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideoSlider;
