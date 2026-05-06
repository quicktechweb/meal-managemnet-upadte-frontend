// ServiceConfigUpdate.jsx
import React, { useEffect, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  useAllKitchen,
  useAllService,
  useGetFeature,
  useServiceType,
  useUtilitiesService,
} from "../../api/admin/admin.api";
import { useInstituteRegistration } from "../../api/auth/auth.hook";

import toast from "react-hot-toast";
import useInstituteAuth from "../../Hooks/useInstituteAuth";
import { SelectedBadge } from "../../Components/auth/StepTwo";

const ServicePage = () => {
  const { user } = useInstituteAuth();

  const instituteData = user?.user;
  const [isEditing, setIsEditing] = useState(false);

  // ── Dropdown list data (MessForm এর মতো একই hooks) ──
  const { data: service_type } = useServiceType();
  const { data: kitchenData } = useAllKitchen();
  const { data: allUtilities } = useUtilitiesService();
  const { data: getFeature } = useGetFeature();
  const { data: serviceTypeList } = useAllService(); // charge modal এর "Per User/Per Meal" list

  // ── MessForm এর step 2 এর সব state ──
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [kitchenType, setKitchenType] = useState(null);
  const [utilityBills, setUtilityBills] = useState([]);
  const [serviceFeatures, setServiceFeatures] = useState([]);
  const [combineData, setCombineData] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [modalData, setModalData] = useState({ bear_the_cost: [] });
  const [charge, setCharge] = useState([]);
  const [chargeModalData, setChargeModalData] = useState({ type: "" });
  const [selectedCharge, setSelectedCharge] = useState(null);

  // ── MessForm এর মতো combineData ──
  useEffect(() => {
    setCombineData([...utilityBills, ...serviceFeatures]);
  }, [utilityBills, serviceFeatures]);

  // ── MessForm এর মতো filter ──
  const singleUtilities = allUtilities?.filter(
    (u) => u?.kitchen?.title === kitchenType?.title,
  );
  const singleFeature = getFeature?.filter(
    (f) => f?.kitchen?.title === kitchenType?.title,
  );

  // ── DB থেকে আসা data দিয়ে state populate ──
  useEffect(() => {
    if (!instituteData?.services) return;
    const s = instituteData.services;

    // selectedOption
    if (service_type?.length > 0) {
      const matched = service_type.find((t) => t._id === s.user_type?.id);
      setSelectedOption(matched || service_type[0]);
    }

    // kitchenType
    if (kitchenData?.length > 0) {
      const matched = kitchenData.find((k) => k._id === s.kitchen_type?.id);
      setKitchenType(matched || null);
    }

    // utilityBills
    setUtilityBills(
      s.utility_bills?.map((b) => ({
        _id: b.utility_id,
        name: b.name,
        bear_the_cost: b.bear_the_cost
          ? { _id: b.bear_the_cost.id, title: b.bear_the_cost.title }
          : null,
      })) || [],
    );

    // serviceFeatures
    setServiceFeatures(
      s.service_features?.map((f) => ({
        _id: f.feature_id,
        name: f.name,
      })) || [],
    );

    // charges
    setCharge(
      s.charges?.map((c) => ({
        _id: c.charge_id,
        name: c.name,
        type: c.type,
        charge_generate: c.charge_generate,
        price: c.price,
        ranges: c.ranges || [],
      })) || [],
    );
  }, [instituteData, service_type, kitchenData]);

  // ── kitchenType বদলালে reset (MessForm এর মতো) ──
  useEffect(() => {
    if (!instituteData?.services) {
      setUtilityBills([]);
      setServiceFeatures([]);
    }
  }, [kitchenType]);

  // ── MessForm এর মতো handlers ──
  const toggleDropdown = (name) =>
    setActiveDropdown(activeDropdown === name ? null : name);

  const handleUtilityBill = (bill) => {
    setSelectedBill(bill);
    setModalData({ bear_the_cost: bill.bear_the_cost || [] });
    setActiveDropdown(null);
  };

  const handleFeature = (feature) => {
    setServiceFeatures((prev) =>
      prev.find((f) => f._id === feature._id)
        ? prev.filter((f) => f._id !== feature._id)
        : [...prev, feature],
    );
  };

  const handleCharge = (item) => {
    setSelectedCharge(item);
    setChargeModalData({ type: "" });
    setActiveDropdown(null);
  };

  // ── MessForm এর মতো totalPrices ──
  const members = instituteData?.information?.number_of_member;

  const totalPrices = charge.reduce((total, item) => {
    if (item.price) return total + Number(item.price);
    if (item.ranges?.length > 0) {
      const matched = item.ranges.find(
        (r) => members >= r.min && members <= r.max,
      );
      if (matched) return total + Number(matched.price);
    }
    return total;
  }, 0);

  // ── Save ──
  const { mutateAsync, isPending } = useInstituteRegistration();

  const handleSave = async () => {
    const payload = {
      user_type: { id: selectedOption._id, title: selectedOption.title },
      kitchen_type: { id: kitchenType._id, title: kitchenType.title },
      utility_bills: utilityBills.map((b) => ({
        utility_id: b._id,
        name: b.name,
        bear_the_cost: {
          id: b.bear_the_cost?._id,
          title: b.bear_the_cost?.title,
        },
      })),
      service_features: serviceFeatures.map((f) => ({
        feature_id: f._id,
        name: f.name,
      })),
      charges: charge.map((c) => {
        const matchedRange = c.ranges?.find(
          (r) => +members >= r.min && +members <= r.max,
        );
        return {
          charge_id: c._id,
          name: c.name,
          type: c.type,
          charge_generate: c.charge_generate,
          price: c.price || matchedRange?.price || null,
          ranges: matchedRange ? [matchedRange] : [],
        };
      }),
      total_amount: totalPrices,
    };

    await mutateAsync(
      {
        userId: instituteData._id,
        services: { ...payload },
        registration_step: 2,
      },
      {
        onSuccess: (data) => {
          toast.success(data?.data?.message || "Updated successfully");

          setIsEditing(false);
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Update failed");
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* ── Header ── */}
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-slate-700">
          Service Configuration
        </h2>
        <button
          type="button"
          onClick={() => setIsEditing((p) => !p)}
          className="text-sm px-4 py-2 rounded-lg border border-gray-200 hover:bg-slate-50"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* ── View Mode ── */}
      {!isEditing && (
        <div className="flex flex-col gap-4 text-sm">
          <ViewRow label="Type" value={selectedOption?.title} />
          <ViewRow label="Kitchen" value={kitchenType?.title} />
          <ViewRow
            label="Utilities"
            value={
              utilityBills.length
                ? utilityBills
                    .map(
                      (b) =>
                        `${b.name}${b.bear_the_cost ? ` - ${b.bear_the_cost.title}` : ""}`,
                    )
                    .join(", ")
                : "—"
            }
          />
          <ViewRow
            label="Features"
            value={
              serviceFeatures.length
                ? serviceFeatures.map((f) => f.name).join(", ")
                : "—"
            }
          />
          <ViewRow
            label="Charges"
            value={
              charge.length
                ? charge.map((c) => c.charge_generate).join(", ")
                : "—"
            }
          />
          {charge.length > 0 && (
            <div className="flex justify-between items-center bg-orange-50 px-4 py-3 rounded-xl border border-orange-100">
              <span className="text-orange-700 font-medium">Total</span>
              <span className="text-xl font-bold text-orange-600">
                ৳ {totalPrices}
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── Edit Mode — হুবহু StepTwo এর JSX ── */}
      {isEditing && (
        <div className="flex flex-col gap-8">
          {/* User/Client Type */}
          <div className="flex flex-col justify-center items-center gap-2">
            <label className="text-sm font-semibold text-slate-700">
              User/Client Type
            </label>
            <div className="relative w-[250px]">
              <div
                className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
                onClick={() => toggleDropdown("option")}
              >
                <span>{selectedOption?.title}</span>
                <ChevronDown
                  className={`transition-transform ${activeDropdown === "option" ? "rotate-180" : ""}`}
                  size={18}
                />
              </div>
              {activeDropdown === "option" && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-50">
                  {service_type?.map((opt) => (
                    <div
                      key={opt._id}
                      className={`px-4 py-2 cursor-pointer rounded-xl ${selectedOption?.title === opt?.title ? "bg-orange-500 text-white" : "hover:bg-slate-100"}`}
                      onClick={() => {
                        setSelectedOption(opt);
                        setActiveDropdown(null);
                        setUtilityBills([]);
                        setServiceFeatures([]);
                        setCharge([]);
                      }}
                    >
                      {opt?.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Kitchen Type */}
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
                      className={`px-4 py-2 cursor-pointer ${kitchenType?._id === kitchen._id ? "bg-orange-500 text-white" : "hover:bg-slate-100"}`}
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

          {/* Utility Services */}
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
              <div className="flex flex-wrap gap-2 w-full max-w-[400px]">
                {utilityBills?.map((bill) => (
                  <SelectedBadge
                    key={bill._id}
                    item={{
                      ...bill,
                      charge_generate: `${bill.name} ${bill.bear_the_cost ? `- ${bill.bear_the_cost.title}` : ""}`,
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

          {/* Service Features */}
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
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-xl mt-1 shadow-lg z-50 max-h-48 overflow-auto">
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

          {/* Charge Generate */}
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
                  className={`transition-transform ${activeDropdown === "service" ? "rotate-180" : ""}`}
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

          {/* Price Summary */}
          {charge?.length > 0 && (
            <div className="flex flex-col gap-4 p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
              {charge?.map((singlecharge) => (
                <div
                  key={singlecharge._id}
                  className="flex items-center justify-between px-2"
                >
                  <h3 className="text-md font-medium text-slate-500">
                    {singlecharge?.charge_generate}
                  </h3>
                  {singlecharge?.price && (
                    <p className="text-xl font-bold text-slate-700">
                      ৳ {singlecharge?.price}
                    </p>
                  )}
                  {singlecharge?.ranges?.length > 0 &&
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
              <div className="relative h-px">
                <div className="absolute inset-0 border-t border-dashed border-gray-300" />
              </div>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-200">
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-orange-100 uppercase tracking-tight">
                    Total Amount
                  </h3>
                  <p className="text-xs text-orange-200">Final Payable</p>
                </div>
                <p className="text-3xl font-black text-white drop-shadow-sm">
                  ৳ {totalPrices}
                </p>
              </div>
            </div>
          )}

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={isPending}
            className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      {/* ── Utility Modal (হুবহু StepTwo) ── */}
      {selectedBill && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-30 z-[99999]">
          <div className="bg-white rounded-xl p-6 w-[400px] max-w-full">
            <h3 className="font-semibold text-lg mb-4">{selectedBill.name}</h3>
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
                    }
                    return [...prev, { ...selectedBill, ...modalData }];
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

      {/* ── Charge Modal (হুবহু StepTwo) ── */}
      {selectedCharge && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-[9999]">
          <div className="bg-white rounded-xl p-6 w-[400px] max-w-full">
            <h3 className="font-semibold text-lg mb-4">
              {selectedCharge.name}
            </h3>
            <label className="block text-sm font-medium mb-1">Service</label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={chargeModalData.type}
              onChange={(e) => setChargeModalData({ type: e.target.value })}
            >
              <option value="">Select Service</option>
              {serviceTypeList?.map((item) => (
                <option key={item._id} value={item?.title}>
                  {item?.title}
                </option>
              ))}
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
                  setCharge((prev) => {
                    const exists = prev.find(
                      (c) => c._id === selectedCharge._id,
                    );
                    const newCharge = {
                      ...selectedCharge,
                      type: chargeModalData.type,
                      charge_generate: `${selectedCharge.name} - ${
                        chargeModalData.type === "Per User"
                          ? "Per User"
                          : "Per Meal"
                      }`,
                    };
                    if (exists) {
                      return prev.map((c) =>
                        c._id === selectedCharge._id ? newCharge : c,
                      );
                    }
                    return [...prev, newCharge];
                  });
                  setChargeModalData({ type: "" });
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

// ── View mode helper ──
const ViewRow = ({ label, value }) => (
  <div className="flex justify-between items-start gap-4 py-1 border-b border-slate-100">
    <span className="text-slate-500 shrink-0">{label}</span>
    <span className="text-slate-700 text-right">{value || "—"}</span>
  </div>
);

export default ServicePage;
