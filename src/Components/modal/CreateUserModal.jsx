import {
  Shield,
  X,
  User,
  Users,
  Briefcase,
  MapPin,
  Phone,
  Building,
  FileText,
  Lock,
  ChevronDown,
  PlusIcon,
} from "lucide-react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import SectionHeader from "../common/SectionHeader";
import Field from "../common/Field";
import SelectField, { inputCls } from "../common/SelectField";
import CreateUserDocumentUpload from "../common/CreateUserDocumentUpload";
import CustomSelect from "../CustomSelect";
import { useAllLocation } from "../../api/cms/user.hook";
import Err from "../common/Err";
import { useInstituteUserRegistration } from "../../api/auth/auth.hook";
import useInstituteAuth from "../../Hooks/useInstituteAuth";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse, format } from "date-fns";
import { uploadToImgBB } from "../../utils/uploadToImageBB";
const CreateUserModal = ({ role, onClose }) => {
  const { user } = useInstituteAuth();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      full_name: "",
      nickname: "",
      username: "",
      gender: "",
      religion: "",
      dob: "",
      father_name: "",
      mother_name: "",
      guardian_name: "",
      guardian_type: "",
      guardian_number: "",
      occupation_type: "",
      occupation_institute: "",
      occupation_designation: "",
      occupation_degree: "",
      occupation_year: "",
      country: "",
      state: "",
      division: "",
      district: "",
      village: "",
      location: "",
      email: "",
      phone: "",
      name_of_institute: user?.user?.information?.name_of_institute,
      name_of_the_hall: "",
      name_of_the_mess: "",
      room_no: "",
      documents: [],
      password: "",
      confirm_password: "",
    },
  });

  const [formUploadData, setFormUploadData] = useState([]);
  const [genderOptions, setGenderOptions] = useState(["Male", "Female"]);
  const [religionOptions, setReligionOptions] = useState(["Islam", "Hindu"]);
  const [gurdianOptions, setGurdianOptions] = useState([
    "father",
    "mother",
    "brother",
    "sister",
  ]);

  // reference part

  const [references, setReferences] = useState([]);
  const [certificates, setCertificates] = useState([]);

  console.log(certificates);

  const handleChange = async (idx, field, value) => {
    if (field === "nidImage" && value instanceof File) {
      setReferences((prev) =>
        prev.map((ref, i) =>
          i === idx ? { ...ref, nidImageLoading: true } : ref,
        ),
      );

      const url = await uploadToImgBB(value);

      setReferences((prev) =>
        prev.map((ref, i) =>
          i === idx ? { ...ref, nidImage: url, nidImageLoading: false } : ref,
        ),
      );
    } else {
      setReferences((prev) =>
        prev.map((ref, i) => (i === idx ? { ...ref, [field]: value } : ref)),
      );
    }
  };

  const addReference = () => {
    setReferences((prev) => [
      ...prev,
      { name: "", nid: "", nidImage: "", phone: "", occupation: "" },
    ]);
  };

  const removeReference = (idx) => {
    setReferences((prev) => prev.filter((_, i) => i !== idx));
  };

  // certificate part

  const handleCertificateChange = async (idx, field, value) => {
    if (field === "certificateImage" && value instanceof File) {
      setCertificates((prev) =>
        prev.map((cert, i) =>
          i === idx ? { ...cert, certificateImageLoading: true } : cert,
        ),
      );

      const url = await uploadToImgBB(value);

      setCertificates((prev) =>
        prev.map((cert, i) =>
          i === idx
            ? { ...cert, certificateImage: url, certificateImageLoading: false }
            : cert,
        ),
      );
    } else {
      setCertificates((prev) =>
        prev.map((cert, i) => (i === idx ? { ...cert, [field]: value } : cert)),
      );
    }
  };

  const addCertificate = () => {
    setCertificates((prev) => [
      ...prev,
      { degreeName: "", result: "", certificateImage: null },
    ]);
  };

  const removeCertificate = (idx) => {
    setCertificates((prev) => prev.filter((_, i) => i !== idx));
  };

  const selectedCountry = watch("country");
  const selectedState = watch("state");
  const selectedDivision = watch("division");
  const selectedDistrict = watch("district");
  const selectedUpazila = watch("upazila");

  const { data: location } = useAllLocation();

  const districts = location?.find((loc) => loc.name === selectedDivision);

  const upazila = districts?.districts?.find(
    (upa) => upa?.name === selectedDistrict,
  );

  const handleCreateGender = (newItem) => {
    setGenderOptions((prev) => [...prev, newItem]);
  };
  const handleCreateReligion = (newItem) => {
    setReligionOptions((prev) => [...prev, newItem]);
  };

  const handleCreateGurdian = (newItem) => {
    setGurdianOptions((prev) => [...prev, newItem]);
  };

  const password = watch("password");
  const uploadedDocs = watch("documents") || [];
  const query = useQueryClient();
  // user create api
  const { mutateAsync, isPending } = useInstituteUserRegistration();
  const onSubmit = async (data) => {
    await mutateAsync(
      {
        institute_id: user?.user?._id,
        ...data,
        references: references,
        certificates: certificates,
        added_by: "admin",
      },
      {
        onSuccess: (data) => {
          if (data) {
            toast.success(data?.message);
            query.invalidateQueries(["approved-user"]);
            onClose();
          }
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message);
        },
      },
    );
  };

  const errBorder = (name) =>
    errors[name]
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl mx-4 overflow-hidden flex flex-col"
        style={{ maxHeight: "92vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Shield size={16} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Create User
              </h3>
              <p className="text-xs text-gray-400 capitalize">
                Role: {role?.name ?? "Member"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <form
            id="create-user-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >
            {/* ── Personal Information ── */}
            <div>
              <SectionHeader
                icon={User}
                title="Personal Information"
                color="border-blue-200"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Field label="Full Name" required>
                  <input
                    className={`${inputCls} ${errBorder("full_name")}`}
                    placeholder="Enter full name"
                    {...register("full_name", {
                      required: "Full name is required",
                    })}
                  />
                  <Err errors={errors} name="full_name" />
                </Field>

                <Field label="Nickname">
                  <input
                    className={inputCls}
                    placeholder="Enter nickname"
                    {...register("nickname")}
                  />
                </Field>

                <Field label="Username" required>
                  <input
                    className={`${inputCls} ${errBorder("username")}`}
                    placeholder="Enter username"
                    {...register("username", {
                      required: "Username is required",
                      minLength: { value: 3, message: "Minimum 3 characters" },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: "Only letters, numbers & underscores",
                      },
                    })}
                  />
                  <Err errors={errors} name="username" />
                </Field>

                <Controller
                  name="gender"
                  control={control}
                  rules={{
                    required: "Gender is required",
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div className="space-y-1">
                      <label className="block text-xs font-medium  text-gray-700">
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

                      <Err errors={errors} name="gender" />
                    </div>
                  )}
                />

                <Controller
                  name="religion"
                  control={control}
                  rules={{
                    required: "Religion is required",
                  }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-700">
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

                      <Err errors={errors} name="religion" />
                    </div>
                  )}
                />

                <Field label="Date of Birth" required>
                  <Controller
                    name="dob"
                    control={control}
                    rules={{ required: "Date of birth is required" }}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        className={`${inputCls} ${errBorder("dob")}`}
                        placeholderText="DD/MM/YYYY"
                        dateFormat="dd/MM/yyyy"
                        selected={
                          value ? parse(value, "yyyy-MM-dd", new Date()) : null
                        }
                        onChange={(date) =>
                          onChange(date ? format(date, "yyyy-MM-dd") : "")
                        }
                      />
                    )}
                  />
                  <Err errors={errors} name="dob" />
                </Field>
              </div>
            </div>

            {/* ── Family & Guardian ── */}
            <div>
              <SectionHeader
                icon={Users}
                title="Family & Guardian"
                color="border-purple-200"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Field label="Father's Name">
                  <input
                    className={inputCls}
                    placeholder="Enter father's name"
                    {...register("father_name", {
                      required: "Father Name  is required",
                    })}
                  />
                  <Err errors={errors} name="father_name" />
                </Field>

                <Field label="Mother's Name">
                  <input
                    className={inputCls}
                    placeholder="Enter mother's name"
                    {...register("mother_name", {
                      required: "Mother Name is required",
                    })}
                  />
                  <Err errors={errors} name="mother_name" />
                </Field>

                <Field label="Guardian's Name">
                  <input
                    className={inputCls}
                    placeholder="Enter guardian's name"
                    {...register("guardian_name")}
                  />
                  <Err errors={errors} name="guardian_name" />
                </Field>

                <Controller
                  name="relation_with_guardian"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-gray-700">
                        Relation with guardian
                      </label>
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
                      <Err errors={errors} name="relation_with_guardian" />
                    </div>
                  )}
                />

                <Field label="Guardian's Number">
                  <input
                    className={inputCls}
                    placeholder="+880 XXXXXXXXXX"
                    {...register("guardian_number")}
                  />
                  <Err errors={errors} name="guardian_number" />
                </Field>
              </div>
            </div>

            {/* ── Occupation ── */}
            <div>
              <SectionHeader
                icon={Briefcase}
                title="Occupation"
                color="border-amber-200"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Field label="Occupation Type">
                  <Controller
                    name="occupation_type"
                    control={control}
                    render={({ field }) => (
                      <SelectField
                        placeholder="Select type"
                        options={[
                          "Student",
                          "Service",
                          "Business",
                          "Teacher",
                          "Doctor",
                          "Engineer",
                          "Other",
                        ]}
                        {...field}
                      />
                    )}
                  />
                </Field>

                <Field label="Institute / Organization">
                  <input
                    className={inputCls}
                    placeholder="Institute name"
                    {...register("occupation_institute")}
                  />
                </Field>

                <Field label="Designation">
                  <input
                    className={inputCls}
                    placeholder="e.g. Software Engineer"
                    {...register("occupation_designation")}
                  />
                </Field>

                <Field label="Degree / Department">
                  <input
                    className={inputCls}
                    placeholder="e.g. B.Sc CSE"
                    {...register("occupation_degree")}
                  />
                </Field>

                <Field label="Passing / Joining Year">
                  <input
                    type="number"
                    className={`${inputCls} ${errBorder("occupation_year")}`}
                    placeholder="YYYY"
                    {...register("occupation_year", {
                      min: { value: 1950, message: "Year must be after 1950" },
                      max: { value: 2100, message: "Year must be before 2100" },
                    })}
                  />
                  <Err errors={errors} name="occupation_year" />
                </Field>
                <div className="flex items-end">
                  <button
                    onClick={addCertificate}
                    type="button"
                    className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 rounded-md px-2.5 py-2.5 transition-all bg-blue-50 hover:bg-blue-100"
                  >
                    + Add Certificate
                  </button>
                </div>
              </div>

              {/* certificate section */}
              <div className="flex flex-wrap gap-3 mt-4">
                {certificates.map((cert, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 max-w-[375px] rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-500">
                        Certificate #{idx + 1}
                      </span>
                      <button
                        onClick={() => removeCertificate(idx)}
                        type="button"
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div>
                        <label className="text-xs font-medium text-gray-600">
                          Degree Name
                        </label>
                        <input
                          className={inputCls}
                          type="text"
                          placeholder="Enter the Degree Name"
                          value={cert.degreeName}
                          onChange={(e) =>
                            handleCertificateChange(
                              idx,
                              "degreeName",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600">
                          Result
                        </label>
                        <input
                          className={inputCls}
                          type="text"
                          placeholder="Enter the Result"
                          value={cert.result}
                          onChange={(e) =>
                            handleCertificateChange(
                              idx,
                              "result",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-600">
                          Certificate Image
                        </label>
                        <input
                          className={inputCls}
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleCertificateChange(
                              idx,
                              "certificateImage",
                              e.target.files[0],
                            )
                          }
                        />
                        {/* Loading indicator */}
                        {cert.certificateImageLoading && (
                          <p className="text-xs text-blue-500 mt-1">
                            Uploading...
                          </p>
                        )}
                        {cert.certificateImage &&
                          !cert.certificateImageLoading && (
                            <p className="text-xs text-green-500 mt-1">
                              ✓ Uploaded
                            </p>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5">
                <Field label="Marital Status" />
                <Controller
                  name="marital_status"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <select
                        {...field}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition  appearance-none pr-8 cursor-pointer"
                      >
                        <option value="">Select Marital Status</option>
                        <option value="married">Married</option>
                        <option value="unmarried">Unmarried</option>
                        <option value="divorce">Divorce</option>
                      </select>
                      <ChevronDown
                        size={13}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                      />
                    </div>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Field label="Salary">
                  <input
                    className={inputCls}
                    placeholder="10000"
                    {...register("salary")}
                  />
                  <Err errors={errors} name="salary" />
                </Field>
              </div>

              <div className="flex flex-col gap-1.5">
                <Field label="Experiences Year">
                  <input
                    className={inputCls}
                    placeholder="2"
                    {...register("experience")}
                  />
                  <Err errors={errors} name="experience" />
                </Field>
              </div>

              <div className="flex items-end ">
                <button
                  onClick={addReference}
                  type="button"
                  className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-400 rounded-md px-2.5 py-2.5 transition-all bg-blue-50 hover:bg-blue-100"
                >
                  <PlusIcon size={13} />
                  Add Reference
                </button>
              </div>
            </div>
            {/* Dynamic reference cards */}
            <div className="flex flex-wrap  gap-3 mt-1">
              {references.map((ref, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-500">
                      Reference #{idx + 1}
                    </span>

                    <button
                      onClick={() => removeReference(idx)}
                      type="button"
                      className="text-xs text-red-400 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div>
                      <label className="text-xs font-medium text-gray-600">
                        Name
                      </label>
                      <input
                        className={inputCls}
                        type="text"
                        placeholder="Enter the reference Name"
                        value={ref.name}
                        onChange={(e) =>
                          handleChange(idx, "name", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">
                        NID
                      </label>
                      <input
                        className={inputCls}
                        type="number"
                        placeholder="Enter the NID Number"
                        value={ref.nid}
                        onChange={(e) =>
                          handleChange(idx, "nid", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">
                        NID Image
                      </label>
                      <input
                        className={inputCls}
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleChange(idx, "nidImage", e.target.files[0])
                        }
                      />
                      {ref.nidImageLoading && (
                        <p className="text-xs text-blue-500 mt-1">
                          Uploading...
                        </p>
                      )}
                      {ref.nidImage && !ref.nidImageLoading && (
                        <p className="text-xs text-green-500 mt-1">
                          ✓ Uploaded
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">
                        Phone Number
                      </label>
                      <input
                        className={inputCls}
                        type="text"
                        placeholder="Enter the reference Phone Number"
                        value={ref.phone}
                        onChange={(e) =>
                          handleChange(idx, "phone", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600">
                        Occupation
                      </label>
                      <input
                        className={inputCls}
                        type="text"
                        placeholder="Enter the reference Occupation"
                        value={ref.occupation}
                        onChange={(e) =>
                          handleChange(idx, "occupation", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Address ── */}
            <div>
              <SectionHeader
                icon={MapPin}
                title="Address"
                color="border-green-200"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <Field label="Country" />
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <select
                          {...field}
                          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition  appearance-none pr-8 cursor-pointer"
                        >
                          <option value="">Select Country</option>
                          <option value="bangladesh">Bangladesh</option>
                        </select>
                        <ChevronDown
                          size={13}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                      </div>
                    )}
                  />
                </div>

                {/* State */}
                {selectedCountry && (
                  <div className="space-y-1">
                    <Field label="State" />
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <select
                            {...field}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition appearance-none pr-8 cursor-pointer"
                          >
                            <option value="">Select State</option>
                            <option value="bangladesh">Bangladesh</option>
                          </select>
                          <ChevronDown
                            size={13}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />
                        </div>
                      )}
                    />
                  </div>
                )}

                {/* Division */}
                {selectedState && (
                  <div className="space-y-1">
                    <Field label="Division" />
                    <Controller
                      name="division"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <select
                            {...field}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition  appearance-none pr-8 cursor-pointer"
                          >
                            <option value="">Select Division</option>

                            {location?.map((item) => (
                              <option key={item._id} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={13}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />
                        </div>
                      )}
                    />
                  </div>
                )}

                {/* District */}
                {selectedDivision && (
                  <div className="space-y-1">
                    <Field label="Division" />
                    <Controller
                      name="district"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <select
                            {...field}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition  appearance-none pr-8 cursor-pointer"
                          >
                            <option value="">Select District</option>

                            {districts?.districts?.map((item) => (
                              <option key={item.name} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={13}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />
                        </div>
                      )}
                    />
                  </div>
                )}

                {selectedDistrict && (
                  <div className="space-y-1">
                    <Field label="Upazila" />
                    <Controller
                      name="upazila"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <select
                            {...field}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition  appearance-none pr-8 cursor-pointer"
                          >
                            <option value="">Select Upazila</option>

                            {upazila?.upazilas?.map((item) => (
                              <option key={item.name} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>

                          <ChevronDown
                            size={13}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                          />
                        </div>
                      )}
                    />
                  </div>
                )}

                {/* Village + Location */}
                {selectedUpazila && (
                  <>
                    <Field label="Village / Area">
                      <input
                        className={inputCls}
                        placeholder="Enter village / area"
                        {...register("village")}
                      />
                    </Field>

                    <Field label="Full Address / Location">
                      <input
                        className={inputCls}
                        placeholder="House, road, block…"
                        {...register("location")}
                      />
                    </Field>
                  </>
                )}
              </div>
            </div>

            {/* ── Contact ── */}
            <div>
              <SectionHeader
                icon={Phone}
                title="Contact Information"
                color="border-teal-200"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Field label="Email Address" required>
                  <input
                    type="email"
                    className={`${inputCls} ${errBorder("email")}`}
                    placeholder="user@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <Err errors={errors} name="email" />
                </Field>

                <Field label="Phone Number" required>
                  <input
                    type="tel"
                    className={`${inputCls} ${errBorder("phone")}`}
                    placeholder="+880 XXXXXXXXXX"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[+]?[0-9\s\-()]{7,15}$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                  <Err errors={errors} name="phone" />
                </Field>
              </div>
            </div>

            {/* ── Institute ── */}
            <div>
              <SectionHeader
                icon={Building}
                title="Institute Information"
                color="border-indigo-200"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Field label="Name of the Institute" required>
                  <input
                    readOnly
                    className={`${inputCls} ${errBorder("name_of_institute")}`}
                    placeholder="Institute name"
                    {...register("name_of_institute", {
                      required: "Institute name is required",
                    })}
                  />
                  <Err errors={errors} name="name_of_institute" />
                </Field>

                <Field label="Name of the Hall">
                  <input
                    className={inputCls}
                    placeholder="Hall name"
                    {...register("name_of_the_hall")}
                  />
                </Field>

                <Field label="Name of the Mess">
                  <input
                    className={inputCls}
                    placeholder="Mess name"
                    {...register("name_of_the_mess")}
                  />
                </Field>

                <Field label="Room No.">
                  <input
                    className={inputCls}
                    placeholder="e.g. 204-B"
                    {...register("room_no")}
                  />
                </Field>
              </div>
            </div>

            {/* ── Documents & Password ── */}
            <div>
              <SectionHeader
                icon={FileText}
                title="Documents & Security"
                color="border-rose-200"
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Documents Upload */}
                <div className="col-span-2">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-xs font-semibold text-gray-500">
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
                      render={({
                        field: { onChange },
                        fieldState: { error },
                      }) => (
                        <>
                          <CreateUserDocumentUpload
                            onDocumentsChange={onChange}
                            initialDocuments={uploadedDocs}
                            formUploadData={formUploadData}
                            setFormUploadData={setFormUploadData}
                          />

                          <Err errors={errors} name="documents" />
                        </>
                      )}
                    />
                  </div>
                </div>

                {/* Password */}
                <Field label="Password" required>
                  <div className="relative">
                    <Lock
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                    />
                    <input
                      type="password"
                      className={`${inputCls} pl-8 ${errBorder("password")}`}
                      placeholder="Set password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Minimum 8 characters",
                        },
                      })}
                    />
                  </div>
                  <Err errors={errors} name="password" />
                </Field>

                {/* Confirm Password */}
                <Field label="Confirm Password" required>
                  <div className="relative">
                    <Lock
                      size={13}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                    />
                    <input
                      type="password"
                      className={`${inputCls} pl-8 ${errBorder("confirm_password")}`}
                      placeholder="Confirm password"
                      {...register("confirm_password", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                  </div>
                  <Err errors={errors} name="confirm_password" />
                </Field>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/60 shrink-0">
          <p className="text-xs text-gray-400">
            Fields marked <span className="text-red-400">*</span> are required
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="create-user-form"
              disabled={isPending}
              className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 active:bg-blue-800 transition shadow-sm"
            >
              {isPending ? "Creating..." : "Create User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
