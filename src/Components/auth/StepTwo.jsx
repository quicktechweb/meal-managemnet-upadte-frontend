import React, { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import {
  useAllKitchen,
  useAllService,
  useGetFeature,
  useUtilitiesService,
} from "../../api/admin/admin.api";

const options = [
  { label: "User", path: true },
  { label: "Client", path: false },
];

const StepTwo = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const [selectedOption, setSelectedOption] = useState(options[0]);

  console.log(selectedOption);

  const [kitchenType, setKitchenType] = useState(null);

  const [studentService, setStudentService] = useState(null);
  const [utilityBills, setUtilityBills] = useState([]);
  const [serviceFeatures, setServiceFeatures] = useState([]);

  const { data: kitchenData } = useAllKitchen();
  const { data: services } = useAllService();
  const { data: allUtilities } = useUtilitiesService();
  const { data: getFeature } = useGetFeature();

  const singleUtilities = allUtilities?.filter(
    (u) => u?.kitchen?.title === kitchenType?.title,
  );
  const singleFeature = getFeature?.filter(
    (f) => f?.kitchen?.title === kitchenType?.title,
  );

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleUtilityBill = (bill) => {
    setUtilityBills((prev) =>
      prev.find((b) => b._id === bill._id)
        ? prev.filter((b) => b._id !== bill._id)
        : [...prev, bill],
    );
  };

  const handleFeature = (feature) => {
    setServiceFeatures((prev) =>
      prev.find((f) => f._id === feature._id)
        ? prev.filter((f) => f._id !== feature._id)
        : [...prev, feature],
    );
  };

  const totalUtilityPrice = utilityBills?.reduce(
    (total, bill) => total + +bill.price,
    0,
  );

  const totalServiceFeaturePrice = serviceFeatures?.reduce(
    (total, feature) => total + +feature?.price,
    0,
  );

  const totalPrice = totalUtilityPrice + totalServiceFeaturePrice;

  const SelectedBadge = ({ item, onRemove }) => (
    <span className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium border border-orange-200">
      {item.name || item.title || item.label}
      <X
        size={14}
        className="cursor-pointer hover:text-orange-900"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item);
        }}
      />
    </span>
  );

  return (
    <div className="flex flex-col gap-8 p-4">
      {/* 1. Option Dropdown */}
      <div className="flex flex-col justify-center items-center gap-2">
        <label className="text-sm font-semibold text-slate-700">
          User/Client Type
        </label>
        <div className="relative w-[250px]">
          <div
            className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
            onClick={() => toggleDropdown("option")}
          >
            <span>{selectedOption.label}</span>
            <ChevronDown
              className={`transition-transform ${activeDropdown === "option" ? "rotate-180" : ""}`}
              size={18}
            />
          </div>
          {activeDropdown === "option" && (
            <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50">
              {options.map((opt) => (
                <div
                  key={opt.label}
                  className={`px-4 py-2 cursor-pointer rounded-xl ${selectedOption.label === opt.label ? "bg-orange-500 text-white" : "hover:bg-slate-100"}`}
                  onClick={() => {
                    setSelectedOption(opt);
                    setActiveDropdown(null);
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedOption.label === options[0].label && (
        <div className="flex flex-col gap-2.5">
          {/* 2. Kitchen Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Kitchen Type
            </label>
            <div className="relative w-[250px]">
              <div
                className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
                onClick={() => toggleDropdown("kitchen")}
              >
                <span>{kitchenType?.title || "Select Kitchen"}</span>
                <ChevronDown
                  className={`transition-transform ${activeDropdown === "kitchen" ? "rotate-180" : ""}`}
                  size={18}
                />
              </div>
              {activeDropdown === "kitchen" && (
                <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-60 overflow-auto">
                  {kitchenData?.map((kitchen) => (
                    <div
                      key={kitchen._id}
                      className={`px-4 py-2 cursor-pointer ${kitchenType?._id === kitchen._id ? "bg-orange-500 text-white" : "hover:bg-slate-100 "}`}
                      onClick={() => {
                        setKitchenType(kitchen);
                        setUtilityBills([]);
                        setActiveDropdown(null);
                      }}
                    >
                      {kitchen.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {kitchenType && (
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-slate-700">
                Utility Services
              </label>
              <div className="relative w-[300px]">
                <div
                  className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
                  onClick={() => toggleDropdown("utility")}
                >
                  <span className="text-slate-500">Add Utilities...</span>
                  <ChevronDown
                    className={`transition-transform ${activeDropdown === "utility" ? "rotate-180" : ""}`}
                    size={18}
                  />
                </div>
                {activeDropdown === "utility" && (
                  <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-48 overflow-auto">
                    {singleUtilities?.map((bill) => (
                      <div
                        key={bill._id}
                        className="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-slate-100"
                        onClick={() => handleUtilityBill(bill)}
                      >
                        <span>{bill.name}</span>
                        {utilityBills.find((b) => b._id === bill._id) && (
                          <Check size={16} className="text-orange-500" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Selected Badges Below */}
              <div className="flex flex-wrap gap-2 w-full max-w-[400px]">
                {utilityBills.map((bill) => (
                  <SelectedBadge
                    key={bill._id}
                    item={bill}
                    onRemove={handleUtilityBill}
                  />
                ))}
              </div>
            </div>
          )}

          {singleFeature?.length > 0 && kitchenType && (
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-slate-700">
                Service Features
              </label>
              <div className="relative w-[300px]">
                <div
                  className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
                  onClick={() => toggleDropdown("feature")}
                >
                  <span className="text-slate-500">Add Features...</span>
                  <ChevronDown
                    className={`transition-transform ${activeDropdown === "feature" ? "rotate-180" : ""}`}
                    size={18}
                  />
                </div>
                {activeDropdown === "feature" && (
                  <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-48 overflow-auto">
                    {singleFeature?.map((feature) => (
                      <div
                        key={feature._id}
                        className="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-slate-100"
                        onClick={() => handleFeature(feature)}
                      >
                        <span>{feature.name}</span>
                        {serviceFeatures.find((f) => f._id === feature._id) && (
                          <Check size={16} className="text-orange-500" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Selected Badges Below */}
              <div className="flex flex-wrap gap-2 w-full max-w-[400px]">
                {serviceFeatures.map((f) => (
                  <SelectedBadge
                    key={f._id}
                    item={f}
                    onRemove={handleFeature}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4. Service Dropdown */}

          {serviceFeatures?.length > 0 && utilityBills?.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Charge Generate
              </label>
              <div className="relative w-[250px]">
                <div
                  className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
                  onClick={() => toggleDropdown("service")}
                >
                  <span>{studentService?.title || "Select Service"}</span>
                  <ChevronDown
                    className={`transition-transform ${activeDropdown === "service" ? "rotate-180" : ""}`}
                    size={18}
                  />
                </div>
                {activeDropdown === "service" && (
                  <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 overflow-auto">
                    {services?.map((service) => (
                      <div
                        key={service._id}
                        className={`px-4 py-2 cursor-pointer  ${studentService?._id === service._id ? "bg-orange-500 text-white" : "hover:bg-slate-100"}`}
                        onClick={() => {
                          setStudentService(service);
                          setActiveDropdown(null);
                        }}
                      >
                        {service.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* price */}

          {studentService && (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-semibold text-slate-700">
                  Amount of Charge
                </h3>
                <p className="text-lg font-semibold"> ৳{totalPrice}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-semibold text-slate-700">
                  Total Amount
                </h3>
                <p className="text-lg font-semibold"> ৳{totalPrice}</p>
              </div>
            </div>
          )}
        </div>
      )}
      {selectedOption.label === options[1].label && (
        <div className="flex flex-col gap-2.5">
          {/* 2. Kitchen Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Kitchen Type
            </label>
            <div className="relative w-[250px]">
              <div
                className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
                onClick={() => toggleDropdown("kitchen")}
              >
                <span>{kitchenType?.title || "Select Kitchen"}</span>
                <ChevronDown
                  className={`transition-transform ${activeDropdown === "kitchen" ? "rotate-180" : ""}`}
                  size={18}
                />
              </div>
              {activeDropdown === "kitchen" && (
                <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-60 overflow-auto">
                  {kitchenData?.map((kitchen) => (
                    <div
                      key={kitchen._id}
                      className={`px-4 py-2 cursor-pointer ${kitchenType?._id === kitchen._id ? "bg-orange-500 text-white" : "hover:bg-slate-100 "}`}
                      onClick={() => {
                        setKitchenType(kitchen);
                        setUtilityBills([]);
                        setActiveDropdown(null);
                      }}
                    >
                      {kitchen.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {kitchenType && (
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-slate-700">
                Utility Services
              </label>
              <div className="relative w-[300px]">
                <div
                  className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
                  onClick={() => toggleDropdown("utility")}
                >
                  <span className="text-slate-500">Add Utilities...</span>
                  <ChevronDown
                    className={`transition-transform ${activeDropdown === "utility" ? "rotate-180" : ""}`}
                    size={18}
                  />
                </div>
                {activeDropdown === "utility" && (
                  <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-48 overflow-auto">
                    {singleUtilities?.map((bill) => (
                      <div
                        key={bill._id}
                        className="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-slate-100"
                        onClick={() => handleUtilityBill(bill)}
                      >
                        <span>{bill.name}</span>
                        {utilityBills.find((b) => b._id === bill._id) && (
                          <Check size={16} className="text-orange-500" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Selected Badges Below */}
              <div className="flex flex-wrap gap-2 w-full max-w-[400px]">
                {utilityBills.map((bill) => (
                  <SelectedBadge
                    key={bill._id}
                    item={bill}
                    onRemove={handleUtilityBill}
                  />
                ))}
              </div>
            </div>
          )}

          {singleFeature?.length > 0 && kitchenType && (
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-slate-700">
                Service Features
              </label>
              <div className="relative w-[300px]">
                <div
                  className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
                  onClick={() => toggleDropdown("feature")}
                >
                  <span className="text-slate-500">Add Features...</span>
                  <ChevronDown
                    className={`transition-transform ${activeDropdown === "feature" ? "rotate-180" : ""}`}
                    size={18}
                  />
                </div>
                {activeDropdown === "feature" && (
                  <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-48 overflow-auto">
                    {singleFeature?.map((feature) => (
                      <div
                        key={feature._id}
                        className="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-slate-100"
                        onClick={() => handleFeature(feature)}
                      >
                        <span>{feature.name}</span>
                        {serviceFeatures.find((f) => f._id === feature._id) && (
                          <Check size={16} className="text-orange-500" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Selected Badges Below */}
              <div className="flex flex-wrap gap-2 w-full max-w-[400px]">
                {serviceFeatures.map((f) => (
                  <SelectedBadge
                    key={f._id}
                    item={f}
                    onRemove={handleFeature}
                  />
                ))}
              </div>
            </div>
          )}

          {/* 4. Service Dropdown */}

          {serviceFeatures?.length > 0 && utilityBills?.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Charge Generate
              </label>
              <div className="relative w-[250px]">
                <div
                  className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
                  onClick={() => toggleDropdown("service")}
                >
                  <span>{studentService?.title || "Select Service"}</span>
                  <ChevronDown
                    className={`transition-transform ${activeDropdown === "service" ? "rotate-180" : ""}`}
                    size={18}
                  />
                </div>
                {activeDropdown === "service" && (
                  <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 overflow-auto">
                    {services?.map((service) => (
                      <div
                        key={service._id}
                        className={`px-4 py-2 cursor-pointer  ${studentService?._id === service._id ? "bg-orange-500 text-white" : "hover:bg-slate-100"}`}
                        onClick={() => {
                          setStudentService(service);
                          setActiveDropdown(null);
                        }}
                      >
                        {service.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* price */}

          {studentService && (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-semibold text-slate-700">
                  Amount of Charge
                </h3>
                <p className="text-lg font-semibold"> ৳{totalPrice}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-semibold text-slate-700">
                  Total Amount
                </h3>
                <p className="text-lg font-semibold"> ৳{totalPrice}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StepTwo;
