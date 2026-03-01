import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "./Stepper";

import useStep from "../../Hooks/useStep";
import { api } from "../../utils/countryApi";
import CustomSelect from "../CustomSelect";
import DocumentUpload from "../DocumentUpload";

import StepTwo from "./StepTwo";
import MealScheduleTable from "../MealTable";
import {
  useAllKitchen,
  useAllService,
  useGetFeature,
  useUtilitiesService,
} from "../../api/admin/admin.api";

const MessForm = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [divisionLoading, setDivisionLoading] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);

  const [division, setDivision] = useState(null);
  const [district, setDistrict] = useState(null);

  useEffect(() => {
    if (!state) return;

    const loadDivisions = async () => {
      try {
        setDivisionLoading(true);
        const res = await api.get("/divisions");
        setDivisions(res?.data?.data || []);
      } catch (err) {
        console.log("Failed to load divisions:", err);
        setDivisions([]);
      } finally {
        setDivisionLoading(false);
      }
    };

    loadDivisions();
  }, [state]);

  useEffect(() => {
    if (!division) return;

    const loadDistricts = async () => {
      try {
        setDistrictLoading(true);
        const res = await api.get(`/division/${division}`);
        setDistricts(res?.data?.data || []);
      } catch (err) {
        console.log("Failed to load districts:", err);
        setDistricts([]);
      } finally {
        setDistrictLoading(false);
      }
    };

    loadDistricts();
  }, [division]);

  const { step, setStep } = useStep();
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm();
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const passwordValue = watch("password");

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

  const [institute, setInstitute] = useState("");
  const [instituteOptions, setInstituteOptions] = useState([
    "School",
    "Office",
    "Collage",
  ]);

  const handleCreateInstituteType = (newItem) => {
    setInstituteOptions((prev) => [...prev, newItem]);
  };

  const [hall, setHall] = useState("");
  const [hallOptions, setHallOptions] = useState([
    "hall 1",
    "hall 2",
    "hall 3",
  ]);

  const [mess, setMess] = useState("");
  const [messOptions, setMessOptions] = useState([
    "mess 1",
    "mess 2",
    "mess 3",
  ]);

  const handleCreateHall = (newItem) => {
    setHallOptions((prev) => [...prev, newItem]);
  };
  const handleCreateMess = (newItem) => {
    setMessOptions((prev) => [...prev, newItem]);
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
      className="flex flex-col  space-y-4 w-full"
    >
      <Stepper step={step} />

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <>
          <CustomSelect
            label="Institute Type"
            options={instituteOptions}
            value={institute}
            onChange={setInstitute}
            onCreate={handleCreateInstituteType}
            allowCreate
            showOther
          />

          <FloatingInput
            label="Name Of the Institute"
            error={errors.institute_name}
            {...register("institute_name", {
              required: "Institute Name required",
            })}
          />

          <FloatingInput
            label="Username"
            error={errors.username}
            {...register("username", { required: "Username required" })}
          />

          <FloatingInput
            label="Number of Member"
            error={errors.number_of_member}
            {...register("number_of_member", {
              required: "Number Of Member required",
            })}
          />
          <CustomSelect
            label="Name of Hall"
            options={hallOptions}
            value={hall}
            onChange={setHall}
            onCreate={handleCreateHall}
            allowCreate
            showOther
          />

          <CustomSelect
            label="Name of Mess"
            options={messOptions}
            value={mess}
            onChange={setMess}
            onCreate={handleCreateMess}
            allowCreate
            showOther
          />

          <div className="w-full flex flex-col gap-2">
            <h4 className="text-[18px] font-semibold text-gray-500">Address</h4>

            {/* Country */}
            <select
              onChange={(e) => setCountry(e.target.value)}
              className="border focus:border-purple-500  border-gray-300 px-2 py-2 rounded w-full  text-gray-600"
            >
              <option value="">Select Country</option>

              <option key={"bangladesh"} value={"bangladesh"}>
                Bangladesh
              </option>
            </select>

            {country && (
              <select
                onChange={(e) => setState(e.target.value)}
                className="border focus:border-purple-500  border-gray-300 px-2 py-3 rounded w-full  text-gray-600"
              >
                <option value="">Select State</option>

                <option key={"bangladesh"} value={"bangladesh"}>
                  Bangladesh
                </option>
              </select>
            )}

            {state && (
              <select
                onChange={(e) => setDivision(e.target.value)}
                className="border focus:border-purple-500 border-gray-300 px-2 py-3 rounded w-full text-gray-600"
                disabled={divisionLoading}
              >
                <option value="">
                  {divisionLoading
                    ? "Loading divisions..."
                    : "Select Divisions"}
                </option>

                {!divisionLoading &&
                  divisions?.map((c) => (
                    <option key={c.division} value={c.division}>
                      {c.division}
                    </option>
                  ))}
              </select>
            )}

            {division && (
              <select
                onChange={(e) => setDistrict(e.target.value)}
                className="border focus:border-purple-500 border-gray-300 px-2 py-3 rounded w-full text-gray-600"
                disabled={districtLoading}
              >
                <option value="">
                  {districtLoading
                    ? "Loading districts..."
                    : "Select Districts"}
                </option>

                {!districtLoading &&
                  districts.map((c) => (
                    <option key={c.district} value={c.district}>
                      {c.district}
                    </option>
                  ))}
              </select>
            )}

            {district && (
              <div className="flex flex-col gap-2">
                <FloatingInput
                  label="Village"
                  {...register("village", { required: "Village required" })}
                  error={errors.phone}
                />
                <FloatingInput
                  label="Location"
                  {...register("location", { required: "location required" })}
                  error={errors.phone}
                />
              </div>
            )}
          </div>

          <div className="w-full flex flex-col gap-2">
            <h4 className="text-[18px] font-semibold text-gray-500">Contact</h4>
            <FloatingInput
              label="Email"
              type="email"
              error={errors.email}
              {...register("email", { required: "Email required" })}
            />

            <FloatingInput
              label="Phone Number"
              {...register("phone", { required: "Phone required" })}
              error={errors.phone}
            />
          </div>

          <div className="flex flex-col gap-1">
            <h4 className="text-[18px] font-semibold text-gray-500">
              Document
            </h4>
            <DocumentUpload />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="relative w-full ">
              <input
                type={passwordShow ? "text" : "password"}
                placeholder=" "
                {...register("password", {
                  required: "Password required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="peer w-full border border-gray-300 rounded-md px-3 h-[40px]"
              />
              <FloatingLabel text="Password" />
              <div
                onClick={() => setPasswordShow(!passwordShow)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {passwordShow ? <IoMdEyeOff /> : <IoMdEye />}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative w-full">
              <input
                type={confirmPasswordShow ? "text" : "password"}
                placeholder=" "
                {...register("confirm_password", {
                  required: "Confirm Password required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
                className="peer w-full border border-gray-300 rounded-md px-3 h-[40px]"
              />
              <FloatingLabel text="Confirm Password" />
              <div
                onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {confirmPasswordShow ? <IoMdEyeOff /> : <IoMdEye />}
              </div>
              {errors.confirm_password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
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
          <StepTwo
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
            <MealScheduleTable totalPrice={totalPrice} />
          </div>

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

      {step === 4 && (
        <>
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
      <div className="flex flex-col mb-4 gap-2 items-center justify-center">
        <p className="text-center  text-gray-600 font-medium">
          Already have an account?{" "}
        </p>
        <Link
          className=" w-[150px] inline-block text-center bg-orange-500 px-4 text-white py-1 rounded-2xl font-bold transition-all active:scale-[0.98] cursor-pointer"
          to="/#login"
        >
          Sign In
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
        className="peer w-full border border-gray-300 rounded-md px-3 h-[40px]"
      />
      <FloatingLabel text={label} />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  ),
);
const FloatingLabel = ({ text }) => (
  <label
    className="absolute left-3 bg-white px-1 text-gray-500 transition-all
      top-1/2 -translate-y-1/2 text-sm md:text-base
      peer-focus:top-1 peer-focus:text-xs peer-focus:text-black
      peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
      pointer-events-none"
  >
    {text}
  </label>
);
