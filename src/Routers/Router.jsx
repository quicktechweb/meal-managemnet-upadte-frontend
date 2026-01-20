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
        path: "/dashboard",
        element: (
          // <AdminProtectedRoute>
          <DashboardHome />
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
        path: "/dashboard/profile",
        element: <MyProfile />,
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
