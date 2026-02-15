import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { api } from "../../utils/countryApi";

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
          className={`peer w-full border rounded-md px-3 h-[50px] text-lg focus:outline-none focus:border-black transition-all ${
            fieldState.error ? "border-red-500" : "border-gray-200"
          }`}
        />
        <label
          className="absolute left-3 bg-white px-1 text-gray-500 transition-all
          top-1/2 -translate-y-1/2 text-sm md:text-lg
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

  const { handleSubmit, control, watch, setValue } = useForm();
  const navigate = useNavigate();
  const [passwordShow, setPasswordShow] = useState(false);

  const [hallSelect, setHallSelect] = useState(false);

  const occupation = watch("occupation");

  const onSubmit = (data) => {
    if (data) {
      navigate("/dashboard/mealmanagement");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-6"
      >
        <InputField
          label="Name"
          name="name"
          control={control}
          rules={{ required: "Name is required" }}
        />
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

        {/* Password */}
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field, fieldState }) => (
            <div className="relative">
              <input
                {...field}
                type={passwordShow ? "text" : "password"}
                placeholder=" "
                className={`peer w-full border rounded-md px-3 h-[50px] text-lg focus:outline-none focus:border-black transition-all ${
                  fieldState.error ? "border-red-500" : "border-gray-200"
                }`}
              />
              <label
                className="absolute left-3 bg-white px-1 text-gray-500 transition-all
              top-1/2 -translate-y-1/2 text-sm md:text-lg
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
                <span className="text-red-500 text-sm mt-1 absolute left-0 -bottom-5">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          )}
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
        <InputField
          label="Date of Birth"
          name="dob"
          control={control}
          type="date"
        />
        <InputField label="Nationality" name="nationality" control={control} />

        <InputField label="Gender" name="gender" control={control} />

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
          <>
            <InputField
              label="Present Address"
              name="presentAddress"
              control={control}
            />
            <InputField
              label="Permanent Address"
              name="permanentAddress"
              control={control}
            />
          </>
        )}

        <InputField label="Phone Number" name="phone" control={control} />

        {/* Occupation */}
        <div className="flex flex-col gap-1">
          <h4>Occupation</h4>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setValue("occupation", "job_holder")}
              className={`px-4 py-1.5 flex-1 rounded-2xl flex items-center justify-center gap-1.5 border ${
                occupation === "job_holder" ? "border-black" : "border-gray-300"
              }`}
            >
              {occupation === "job_holder" && (
                <FaCheckCircle className="text-green-600 text-sm" />
              )}
              Job Holder
            </button>
            <button
              type="button"
              onClick={() => setValue("occupation", "student")}
              className={`px-4 py-1.5 flex-1 rounded-2xl flex items-center justify-center gap-1.5 border ${
                occupation === "student" ? "border-black" : "border-gray-300"
              }`}
            >
              {occupation === "student" && (
                <FaCheckCircle className="text-green-600 text-sm" />
              )}
              Student
            </button>
          </div>

          {occupation === "job_holder" && (
            <div className="mt-2 flex flex-col gap-3 md:gap-6">
              <InputField label="Post Name" name="postName" control={control} />
              <InputField
                label="Company Name"
                name="companyName"
                control={control}
              />
            </div>
          )}
          {occupation === "student" && (
            <div className="mt-2 flex flex-col gap-3 md:gap-6">
              <InputField
                label="Department Name"
                name="departmentName"
                control={control}
              />
              <InputField label="Year" name="year" control={control} />
            </div>
          )}
        </div>

        {/* Hostel */}
        <Controller
          name="hostel"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg"
            >
              <option value="" disabled>
                Name Of the Institute
              </option>
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
              className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg"
            >
              <option value="" disabled>
                Name Of the Hall / Hostel
              </option>
              <option value="Hall 1">Hall 1</option>
              <option value="Hall 2">Hall 2</option>
              <option value="Hall 3">Hall 3</option>
            </select>
          )}
        />

        {hallSelect && (
          <div className="w-full ">
            <label className="block text-sm md:text-base font-medium text-gray-600 mb-2">
              Upload Your Hall Admission Form Image
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
        )}

        <Controller
          name="mess"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-lg"
            >
              <option value="" disabled>
                Name Of the Mess
              </option>
              <option value="mess 1">Mess 1</option>
              <option value="mess 2">Mess 2</option>
              <option value="mess 3">Mess 3</option>
            </select>
          )}
        />

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
