import React, { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";

const options = [
  { label: "User", path: true },
  { label: "Client", path: false },
];

const StepTwo = ({
  selectedOption,
  setSelectedOption,
  kitchenType,
  setKitchenType,
  studentService,
  setStudentService,
  kitchenData,
  services,
  serviceFeatures,
  setServiceFeatures,
  singleUtilities,
  singleFeature,
  toggleDropdown,
  handleUtilityBill,
  handleFeature,
  activeDropdown,
  setActiveDropdown,
  totalPrice,
  utilityBills,
  setUtilityBills,
  prevStep,
  nextStep,
  form,
  selectedBill,
  setSelectedBill,
  modalData,
  setModalData,
  isPending,
  combineData,
}) => {
  const [charge, setCharge] = useState([]);
  const [selectedCharge, setSelectedCharge] = useState(null);

  console.log(charge);

  const handleCharge = (item) => {
    setSelectedCharge(item);

    setCharge((prev) => {
      const exists = prev.find((c) => c._id === item._id);

      if (exists) {
        return prev.filter((c) => c._id !== item._id);
      }

      return [...prev, item];
    });
  };

  const totalPrices = charge?.reduce(
    (total, charge) => total + +charge.price,
    0,
  );

  console.log(totalPrices);

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
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200   rounded-xl mt-1 shadow-lg z-50">
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
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-50 max-h-60 overflow-auto">
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
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-50 max-h-48 overflow-auto">
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
                {/* {utilityBills.map((bill) => (
                  <SelectedBadge
                    key={bill._id}
                    item={bill}
                    onRemove={handleUtilityBill}
                  />
                ))} */}
                {utilityBills.map((bill) => (
                  <SelectedBadge
                    key={bill._id}
                    item={{
                      ...bill,
                      displayText: `${bill.name} ${
                        bill.bear_the_cost
                          ? `- ${bill.bear_the_cost.title}`
                          : ""
                      } `,
                    }}
                    onRemove={(b) =>
                      setUtilityBills((prev) =>
                        prev.filter((u) => u._id !== b._id),
                      )
                    }
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
                  <div className="absolute top-full left-0 w-full bg-white border  border-gray-200 rounded-xl mt-1 shadow-lg z-50 max-h-48 overflow-auto">
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

          {utilityBills.length > 0 && serviceFeatures.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Charge Generate
              </label>

              <div className="relative w-[250px]">
                <div
                  className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
                  onClick={() => toggleDropdown("service")}
                >
                  Select Charge
                  <ChevronDown
                    className={`transition-transform ${
                      activeDropdown === "service" ? "rotate-180" : ""
                    }`}
                    size={18}
                  />
                </div>

                {activeDropdown === "service" && (
                  <div className="absolute w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-50 max-h-60 overflow-auto">
                    {combineData?.map((service) => (
                      <div
                        key={service._id}
                        className="px-4 py-2 cursor-pointer hover:bg-slate-100 flex justify-between items-center"
                        onClick={() => handleCharge(service)}
                      >
                        {service.name}

                        {charge.find((c) => c._id === service._id) && (
                          <Check size={16} className="text-orange-500" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Charges */}
              <div className="flex flex-wrap gap-2">
                {charge.map((item) => (
                  <SelectedBadge
                    key={item._id}
                    item={item}
                    onRemove={(chargeItem) =>
                      setCharge((prev) =>
                        prev.filter((c) => c._id !== chargeItem._id),
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* price */}

          {totalPrices > 0 && (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-semibold text-slate-700">
                  Amount of Charge
                </h3>
                <p className="text-lg font-semibold"> ৳{totalPrices}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-semibold text-slate-700">
                  Total Amount
                </h3>
                <p className="text-lg font-semibold"> ৳{totalPrices}</p>
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
                <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-60 overflow-auto border-gray-200">
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
                  <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-48 overflow-auto border-gray-200">
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
                  <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-48 overflow-auto border-gray-200">
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
              <div className="flex flex-wrap gap-2 w-full max-w-[400px] ">
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

          {/* Charge Generate */}
          {utilityBills.length > 0 && serviceFeatures.length > 0 && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Charge Generate
              </label>

              <div className="relative w-[250px]">
                <div
                  className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
                  onClick={() => toggleDropdown("service")}
                >
                  Select Charge
                  <ChevronDown size={18} />
                </div>

                {activeDropdown === "service" && (
                  <div className="absolute w-full bg-white border rounded-xl mt-1 shadow-lg z-50">
                    {combineData?.map((service) => (
                      <div
                        key={service._id}
                        className="px-4 py-2 cursor-pointer hover:bg-slate-100 flex justify-between"
                        onClick={() => handleCharge(service)}
                      >
                        {service.name}

                        {setCharge?.find((c) => c._id === service._id) && (
                          <Check size={16} className="text-orange-500" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selected Charges */}
              <div className="flex flex-wrap gap-2">
                {charge?.map((charge) => (
                  <SelectedBadge
                    key={charge._id}
                    item={charge}
                    onRemove={() =>
                      setCharge((prev) =>
                        prev.filter((c) => c._id !== charge._id),
                      )
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* price */}

          {charge?.length > 0 && (
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-semibold text-slate-700">
                  Amount of Charge
                </h3>
                <p className="text-lg font-semibold"> ৳{totalPrices}</p>
              </div>

              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-semibold text-slate-700">
                  Total Amount
                </h3>
                <p className="text-lg font-semibold"> ৳{totalPrices}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        {/* <button
          type="button"
          onClick={prevStep}
          className="w-full border border-gray-200 cursor-pointer py-1.5 lg:py-3 rounded-lg"
        >
          Back
        </button> */}
        <button
          type="button"
          onClick={nextStep}
          disabled={isPending}
          className="w-full bg-black cursor-pointer text-white py-1.5 lg:py-3 rounded-lg disabled:cursor-not-allowed"
        >
          {isPending ? "Processing..." : "Next"}
        </button>
      </div>

      {/* modal */}
      {selectedBill && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50  bg-opacity-30 z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] max-w-full">
            <h3 className="font-semibold text-lg mb-4">{selectedBill.name}</h3>

            {/* Bear the Cost */}
            <label className="block text-sm font-medium mb-1">
              Bear the Cost
            </label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={modalData.bear_the_cost?._id || ""}
              onChange={(e) => {
                const selected = selectedBill.bear_the_cost.find(
                  (b) => b._id === e.target.value,
                );
                setModalData((prev) => ({ ...prev, bear_the_cost: selected }));
              }}
            >
              <option value="">Select Bear the Cost</option>
              {selectedBill.bear_the_cost?.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.title}
                </option>
              ))}
            </select>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-200"
                onClick={() => setSelectedBill(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-orange-500 text-white"
                onClick={() => {
                  setUtilityBills((prev) => {
                    const exists = prev.find((b) => b._id === selectedBill._id);
                    if (exists) {
                      return prev.map((b) =>
                        b._id === selectedBill._id ? { ...b, ...modalData } : b,
                      );
                    } else {
                      return [...prev, { ...selectedBill, ...modalData }];
                    }
                  });
                  setSelectedBill(null);
                  setActiveDropdown(null);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCharge && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] max-w-full">
            <h3 className="font-semibold text-lg mb-4">
              {selectedCharge.name}
            </h3>

            <label className="block text-sm font-medium mb-1">Service</label>

            <select className="w-full border border-gray-300 rounded-md p-2 mb-4">
              <option value="">Select Service</option>

              <option
                key={selectedCharge?.service?._id}
                value={selectedCharge?.service?._id}
              >
                {selectedCharge?.service?.title}
              </option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-md bg-gray-200"
                onClick={() => setSelectedCharge(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="px-4 py-2 rounded-md bg-orange-500 text-white"
                onClick={() => {
                  setSelectedCharge(null);
                  setActiveDropdown(null);
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SelectedBadge = ({ item, onRemove }) => (
  <div className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full gap-2">
    <span>{item.displayText || item.name}</span>
    <button onClick={() => onRemove(item)}>x</button>
  </div>
);

export default StepTwo;
