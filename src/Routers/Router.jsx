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
import MenuDetails from "../Pages/FrontEnd/MenuDetails/MenuDetails";
import SingleHallProfile from "../Pages/FrontEnd/Dashboard/UserDashboard/myprofile/SingleHallProfile";
import FullAccessRegistration from "../Auth/FullAccessRegistration/FullAccessRegistration";
import AuthLayout from "../AuthLayout";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import SingleMessProfile from "../Pages/FrontEnd/Dashboard/UserDashboard/myprofile/SingleMessProfile";
import ChangePassword from "../Pages/FrontEnd/Dashboard/UserDashboard/ChangePassword";
import PrivacyPolicy from "../Pages/FrontEnd/dynamicpage/PrivecyAndPolicy";
import TermAndCondition from "../Pages/FrontEnd/dynamicpage/TermAndCondition";
import AdminDashboard from "../Layout/AdminDashboard";
import AllSchedule from "../Pages/FrontEnd/admin/AllSchedule";
import AddSchedule from "../Pages/FrontEnd/admin/AddSchedule";
import UpdateSchedule from "../Pages/FrontEnd/admin/UpdateSchedule";
import NormalUserForm from "../Pages/FrontEnd/all-access-register/NormalUserForm";
import InstituteUserForm from "../Pages/FrontEnd/all-access-register/InstituteUserForm";
import Services from "../Pages/FrontEnd/admin/Services";
import AddUtilitiesService from "../Pages/FrontEnd/admin/AddUtilitiesService";
import UpdateUtilitiesService from "../Pages/FrontEnd/admin/UpdateUtilitiesService";
import Features from "../Pages/FrontEnd/admin/Features";
import UpdateFeature from "../Pages/FrontEnd/admin/UpdateFeature";
import AddFeature from "../Pages/FrontEnd/admin/AddFeature";
import Notices from "../Pages/FrontEnd/admin/Notices";
import AddNotice from "../Pages/FrontEnd/admin/AddNotice";
import UpdateNotice from "../Pages/FrontEnd/admin/UpdateNotice";
import LiveKitchenVideo from "../Pages/FrontEnd/admin/LiveKitchenVideo";
import AddLiveKitchenVideo from "../Pages/FrontEnd/admin/AddLiveKitchenVideo";
import UpdateLiveKitchenVideo from "../Pages/FrontEnd/admin/UpdateLiveKitchenVideo";
import Banner from "../Pages/FrontEnd/admin/Banner";
import AddBanner from "../Pages/FrontEnd/admin/AddBanner";
import UpdateBanner from "../Pages/FrontEnd/admin/UpdateBanner";
import ChooseUs from "../Pages/FrontEnd/admin/ChooseUs";
import AddChooseUsBanner from "../Pages/FrontEnd/admin/AddChooseUsBanner";
import UpdateChooseUsBanner from "../Pages/FrontEnd/admin/UpdateChooseUsBanner";
import AddChooseUsList from "../Pages/FrontEnd/admin/AddChooseUsList";
import Pages from "../Pages/FrontEnd/admin/Pages";
import AddPage from "../Pages/FrontEnd/admin/AddPage";
import UpdatePage from "../Pages/FrontEnd/admin/UpdatePage";
import AppSection from "../Pages/FrontEnd/admin/AppSection";
import AddAppSection from "../Pages/FrontEnd/admin/AddAppSection";

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

      {
        path: "/menu-details",
        element: <MenuDetails />,
      },
      {
        path: "/privecy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermAndCondition />,
      },
    ],
  },
  {
    path: "/auth/",
    element: <AuthLayout />,
    children: [
      {
        path: "all-access-register",
        element: <FullAccessRegistration />,
        children: [
          {
            path: "normal-user",
            element: <NormalUserForm />,
          },
          {
            path: "institute",
            element: <InstituteUserForm />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forget-password",
        element: <ForgotPassword />,
      },
      {
        path: "register",
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
        path: "/dashboard/hall-profile",
        element: <SingleHallProfile />,
      },
      {
        path: "/dashboard/mess-profile",
        element: <SingleMessProfile />,
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
        path: "/dashboard/change-password",
        element: <ChangePassword />,
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
  {
    path: "/admin/dashboard/",
    element: (
      //  <PrivateRoute>
      <AdminDashboard />
      //  </PrivateRoute>
    ),
    children: [
      {
        index: true,
        path: "home",
        element: <UserDashboardHome />,
      },
      {
        path: "all-Schedule",
        element: <AllSchedule />,
      },
      {
        path: "add-schedule",
        element: <AddSchedule />,
      },
      {
        path: `update-schedule/:id`,
        element: <UpdateSchedule />,
      },
      {
        path: "service",
        element: <Services />,
      },
      {
        path: "add-utilites-service",
        element: <AddUtilitiesService />,
      },
      {
        path: "update-utilities-service/:id",
        element: <UpdateUtilitiesService />,
      },

      {
        path: "features",
        element: <Features />,
      },

      {
        path: "add-feature",
        element: <AddFeature />,
      },
      {
        path: "update-feature/:id",
        element: <UpdateFeature />,
      },
      {
        path: "/admin/dashboard/notices",
        element: <Notices />,
      },

      {
        path: "/admin/dashboard/add-notice",
        element: <AddNotice />,
      },
      {
        path: "/admin/dashboard/update-notice/:id",
        element: <UpdateNotice />,
      },
      {
        path: "/admin/dashboard/live-kitchen",
        element: <LiveKitchenVideo />,
      },

      {
        path: "/admin/dashboard/add-live-kitchen",
        element: <AddLiveKitchenVideo />,
      },
      {
        path: "/admin/dashboard/update-live-kithen/:id",
        element: <UpdateLiveKitchenVideo />,
      },
      {
        path: "/admin/dashboard/banner",
        element: <Banner />,
      },
      {
        path: "/admin/dashboard/add-banner",
        element: <AddBanner />,
      },
      {
        path: "/admin/dashboard/update-banner/:id",
        element: <UpdateBanner />,
      },
      {
        path: "/admin/dashboard/choose-us",
        element: <ChooseUs />,
      },

      {
        path: "/admin/dashboard/add-choose-us-banner",
        element: <AddChooseUsBanner />,
      },
      {
        path: "/admin/dashboard/update-choose-us-banner/:id",
        element: <UpdateChooseUsBanner />,
      },
      {
        path: "/admin/dashboard/add-choose-us-list",
        element: <AddChooseUsList />,
      },
      {
        path: "/admin/dashboard/pages",
        element: <Pages />,
      },
      {
        path: "/admin/dashboard/add-page",
        element: <AddPage />,
      },
      {
        path: "/admin/dashboard/update-page/:id",
        element: <UpdatePage />,
      },
      {
        path: "/admin/dashboard/app-section",
        element: <AppSection />,
      },
      {
        path: "/admin/dashboard/add-app-section",
        element: <AddAppSection />,
      },
    ],
  },
]);

export default router;
