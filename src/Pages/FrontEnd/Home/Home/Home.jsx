import { Link } from "react-router-dom";
import { useCmsData } from "../../../../api/admin/admin.api";
import Categories from "../../../../Components/Categories";
import BannerSlider from "../../../../Components/ecommerce/BannerSlider";
import BannerSection from "../../../../Components/meal/BannerSection";
import FeaturesSection from "../../../../Components/meal/FeaturesSection";
import HowItWorksSection from "../../../../Components/meal/HowItWorksSection";
import MealLandingSection from "../../../../Components/meal/MealLandingSection";
import ReviewsSection from "../../../../Components/meal/ReviewSection";
import SearchBar from "../../../../Components/SearchBar";
import WalletProfileCard from "../../../../Components/WaletProfileCard";
import { categories2 } from "../../../../data/categoryData";
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
import HotDeals from "../../../../Components/ecommerce/HotDeals";
import TopSelling from "../../../../Components/ecommerce/TopSelling";
import PremiumProduct from "../../../../Components/ecommerce/PremiumProduct";
import LatestProduct from "../../../../Components/ecommerce/LatestProduct";
import Hero from "../../../../Components/food/Hero";
import HowItWorks from "../../../../Components/food/HowItWorks";
import Menu from "../../../../Components/food/Menu";
import AppDownload from "../../../../Components/food/AppDownload";
import Review from "../../../../Components/food/Review";
import SpecialOffers from "../../../../Components/food/SpecialOffers";
import RideHero from "../../../../Components/ride/RideHero";
import RideStats from "../../../../Components/ride/RideStat";
import RideAppPreview from "../../../../Components/ride/RideAppPreview";
import RideTestimonials from "../../../../Components/ride/RideTestimonials";
import RideFeatures from "../../../../Components/ride/RideFeatures";
import RideHowItWorks from "../../../../Components/ride/RideHowItWorks";
import VehicleOptions from "../../../../Components/ride/VehicleOptions";

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

      {selectedMenu === "e-commerce" && (
        <div className="px-5 mt-4">
          <SearchBar />
          <BannerSlider />
          <Categories categories2={categories2} />
          <HotDeals />
          <TopSelling />
          <PremiumProduct />
          <LatestProduct />
        </div>
      )}

      {selectedMenu === "food" && (
        <>
          <Hero />
          <SpecialOffers />
          <HowItWorks />
          <Menu />
          <AppDownload />
          <Review />
        </>
      )}

      {selectedMenu === "ride" && (
        <>
          <RideHero />
          <RideStats />
          <RideHowItWorks />
          <RideFeatures />
          <VehicleOptions />
          <RideAppPreview />
          <RideTestimonials />
        </>
      )}

      {selectedMenu !== "meal" &&
        selectedMenu !== "e-commerce" &&
        selectedMenu !== "food" &&
        selectedMenu !== "ride" && (
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
