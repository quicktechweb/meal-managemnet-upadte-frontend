import React, { useState } from "react";
import { useAllPackage } from "../../api/admin/admin.api";

const PackageSchedule = () => {
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  const { data: packages, isLoading } = useAllPackage();

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedPackageItem, setSelectedPackageItem] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const parsedItems = selectedPackageItem
    ? JSON.parse(selectedPackageItem)
    : [];

  const singlePackage = packages?.filter((pkg) => pkg?.day === selectedDay);

  const singlePackageItem = singlePackage?.find(
    (spkg) => spkg?.package_title === selectedPackage,
  );

  const groupedItems = [
    {
      label: "Items",
      options: singlePackageItem?.items || [],
    },
    ...(singlePackageItem?.alternative_items || []).map((group, index) => ({
      label: `Alternative Items ${index + 1}`,
      options: group,
    })),
  ];

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    setSelectedPackage("");
    setSelectedPackageItem("");
  };

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
    setSelectedPackageItem("");
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Day */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Day
            </label>
            <select
              value={selectedDay}
              onChange={handleDayChange}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Day</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Package */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Package
            </label>
            <select
              value={selectedPackage}
              onChange={handlePackageChange}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Package</option>
              {singlePackage?.map((pkg) => (
                <option key={pkg?.package_title} value={pkg?.package_title}>
                  {pkg?.package_title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Package Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Package Price
            </label>
            <input
              readOnly
              value={
                singlePackageItem ? `৳${singlePackageItem.package_price}` : ""
              }
              placeholder="Price will appear here"
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm bg-gray-50"
              type="text"
            />
          </div>

          {/* Package Item */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Package Item
            </label>
            <select
              value={selectedPackageItem}
              onChange={(e) => setSelectedPackageItem(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Package Item</option>
              {groupedItems.map((group, gIdx) =>
                group.options.length > 0 ? (
                  <option key={gIdx} value={JSON.stringify(group.options)}>
                    {group.label} —{" "}
                    {group.options.map((item) => item?.title).join(", ")}
                  </option>
                ) : null,
              )}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            type="button"
            className="flex-1 cursor-pointer bg-orange-600 text-white py-3 font-bold rounded-lg hover:bg-orange-700 transition"
          >
            Create Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageSchedule;
