import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "./Stepper";
import MealScheduleTable from "../MealTable";
import useStep from "../../Hooks/useStep";
import { api } from "../../utils/countryApi";

const utilitybillalabadanservice = [
  {
    id: 1,
    title: "Electricity Bill",
    percentage: 0,
  },

  {
    id: 2,
    title: "Staff Bill",
    percentage: 10,
  },

  {
    id: 3,
    title: "Gas Bill",
    percentage: 0,
  },
  {
    id: 4,
    title: "Transport Bill",
    percentage: 0,
  },
];

const utilitybilluserservice = [
  {
    id: 1,
    title: "Electricity Bill",
    percentage: 0,
  },

  {
    id: 2,
    title: "Staff Bill",
    percentage: 20,
  },

  {
    id: 3,
    title: "Gas Bill",
    percentage: 0,
  },
  {
    id: 4,
    title: "Transport Bill",
    percentage: 0,
  },
];

const MessForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const loadCountries = async () => {
      const res = await api.get("/countries");
      setCountries(res.data);
    };
    loadCountries();
  }, []);

  useEffect(() => {
    if (!country) return;

    const loadStates = async () => {
      const res = await api.get(`/countries/${country}/states`);
      setStates(res.data);
      setCities([]);
      setState("");
    };

    loadStates();
  }, [country]);

  // Load Cities
  useEffect(() => {
    if (!country || !state) return;

    const loadCities = async () => {
      const res = await api.get(`/countries/${country}/states/${state}/cities`);
      setCities(res.data);
      setCity("");
    };

    loadCities();
  }, [state, country]);

  const { step, setStep } = useStep();
  const [passwordShow, setPasswordShow] = useState(false);

  const [utilityElectricityBill, setUtilityElectricityBill] = useState(null);
  const [utilityStaffBill, setUtilityStaffBill] = useState(null);
  const [utilityGasBill, setUtilityGassBill] = useState(null);

  const [utilityUserElectricityBill, setUtilityUserElectricityBill] =
    useState(null);
  const [utilityUserStaffBill, setUserUtilityStaffBill] = useState(null);
  const [utilityUserGasBill, setUserUtilityGassBill] = useState(null);

  const [kitchenType, setKitchenType] = useState(null);

  const [studentService, setStudentService] = useState(false);

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

  const handleUtilityBill = (bill) => {
    if (bill?.title === "Electricity Bill") {
      setUtilityElectricityBill(bill);
    }

    if (bill?.title === "Staff Bill") {
      setUtilityStaffBill(bill);
    }

    if (bill?.title === "Gas Bill") {
      setUtilityGassBill(bill);
    }
  };

  const handleUserUtilityBill = () => {
    if (bill?.title === "Electricity Bill") {
      setUtilityUserElectricityBill(bill);
    }

    if (bill?.title === "Staff Bill") {
      setUserUtilityStaffBill(bill);
    }

    if (bill?.title === "Gas Bill") {
      setUserUtilityGassBill(bill);
    }
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

          <div className="md:col-span-2 space-y-2">
            {/* Country */}
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border focus:border-purple-500  border-gray-300 px-2 py-3 rounded w-full  text-gray-600"
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c.iso2} value={c.iso2}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* State */}
            {country && (
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                disabled={!country}
                className="border focus:border-purple-500  border-gray-300 px-2 py-3 p-2 rounded w-full  text-gray-600"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s.iso2} value={s.iso2}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}

            {/* City */}
            {state && (
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!state}
                className="border focus:border-purple-500  border-gray-300 px-2 py-3 p-2 rounded w-full text-gray-600"
              >
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          {country && state && city && (
            <FloatingInput label="Address" {...register("address")} />
          )}

          <FloatingInput
            label="Name of the Institute"
            {...register("institute", { required: "Institute required" })}
            error={errors.phone}
          />
          <FloatingInput
            label="Total Number of Member In Your Institute"
            {...register("institute-member", {
              required: "Institute Member required",
            })}
            error={errors.institute_member}
          />
          <FloatingInput
            label="Name of the Hall / Hostel"
            {...register("hall", { required: "hall / hostel   required" })}
            error={errors.hall}
          />

          <FloatingInput
            label="Name of the Mess"
            {...register("hall", { required: "mess  required" })}
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
          <div className="flex items-center">
            <div className="flex items-center gap-2 w-full">
              <label className="switch !text-[10px] lg:!text-xs">
                <input
                  type="radio"
                  value="al-abadin"
                  {...register("kitchen", { required: "Select kitchen" })}
                  className="sr-only"
                  onChange={() => {
                    setKitchenType("al-abadan-kitchen");
                  }}
                />
                <span className="slider"></span>
              </label>
              <p className="text-sm lg:text-base">Al Abadin Kitchen</p>
            </div>
            <div className="flex items-center gap-2 w-full">
              <label className="switch !text-[10px] lg:!text-xs">
                <input
                  type="radio"
                  value="user"
                  {...register("kitchen", { required: "Select kitchen" })}
                  onChange={() => {
                    setKitchenType("user-kitchen");
                  }}
                  className="sr-only"
                />
                <span className="slider"></span>
              </label>
              <p className="text-sm lg:text-base">User Kitchen</p>
            </div>
          </div>

          {errors.kitchen && (
            <p className="text-red-500 text-sm">{errors.kitchen.message}</p>
          )}

          {kitchenType === "al-abadan-kitchen" && (
            <div className="flex flex-col gap-3">
              <h6 className="font-semibold">Utility Service</h6>
              <div className="flex flex-wrap items-center gap-3 lg:gap-6">
                {utilitybillalabadanservice.map((bill) => (
                  <div key={bill.id} className="flex items-center gap-2">
                    <label className="switch !text-[10px] lg:!text-xs">
                      <input
                        type="checkbox"
                        value={bill.id}
                        {...register("bill", { required: "Select Bill" })}
                        onChange={() => handleUtilityBill(bill)}
                        className="sr-only"
                      />
                      <span className="slider"></span>
                    </label>
                    <p className="text-sm lg:text-base">{bill.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {kitchenType === "user-kitchen" && (
            <div className="flex flex-col gap-3">
              <h6 className="font-semibold">Utility Service</h6>
              <div className="flex flex-wrap items-center gap-6">
                {utilitybilluserservice.map((bill) => (
                  <div key={bill.id} className="flex items-center gap-2">
                    <label className="switch !text-[10px] lg:!text-xs">
                      <input
                        type="checkbox"
                        value={bill.id}
                        {...register("bill", { required: "Select Bill" })}
                        onChange={() => handleUserUtilityBill(bill)}
                        className="sr-only"
                      />
                      <span className="slider"></span>
                    </label>
                    <p className="text-sm lg:text-base">{bill.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <>
            <h6 className="font-semibold">Select Service</h6>

            {/* MAIN SERVICE */}
            <div className="flex items-center gap-6">
              {/* Per Meal */}
              <div className="flex items-center gap-2">
                <label className="switch !text-[10px] lg:!text-xs">
                  <input
                    type="radio"
                    value="meal"
                    {...register("service", { required: "Select Service" })}
                    onChange={() => setStudentService(true)}
                    className="sr-only"
                  />
                  <span className="slider"></span>
                </label>
                <p className="text-sm lg:text-base">Per Meal</p>
              </div>

              {/* Per Student */}
              <div className="flex items-center gap-2">
                <label className="switch !text-[10px] lg:!text-xs">
                  <input
                    type="radio"
                    value="student"
                    {...register("service", { required: "Select Service" })}
                    onChange={() => setStudentService(true)}
                    className="sr-only"
                  />
                  <span className="slider"></span>
                </label>
                <p className="text-sm lg:text-base">Per Student</p>
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
                  <label className="switch !text-[10px] lg:!text-xs">
                    <input
                      type="checkbox"
                      value="balance"
                      {...register("studentOptions")}
                      className="sr-only"
                    />
                    <span className="slider"></span>
                  </label>
                  <p className="text-sm lg:text-base">Balance</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="switch !text-[10px] lg:!text-xs">
                    <input
                      type="checkbox"
                      value="fingerprint"
                      {...register("studentOptions")}
                      className="sr-only"
                    />
                    <span className="slider"></span>
                  </label>
                  <p className="text-sm lg:text-base">Fingerprint</p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="switch !text-[10px] lg:!text-xs">
                    <input
                      type="checkbox"
                      value="mealadd"
                      {...register("studentOptions")}
                      className="sr-only"
                    />
                    <span className="slider"></span>
                  </label>
                  <p className="text-sm lg:text-base">Meal Add</p>
                </div>
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
