import React, { useEffect, useMemo, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { api } from "../../utils/countryApi";
import CustomSelect from "../CustomSelect";
import DocumentUpload from "../DocumentUpload";
import { Controller } from "react-hook-form";
import { JapaneseYen } from "lucide-react";

const StepOne = ({
  form,
  nextStep,
  // handleCreateInstituteType,
  // instituteOptions,
  isPending,
  setFormUploadData,
  formUploadData,
  // setOrganizeOptions,
  // organizeOptions,
  // handleCreateOrganizeType,
}) => {
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
  const [thana, setThana] = useState([]);
  const [divisionLoading, setDivisionLoading] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);

  console.log(thana);

  const selectedCountry = watch("country");
  const selectedState = watch("state");
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");
  const selectedThana = watch("thana");

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

  useEffect(() => {
    if (!selectedDistrict) return;

    const loadThana = () => {
      const thana = districts?.find(
        (district) => district.district === selectedDistrict,
      );
      setThana(thana?.upazilla);
    };

    loadThana();
  }, [selectedDistrict]);

  const passwordValue = watch("password");
  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const [organizeOptions, setOrganizeOptions] = useState([
    "Company",
    "Institute",
  ]);

  const [instituteOptionsState, setInstituteOptionsState] = useState({
    Company: ["Office", "Startup", "Agency"],
    Institute: ["School", "College", "University"],
  });

  // watch organization
  const organizationType = form.watch("organization_type");

  // dynamic label
  const instituteLabel = organizationType ? `${organizationType} Type` : "Type";

  // dynamic options
  const instituteOptions = useMemo(() => {
    return instituteOptionsState[organizationType] || [];
  }, [organizationType, instituteOptionsState]);

  // reset institute when organization changes
  useEffect(() => {
    form.setValue("institute_type", "");
  }, [organizationType, form]);

  // create organization
  const handleCreateOrganizeType = (value) => {
    setOrganizeOptions((prev) => [...prev, value]);

    setInstituteOptionsState((prev) => ({
      ...prev,
      [value]: [],
    }));
  };

  // create institute
  const handleCreateInstituteType = (value) => {
    if (!organizationType) return;

    setInstituteOptionsState((prev) => ({
      ...prev,
      [organizationType]: [...(prev[organizationType] || []), value],
    }));
  };

  /* -----------------------------
     HALL
  ------------------------------*/

  const [hallTypeOptions, setHallTypeOptions] = useState(["Boys", "Girls"]);

  const [hallOptionsState, setHallOptionsState] = useState({
    Boys: ["Boys Hall 1", "Boys Hall 2"],
    Girls: ["Girls Hall 1"],
  });

  const hallType = watch("hall_type");

  const hallOptions = useMemo(() => {
    return hallOptionsState[hallType] || [];
  }, [hallType, hallOptionsState]);

  const handleCreateHallType = (value) => {
    setHallTypeOptions((prev) => [...prev, value]);

    setHallOptionsState((prev) => ({
      ...prev,
      [value]: [],
    }));
  };

  const handleCreateHallName = (value) => {
    if (!hallType) return;

    setHallOptionsState((prev) => ({
      ...prev,
      [hallType]: [...(prev[hallType] || []), value],
    }));
  };

  /* -----------------------------
     MESS
  ------------------------------*/

  const [messTypeOptions, setMessTypeOptions] = useState(["Student", "Staff"]);

  const [messOptionsState, setMessOptionsState] = useState({
    Student: ["Student Mess A"],
    Staff: ["Staff Mess B"],
  });

  const messType = watch("mess_type");

  const messOptions = useMemo(() => {
    return messOptionsState[messType] || [];
  }, [messType, messOptionsState]);

  const handleCreateMessType = (value) => {
    setMessTypeOptions((prev) => [...prev, value]);

    setMessOptionsState((prev) => ({
      ...prev,
      [value]: [],
    }));
  };

  const handleCreateMessName = (value) => {
    if (!messType) return;

    setMessOptionsState((prev) => ({
      ...prev,
      [messType]: [...(prev[messType] || []), value],
    }));
  };
  return (
    <>
      <div className="bg-gray-100 p-3 rounded-2xl flex flex-col gap-2">
        <Controller
          name="organization_type"
          control={form.control}
          rules={{
            required: "This field is required",
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="space-y-1">
              <CustomSelect
                label="Organization Type"
                options={organizeOptions}
                value={value ?? ""}
                onChange={(newValue) => onChange(newValue)}
                onCreate={handleCreateOrganizeType}
                allowCreate
              />

              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </div>
          )}
        />

        {/* Dynamic Institute / Company Type */}

        <Controller
          name="institute_type"
          control={form.control}
          rules={{
            required: `This field is required is required`,
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">
                {instituteLabel} <span className="text-red-500">*</span>
              </label>

              <CustomSelect
                label={instituteLabel}
                options={instituteOptions}
                value={value ?? ""}
                onChange={(newValue) => onChange(newValue)}
                onCreate={handleCreateInstituteType}
                allowCreate
                disabled={!organizationType}
              />

              {error && <p className="text-red-500 text-sm">{error.message}</p>}
            </div>
          )}
        />
      </div>

      <FloatingInput
        label={`Name Of the ${organizationType}`}
        error={errors.institute_name}
        {...register("institute_name", {
          required: `${organizationType} Name required`,
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

      {/* HALL TYPE */}
      <div className="bg-gray-100 p-3 rounded-2xl flex flex-col gap-2">
        <Controller
          name="hall_type"
          control={control}
          rules={{}}
          render={({ field, fieldState: { error } }) => (
            <div className="space-y-1">
              <CustomSelect
                label="Hall Type"
                options={hallTypeOptions}
                value={field.value ?? ""}
                onChange={field.onChange}
                onCreate={handleCreateHallType}
                allowCreate
              />
            </div>
          )}
        />

        {/* HALL NAME */}
        <Controller
          name="hall_name"
          rules={{}}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">
                {hallType ? `${hallType} Name` : "Name"}
              </label>
              <CustomSelect
                label={hallType ? `${hallType} Name` : "Hall Name"}
                options={hallOptions}
                value={field.value ?? ""}
                onChange={field.onChange}
                onCreate={handleCreateHallName}
                allowCreate
                disabled={!hallType}
              />
            </div>
          )}
        />
      </div>

      <div className="bg-gray-100 p-3 rounded-2xl flex flex-col gap-2">
        <Controller
          name="mess_type"
          rules={{}}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <CustomSelect
              label="Mess Type"
              options={messTypeOptions}
              value={field.value ?? ""}
              onChange={field.onChange}
              onCreate={handleCreateMessType}
              allowCreate
            />
          )}
        />

        {/* MESS NAME */}
        <Controller
          name="mess_name"
          control={control}
          rules={{}}
          render={({ field, fieldState: { error } }) => (
            <div className="space-y-1">
              <label className="text-sm font-medium">
                {messType ? `${messType} Name` : "Name"}
              </label>
              <CustomSelect
                label={messType ? `${messType} Name` : "Mess Name"}
                options={messOptions}
                value={field.value ?? ""}
                onChange={field.onChange}
                onCreate={handleCreateMessName}
                allowCreate
                disabled={!messType}
              />
            </div>
          )}
        />
      </div>

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

        {selectedDistrict && (
          <Controller
            name="thana"
            control={control}
            rules={{ required: "Thana is required" }}
            render={({ field }) => (
              <select
                {...field}
                className="border border-gray-300 px-2 py-3 rounded w-full text-gray-600"
              >
                <option value="">Select upazilla</option>

                {thana?.map((item, index) => (
                  <option key={item.index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            )}
          />
        )}

        {/* Village + Location */}
        {watch("thana") && (
          <>
            <FloatingInput
              label="Post Office"
              type={"text"}
              name="post"
              error={errors.post}
              {...register("post", { required: "Post office required" })}
            />
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
        <FloatingInput label="Email" type="email" {...register("email")} />
        <FloatingInput label="Phone Number" {...register("phone")} />
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
                formUploadData={formUploadData}
                setFormUploadData={setFormUploadData}
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
        disabled={isPending}
        onClick={nextStep}
        className="w-full cursor-pointer bg-black text-white py-1.5 lg:py-3 rounded-lg disabled:cursor-not-allowed"
      >
        {isPending ? "Processing..." : "Next"}
      </button>
    </>
  );
};

export const FloatingInput = React.forwardRef(
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

export const FloatingLabel = ({ text }) => (
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
