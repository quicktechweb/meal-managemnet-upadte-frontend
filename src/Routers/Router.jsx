import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import LoginPage from "../Auth/Login/Login";
import Registration from "../Auth/Registration/Registration";
import Home from "../Pages/FrontEnd/Home/Home/Home";
import Layouts from "../Layouts";
import ErrorPage from "../Shared/ErrorPage/ErrorPage/ErrorPage";
import ProductDetailsPage from "../Pages/FrontEnd/ProductPage/ProductDetailsPage/ProductDetailsPage";
import AllTopSelling from "../Pages/FrontEnd/Home/TopSelling/AllTopSelling/AllTopSelling";
import AllPremiumProduct from "../Pages/FrontEnd/Home/PremimumProduct/AllPremiumProduct/AllPremiumProduct";
import AllLatestDeals from "../Pages/FrontEnd/Home/LatestDeals/AllLatestDeals/AllLatestDeals";
import AllLatestProduct from "../Pages/FrontEnd/Home/LatestProduct/AllLatestProduct/AllLatestProduct";
import OrderReview from "../Pages/FrontEnd/OrderReview/OrderReview";
import Payment from "../Pages/FrontEnd/Payment/Payment";
import WinnerStatics from "../Pages/FrontEnd/Home/WinnerStatics/WinnerStatics";


const router = createBrowserRouter([


 {
    path: "/",
    element: <Layouts />,
    errorElement: (
      <>
       <ErrorPage/>
      </>
    ),
    children: [
      
      
      {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/productdetails",
    element: <ProductDetailsPage />,
  },
  {
    path: "/alltopselling",
    element: <AllTopSelling />,
  },
  {
    path: "/allpremiumproduct",
    element: <AllPremiumProduct />,
  },
  {
    path: "/alllatestdeals",
    element: <AllLatestDeals />,
  },
  {
    path: "/alllatestproducts",
    element: <AllLatestProduct />,
  },
  {
    path: "/orderreview",
    element: <OrderReview />,
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/winnerstatics",
    element: <WinnerStatics />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
 
  
  
  
  
  
 
   
    
     
     
     

        ],
      },

]);

export default router;
