import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import MealScheduleTable from "../MealTable";
import useStep from "../../Hooks/useStep";
import {
  useAllKitchen,
  useAllService,
  useGetFeature,
  useUtilitiesService,
} from "../../api/admin/admin.api";

const MessForm = () => {
  const { data: kitchenData } = useAllKitchen();

  const { data: services } = useAllService();

  const { data: allUtilities } = useUtilitiesService();

  const { data: getFeature } = useGetFeature();

  const [kitchenType, setKitchenType] = useState(null);
  const [studentService, setStudentService] = useState(null);
  const singleUtilities = allUtilities?.filter(
    (data) => data?.kitchen?.title === kitchenType?.title,
  );

  const singleFeature = getFeature?.filter(
    (data) => data?.service?.title === studentService?.title,
  );

  const { step, setStep } = useStep();
  const [passwordShow, setPasswordShow] = useState(false);

  const [utilityBills, setUtilityBills] = useState([]);

  const [serviceFeatures, setServiceFeatures] = useState([]);

  console.log(serviceFeatures);

  const totalUtilityPrice = utilityBills?.reduce(
    (total, bill) => total + +bill.price,
    0,
  );

  const totalServiceFeaturePrice = serviceFeatures?.reduce(
    (total, feature) => total + +feature?.price,
    0,
  );

  const totalPrice = totalUtilityPrice + totalServiceFeaturePrice;

  const handleUtilityBill = (bill) => {
    setUtilityBills((prev) => {
      if (prev.find((b) => b._id === bill._id)) {
        return prev.filter((b) => b._id !== bill._id);
      } else {
        return [...prev, bill];
      }
    });
  };

  const handleFeature = (feature) => {
    setServiceFeatures((prev) => {
      if (prev?.find((f) => f?._id === feature?._id)) {
        return prev.filter((f) => f._id !== feature._id);
      } else {
        return [...prev, feature];
      }
    });
  };

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = (data) => {
    if (data) {
      navigate("/dashboard/mealmanagement");
    }
    console.log("FORM DATA", data);
  };

  const handleStudent = () => {
    setStudentService(true);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  space-y-4 w-full"
    >
      <Stepper step={step} />

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <>
          <FloatingInput
            label="Username"
            error={errors.username}
            {...register("username", { required: "Username required" })}
          />

          <FloatingInput
            label="Email"
            type="email"
            error={errors.email}
            {...register("email", { required: "Email required" })}
          />

          {/* Password */}
          <div className="relative w-full">
            <input
              type={passwordShow ? "text" : "password"}
              placeholder=" "
              {...register("password", {
                required: "Password required",
                minLength: 6,
              })}
              className="peer w-full border border-gray-300 rounded-md px-3 h-[50px]"
            />
            <FloatingLabel text="Password" />
            <div
              onClick={() => setPasswordShow(!passwordShow)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
            >
              {passwordShow ? <IoMdEyeOff /> : <IoMdEye />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <FloatingInput
            label="Phone Number"
            {...register("phone", { required: "Phone required" })}
            error={errors.phone}
          />

          <FloatingInput label="Address" {...register("address")} />

          <FloatingInput
            label="Name of the Institute"
            {...register("institute", { required: "Institute required" })}
            error={errors.phone}
          />

          <FloatingInput
            label="Name of the Hall / Hostel"
            {...register("hall", { required: "hall / hostel   required" })}
            error={errors.hall}
          />

          <FloatingInput
            label="Name of the Mess"
            {...register("mess")}
            error={errors.mess}
          />

          <div className="w-full max-w-xl">
            <label className="block text-sm md:text-base font-medium text-gray-600 mb-2">
              Upload Institute Documents
            </label>

            <div className="relative flex items-center justify-between gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:border-orange-500 transition">
              <input
                type="file"
                id="image"
                {...register("institute_document")}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <span className="text-gray-400 text-sm truncate">
                Choose an image…
              </span>

              <span className="shrink-0 bg-orange-600 text-white text-sm px-4 py-1.5 rounded-lg hover:bg-orange-700 transition">
                Browse
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
          </div>
          <button
            type="button"
            onClick={nextStep}
            className="w-full cursor-pointer bg-black text-white py-1.5 lg:py-3 rounded-lg"
          >
            Next
          </button>
        </>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <>
          <p className="font-semibold">Select Kitchen Type</p>

          {kitchenData?.map((data) => (
            <div className="flex items-center">
              <div className="flex items-center gap-2 w-full">
                <label className="switch !text-[10px] lg:!text-xs">
                  <input
                    type="radio"
                    value={data}
                    {...register("kitchen", { required: "Select kitchen" })}
                    className="sr-only"
                    onChange={() => {
                      setKitchenType(data);
                    }}
                  />
                  <span className="slider"></span>
                </label>
                <p className="text-sm lg:text-base">{data?.title}</p>
              </div>
            </div>
          ))}

          {errors.kitchen && (
            <p className="text-red-500 text-sm">{errors.kitchen.message}</p>
          )}

          {kitchenType?.title === "Al Abadan Kitchen" && (
            <div className="flex flex-col gap-3">
              <h6 className="font-semibold">Utility Service</h6>
              <div className="flex flex-wrap items-center gap-3 lg:gap-6">
                {singleUtilities.map((bill) => (
                  <div key={bill.id} className="flex items-center gap-2">
                    <label className="switch !text-[10px] lg:!text-xs">
                      <input
                        type="checkbox"
                        value={bill}
                        {...register("bill")}
                        onChange={() => handleUtilityBill(bill)}
                        className="sr-only"
                      />
                      <span className="slider"></span>
                    </label>
                    <p className="text-sm lg:text-base">{bill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {kitchenType?.title === "User Kitchen" && (
            <div className="flex flex-col gap-3">
              <h6 className="font-semibold">Utility Service</h6>
              <div className="flex flex-wrap items-center gap-6">
                {singleUtilities.map((bill) => (
                  <div key={bill._id} className="flex items-center gap-2">
                    <label className="switch !text-[10px] lg:!text-xs">
                      <input
                        type="checkbox"
                        value={bill}
                        {...register("bill")}
                        onChange={() => handleUtilityBill(bill)}
                        className="sr-only"
                      />
                      <span className="slider"></span>
                    </label>
                    <p className="text-sm lg:text-base">{bill.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <>
            <h6 className="font-semibold">Select Service</h6>

            {/* MAIN SERVICE */}
            <div className="flex items-center gap-6">
              {services?.map((service) => (
                <div className="flex items-center gap-2">
                  <label className="switch !text-[10px] lg:!text-xs">
                    <input
                      type="radio"
                      value="meal"
                      {...register("service")}
                      onChange={() => setStudentService(service)}
                      className="sr-only"
                    />
                    <span className="slider"></span>
                  </label>
                  <p className="text-sm lg:text-base">{service?.title}</p>
                </div>
              ))}
            </div>

            {errors.service && (
              <p className="text-red-500 text-sm">{errors.service.message}</p>
            )}

            {/*  */}
            {studentService?.title === "Per Meal" && (
              <div className="mt-4 space-y-3">
                <p className="font-medium text-sm"> Features</p>

                {singleFeature?.map((feature) => (
                  <div className="flex items-center gap-2">
                    <label className="switch !text-[10px] lg:!text-xs">
                      <input
                        type="checkbox"
                        value={feature}
                        {...register("studentOptions")}
                        onChange={() => handleFeature(feature)}
                        className="sr-only"
                      />
                      <span className="slider"></span>
                    </label>
                    <p className="text-sm lg:text-base">{feature?.name}</p>
                  </div>
                ))}
              </div>
            )}

            {studentService?.title === "Per Student" && (
              <div className="mt-4 space-y-3">
                <p className="font-medium text-sm">Student Features</p>

                {singleFeature?.map((feature) => (
                  <div className="flex items-center gap-2">
                    <label className="switch !text-[10px] lg:!text-xs">
                      <input
                        type="checkbox"
                        value="balance"
                        onChange={() => handleFeature(feature)}
                        {...register("studentOptions")}
                        className="sr-only"
                      />
                      <span className="slider"></span>
                    </label>
                    <p className="text-sm lg:text-base">{feature?.name}</p>
                  </div>
                ))}
              </div>
            )}
          </>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={prevStep}
              className="w-full border cursor-pointer py-1.5 lg:py-3 rounded-lg"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-black cursor-pointer text-white py-1.5 lg:py-3 rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <>
          <div className=" space-y-3">
            <p className="font-semibold">Select the Meals</p>

            <MealScheduleTable />
          </div>

          <div className="flex gap-2 mt-4">
            <button
              type="button"
              onClick={prevStep}
              className="w-full border border-gray-300 cursor-pointer py-3 rounded-lg"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full cursor-pointer bg-black text-white py-3 rounded-lg"
            >
              Sign Up
            </button>
          </div>
        </>
      )}

      <div className="text-sm flex gap-2 pb-3">
        <p>Already have an account?</p>
        <Link to="/auth/login" className="text-blue-600 font-semibold">
          Login
        </Link>
      </div>
    </form>
  );
};

export default MessForm;
const FloatingInput = React.forwardRef(
  ({ label, type = "text", error, ...rest }, ref) => (
    <div className="relative w-full">
      <input
        ref={ref}
        type={type}
        placeholder=" "
        {...rest}
        className="peer w-full border border-gray-300 rounded-md px-3 h-[50px]"
      />
      <FloatingLabel text={label} />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  ),
);
const FloatingLabel = ({ text }) => (
  <label
    className="absolute left-3 bg-white px-1 text-gray-500 transition-all
      top-1/2 -translate-y-1/2 text-sm md:text-lg
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-black
      peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
      pointer-events-none"
  >
    {text}
  </label>
);

{
  /* <div className="flex items-center gap-2">
  <label className="switch !text-xs">
    <input
      type="radio"
      value="staff"
      {...register("bill", { required: "Select Bill" })}
      onChange={() => setStudentService(true)}
      className="sr-only"
    />
    <span className="slider"></span>
  </label>
  <p>Per Student</p>
</div>;

<div className="flex items-center gap-2">
  <label className="switch !text-xs">
    <input
      type="radio"
      value="student"
      {...register("service", { required: "Select Service" })}
      onChange={() => setStudentService(true)}
      className="sr-only"
    />
    <span className="slider"></span>
  </label>
  <p>Gas Bill</p>
</div>; */
}
