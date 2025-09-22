import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CreateListing = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 text-gray-800 mt-16 p-4 gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-[0_2px_18px_rgba(0,0,0,0.15)] p-5 space-y-4 rounded-md">
        <h1 className="text-2xl font-bold mt-2">Create new listing</h1>

        <div className="space-y-1 text-sm mt-4">
          <SidebarItem active icon="🏷️" text="Choose listing type" />
          <SidebarItem icon="📝" text="Your listings" subText="1 active" />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-0 md:p-8">
        <h2 className="text-2xl font-semibold mb-6 md:mb-8">Choose listing type</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link to="/productitemsale">
            <OptionCard
              icon="🛍️"
              title="Item for sale"
              desc="Create a single listing for one or more items to sell."
            />
          </Link>
          <OptionCard
            icon="🚗"
            title="Vehicle for sale"
            desc="Sell a car, van or other type of vehicle."
          />
          <OptionCard
            icon="🏠"
            title="Property for sale or rent"
            desc="List a house or flat for sale or rent."
          />
        </div>
      </main>
    </div>
  );
};

// Sidebar item
const SidebarItem = ({ icon, text, active, subText }) => (
  <div
    className={`flex items-center justify-between p-2 rounded cursor-pointer ${
      active ? "bg-blue-100 text-blue-600 font-semibold" : "hover:bg-gray-100"
    }`}
  >
    <div className="flex items-center gap-2">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
          active ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        {icon}
      </div>
      <span>{text}</span>
    </div>
    {subText && <span className="text-xs text-gray-500">{subText}</span>}
  </div>
);

SidebarItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
  subText: PropTypes.string,
};

SidebarItem.defaultProps = {
  active: false,
  subText: "",
};

// Main option card
const OptionCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md p-6 text-center cursor-pointer transition">
    <div className="flex justify-center mb-4">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
        {icon}
      </div>
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600 mt-2">{desc}</p>
  </div>
);

OptionCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default CreateListing;
