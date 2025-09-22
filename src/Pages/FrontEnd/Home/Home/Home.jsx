import Brands from "../Brands/Brands";
import HomeSlider from "../HomeSlider/HomeSlider";
import LatestDeals from "../LatestDeals/LatestDeals";
import LatestProduct from "../LatestProduct/LatestProduct";
import PremiumProduct from "../PremimumProduct/PremimumProduct";
import ProductCarousel from "../ProductCarousel/ProductCarousel";
import TopRatedProduct from "../TopRatedProduct/TopRatedProduct";
import TopSelling from "../TopSelling/TopSelling";
import CuponPart from "./CuponPart/CuponPart";


const Home = () => {
  return (
    <div>
     <HomeSlider/>
     <TopSelling/>
     <LatestProduct/>
     <ProductCarousel/>
     <PremiumProduct/>
     <TopRatedProduct/>
     <LatestDeals/>
     <CuponPart/>
     <Brands/>
    </div>
  );
};

export default Home;
