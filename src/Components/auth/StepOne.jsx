import React, { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { api } from "../../utils/countryApi";
import CustomSelect from "../CustomSelect";
import DocumentUpload from "../DocumentUpload";
import { Controller } from "react-hook-form";

const StepOne = ({ form, nextStep }) => {
  const {
    register,
    formState: { errors },
    watch,
    trigger,
    control,
  } = form;
  const uploadedDocs = watch("documents") || [];

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [divisionLoading, setDivisionLoading] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);

  const selectedCountry = watch("country");
  const selectedState = watch("state");
  const selectedDivision = watch("division");

  useEffect(() => {
    if (!selectedState) return;

    const loadDivisions = async () => {
      try {
        setDivisionLoading(true);
        const res = await api.get("/divisions");
        setDivisions(res?.data?.data || []);
      } catch (err) {
        setDivisions([]);
      } finally {
        setDivisionLoading(false);
      }
    };

    loadDivisions();
  }, [selectedState]);

  useEffect(() => {
    if (!selectedDivision) return;

    const loadDistricts = async () => {
      try {
        setDistrictLoading(true);
        const res = await api.get(`/division/${selectedDivision}`);
        setDistricts(res?.data?.data || []);
      } catch (err) {
        setDistricts([]);
      } finally {
        setDistrictLoading(false);
      }
    };

    loadDistricts();
  }, [selectedDivision]);

  const [institute, setInstitute] = useState("");
  const [instituteOptions, setInstituteOptions] = useState([
    "School",
    "Office",
    "Collage",
  ]);

  const [hall, setHall] = useState("");
  const [hallOptions, setHallOptions] = useState([]);

  const [messOptions, setMessOptions] = useState([]);

  const passwordValue = watch("password");
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const handleCreateInstituteType = (newItem) => {
    setInstituteOptions((prev) => [...prev, newItem]);
  };

  const handleCreateHall = (newItem) => {
    setHallOptions((prev) => [...prev, newItem]);
  };

  const handleCreateMess = (newItem) => {
    setMessOptions((prev) => [...prev, newItem]);
  };

  return (
    <>
      <Controller
        name="institute_type"
        control={form.control}
        rules={{
          required: "Institute Type is required",
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Institute Type <span className="text-red-500">*</span>
            </label>

            <CustomSelect
              label="Institute Type"
              options={instituteOptions}
              value={value ?? ""}
              onChange={(newValue) => {
                onChange(newValue);
                setInstitute(newValue);
              }}
              onCreate={handleCreateInstituteType}
              allowCreate
              showOther
            />

            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </div>
        )}
      />

      <FloatingInput
        label="Name Of the Institute"
        error={errors.institute_name}
        {...register("institute_name", { required: "Institute Name required" })}
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

      <Controller
        name="hall_name"
        control={form.control}
        rules={{ required: "Hall name is required" }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <CustomSelect
              label="Name of Hall"
              options={hallOptions}
              value={value ?? ""}
              onChange={(v) => {
                onChange(v);
                setHall(v);
              }}
              onCreate={handleCreateHall}
              allowCreate
              showOther
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </>
        )}
      />

      <Controller
        name="mess_name"
        control={form.control}
        rules={{}}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <CustomSelect
              label="Name of Mess"
              options={messOptions}
              value={value ?? ""}
              onChange={(v) => {
                onChange(v);
                setHall(v);
              }}
              onCreate={handleCreateMess}
              allowCreate
              showOther
            />

            {error && (
              <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
          </>
        )}
      />

      {/* Address section */}
      <div className="w-full flex flex-col gap-2">
        <h4 className="text-[18px] font-semibold text-gray-500">Address</h4>

        {/* Country */}
        <Controller
          name="country"
          control={control}
          rules={{ required: "Country is required" }}
          render={({ field }) => (
            <select
              {...field}
              className="border border-gray-300 px-2 py-3 rounded w-full text-gray-600"
            >
              <option value="">Select Country</option>
              <option value="bangladesh">Bangladesh</option>
            </select>
          )}
        />

        {/* State */}
        {selectedCountry && (
          <Controller
            name="state"
            control={control}
            rules={{ required: "State is required" }}
            render={({ field }) => (
              <select
                {...field}
                className="border border-gray-300 px-2 py-3 rounded w-full text-gray-600"
              >
                <option value="">Select State</option>
                <option value="bangladesh">Bangladesh</option>
              </select>
            )}
          />
        )}

        {/* Division */}
        {selectedState && (
          <Controller
            name="division"
            control={control}
            rules={{ required: "Division is required" }}
            render={({ field }) => (
              <select
                {...field}
                disabled={divisionLoading}
                className="border border-gray-300 px-2 py-3 rounded w-full text-gray-600"
              >
                <option value="">
                  {divisionLoading ? "Loading..." : "Select Division"}
                </option>

                {divisions?.map((item) => (
                  <option key={item.division} value={item.division}>
                    {item.division}
                  </option>
                ))}
              </select>
            )}
          />
        )}

        {/* District */}
        {selectedDivision && (
          <Controller
            name="district"
            control={control}
            rules={{ required: "District is required" }}
            render={({ field }) => (
              <select
                {...field}
                disabled={districtLoading}
                className="border border-gray-300 px-2 py-3 rounded w-full text-gray-600"
              >
                <option value="">
                  {districtLoading ? "Loading..." : "Select District"}
                </option>

                {districts?.map((item) => (
                  <option key={item.district} value={item.district}>
                    {item.district}
                  </option>
                ))}
              </select>
            )}
          />
        )}

        {/* Village + Location */}
        {watch("district") && (
          <>
            <FloatingInput
              label="Village"
              type={"text"}
              name="village"
              error={errors.village}
              {...register("village", { required: "Village required" })}
            />
            <FloatingInput
              label="Location"
              type={"text"}
              name="location"
              error={errors.location}
              {...register("location", { required: "Location required" })}
            />
          </>
        )}
      </div>

      {/* Contact */}
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
          error={errors.phone}
          {...register("phone", { required: "Phone required" })}
        />
      </div>

      {/* Document */}
      <div className="flex flex-col gap-1">
        <h4 className="text-[18px] font-semibold text-gray-500">Document</h4>
        <Controller
          name="documents"
          control={control}
          rules={{
            validate: (value) =>
              (value && value.length > 0) ||
              "At least one document is required",
          }}
          render={({ field: { onChange }, fieldState: { error } }) => (
            <>
              <DocumentUpload
                onDocumentsChange={onChange}
                initialDocuments={uploadedDocs}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">* {error.message}</p>
              )}
            </>
          )}
        />
      </div>

      {/* Passwords */}
      <div className="flex flex-col gap-2">
        <>
          <div className="relative w-full">
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
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm ">{errors.password.message}</p>
          )}
        </>

        <>
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
          </div>
          {errors.confirm_password && (
            <p className="text-red-500 text-sm ">
              {errors.confirm_password.message}
            </p>
          )}
        </>
      </div>

      <button
        type="button"
        onClick={nextStep}
        className="w-full cursor-pointer bg-black text-white py-1.5 lg:py-3 rounded-lg"
      >
        Next
      </button>
    </>
  );
};

const FloatingInput = React.forwardRef(
  ({ label, type = "text", error, ...rest }, ref) => (
    <>
      <div className="relative w-full">
        <input
          ref={ref}
          type={type}
          placeholder=" "
          {...rest}
          className="peer w-full border border-gray-300 rounded-md px-3 h-[40px]"
        />
        <FloatingLabel text={label} />
      </div>
      {error && <p className="text-red-500 text-sm ">{error.message}</p>}
    </>
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
export default StepOne;
