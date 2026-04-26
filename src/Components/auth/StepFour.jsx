import React, { useEffect, useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import CustomSelect from "../CustomSelect";
import { FloatingInput } from "./StepOne";
import { api } from "../../utils/countryApi";

import AdminDocumentUpload from "../AdminDocumentUpload";

const rolesList = ["admin", "user", "staff", "management"];

const StepFour = ({
  prevStep,
  form,
  selected,
  setSelected,
  setFormUploadData,
  setAdminFormUploadData,
  isPending,
}) => {
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

  const permission = watch("permissions");

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

  /* -----------------------------
      ADMIN TYPE
  ------------------------------*/

  const [adminOptions, setAdminOptions] = useState(["Admin", "Authority"]);

  const [adminType, setAdminType] = useState({
    Admin: ["Company", "Institute"],
    Authority: ["Company ", "Institute"],
  });

  const admin = watch("admin");

  const adminTypes = useMemo(() => {
    return adminType[admin] || [];
  }, [admin, adminType]);

  useEffect(() => {
    form.setValue("admin_panel", "");
  }, [admin]);

  const handleCreateAdmin = (value) => {
    setAdminOptions((prev) => [...prev, value]);

    setAdminType((prev) => ({
      ...prev,
      [value]: [],
    }));
  };

  const handleCreateAdminType = (value) => {
    if (!admin) return;

    setAdminPanelState((prev) => ({
      ...prev,
      [admin]: [...(prev[admin] || []), value],
    }));
  };

  const adminLabel = admin ? `${admin} Type` : "Type";

  const nameLabel = admin ? `${admin}` : "";

  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-2.5 mb-3">
          <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200 p-3">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <div className="w-1.5 h-6 bg-orange-600 rounded-full"></div>

              <h4 className="text-xl font-semibold text-slate-800 tracking-tight">
                {nameLabel} Information
              </h4>
            </div>
          </div>

          <>
            <div className="bg-gray-50 flex flex-col gap-3 p-4">
              <Controller
                name="admin"
                control={control}
                rules={{ required: "This field required" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <CustomSelect
                      options={adminOptions}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onCreate={handleCreateAdmin}
                      allowCreate
                    />
                    {error && (
                      <p className="text-red-500 text-sm">{error.message}</p>
                    )}
                  </>
                )}
              />

              {/* type of */}
              <Controller
                name="admin_type"
                control={control}
                rules={{ required: "This Field required" }}
                render={({ field, fieldState: { error } }) => (
                  <div className="space-y-1">
                    <label className="text-sm font-medium">
                      {adminLabel} <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      label={admin ? `${admin} Type` : "Admin Type"}
                      options={adminTypes}
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      onCreate={handleCreateAdminType}
                      allowCreate
                      disabled={!admin}
                    />
                    {error && (
                      <p className="text-red-500 text-sm">{error.message}</p>
                    )}
                  </div>
                )}
              />

              <FloatingInput
                label={`Name Of ${nameLabel}`}
                error={errors.institute_name}
                {...register("institute_name", {
                  required: "this field required",
                })}
              />
            </div>
            <FloatingInput
              label={`Name Of Institute`}
              error={errors.institute_name}
              {...register("institute_name", {
                required: "this field required",
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
                    <AdminDocumentUpload
                      onDocumentsChange={onChange}
                      initialDocuments={uploadedDocs}
                      setAdminFormUploadData={setAdminFormUploadData}
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
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-indigo-50 to-white border-b border-slate-200">
            <div className="w-1.5 h-6 bg-orange-600 rounded-full"></div>
            <h4 className="text-xl font-semibold text-slate-800">
              {nameLabel} Permission
            </h4>
          </div>

          <div className="p-5 flex flex-col gap-4">
            <Controller
              name="permissions"
              control={control}
              rules={{
                validate: (value) =>
                  (value && value.length > 0) ||
                  "At least one permission is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  {rolesList.map((item, index) => {
                    const currentValue = field.value || [];
                    const isActive = currentValue.includes(item);

                    const toggle = () => {
                      const updated = isActive
                        ? currentValue.filter((p) => p !== item)
                        : [...currentValue, item];
                      field.onChange(updated);
                      setSelected(updated); // বাইরের state ও sync রাখুন
                    };

                    return (
                      <div
                        key={index}
                        onClick={toggle}
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

                  {/* Error message */}
                  {error && (
                    <p className="text-red-500 text-sm mt-1">
                      * {error.message}
                    </p>
                  )}
                </>
              )}
            />
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
          {isPending ? "Processing..." : "Signup"}
        </button>
      </div>
    </div>
  );
};

export default StepFour;
