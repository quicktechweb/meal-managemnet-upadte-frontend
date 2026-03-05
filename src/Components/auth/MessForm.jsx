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

  console.log("formuploaddata", adminFormUploadData);

  // step 1

  const [instituteOptions, setInstituteOptions] = useState([
    "School",
    "Office",
    "Collage",
  ]);

  const handleCreateInstituteType = (newItem) => {
    setInstituteOptions((prev) => [...prev, newItem]);
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

  // step 3

  const [mealTypeLists, setMealTypeLists] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);

  // step 4
  const [selected, setSelected] = useState([]);

  const { mutateAsync, isPending } = useInstituteRegistration();

  const nextStep = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      const currentData = form.getValues();

      const formdata = new FormData();
      if (step === 1) {
        // formdata.append("instituteType", currentData?.institute_type);
        // formdata.append("name_of_institute", currentData?.institute_name);
        // formdata.append("number_of_member", +currentData?.number_of_member);
        // formdata.append("username", currentData?.username);
        // formdata.append("name_of_hall", currentData?.hall_name);
        // formdata.append("name_of_mess", currentData?.mess_name);
        // formdata.append("country", currentData?.country);
        // formdata.append("state", currentData?.state);
        // formdata.append("division", currentData?.division);
        // formdata.append("district", currentData?.district);
        // formdata.append("village", currentData?.village);
        // formdata.append("location", currentData?.location);
        // formdata.append("email", currentData?.email);
        // formdata.append("phone_number", currentData?.phone);
        // formdata.append("password", currentData?.password);

        // const documentsMeta = currentData.documents.map((doc) => ({
        //   document_type: doc.documentType,
        //   document_number: doc.documentNumber,
        // }));

        // formdata.append("documents", JSON.stringify(documentsMeta));

        // currentData.documents.forEach((doc, index) => {
        //   if (doc.files?.length > 0) {
        //     formdata.append("document_files", doc.files[0]);
        //   }
        // });

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
                console.log(data, "step 1 data");

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
          registration_step: step,
        };

        await mutateAsync(
          { userId: userId, services: { ...payload } },
          {
            onSuccess: (data) => {
              if (data) {
                toast.success(data?.data?.message);
                setStep(step + 1);
              }
            },
            onError: (err) => {
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
          registration_step: step,
        };

        await mutateAsync(
          { userId: userId, routine: { ...payload } },
          {
            onSuccess: (data) => {
              if (data) {
                toast.success(data?.data?.message);
                setStep(step + 1);
              }
            },
            onError: (err) => {
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
      { userId: userId, admin_info: { ...payload } },
      {
        onSuccess: (data) => {
          if (data) {
            toast.success(data?.data?.message);

            navigate("/#login");
            setStep(1);
          }
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );

    // navigate("/dashboard/mealmanagement");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-4 w-full"
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
        />
      )}
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
          mealTypeLists={mealTypeLists}
          setMealTypeLists={setMealTypeLists}
          scheduleList={scheduleList}
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
          to="/#login"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default MessForm;
