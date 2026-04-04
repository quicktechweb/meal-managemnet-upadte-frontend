import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import useStep from "../../Hooks/useStep";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import {
  useAllKitchen,
  useAllService,
  useGetFeature,
  useServiceType,
  useUtilitiesService,
} from "../../api/admin/admin.api";
import StepFour from "./StepFour";
import { useInstituteRegistration } from "../../api/auth/auth.hook";
import toast from "react-hot-toast";

const MessForm = () => {
  const { step, setStep } = useStep();

  const navigate = useNavigate();

  const form = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const { handleSubmit } = form;

  const [userId, setUserId] = useState(null);

  const [formUploadData, setFormUploadData] = useState([]);
  const [adminFormUploadData, setAdminFormUploadData] = useState([]);

  // step 1
  const currentData = form.getValues();
  const [organizeOptions, setOrganizeOptions] = useState([
    "Company",
    "Institute",
  ]);

  const [instituteOptions, setInstituteOptions] = useState([
    "School",
    "Office",
    "Collage",
  ]);

  const handleCreateInstituteType = (newItem) => {
    setInstituteOptions((prev) => [...prev, newItem]);
  };

  const handleCreateOrganizeType = (newItem) => {
    setOrganizeOptions((prev) => [...prev, newItem]);
  };

  // step 2

  const [activeDropdown, setActiveDropdown] = useState(null);
  const { data: service_type } = useServiceType();

  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    if (service_type && service_type.length > 0) {
      setSelectedOption(service_type[0]);
    }
  }, [service_type]);

  const [kitchenType, setKitchenType] = useState(null);

  const [studentService, setStudentService] = useState(null);
  const [utilityBills, setUtilityBills] = useState([]);

  const [serviceFeatures, setServiceFeatures] = useState([]);

  const [selectedBill, setSelectedBill] = useState(null);

  const [combineData, setCombineData] = useState([]);

  useEffect(() => {
    setCombineData(() => [...utilityBills, ...serviceFeatures]);
  }, [utilityBills, serviceFeatures]);

  const [modalData, setModalData] = useState({
    bear_the_cost: [],
  });

  const { data: kitchenData } = useAllKitchen();
  const { data: services } = useAllService();
  const { data: allUtilities } = useUtilitiesService();

  const { data: getFeature } = useGetFeature();

  useEffect(() => {
    if (kitchenData?.length > 0 && !kitchenType) {
      setKitchenType(kitchenData[0]);
    }
  }, [kitchenData]);

  useEffect(() => {
    setUtilityBills([]);
    setServiceFeatures([]);
    setStudentService(null);
  }, [kitchenType]);

  const singleUtilities = allUtilities?.filter(
    (u) => u?.kitchen?.title === kitchenType?.title,
  );

  const singleFeature = getFeature?.filter(
    (f) => f?.kitchen?.title === kitchenType?.title,
  );

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // const handleUtilityBill = (bill) => {
  //   setUtilityBills((prev) =>
  //     prev.find((b) => b._id === bill._id)
  //       ? prev.filter((b) => b._id !== bill._id)
  //       : [...prev, bill],
  //   );
  // };

  const handleUtilityBill = (bill) => {
    setSelectedBill(bill);
    setModalData({
      bear_the_cost: bill.bear_the_cost || [],
    });

    setActiveDropdown(null);
  };

  const handleFeature = (feature) => {
    setServiceFeatures((prev) =>
      prev.find((f) => f._id === feature._id)
        ? prev.filter((f) => f._id !== feature._id)
        : [...prev, feature],
    );
  };

  const totalUtilityPrice = utilityBills?.reduce((total, bill) => {
    let billPrice = 0;

    if (bill?.ranges?.length > 0) {
      const matchedRange = bill.ranges.find(
        (range) =>
          currentData?.number_of_member >= range.min &&
          currentData?.number_of_member <= range.max,
      );

      if (matchedRange) {
        billPrice = matchedRange.price;
      }
    } else {
      billPrice = +bill.price || 0;
    }

    return total + billPrice;
  }, 0);

  console.log(utilityBills, "utility bills");

  console.log(totalUtilityPrice, "total service feature price");

  const totalServiceFeaturePrice = serviceFeatures?.reduce(
    (total, feature) => total + +feature?.price,
    0,
  );

  console.log(serviceFeatures, "service features");

  console.log(totalServiceFeaturePrice, "total service feature price");

  const totalPrice = +totalUtilityPrice + totalServiceFeaturePrice;

  console.log(totalPrice, "total price");

  // step 3

  const [mealTypeLists, setMealTypeLists] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);

  // step 4
  const [selected, setSelected] = useState([]);

  const { mutateAsync, isPending } = useInstituteRegistration();

  const nextStep = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      if (step === 1) {
        const payload = {
          instituteType: currentData?.institute_type,
          name_of_institute: currentData?.institute_name,
          number_of_member: +currentData?.number_of_member,
          username: currentData?.username,
          name_of_hall: currentData?.hall_name,
          name_of_mess: currentData?.mess_name,
          country: currentData?.country,
          state: currentData?.state,
          division: currentData?.division,
          district: currentData?.district,
          village: currentData?.village,
          location: currentData?.location,
          password: currentData?.password,
          documents: formUploadData,
        };

        await mutateAsync(
          {
            email: currentData.email ? currentData?.email : null,
            phone: currentData?.phone ? currentData?.phone : null,
            information: payload,
          },
          {
            onSuccess: (data) => {
              if (data) {
                setUserId(data?.data?.userId);
                toast.success(data?.data?.message);
                setStep(step + 1);
              }
            },
            onError: (err) => {
              toast.error(err?.response?.data?.message);
              console.log(err);
            },
          },
        );
      }

      if (step === 2) {
        // formdata.append("userId", userId);
        // formdata.append("user_type", selectedOption);
        // formdata.append("kitchen_type", kitchenType);
        // formdata.append("utility_service", utilityBills);
        // formdata.append("service_feature", serviceFeatures);
        // formdata.append("registration_step", step);

        const payload = {
          user_type: selectedOption.label,
          kitchen_type: kitchenType,
          utility_service: utilityBills,
          service_feature: serviceFeatures,
          total_amount: totalPrice,
        };

        await mutateAsync(
          { userId: userId, services: { ...payload }, registration_step: step },
          {
            onSuccess: (data) => {
              if (data) {
                toast.success(data?.data?.message);
                setStep(step + 1);
              }
            },
            onError: (err) => {
              toast.error(err?.response?.data?.message);
              console.log(err);
            },
          },
        );
      }

      if (step === 3) {
        const payload = {
          userId: userId,
          meal_type_lists: mealTypeLists,
          schedule_lists: scheduleList,
        };

        await mutateAsync(
          { userId: userId, routine: { ...payload }, registration_step: step },
          {
            onSuccess: (data) => {
              if (data) {
                toast.success(data?.data?.message);
                setStep(step + 1);
              }
            },
            onError: (err) => {
              toast.error(err?.response?.data?.message);
              console.log(err);
            },
          },
        );
      }
    }
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data) => {
    const payload = {
      date_of_birth: data.dob,
      email_admin: data.email_admin,
      phone_admin: data.phone_admin,
      country_admin: data.country_admin,
      state_admin: data.state_admin,
      division_admin: data.division_admin,
      district_admin: data.district_admin,
      village_admin: data.village_admin,
      location_admin: data.location_admin,
      permission: selected,
      documents_admin: adminFormUploadData,
    };

    await mutateAsync(
      { userId: userId, admin_info: { ...payload }, registration_step: step },
      {
        onSuccess: (data) => {
          if (data) {
            toast.success(data?.data?.message);

            navigate("/auth/login");
            setStep(1);
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
          console.log(err);
        },
      },
    );

    // navigate("/dashboard/mealmanagement");
  };

  // charge

  const { data, isLoading } = useAllService();

  const [charge, setCharge] = useState([]);

  const [chargeModalData, setChargeModalData] = useState({
    type: "",
  });

  const [selectedCharge, setSelectedCharge] = useState(null);

  const handleCharge = (item) => {
    setSelectedCharge(item);
  };

  const members = currentData?.number_of_member;

  const totalPrices = charge.reduce((total, item) => {
    if (item.price) {
      return total + Number(item.price);
    }

    if (item.ranges && item.ranges.length > 0) {
      const matchedRange = item.ranges.find(
        (r) => members >= r.min && members <= r.max,
      );

      if (matchedRange) {
        return total + Number(matchedRange.price);
      }
    }

    return total;
  }, 0);

  const perMealTotal = charge
    ?.filter((c) => c.type === "Per Meal")
    .reduce((total, c) => {
      if (c.price) {
        return total + Number(c.price);
      }

      if (c.ranges && c.length > 0) {
        const matchedRange = c.ranges.find(
          (r) => members >= r.min && members <= r.max,
        );

        if (matchedRange) {
          return total + Number(matchedRange.price);
        }
      }

      return total;
    }, 0);

  const perUserTotal = charge
    ?.filter((c) => c.type === "Per User")
    .reduce((total, c) => {
      if (c.price) {
        return total + Number(c.price);
      }

      if (c.ranges && c.length > 0) {
        const matchedRange = c.ranges.find(
          (r) => members >= r.min && members <= r.max,
        );

        if (matchedRange) {
          return total + Number(matchedRange.price);
        }
      }

      return total;
    }, 0);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 w-full overflow-x-hidden h-[800px] overflow-y-scroll global-scrollbar"
    >
      <Stepper step={step} />

      {step === 1 && (
        <StepOne
          instituteOptions={instituteOptions}
          handleCreateInstituteType={handleCreateInstituteType}
          form={form}
          nextStep={nextStep}
          isPending={isPending}
          setFormUploadData={setFormUploadData}
          formUploadData={formUploadData}
          setOrganizeOptions={setOrganizeOptions}
          organizeOptions={organizeOptions}
          handleCreateOrganizeType={handleCreateOrganizeType}
        />
      )}
      {step === 2 && (
        <StepTwo
          form={form}
          nextStep={nextStep}
          selectedBill={selectedBill}
          setSelectedBill={setSelectedBill}
          prevStep={prevStep}
          selectedOption={selectedOption}
          isPending={isPending}
          setSelectedOption={setSelectedOption}
          modalData={modalData}
          setModalData={setModalData}
          kitchenType={kitchenType}
          setKitchenType={setKitchenType}
          studentService={studentService}
          utilityBills={utilityBills}
          setUtilityBills={setUtilityBills}
          setStudentService={setStudentService}
          kitchenData={kitchenData}
          services={services}
          allUtilities={allUtilities}
          getFeature={getFeature}
          singleUtilities={singleUtilities}
          singleFeature={singleFeature}
          toggleDropdown={toggleDropdown}
          handleUtilityBill={handleUtilityBill}
          handleFeature={handleFeature}
          totalUtilityPrice={totalUtilityPrice}
          totalServiceFeaturePrice={totalServiceFeaturePrice}
          totalPrice={totalPrice}
          serviceFeatures={serviceFeatures}
          setServiceFeatures={setServiceFeatures}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          combineData={combineData}
          service_type={service_type}
          // charge
          charge={charge}
          setCharge={setCharge}
          chargeModalData={chargeModalData}
          setChargeModalData={setChargeModalData}
          data={data}
          selectedCharge={selectedCharge}
          setSelectedCharge={setSelectedCharge}
          handleCharge={handleCharge}
          totalPrices={totalPrices}
          members={members}
        />
      )}
      {step === 3 && (
        <StepThree
          totalPrice={totalPrice}
          mealTypeLists={mealTypeLists}
          setMealTypeLists={setMealTypeLists}
          scheduleList={scheduleList}
          isPending={isPending}
          setScheduleList={setScheduleList}
          form={form}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      {step === 4 && (
        <StepFour
          instituteOptions={instituteOptions}
          handleCreateInstituteType={handleCreateInstituteType}
          form={form}
          isPending={isPending}
          onSubmit={onSubmit}
          nextStep={nextStep}
          prevStep={prevStep}
          setSelected={setSelected}
          selected={selected}
          setFormUploadData={setFormUploadData}
          setAdminFormUploadData={setAdminFormUploadData}
        />
      )}

      <div className="flex flex-col mb-4 gap-2 items-center justify-center">
        <p className="text-center text-gray-600 font-medium">
          Already have an account?
        </p>
        <Link
          className="w-[150px] inline-block text-center bg-orange-500 px-4 text-white py-1 rounded-2xl font-bold transition-all active:scale-[0.98] cursor-pointer"
          to="/auth/login"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default MessForm;

//  {
//    selectedOption.label === options[1].label && (
//      <div className="flex flex-col gap-2.5">
//        {/* 2. Kitchen Dropdown */}
//        <div className="flex flex-col gap-2">
//          <label className="text-sm font-semibold text-slate-700">
//            Kitchen Type
//          </label>
//          <div className="relative w-[250px]">
//            <div
//              className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
//              onClick={() => toggleDropdown("kitchen")}
//            >
//              <span>{kitchenType?.title || "Select Kitchen"}</span>
//              <ChevronDown
//                className={`transition-transform ${activeDropdown === "kitchen" ? "rotate-180" : ""}`}
//                size={18}
//              />
//            </div>
//            {activeDropdown === "kitchen" && (
//              <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-60 overflow-auto border-gray-200">
//                {kitchenData?.map((kitchen) => (
//                  <div
//                    key={kitchen._id}
//                    className={`px-4 py-2 cursor-pointer ${kitchenType?._id === kitchen._id ? "bg-orange-500 text-white" : "hover:bg-slate-100 "}`}
//                    onClick={() => {
//                      setKitchenType(kitchen);
//                      setUtilityBills([]);
//                      setActiveDropdown(null);
//                    }}
//                  >
//                    {kitchen.title}
//                  </div>
//                ))}
//              </div>
//            )}
//          </div>
//        </div>

//        {kitchenType && (
//          <div className="flex flex-col gap-3">
//            <label className="text-sm font-semibold text-slate-700">
//              Utility Services
//            </label>
//            <div className="relative w-[300px]">
//              <div
//                className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
//                onClick={() => toggleDropdown("utility")}
//              >
//                <span className="text-slate-500">Add Utilities...</span>
//                <ChevronDown
//                  className={`transition-transform ${activeDropdown === "utility" ? "rotate-180" : ""}`}
//                  size={18}
//                />
//              </div>
//              {activeDropdown === "utility" && (
//                <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-48 overflow-auto border-gray-200">
//                  {singleUtilities?.map((bill) => (
//                    <div
//                      key={bill._id}
//                      className="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-slate-100"
//                      onClick={() => handleUtilityBill(bill)}
//                    >
//                      <span>{bill.name}</span>
//                      {utilityBills.find((b) => b._id === bill._id) && (
//                        <Check size={16} className="text-orange-500" />
//                      )}
//                    </div>
//                  ))}
//                </div>
//              )}
//            </div>
//            {/* Selected Badges Below */}
//            <div className="flex flex-wrap gap-2 w-full max-w-[400px]">
//              {utilityBills.map((bill) => (
//                <SelectedBadge
//                  key={bill._id}
//                  item={bill}
//                  onRemove={handleUtilityBill}
//                />
//              ))}
//            </div>
//          </div>
//        )}

//        {singleFeature?.length > 0 && kitchenType && (
//          <div className="flex flex-col gap-3">
//            <label className="text-sm font-semibold text-slate-700">
//              Service Features
//            </label>
//            <div className="relative w-[300px]">
//              <div
//                className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
//                onClick={() => toggleDropdown("feature")}
//              >
//                <span className="text-slate-500">Add Features...</span>
//                <ChevronDown
//                  className={`transition-transform ${activeDropdown === "feature" ? "rotate-180" : ""}`}
//                  size={18}
//                />
//              </div>
//              {activeDropdown === "feature" && (
//                <div className="absolute top-full left-0 w-full bg-white border rounded-xl mt-1 shadow-lg z-50 max-h-48 overflow-auto border-gray-200">
//                  {singleFeature?.map((feature) => (
//                    <div
//                      key={feature._id}
//                      className="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-slate-100"
//                      onClick={() => handleFeature(feature)}
//                    >
//                      <span>{feature.name}</span>
//                      {serviceFeatures.find((f) => f._id === feature._id) && (
//                        <Check size={16} className="text-orange-500" />
//                      )}
//                    </div>
//                  ))}
//                </div>
//              )}
//            </div>
//            {/* Selected Badges Below */}
//            <div className="flex flex-wrap gap-2 w-full max-w-[400px] ">
//              {serviceFeatures.map((f) => (
//                <SelectedBadge key={f._id} item={f} onRemove={handleFeature} />
//              ))}
//            </div>
//          </div>
//        )}

//        {/* 4. Service Dropdown */}

//        {/* Charge Generate */}
//        {utilityBills.length > 0 && serviceFeatures.length > 0 && (
//          <div className="flex flex-col gap-2">
//            <label className="text-sm font-semibold text-slate-700">
//              Charge Generate
//            </label>

//            <div className="relative w-[250px]">
//              <div
//                className="flex justify-between items-center bg-slate-100 px-4 py-3 rounded-xl cursor-pointer"
//                onClick={() => toggleDropdown("service")}
//              >
//                Select Charge
//                <ChevronDown size={18} />
//              </div>

//              {activeDropdown === "service" && (
//                <div className="absolute w-full bg-white border rounded-xl mt-1 shadow-lg z-50">
//                  {combineData?.map((service) => (
//                    <div
//                      key={service._id}
//                      className="px-4 py-2 cursor-pointer hover:bg-slate-100 flex justify-between"
//                      onClick={() => handleCharge(service)}
//                    >
//                      {service.name}

//                      {charge?.find((c) => c._id === service._id) && (
//                        <Check size={16} className="text-orange-500" />
//                      )}
//                    </div>
//                  ))}
//                </div>
//              )}
//            </div>

//            {/* Selected Charges */}
//            <div className="flex flex-wrap gap-2">
//              {charge?.map((charge) => (
//                <SelectedBadge
//                  key={charge._id}
//                  item={charge}
//                  onRemove={() =>
//                    setCharge((prev) => prev.filter((c) => c._id !== charge._id))
//                  }
//                />
//              ))}
//            </div>
//          </div>
//        )}

//        {/* price */}

//        {charge?.length > 0 && (
//          <div className="flex flex-col gap-4 p-4 bg-white rounded-3xl shadow-sm border border-slate-100">
//            {/* Amount of Charge - Light & Subtle */}
//            <div className="flex items-center justify-between px-2">
//              <h3 className="text-md font-medium text-slate-500">
//                Amount of Charge
//              </h3>
//              <p className="text-xl font-bold text-slate-700">৳ {totalPrices}</p>
//            </div>

//            {/* Styled Divider */}
//            <div className="relative h-px">
//              <div className="absolute inset-0 border-t border-dashed border-gray-300"></div>
//            </div>

//            {/* Total Amount - High Contrast & Eye Catchy */}
//            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-200 transform transition-transform hover:scale-[1.02]">
//              <div className="flex flex-col">
//                <h3 className="text-sm font-bold text-orange-100 uppercase tracking-tight">
//                  Total Amount
//                </h3>
//                <p className="text-xs text-orange-200">Final Payable</p>
//              </div>

//              <div className="flex flex-col items-end">
//                <p className="text-3xl font-black text-white drop-shadow-sm">
//                  ৳ {totalPrices}
//                </p>
//              </div>
//            </div>
//          </div>
//        )}
//      </div>
//    );
//  }
