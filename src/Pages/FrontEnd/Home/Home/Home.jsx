import { useCmsData } from "../../../../api/admin/admin.api";
import BannerSection from "../../../../Components/meal/BannerSection";
import FeaturesSection from "../../../../Components/meal/FeaturesSection";
import HowItWorksSection from "../../../../Components/meal/HowItWorksSection";
import MealLandingSection from "../../../../Components/meal/MealLandingSection";
import ReviewsSection from "../../../../Components/meal/ReviewSection";
import WalletProfileCard from "../../../../Components/WaletProfileCard";
import { useLayoutSwitch } from "../../../../providers/LayoutSwitchProvider";
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
  const { selectedMenu } = useLayoutSwitch();

  const { data, isLoading } = useCmsData();

  return (
    <>
      {selectedMenu === "meal" && (
        <>
          <BannerSection />
          <FeaturesSection />
          <HowItWorksSection />
          <MealLandingSection />
          <ReviewsSection />
        </>
      )}

      {selectedMenu !== "meal" && (
        <>
          {" "}
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
          <EcommerceLanding />
          <DownloadApp appData={data?.app} isLoading={isLoading} />
          <Testimonial />
          {/* <RideSharing /> */}
          {/* <LearningManagement /> */}
          {/* <HomeSlider/> */}
          {/* <TopSelling/> */}
          {/* <LatestProduct/> */}
          {/* <ProductCarousel/> */}
          {/* <PremiumProduct/> */}
          {/* <TopRatedProduct/> */}
          {/* <LatestDeals/> */}
          {/* <CuponPart/> */}
          {/* <Brands/> */}
        </>
      )}
    </>
  );
};

export default Home;
