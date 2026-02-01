import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";
import Stepper from "./Stepper";
import { FaCheckCircle } from "react-icons/fa";
import MealScheduleTable from "../MealTable";

const MessForm = () => {
  const [step, setStep] = useState(1);
  const [passwordShow, setPasswordShow] = useState(false);

  const [studentService, setStudentService] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  const studentOptions = watch("studentOptions") || [];
  const mealAddEnabled = studentOptions.includes("mealadd");

  const nextStep = async () => {
    const valid = await trigger();
    if (valid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = (data) => {
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
            error={errors.phone}
          />

          <button
            type="button"
            onClick={nextStep}
            className="w-full cursor-pointer bg-black text-white py-3 rounded-lg"
          >
            Next
          </button>
        </>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <>
          <p className="font-semibold">Select Kitchen Type</p>
          <div className="flex items-center">
            <div className="flex items-center gap-2 w-full">
              <label className="switch !text-xs">
                <input
                  type="radio"
                  value="al-abadin"
                  {...register("kitchen", { required: "Select kitchen" })}
                  className="sr-only"
                />
                <span className="slider"></span>
              </label>
              <p>Al Abadin Kitchen</p>
            </div>
            <div className="flex items-center gap-2 w-full">
              <label className="switch !text-xs">
                <input
                  type="radio"
                  value="user"
                  {...register("kitchen", { required: "Select kitchen" })}
                  className="sr-only"
                />
                <span className="slider"></span>
              </label>
              <p>User Kitchen</p>
            </div>
          </div>

          {errors.kitchen && (
            <p className="text-red-500 text-sm">{errors.kitchen.message}</p>
          )}

          <>
            <p className="font-semibold">Select Service</p>

            {/* MAIN SERVICE */}
            <div className="flex items-center gap-6">
              {/* Per Meal */}
              <div className="flex items-center gap-2">
                <label className="switch !text-xs">
                  <input
                    type="radio"
                    value="meal"
                    {...register("service", { required: "Select Service" })}
                    onChange={() => setStudentService(false)}
                    className="sr-only"
                  />
                  <span className="slider"></span>
                </label>
                <p>Per Meal</p>
              </div>

              {/* Per Student */}
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
                <p>Per Student</p>
              </div>
            </div>

            {errors.service && (
              <p className="text-red-500 text-sm">{errors.service.message}</p>
            )}

            {/*  */}
            {studentService && (
              <div className="mt-4 space-y-3">
                <p className="font-medium text-sm">Student Features</p>

                <div className="flex items-center gap-2">
                  <label className="switch !text-xs">
                    <input
                      type="checkbox"
                      value="balance"
                      {...register("studentOptions")}
                      className="sr-only"
                    />
                    <span className="slider"></span>
                  </label>
                  <p>Balance</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="switch !text-xs">
                    <input
                      type="checkbox"
                      value="fingerprint"
                      {...register("studentOptions")}
                      className="sr-only"
                    />
                    <span className="slider"></span>
                  </label>
                  <p>Fingerprint</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="switch !text-xs">
                    <input
                      type="checkbox"
                      value="mealadd"
                      {...register("studentOptions")}
                      className="sr-only"
                    />
                    <span className="slider"></span>
                  </label>
                  <p>Meal Add</p>
                </div>
              </div>
            )}
          </>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={prevStep}
              className="w-full border cursor-pointer py-3 rounded-lg"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="w-full bg-black cursor-pointer text-white py-3 rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <>
          <div className="mt-6 space-y-6">
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
        <Link to="/login" className="text-blue-600 font-semibold">
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
