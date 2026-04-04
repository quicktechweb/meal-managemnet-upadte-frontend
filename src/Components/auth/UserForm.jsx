import React, { useEffect, useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import { Link, useNavigate } from "react-router-dom";

import { api } from "../../utils/countryApi";
import CustomSelect from "../CustomSelect";
import DynamicDropdown from "../DynamicSelect";
import DocumentUpload from "../DocumentUpload";
import { useInstituteUserRegistration } from "../../api/auth/auth.hook";
import { useApprovedInstituteUser } from "../../api/cms/user.hook";
import toast from "react-hot-toast";

const InputField = ({ label, name, control, type = "text", rules = {} }) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field, fieldState }) => (
      <>
        <div className="relative">
          <input
            {...field}
            type={type}
            placeholder=" "
            className={`peer w-full text-[13px] border rounded-md px-3 h-[50px] text-sm focus:outline-none text-gray-500 focus:border-black transition-all ${
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
        </div>
        {fieldState.error && (
          <span className="text-red-500 text-sm  ">
            {fieldState.error.message}
          </span>
        )}
      </>
    )}
  />
);

const UserForm = () => {
  const navigate = useNavigate();
  const [formUploadData, setFormUploadData] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [divisionLoading, setDivisionLoading] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);

  const { handleSubmit, control, watch } = useForm();
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

  const uploadedDocs = watch("documents") || [];

  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const passwordValue = watch("password");

  const [hallSelect, setHallSelect] = useState(false);

  // custom select
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");

  // dynamic dropdown

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

  const { data } = useApprovedInstituteUser();

  const selectedInstituteId = watch("institute_id");

  console.log(selectedInstituteId);

  const selectedInstitute = data?.find(
    (item) => item._id === selectedInstituteId,
  );

  console.log(selectedInstitute);

  const { mutateAsync, isPending } = useInstituteUserRegistration();

  const onSubmit = async (data) => {
    await mutateAsync(
      { name_of_institute: selectedInstitute?.name_of_institute, ...data },
      {
        onSuccess: (data) => {
          if (data) {
            toast.success(data?.message);

            navigate("/auth/login");
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
        },
      },
    );
  };

  return (
    <>
      <FormProvider {...{ handleSubmit, control, watch }}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 ">
          <InputField
            label="Full name"
            name="full_name"
            control={control}
            rules={{ required: "Full Name is required" }}
          />
          <InputField
            label="Nick name"
            name="nick_name"
            control={control}
            rules={{}}
          />

          <InputField
            label="Username"
            name="username"
            control={control}
            rules={{ required: "Username required" }}
          />

          <InputField
            label="Father Name"
            name="father_name"
            control={control}
            rules={{ required: "Father name required" }}
          />
          <InputField
            label="Mother Name"
            name="mother_name"
            control={control}
            rules={{ required: "Mother name required" }}
          />
          <InputField
            label="Guardian Name"
            name="guardian_name"
            control={control}
            rules={{ required: "Guardian name required" }}
          />

          <Controller
            name="relation_with_guardian"
            control={control}
            rules={{
              required: "Relation with Guardian is required",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <CustomSelect
                label="Relation with Guardian"
                options={gurdianOptions}
                value={value ?? ""}
                onChange={(newValue) => {
                  onChange(newValue);
                }}
                onCreate={handleCreateGurdian}
                allowCreate
                showOther
              />
            )}
          />

          <InputField
            label="Guardian Contact Number"
            name="guardian_number"
            control={control}
            rules={{ required: "Guardian Contact Number required" }}
          />

          <Controller
            name="gender"
            control={control}
            rules={{
              required: "Gender is required",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>

                <CustomSelect
                  label="Gender"
                  options={genderOptions}
                  value={value ?? ""}
                  onChange={(newValue) => {
                    onChange(newValue);
                    setGender(newValue);
                  }}
                  onCreate={handleCreateGender}
                  allowCreate
                  showOther
                />

                {error && (
                  <p className="text-red-500 text-sm mt-1">{error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="religion"
            control={control}
            rules={{
              required: "Religion is required",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Religion
                </label>

                <CustomSelect
                  label="Religion"
                  options={religionOptions}
                  value={value ?? ""}
                  onChange={(newValue) => {
                    onChange(newValue);
                    setReligion(newValue);
                  }}
                  onCreate={handleCreateReligion}
                  allowCreate
                  showOther
                />

                {error && (
                  <p className="text-red-500 text-sm mt-1">{error.message}</p>
                )}
              </div>
            )}
          />

          <div className="mt-2">
            <InputField
              label="Date of Birth"
              name="date_of_birth"
              control={control}
              type="date"
              rules={{ required: "Date of Birth required" }}
            />
          </div>

          <DynamicDropdown control={control} />

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
                <InputField label="Village" name="village" control={control} />
                <InputField
                  label="Location"
                  name="location"
                  control={control}
                />
              </>
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
            <InputField
              label="Phone Number"
              name="phone"
              control={control}
              rules={{
                required: "Phone Number is required",
              }}
            />
          </div>

          {/* Password */}

          {/* institute */}
          <Controller
            name="institute_id"
            control={control}
            rules={{
              required: "Institute is required",
            }}
            render={({ field }) => (
              <select
                {...field}
                className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-base text-gray-500"
              >
                <option value="">Name Of the Institute</option>
                {data?.map(
                  (institute) => (
                    console.log(institute),
                    (
                      <option key={institute?._id} value={institute?._id}>
                        {institute.name_of_institute}
                      </option>
                    )
                  ),
                )}
              </select>
            )}
          />

          {/* hall */}
          <Controller
            name="hall"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full border border-gray-200 rounded-md px-3 h-[50px] text-base text-gray-500"
              >
                <option value="">Name Of the Hall</option>

                {selectedInstitute?.name_of_hall && (
                  <option value={selectedInstitute.name_of_hall}>
                    {selectedInstitute.name_of_hall}
                  </option>
                )}
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

                {selectedInstitute?.name_of_mess && (
                  <option value={selectedInstitute.name_of_mess}>
                    {selectedInstitute.name_of_mess}
                  </option>
                )}
              </select>
            )}
          />

          {/* room number */}
          <InputField
            label="Room Number"
            name="room_number"
            control={control}
            rules={{
              required: "Room Number is required",
            }}
          />

          <div className="flex flex-col gap-1">
            <h4 className="text-[18px] font-semibold text-gray-500">
              Document
            </h4>
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
                    setFormUploadData={setFormUploadData}
                  />
                  {error && (
                    <p className="text-red-500 text-sm mt-1">
                      * {error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>

          {/* PASSWORD FIELD */}
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field, fieldState }) => (
              <>
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
                </div>
                {fieldState.error && (
                  <span className="text-red-500 text-sm ">
                    {fieldState.error.message}
                  </span>
                )}
              </>
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
              <>
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
                </div>
                {fieldState.error && (
                  <span className="text-red-500 text-sm ">
                    {fieldState.error.message}
                  </span>
                )}
              </>
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
            disabled={isPending}
            className="w-full cursor-pointer py-3 bg-black text-white rounded-lg"
          >
            {isPending ? "creating..." : "Sign Up"}
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
      </FormProvider>
    </>
  );
};

export default UserForm;
