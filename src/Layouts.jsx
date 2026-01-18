import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Navbar from "./Shared/Navbar/Navbar";
import Footer from "./Shared/Footer/Footer";

const Layouts = () => {
  const location = useLocation();

  return (
    <>
      <ScrollRestoration />

      {location.pathname !== "/ecommerce-site" &&
        location.pathname !== "/checkout" &&
        location.pathname !== "/faq" && <Navbar />}
      <Outlet />
      {location.pathname !== "/ecommerce-site" &&
        location.pathname !== "/checkout" && <Footer />}
    </>
  );
};

export default Layouts;
