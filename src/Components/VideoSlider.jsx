import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import VideoCard from "./VideoCard";

const VideoSlider = ({ data, isLoading }) => {
  const skeletonArray = Array(3).fill(0);

  return (
    <Swiper
      slidesPerView={1}
      navigation
      loop={true}
      pagination={{ clickable: true }}
      modules={[Navigation, Pagination]}
    >
      {isLoading
        ? skeletonArray.map((_, index) => (
            <SwiperSlide key={index}>
              <div className="h-48 bg-slate-200 animate-pulse rounded-lg" />
            </SwiperSlide>
          ))
        : data?.map((src, index) => (
            <SwiperSlide key={index}>
              <VideoCard src={src} />
            </SwiperSlide>
          ))}
    </Swiper>
  );
};

export default VideoSlider;
