import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white  text-sm text-gray-700 pt-10">
      {/* Top Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* QUICK LINKS */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">Quick Links</h4>
         
          <ul className="space-y-2 text-gray-600">
            {[
              "About Us", "Contact Us", "Quotation Request",
              "Intellectual Property", "Sitemap", "Track Order",
              "Customs Tariffs & Fees", "Shipping Policy",
              "Micro Influencer", "Sellular Membership",
              "Sellular Warranty", "Healthcare Disclaimer"
            ].map(link => (
              <li key={link} className="hover:text-blue-600 cursor-pointer transition">{link}</li>
            ))}
          </ul>
        </div>

        {/* SELLULAR INFO */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">Sellular</h4>
          <ul className="space-y-2 text-gray-600">
            {[
              "Download App", "Brands List", "Customer Reviews",
              "Return Policy", "Blog", "FAQ",
              "About Scredit", "Sellular Affiliates"
            ].map(link => (
              <li key={link} className="hover:text-blue-600 cursor-pointer transition">{link}</li>
            ))}
          </ul>
        </div>

        {/* PAYMENT METHODS */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">Payment</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="Paypal" className="w-6 h-6" />
              <span>Paypal</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="w-6 h-6" />
              <span>Visa</span>
            </div>
            <div className="flex items-center space-x-2">
              <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" className="w-6 h-6" />
              <span>Master</span>
            </div>
          </div>
        </div>

        {/* SHIPPING OPTIONS */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">Shipping</h4>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="bg-yellow-400 px-2 py-1 rounded text-white font-semibold text-sm">🚀</span>
              <div>
                <p className="font-semibold">Express Shipping</p>
                <p className="text-xs text-gray-500">Fast Delivery</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="bg-gray-400 px-2 py-1 rounded text-white font-semibold text-sm">📦</span>
              <div>
                <p className="font-semibold">Standard Shipping</p>
                <p className="text-xs text-gray-500">10+ Business Days</p>
              </div>
            </div>
          </div>
        </div>

        {/* CITIES COVERED */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">Cities Covered</h4>
          <ul className="space-y-2 text-gray-600">
            {[
              "Dhaka", "Chittagong (Chattogram)", "Khulna",
              "Rajshahi", "Sylhet", "Barisal (Bagerhat)", "Mymensingh"
            ].map(city => (
              <li key={city}>{city}</li>
            ))}
            <li className="text-blue-600 hover:underline cursor-pointer">View More Cities</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-gray-800 font-semibold text-base mb-4">24/7 Support</h4>
          <div className="border rounded-md p-3 bg-gray-50 mb-3 shadow-sm">
            <p className="font-semibold text-gray-700">📞 Customer Support</p>
            <p className="text-xs text-gray-500">
              Get responses in your native language
            </p>
          </div>
          <div className="mb-3">
            <p className="font-semibold">📱 Services:</p>
            <p className="text-gray-700">+8801091271236</p>
          </div>
          <div>
            <p className="font-semibold mb-2">📲 Download our App</p>
            <div className="flex space-x-3">
              <img src="https://sellularr.netlify.app/images/appstore.png" alt="Apple" className="h-8" />
              <img src="https://sellularr.netlify.app/images/playstore.png" alt="Google Play" className="h-8 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Certifications & Copyright */}
      <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <img src="https://sellularr.netlify.app/images/t1.svg" alt="PCI DSS" className="h-8" />
          <img src="https://sellularr.netlify.app/images/t2.webp" alt="ISO 27001" className="h-8" />
          <span className="text-gray-600 text-sm">27001:2022</span>
        </div>
        <div className="text-gray-500 text-sm">
          © 2025 Lucky Shop | Designed & Developed by{" "}
          <a href="#" className="text-blue-600 hover:underline">QuickTech IT</a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-6 pt-4 border-t flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="#" className="hover:underline">Terms & Conditions</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">About Us</a>
          <a href="#" className="hover:underline">Contact Us</a>
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
