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
import UpdateAppSection from "../Pages/FrontEnd/admin/UpdateAppSection";
import FaqAdmin from "../Pages/FrontEnd/admin/FaqAdmin";
import AddFaq from "../Pages/FrontEnd/admin/AddFaq";
import UpdateFaq from "../Pages/FrontEnd/admin/UpdateFaq";
import DynamicPage from "../Pages/FrontEnd/dynamicpage/DynamicPage";
import WebsiteSettings from "../Pages/FrontEnd/admin/WebsiteSettings";
import SelectRecovery from "../Auth/ForgotPassword/SelectRecovery";
import NewPassword from "../Auth/ForgotPassword/NewPassword";
import EnterCode from "../Auth/ForgotPassword/EnterCode";
import SinglePendingInstituteUser from "../Pages/FrontEnd/admin/SinglePendingInstituteUser";
import InstituteLayout from "../Layout/InstituteLayout";
import UserSettings from "../Pages/FrontEnd/institute/admin/UserSettings";
import Institutes from "../Pages/FrontEnd/admin/Institutes";
import InstituteUser from "../Pages/FrontEnd/institute/admin/InstituteUser";
import InstituteUserDetails from "../Pages/FrontEnd/institute/admin/InstituteUserDetails";
import InstituteAdminMealManagement from "../Pages/FrontEnd/institute/admin/InstituteAdminMealManagement";
import InstituteAdminProfile from "../Pages/FrontEnd/institute/admin/InstituteAdminProfile";
import Items from "../Pages/FrontEnd/admin/Items";
import AddItem from "../Pages/FrontEnd/admin/AddItem";
import UpdateItem from "../Pages/FrontEnd/admin/UpdateItem";
import InstituteAdminProfileUpdate from "../Pages/FrontEnd/institute/admin/InstituteAdminProfileUpdate";
import InstituteAdminServiceUpdate from "../Pages/FrontEnd/institute/admin/InstituteAdminServiceUpdate";
import HomeReview from "../Pages/FrontEnd/admin/HomeReview";
import AddPackage from "../Components/admin/AddPackage";
import Packages from "../Pages/FrontEnd/admin/Packages";
import UpdatePackage from "../Pages/FrontEnd/admin/UpdatePackage";
import MainLayout from "../Layout/MainLayout";
import HomePage from "../Pages/FrontEnd/Home/Home/HomePage";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardPage from "../Pages/dashboard/DashboardPage";
import UsersPage from "../Pages/dashboard/UsersPage";
import RolesPage from "../Pages/dashboard/RolesPage";
import MealOrderPage from "../Pages/dashboard/MealOrderPage";
import ServicePage from "../Pages/dashboard/ServicePage";
import RoutinePage from "../Pages/dashboard/RoutinePage";
import SettingsPage from "../Pages/dashboard/SettingsPage";
import BalancePage from "../Pages/dashboard/BalancePage";
import AddBalance from "../Pages/dashboard/AddBalance";
import InventoryPage from "../Pages/dashboard/InventoryPage";
import InventoryAddProduct from "../Pages/dashboard/InventoryAddProduct";
import InventoryPurchase from "../Pages/dashboard/InventoryPurchase";
import InventoryDayWise from "../Pages/dashboard/InventoryDayWise";
import InventoryPurchaseProductLists from "../Pages/dashboard/InventoryPurchaseProductLists";
import InventoryAllWise from "../Pages/dashboard/InventoryAllWise";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <>
        <ErrorPage />
      </>
    ),
    children: [
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
        path: "/faq",
        element: <Faq />,
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
        path: "select-recovery",
        element: <SelectRecovery />,
      },
      {
        path: "code-verify",
        element: <EnterCode />,
      },
      {
        path: "new-password",
        element: <NewPassword />,
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
    path: "/institute/",
    element: <InstituteLayout />,
    children: [
      // {
      //   path: "dashboard/permission-settings",
      //   element: <UserSettings />,
      // },
      {
        path: "dashboard/meal-management",
        element: <InstituteAdminMealManagement />,
      },
      // {
      //   path: "dashboard/user-institute",
      //   element: <InstituteUser />,
      // },
      // {
      //   path: "dashboard/single-user-institute/:id",
      //   element: <InstituteUserDetails />,
      // },
      // {
      //   path: "dashboard/institute",
      //   element: <InstituteAdminProfile />,
      // },
      {
        path: "dashboard/profile-update/:id",
        element: <InstituteAdminProfileUpdate />,
      },
      {
        path: "dashboard/service-update/:id",
        element: <InstituteAdminServiceUpdate />,
      },
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
        path: "notices",
        element: <Notices />,
      },

      {
        path: "add-notice",
        element: <AddNotice />,
      },
      {
        path: "update-notice/:id",
        element: <UpdateNotice />,
      },
      {
        path: "live-kitchen",
        element: <LiveKitchenVideo />,
      },

      {
        path: "add-live-kitchen",
        element: <AddLiveKitchenVideo />,
      },
      {
        path: "update-live-kithen/:id",
        element: <UpdateLiveKitchenVideo />,
      },
      {
        path: "banner",
        element: <Banner />,
      },
      {
        path: "add-banner",
        element: <AddBanner />,
      },
      {
        path: "update-banner/:id",
        element: <UpdateBanner />,
      },
      {
        path: "choose-us",
        element: <ChooseUs />,
      },

      {
        path: "add-choose-us-banner",
        element: <AddChooseUsBanner />,
      },
      {
        path: "update-choose-us-banner/:id",
        element: <UpdateChooseUsBanner />,
      },
      {
        path: "add-choose-us-list",
        element: <AddChooseUsList />,
      },
      {
        path: "pages",
        element: <Pages />,
      },
      {
        path: "add-page",
        element: <AddPage />,
      },
      {
        path: "update-page/:id",
        element: <UpdatePage />,
      },
      {
        path: "app-section",
        element: <AppSection />,
      },
      {
        path: "add-app-section",
        element: <AddAppSection />,
      },
      {
        path: "update-app-section/:id",
        element: <UpdateAppSection />,
      },
      {
        path: "faq",
        element: <FaqAdmin />,
      },
      {
        path: "add-faq",
        element: <AddFaq />,
      },
      {
        path: "update-faq/:id",
        element: <UpdateFaq />,
      },
      {
        path: "website-settings",
        element: <WebsiteSettings />,
      },
      {
        path: "institute",
        element: <Institutes />,
      },
      {
        path: "institute-user/:id",
        element: <SinglePendingInstituteUser />,
      },

      {
        path: "item",
        element: <Items />,
      },
      {
        path: "add-item",
        element: <AddItem />,
      },
      {
        path: "update-item/:id",
        element: <UpdateItem />,
      },
      {
        path: "home-review",
        element: <HomeReview />,
      },
      {
        path: "add-package",
        element: <AddPackage />,
      },
      {
        path: "packages",
        element: <Packages />,
      },
      {
        path: "update-package/:id",
        element: <UpdatePackage />,
      },
    ],
  },

  {
    path: "/dashboards",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboards",
        element: <DashboardPage />,
      },
      {
        path: "/dashboards/users",
        element: <InstituteUser />,
      },
      {
        path: "/dashboards/single-user-institute/:id",
        element: <InstituteUserDetails />,
      },
      {
        path: "/dashboards/role",
        element: <UserSettings />,
      },
      {
        path: "/dashboards/meal-order",
        element: <MealOrderPage />,
      },
      {
        path: "/dashboards/my-services",
        element: <ServicePage />,
      },
      {
        path: "/dashboards/routines",
        element: <InstituteAdminMealManagement />,
      },
      {
        path: "/dashboards/profile",
        element: <InstituteAdminProfile />,
      },
      {
        path: "/dashboards/balance",
        element: <BalancePage />,
      },
      {
        path: "/dashboards/add-balance",
        element: <AddBalance />,
      },
      {
        path: "/dashboards/inventory-add-product",
        element: <InventoryAddProduct />,
      },
      {
        path: "/dashboards/inventory-purchase",
        element: <InventoryPurchase />,
      },
      {
        path: "/dashboards/inventory-purchase-list",
        element: <InventoryPurchaseProductLists />,
      },
      {
        path: "/dashboards/inventory-day-wise",
        element: <InventoryDayWise />,
      },
      {
        path: "/dashboards/inventory-all-wise",
        element: <InventoryAllWise />,
      },
    ],
  },
]);

export default router;
