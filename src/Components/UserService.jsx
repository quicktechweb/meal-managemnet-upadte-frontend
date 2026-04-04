import { ChevronDown } from "lucide-react";
import React from "react";
import { SelectedBadge } from "./auth/StepTwo";

const UserService = (
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

  // charge
  charge,
  setCharge,
  chargeModalData,
  setChargeModalData,
  data,
  selectedCharge,
  setSelectedCharge,
  handleCharge,
  totalPrices,
  members,
  service_type,
) => {
  return (
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
            {utilityBills?.map((bill) => (
              <SelectedBadge
                key={bill._id}
                item={{
                  ...bill,
                  charge_generate: `${bill.name} ${
                    bill.bear_the_cost ? `- ${bill.bear_the_cost.title}` : ""
                  } `,
                }}
                onRemove={(b) =>
                  setUtilityBills((prev) => prev.filter((u) => u._id !== b._id))
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
              <SelectedBadge key={f._id} item={f} onRemove={handleFeature} />
            ))}
          </div>
        </div>
      )}

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

                  {charge?.find((c) => c._id === service._id) && (
                    <Check size={16} className="text-orange-500" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Charges */}
        <div className="flex flex-wrap gap-2">
          {charge?.map((item) => (
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

      {/* price */}

      {charge?.length > 0 && (
        <div className="flex flex-col gap-4 p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
          {/* Amount of Charge - Light & Subtle */}

          {charge?.map((singlecharge) => (
            <div className="flex items-center justify-between px-2">
              <h3 className="text-md font-medium text-slate-500">
                {singlecharge?.charge_generate}
              </h3>
              {singlecharge?.price && (
                <p className="text-xl font-bold text-slate-700">
                  ৳ {singlecharge?.price}
                </p>
              )}

              {singlecharge?.ranges &&
                singlecharge?.ranges?.length > 0 &&
                (() => {
                  const matchedRange = singlecharge.ranges.find(
                    (r) => +members >= r.min && +members <= r.max,
                  );

                  return (
                    <p className="text-xl font-bold text-slate-700">
                      ৳ {matchedRange?.price}
                    </p>
                  );
                })()}
            </div>
          ))}

          {/* Styled Divider */}
          <div className="relative h-px">
            <div className="absolute inset-0 border-t border-dashed border-gray-300"></div>
          </div>

          {/* Total Amount - High Contrast & Eye Catchy */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-200 transform transition-transform hover:scale-[1.02]">
            <div className="flex flex-col">
              <h3 className="text-sm font-bold text-orange-100 uppercase tracking-tight">
                Total Amount
              </h3>
              <p className="text-xs text-orange-200">Final Payable</p>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-3xl font-black text-white drop-shadow-sm">
                ৳ {totalPrices}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserService;
