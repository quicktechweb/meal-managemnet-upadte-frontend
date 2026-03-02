import React, { useState } from "react";
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
  useUtilitiesService,
} from "../../api/admin/admin.api";

const MessForm = () => {
  const { step, setStep } = useStep();
  const navigate = useNavigate();

  const form = useForm({
    mode: "onChange",
    defaultValues: {},
  });

  const { handleSubmit } = form;

  const nextStep = async () => {
    const isValid = await form.trigger();
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = (data) => {
    console.log("Final form data:", data);
    navigate("/dashboard/mealmanagement");
  };

  // step 2
  const options = [
    { label: "User", path: true },
    { label: "Client", path: false },
  ];
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedOption, setSelectedOption] = useState(options[0]);

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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 w-full"
    >
      <Stepper step={step} />

      {step === 1 && <StepOne form={form} nextStep={nextStep} />}
      {step === 2 && (
        <StepTwo
          form={form}
          nextStep={nextStep}
          prevStep={prevStep}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
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
        />
      )}
      {step === 3 && (
        <StepThree
          totalPrice={totalPrice}
          form={form}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}

      <div className="flex flex-col mb-4 gap-2 items-center justify-center">
        <p className="text-center text-gray-600 font-medium">
          Already have an account?
        </p>
        <Link
          className="w-[150px] inline-block text-center bg-orange-500 px-4 text-white py-1 rounded-2xl font-bold transition-all active:scale-[0.98] cursor-pointer"
          to="/#login"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default MessForm;
