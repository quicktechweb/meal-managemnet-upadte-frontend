import { useCmsData } from "../../../../api/admin/admin.api";
import WalletProfileCard from "../../../../Components/WaletProfileCard";
import Bannerparts from "../Bannerparts/Bannerparts";
import DownloadApp from "../DownloadApp/DownloadApp";
import Features from "../Features/Features";
import LearningManagement from "../LearningManagemnet/LearningManagement";
import MealLanding from "../MealLanding/MealLanding";
import ProcessSection from "../ProcessSection/ProcessSection";
import EcommerceLanding from "./EcommerceLanding/EcommerceLanding";
import HomeLogin from "./HomeRegistration/HomeRegistration";
import RideSharing from "./RideSharing/RideSharing";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  const { data, isLoading } = useCmsData();

  console.log(data);

  return (
    <div>
      <Bannerparts bannerData={data?.banner} isLoading={isLoading} />

      <HomeLogin />

      <WalletProfileCard />

      <Features
        chooseusData={data?.chooseUs}
        chooseImage={data?.chooseImage}
        isLoading={isLoading}
      />
      <ProcessSection />
      <MealLanding />
      {/* <LearningManagement /> */}
      <EcommerceLanding />
      {/* <RideSharing /> */}
      <DownloadApp />
      <Testimonial />

      {/* <HomeSlider/> */}
      {/* <TopSelling/> */}
      {/* <LatestProduct/> */}
      {/* <ProductCarousel/> */}
      {/* <PremiumProduct/> */}
      {/* <TopRatedProduct/> */}
      {/* <LatestDeals/> */}
      {/* <CuponPart/> */}
      {/* <Brands/> */}
    </div>
  );
};

export default Home;
