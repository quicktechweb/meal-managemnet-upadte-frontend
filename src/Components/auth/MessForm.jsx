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

  const totalServiceFeaturePrice = serviceFeatures?.reduce(
    (total, feature) => total + +feature?.price,
    0,
  );

  const totalPrice = +totalUtilityPrice + totalServiceFeaturePrice;

  // step 3
  const mealRoutineOption = [
    {
      id: 1,
      title: "Routine",
    },
    {
      id: 2,
      title: "Package",
    },
  ];
  const [mealTypeLists, setMealTypeLists] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [packageMealRoutine, setPackageMealRoutine] = useState([]);
  const [packageTypes, setPackageTypes] = useState([]);

  const [selectedRoutineOption, setSelectedRoutineOption] = useState(
    mealRoutineOption[0],
  );

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
            role: "institute",
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
          meal_type_lists: mealTypeLists,
          schedule_lists: scheduleList,
        };

        const packageRoutine = {
          package_routine: packageMealRoutine,
          package_type_lists: packageTypes,
        };

        await mutateAsync(
          {
            userId: userId,
            routine: { ...payload },
            packages: { ...packageRoutine },
            registration_step: step,
            routine_type: selectedRoutineOption?.title,
          },
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

      documents_admin: adminFormUploadData,
    };

    await mutateAsync(
      {
        userId: userId,
        admin_info: { ...payload },
        registration_step: step,
        roles: selected,
      },
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
          selectedRoutineOption={selectedRoutineOption}
          setSelectedRoutineOption={setSelectedRoutineOption}
          mealRoutineOption={mealRoutineOption}
          setPackageMealRoutine={setPackageMealRoutine}
          setPackageTypes={setPackageTypes}
          packageTypes={packageTypes}
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
