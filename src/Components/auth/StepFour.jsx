import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import CustomSelect from "../CustomSelect";
import { FloatingInput } from "./StepOne";
import { api } from "../../utils/countryApi";
import DocumentUpload from "../DocumentUpload";

const permissionsList = [
  "Institute Admin Panel",
  "Institute User Panel",
  "Institute Staff Panel",
  "Institute Management Panel",
];

const StepFour = ({ prevStep, form, selected, setSelected }) => {
  const {
    register,
    formState: { errors },
    watch,
    control,
    instituteOptions,
    handleCreateInstituteType,
  } = form;

  const uploadedDocs = watch("documents_admin") || [];

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [divisionLoading, setDivisionLoading] = useState(false);
  const [districtLoading, setDistrictLoading] = useState(false);

  const selectedCountry = watch("country_admin");
  const selectedState = watch("state_admin");
  const selectedDivision = watch("division_admin");

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

  const togglePermission = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item],
    );
  };

  // const onSubmit = (data) => {
  //   const payload = {
  //     ...data,
  //     permissions: selected,
  //   };
  // };

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2.5 mb-3">
          <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-3">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="w-1.5 h-6 bg-orange-600 rounded-full"></div>

              <h4 className="text-xl font-semibold text-slate-800 tracking-tight">
                Admin / Authority Information
              </h4>
            </div>
          </div>

          <>
            <Controller
              name="institute_type"
              control={form.control}
              rules={{
                required: "Institute Type is required",
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
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
              label="Date of Birth"
              type={"date"}
              error={errors.dob}
              {...register("dob", { required: "Date of Birth required" })}
            />

            <div className="w-full flex flex-col gap-2">
              <h4 className="text-[18px] font-semibold text-gray-500">
                Address
              </h4>

              {/* Country */}
              <Controller
                name="country_admin"
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
                  name="state_admin"
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
                  name="division_admin"
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
                  name="district_admin"
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
              {watch("district_admin") && (
                <>
                  <FloatingInput
                    label="Village"
                    type={"text"}
                    name="village_admin"
                    error={errors.village_admin}
                    {...register("village_admin", {
                      required: "Village required",
                    })}
                  />
                  <FloatingInput
                    label="Location"
                    type={"text"}
                    name="location_admin"
                    error={errors.location_admin}
                    {...register("location_admin", {
                      required: "Location required",
                    })}
                  />
                </>
              )}
            </div>

            <div className="w-full flex flex-col gap-2">
              <h4 className="text-[18px] font-semibold text-gray-500">
                Contact
              </h4>
              <FloatingInput
                label="Email"
                type="email"
                error={errors.email_admin}
                {...register("email_admin", { required: "Email required" })}
              />
              <FloatingInput
                label="Phone Number"
                error={errors.phone_admin}
                {...register("phone_admin", { required: "Phone required" })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="text-[18px] font-semibold text-gray-500">
                Document
              </h4>
              <Controller
                name="documents_admin"
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
                      <p className="text-red-500 text-sm mt-1">
                        * {error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden h-[400px]">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-indigo-50 to-white border-b border-slate-200">
            <div className="w-1.5 h-6 bg-orange-600 rounded-full"></div>
            <h4 className="text-xl font-semibold text-slate-800">
              Admin / Authority Permission
            </h4>
          </div>

          {/* Permission Items */}
          <div className="p-5 flex flex-col gap-4">
            {permissionsList.map((item, index) => {
              const isActive = selected.includes(item);

              return (
                <div
                  key={index}
                  onClick={() => togglePermission(item)}
                  className={`cursor-pointer rounded-xl px-4 py-3 border transition-all duration-200
              ${
                isActive
                  ? "bg-orange-600 text-white border-orange-600 shadow-md scale-[1.02]"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50"
              }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex  gap-2">
        {/* <button
          type="button"
          onClick={prevStep}
          className="w-full border cursor-pointer py-1.5 lg:py-3 rounded-lg"
        >
          Back
        </button> */}
        <button
          type="submit"
          className="w-full bg-black cursor-pointer text-white py-1.5 lg:py-3 rounded-lg"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default StepFour;
