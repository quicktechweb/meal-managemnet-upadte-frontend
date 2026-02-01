import React from "react";
import VideoSlider from "./VideoSlider";

const LiveKitchen = () => {
  return (
    <div className="live-kitchen-container max-w-[300px] md:max-w-[650px] xl:max-w-[1000px] w-full mx-auto">
      <h4 className="text-lg font-semibold mb-3">Live Kitchen</h4>
      <VideoSlider />
    </div>
  );
};

export default LiveKitchen;
