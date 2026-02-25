import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";

import { api } from "../../utils/countryApi";
import CustomSelect from "../CustomSelect";
import DynamicDropdown from "../DynamicSelect";
import DocumentUpload from "../DocumentUpload";

const InputField = ({ label, name, control, type = "text", rules = {} }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <div className="relative">
        <input
          {...field}
          type={type}
          placeholder=" "
          className={`peer w-full border rounded-md px-3 h-[50px] text-sm focus:outline-none text-gray-500 focus:border-black transition-all ${
            fieldState.error ? "border-red-500" : "border-gray-200"
          }`}
        />
        <label
          className="absolute left-3 bg-white px-1 text-gray-500 transition-all
          top-1/2 -translate-y-1/2 text-sm md:text-base
          peer-focus:top-1 peer-focus:text-xs peer-focus:text-black
          peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
          pointer-events-none"
        >
          {label}
        </label>
        {fieldState.error && (
          <span className="text-red-500 text-sm mt-1 absolute left-0 -bottom-5">
            {fieldState.error.message}
          </span>
        )}
      </div>
    )}
  />
);

const UserForm = () => {
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

  const { handleSubmit, control, watch } = useForm();

  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const passwordValue = watch("password");
  const navigate = useNavigate();

  const [hallSelect, setHallSelect] = useState(false);

  const onSubmit = (data) => {
    if (data) {
      navigate("/dashboard/mealmanagement");
    }
  };

  // custom select

  const [gurdian, setGurdian] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");

  const [village, setVillage] = useState("");

  const [villageOptions, setVillageOptions] = useState(["Ramdashdhi"]);
  const [genderOptions, setGenderOptions] = useState([
    "Male",
    "Female",
    "Children",
  ]);

  const [gurdianOptions, setGurdianOptions] = useState([
    "father",
    "mother",
    "brother",
    "sister",
  ]);

  const [religionOptions, setReligionOptions] = useState(["Islam", "Hindu"]);

  const handleCreateGurdian = (newItem) => {
    setGurdianOptions((prev) => [...prev, newItem]);
  };

  const handleCreateGender = (newItem) => {
    setGenderOptions((prev) => [...prev, newItem]);
  };

  const handleCreateReligion = (newItem) => {
    setReligionOptions((prev) => [...prev, newItem]);
  };
  const handleCreateVillage = (newItem) => {
    setVillageOptions((prev) => [...prev, newItem]);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 ">
        <InputField
          label="Full name"
          name="full-name"
          control={control}
          rules={{ required: "Full Name is required" }}
        />
        <InputField
          label="Nick name"
          name="nick-name"
          control={control}
          rules={{ required: "Nick Name is required" }}
        />

        <InputField
          label="Username"
          name="username"
          control={control}
          rules={{ required: "Username required" }}
        />

        <InputField label="Father Name" name="fatherName" control={control} />
        <InputField label="Mother Name" name="motherName" control={control} />
        <InputField
          label="Guardian Name"
          name="guardianName"
          control={control}
        />

        <CustomSelect
          label="Relation with Gurdian"
          options={gurdianOptions}
          value={gurdian}
          onChange={setGurdian}
          onCreate={handleCreateGurdian}
          allowCreate
          showOther
        />

        <InputField
          label="Guardian Contact Number"
          name="guardian-number"
          control={control}
        />

        <CustomSelect
          label="Gender"
          options={genderOptions}
          value={gender}
          onChange={setGender}
          onCreate={handleCreateGender}
          allowCreate
          showOther
        />

        <CustomSelect
          label="Religion"
          options={religionOptions}
          value={religion}
          onChange={setReligion}
          onCreate={handleCreateReligion}
          allowCreate
          showOther
        />

        <InputField
          label="Date of Birth"
          name="dob"
          control={control}
          type="date"
        />

        <DynamicDropdown />

        <div className="w-full flex flex-col gap-2">
          <h4 className="text-[18px] font-semibold text-gray-500">Address</h4>

          {/* Country */}
          <select
            onChange={(e) => setCountry(e.target.value)}
            className="border focus:border-purple-500  border-gray-300 px-2 py-3 rounded w-full  text-gray-600"
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
                {divisionLoading ? "Loading divisions..." : "Select Divisions"}
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
                {districtLoading ? "Loading districts..." : "Select Districts"}
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
              <InputField label="Village" name="village" control={control} />
              <InputField label="Location" name="location" control={control} />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-[18px] font-semibold text-gray-500">Contact</h4>
          <InputField
            label="Email"
            name="email"
            type="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            }}
          />
          <InputField label="Phone Number" name="phone" control={control} />
        </div>

        {/* Password */}

        {/* Hostel */}
        <Controller
          name="hostel"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-base text-gray-500"
            >
              <option value="">Name Of the Institute</option>
              <option value="institute 1">Institute 1</option>
              <option value="institute 2">Institute 2</option>
              <option value="institute 3">Institute 3</option>
            </select>
          )}
        />

        {/* Hostel */}
        <Controller
          name="hostel"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              onChange={() => setHallSelect(true)}
              className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-base text-gray-500"
            >
              <option value="">Name Of the Hall</option>
              <option value="Hall 1">Hall 1</option>
              <option value="Hall 2">Hall 2</option>
              <option value="Hall 3">Hall 3</option>
            </select>
          )}
        />

        <Controller
          name="mess"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-base text-gray-500"
            >
              <option value="">Name Of the Mess</option>
              <option value="mess 1">Mess 1</option>
              <option value="mess 2">Mess 2</option>
              <option value="mess 3">Mess 3</option>
            </select>
          )}
        />

        <div className="flex flex-col gap-1">
          <h4 className="text-[18px] font-semibold text-gray-500">Document</h4>
          <DocumentUpload />
        </div>

        {/* PASSWORD FIELD */}
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field, fieldState }) => (
            <div className="relative ">
              <input
                {...field}
                type={passwordShow ? "text" : "password"}
                placeholder=" "
                className={`peer w-full border rounded-md px-3 h-[50px] text-base focus:outline-none focus:border-black transition-all ${
                  fieldState.error ? "border-red-500" : "border-gray-200"
                }`}
              />

              <label
                className="absolute left-3 bg-white px-1 text-gray-500 transition-all
        top-1/2 -translate-y-1/2 text-sm md:text-base
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-black
        peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
        pointer-events-none"
              >
                Password
              </label>

              <div
                onClick={() => setPasswordShow(!passwordShow)}
                className="absolute top-1/2 -translate-y-1/2 right-4 text-2xl text-gray-500 cursor-pointer"
              >
                {passwordShow ? <IoMdEyeOff /> : <IoMdEye />}
              </div>

              {fieldState.error && (
                <span className="text-red-500 text-sm absolute left-0 -bottom-5">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />

        {/* CONFIRM PASSWORD FIELD */}
        <Controller
          name="confirmpassword"
          control={control}
          rules={{
            required: "Confirm password is required",
            validate: (value) =>
              value === passwordValue || "Passwords do not match",
          }}
          render={({ field, fieldState }) => (
            <div className="relative ">
              <input
                {...field}
                type={confirmPasswordShow ? "text" : "password"}
                placeholder=" "
                className={`peer w-full border rounded-md px-3 h-[50px] text-base focus:outline-none focus:border-black transition-all ${
                  fieldState.error ? "border-red-500" : "border-gray-200"
                }`}
              />

              <label
                className="absolute left-3 bg-white px-1 text-gray-500 transition-all
        top-1/2 -translate-y-1/2 text-sm md:text-base
        peer-focus:top-1 peer-focus:text-xs peer-focus:text-black
        peer-not-placeholder-shown:top-1 peer-not-placeholder-shown:text-xs
        pointer-events-none"
              >
                Confirm Password
              </label>

              <div
                onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                className="absolute top-1/2 -translate-y-1/2 right-4 text-2xl text-gray-500 cursor-pointer"
              >
                {confirmPasswordShow ? <IoMdEyeOff /> : <IoMdEye />}
              </div>

              {fieldState.error && (
                <span className="text-red-500 text-sm absolute left-0 -bottom-5">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
        />

        <div className="flex items-center  gap-2">
          <input type="checkbox" />
          <p className="text-black font-semibold">
            I confirm that the above information is correct.
          </p>
        </div>
        <button
          type="submit"
          className="w-full cursor-pointer py-3 bg-black text-white rounded-lg"
        >
          Sign Up
        </button>

        <div className="flex items-center gap-2 text-sm md:text-[18px]">
          <p>Already have an account?</p>
          <Link
            className="text-[rgba(50,100,245,0.90)] font-semibold"
            to="/auth/login"
          >
            Login
          </Link>
        </div>
      </form>

      {/* {showHostelModal && (
        <AddHostelModal
          onClose={() => setShowHostelModal(false)}
          onAdd={(name) => console.log("Add Hostel:", name)}
        />
      )} */}
    </>
  );
};

// const AddHostelModal = ({ onClose, onAdd }) => {
//   const [hostelName, setHostelName] = useState("");

//   const handleAdd = () => {
//     if (!hostelName.trim()) return;
//     onAdd(hostelName);
//     setHostelName("");
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="bg-white rounded-2xl w-full max-w-md p-6 relative space-y-4">
//         <button
//           onClick={onClose}
//           className="absolute cursor-pointer right-4 top-4 p-1 border rounded-full"
//         >
//           <X size={18} />
//         </button>
//         <h2 className="text-xl font-semibold">Add Hostel Branch</h2>
//         <input
//           value={hostelName}
//           onChange={(e) => setHostelName(e.target.value)}
//           placeholder="Enter hostel name"
//           className="w-full border rounded-md px-3 h-[45px]"
//         />
//         <button
//           onClick={handleAdd}
//           className="w-full cursor-pointer bg-orange-500 text-white py-2 rounded-md"
//         >
//           Add Hostel
//         </button>
//       </div>
//     </div>
//   );
// };

export default UserForm;
