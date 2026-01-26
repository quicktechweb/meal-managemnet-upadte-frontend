import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/FrontEnd/Home/Home/Home";
import Layouts from "../Layouts";
import ErrorPage from "../Shared/ErrorPage/ErrorPage/ErrorPage";
import Dashboard from "../Pages/FrontEnd/Dashboard/Dashboard";
import DashboardHome from "../Pages/FrontEnd/Dashboard/DashboardHome/DashboardHome";
import MealManagementPart from "../Pages/FrontEnd/Dashboard/UserDashboard/MealManagementPart/MealManagementPart";
import UserOrder from "../Pages/FrontEnd/Dashboard/UserDashboard/UserOrder/UserOrder";
import Login from "../Shared/Auth/Login/Login";
import Registration from "../Shared/Auth/Registration/Registration";
import EcommerceSite from "../Pages/FrontEnd/EcommerceSite/EcommerceSite";
import EcommerceLayout from "../EcommerceLayout";
import CheckoutPage from "../Pages/FrontEnd/checkout/CheckoutPage";
import Faq from "../Pages/FrontEnd/faq/Faq";
import ContactPage from "../Pages/FrontEnd/contact-us/ContactPage";
import UserForm from "../Components/auth/UserForm";
import MessForm from "../Components/auth/MessForm";
import MyProfile from "../Pages/FrontEnd/Dashboard/UserDashboard/myprofile/MyProfile";
import Restaurant from "../Pages/FrontEnd/Dashboard/Restaurant/Restaurent";
import RestaurantDetails from "../Pages/FrontEnd/Dashboard/Restaurant/RestaurantDetails";
import Foods from "../Pages/FrontEnd/Dashboard/Foods/Foods";
import FavouriteItem from "../Pages/FrontEnd/Dashboard/Favourite/FavouriteItem";
import FavouriteCanteen from "../Pages/FrontEnd/Dashboard/Favourite/FavouriteCanteen";
import MessOrder from "../Pages/FrontEnd/Dashboard/UserDashboard/UserOrder/MessOrder";
import WalletManagement from "../Pages/FrontEnd/Dashboard/UserDashboard/walletmanagement/WalletManagement";
import InstituteProfile from "../Pages/FrontEnd/Dashboard/UserDashboard/myprofile/InstituteProfile";
import UserDashboardHome from "../Pages/FrontEnd/Dashboard/DashboardHome/UserDashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    errorElement: (
      <>
        <ErrorPage />
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
        children: [
          {
            path: "user",
            element: <UserForm />,
          },
          {
            path: "mess",
            element: <MessForm />,
          },
        ],
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },

      {
        path: "/faq",
        element: <Faq />,
      },

      {
        path: "/contact-us",
        element: <ContactPage />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      //  <PrivateRoute>
      <Dashboard />
      //  </PrivateRoute>
    ),
    children: [
      {
        index: true,
        path: "/dashboard/dashboard",
        element: (
          // <AdminProtectedRoute>
          // <DashboardHome />
          <UserDashboardHome />
        ),
        // </AdminProtectedRoute>
      },
      {
        path: "/dashboard/mealmanagement",
        element: <MealManagementPart />,
      },
      {
        path: "/dashboard/userOrder",
        element: <UserOrder />,
      },
      {
        path: "/dashboard/messOrder",
        element: <MessOrder />,
      },
      {
        path: "/dashboard/profile",
        element: <MyProfile />,
      },
      {
        path: "/dashboard/institute-profile",
        element: <InstituteProfile />,
      },
      {
        path: "/dashboard/canteens",
        element: <Restaurant />,
      },
      {
        path: "/dashboard/canteens/:id",
        element: <RestaurantDetails />,
      },

      {
        path: "/dashboard/foods",
        element: <Foods />,
      },

      {
        path: "/dashboard/favourite-item",
        element: <FavouriteItem />,
      },

      {
        path: "/dashboard/favourite-canteen",
        element: <FavouriteCanteen />,
      },

      {
        path: "/dashboard/wallet-management",
        element: <WalletManagement />,
      },

      // supplierpage
    ],
  },

  {
    path: "/ecommercesite",
    element: <EcommerceLayout />,
    children: [
      {
        path: "/ecommercesite",
        element: <EcommerceSite />,
      },
    ],
  },
]);

export default router;
