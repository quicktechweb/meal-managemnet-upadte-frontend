import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAllPage } from "../../api/admin/admin.api";

const Footer = () => {
  const { data, isLoading } = useAllPage();

  console.log(data);

  return (
    <footer className="bg-white text-sm text-gray-700 pt-10">
      {/* --------------------------
          Desktop: original grid
      -------------------------- */}
      <div className="max-w-6xl mx-auto px-4 hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* QUICK LINKS */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-left text-gray-600">
            {data?.map((link) => (
              <Link
                to={`/page/${link?.slug}`}
                key={link?._id}
                className="hover:text-blue-600 block cursor-pointer transition"
              >
                {link?.title}
              </Link>
            ))}
          </ul>
        </div>

        {/* ALABADAN INFO */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">
            Alabadan
          </h4>
          <ul className="space-y-2 text-gray-600">
            {[
              "Download App",
              "Brands List",
              "Customer Reviews",
              "Return Policy",
              "Blog",
              "FAQ",
              "About Alabadan Credit",
              "Alabadan Affiliates",
            ].map((link) => (
              <li
                key={link}
                className="hover:text-blue-600 cursor-pointer transition"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* PAYMENT METHODS */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">
            Payment Methods
          </h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <img
                src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                alt="Paypal"
                className="w-6 h-6"
              />
              <span>Bkash</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://img.icons8.com/color/48/000000/visa.png"
                alt="Visa"
                className="w-6 h-6"
              />
              <span>Nagad</span>
            </div>
            <div className="flex items-center space-x-2">
              <img
                src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                alt="Mastercard"
                className="w-6 h-6"
              />
              <span>SSL </span>
            </div>
          </div>
        </div>

        {/* SHIPPING OPTIONS */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">
            Shipping Options
          </h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="bg-yellow-400 px-2 py-1 rounded text-white text-sm">
                🚀
              </span>
              <div>
                <p className="font-semibold">Express Shipping</p>
                <p className="text-xs text-gray-500">
                  Fast & Priority Delivery
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-gray-400 px-2 py-1 rounded text-white text-sm">
                📦
              </span>
              <div>
                <p className="font-semibold">Standard Shipping</p>
                <p className="text-xs text-gray-500">10+ Business Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* CITIES COVERED */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">
            Cities Covered
          </h4>
          <ul className="space-y-2 text-gray-600">
            {[
              "Dhaka",
              "Chittagong (Chattogram)",
              "Khulna",
              "Rajshahi",
              "Sylhet",
              "Barisal",
              "Mymensingh",
            ].map((city) => (
              <li key={city}>{city}</li>
            ))}
            <li className="text-blue-600 hover:underline cursor-pointer">
              View More Cities
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">
            24/7 Support
          </h4>
          <div className="border rounded-md p-3 bg-gray-50 mb-3 shadow-sm">
            <p className="font-semibold text-gray-700">📞 Customer Support</p>
            <p className="text-xs text-gray-500">
              Get instant support in your preferred language
            </p>
          </div>
          <div className="mb-3">
            <p className="font-semibold">📱 Hotline</p>
            <p className="text-gray-700">+880 1091 271236</p>
          </div>
          <div>
            <p className="font-semibold mb-2">📲 Download Alabadan App</p>
            <div className="flex flex-col space-y-3 xl:flex-row xl:space-x-3">
              <img
                src="https://sellularr.netlify.app/images/appstore.png"
                alt="Apple Store"
                className="h-8"
              />
              <img
                src="https://sellularr.netlify.app/images/playstore.png"
                alt="Play Store"
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------
          Mobile: 2 Part Stacked
      -------------------------- */}
      <div className="sm:hidden max-w-6xl mx-auto px-4 space-y-6">
        {/* Part 1 */}
        <div className="grid grid-cols-1 place-items-center sm:place-items-start gap-6">
          {/* Quick Links */}
          <div>
            <h4 className="text-gray-800 text-center sm:text-left font-semibold text-base mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-center text-gray-600">
              {[
                {
                  id: 1,
                  title: "About Us",
                  pathname: "#",
                },
                {
                  id: 2,
                  title: "Contact Us",
                  pathname: "/contact-us",
                },
                {
                  id: 3,
                  title: "Quotation Request",
                  pathname: "#",
                },

                {
                  id: 4,
                  title: "Intellectual Property",
                  pathname: "#",
                },
                {
                  id: 5,
                  title: "Sitemap",
                  pathname: "#",
                },
                {
                  id: 6,
                  title: "Track Order",
                  pathname: "#",
                },
                {
                  id: 7,
                  title: "Customs Tariffs & Fees",
                  pathname: "#",
                },
                {
                  id: 8,
                  title: "Shipping Policy",
                  pathname: "#",
                },
                {
                  id: 9,
                  title: "Micro Influencer",
                  pathname: "#",
                },
                {
                  id: 10,
                  title: "Alabadan Membership",
                  pathname: "#",
                },
                {
                  id: 11,
                  title: "Alabadan Warranty",
                  pathname: "#",
                },
                {
                  id: 12,
                  title: "Healthcare Disclaimer",
                  pathname: "#",
                },
              ].map((link) => (
                <Link
                  to={link?.pathname}
                  key={link?.id}
                  className="hover:text-blue-600 cursor-pointer transition"
                >
                  {link?.title}
                </Link>
              ))}
            </ul>
          </div>

          {/* Alabadan Info */}
          <div>
            <h4 className="text-gray-800 font-semibold text-center sm:text-left text-base mb-3">
              Alabadan
            </h4>
            <ul className="space-y-2 text-center sm:text-left text-gray-600">
              {[
                "Download App",
                "Brands List",
                "Customer Reviews",
                "Return Policy",
                "Blog",
                "FAQ",
                "About Alabadan Credit",
                "Alabadan Affiliates",
              ].map((link) => (
                <li
                  key={link}
                  className="hover:text-blue-600 cursor-pointer transition"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="text-gray-800 font-semibold text-center text-base mb-3">
              Payment Methods
            </h4>
            <div className=" flex justify-center items-center gap-2.5">
              <div className="flex items-center space-x-2">
                <img
                  src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
                  alt="Paypal"
                  className="w-6 h-6"
                />
                <span>PayPal</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="https://img.icons8.com/color/48/000000/visa.png"
                  alt="Visa"
                  className="w-6 h-6"
                />
                <span>Visa</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="https://img.icons8.com/color/48/000000/mastercard-logo.png"
                  alt="Mastercard"
                  className="w-6 h-6"
                />
                <span>Mastercard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2 */}
        <div className="grid grid-cols-1 gap-6">
          {/* Shipping Options */}
          <div>
            <h4 className="text-gray-800 font-semibold text-center text-base mb-3">
              Shipping Options
            </h4>
            <div className="flex items-center gap-1.5">
              <div className="flex items-start space-x-1">
                <span className="bg-yellow-400 px-2 py-1 rounded text-white text-sm">
                  🚀
                </span>
                <div>
                  <p className="font-semibold text-xs ">Express Shipping</p>
                  <p className="text-[10px] text-gray-500">
                    Fast & Priority Delivery
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-1">
                <span className="bg-gray-400 px-2 py-1 rounded text-white text-sm">
                  📦
                </span>
                <div>
                  <p className="font-semibold text-xs ">Standard Shipping</p>
                  <p className="text-[10px] text-gray-500">10+ Business Days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cities Covered */}
          <div>
            <h4 className="text-gray-800 font-semibold text-center sm:text-left text-base mb-3">
              Cities Covered
            </h4>
            <ul className="flex items-center flex-col gap-1.5 text-gray-600">
              {[
                "Dhaka",
                "Chittagong (Chattogram)",
                "Khulna",
                "Rajshahi",
                "Sylhet",
                "Barisal",
                "Mymensingh",
              ].map((city) => (
                <li key={city}>{city}</li>
              ))}
              <li className="text-blue-600 hover:underline cursor-pointer">
                View More Cities
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-800 font-semibold text-center sm:text-left text-base   mb-1.5 lg:mb-3">
              24/7 Support
            </h4>
            <div className="border rounded-md p-3 bg-gray-50 mb-3 text-center shadow-sm">
              <p className="font-semibold text-gray-700">📞 Customer Support</p>
              <p className="text-xs text-gray-500">
                Get instant support in your preferred language
              </p>
            </div>
            <div className="mb-3 text-center">
              <p className="font-semibold">📱 Hotline</p>
              <p className="text-gray-700">+880 1091 271236</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-semibold mb-2">📲 Download Alabadan App</p>
              <div className="flex space-x-3">
                <img
                  src="https://sellularr.netlify.app/images/appstore.png"
                  alt="Apple Store"
                  className="h-8 shrink-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------------
          Certifications & Bottom Bar
      -------------------------- */}
      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0">
          <img
            src="https://sellularr.netlify.app/images/t1.svg"
            alt="PCI DSS"
            className="h-8"
          />
          <img
            src="https://sellularr.netlify.app/images/t2.webp"
            alt="ISO 27001"
            className="h-8"
          />
          <span className="text-gray-600 text-sm">
            ISO 27001:2022 Certified
          </span>
        </div>
        <div className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Alabadan. Designed & Developed by
          <a href="#" className="text-blue-600 hover:underline">
            QuickTech IT
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 space-y-3 sm:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <span>Follow Us:</span>
          <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
          <FaInstagram className="hover:text-pink-500 cursor-pointer" />
          <FaYoutube className="hover:text-red-600 cursor-pointer" />
          <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
