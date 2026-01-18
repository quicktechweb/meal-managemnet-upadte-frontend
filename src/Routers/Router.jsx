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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/ecommercesite",
    element: <EcommerceSite />,
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
            element: 
            // <AdminProtectedRoute>
              <DashboardHome />
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
         
         
         
       
     
         
        
    
         
          
         
        
          

          // supplierpage 
          
         
    
    ],
  },

]);

export default router;
