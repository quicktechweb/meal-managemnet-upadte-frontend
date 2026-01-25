import React, { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

const VideoCard = () => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="mx-auto  rounded-2xl shadow-xl overflow-hidden">
      {/* Video Section */}
      <div className="relative group">
        <video
          ref={videoRef}
          className="w-full h-48 md:h-60 lg:h-80 object-cover"
          poster="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        >
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay Button */}
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
            {playing ? (
              <Pause className="text-black" size={28} />
            ) : (
              <Play className="text-black ml-1" size={28} />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
