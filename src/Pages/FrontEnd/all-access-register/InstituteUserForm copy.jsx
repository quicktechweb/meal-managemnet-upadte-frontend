import React, { useEffect, useState } from "react";

import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  Home,
  Briefcase,
  Heart,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { FaRegIdCard } from "react-icons/fa";
import { BiSolidInstitution } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";

import toast from "react-hot-toast";
import { useRegister } from "../../../api/auth/auth.hook";
import { api } from "../../../utils/countryApi";
const InstituteUserForm = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [singleCountry, setSingleCountry] = useState(null);
  const [singleState, setSingleState] = useState(null);
  const [singleCity, setSingleCity] = useState(null);

  const [documentType, setdocumentType] = useState(null);

  const [instituteType, setInstituteType] = useState(null);

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

  const [showPassword, setShowPassword] = useState(false);

  const [instituteImage, setInstituteImage] = useState(null);

  const [instituteImages, setInstituteImages] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { mutateAsync, isPending } = useRegister();

  const selectedUserType = watch("userType");

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("name", data?.fullName);
    formData.append("email", data?.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("phoneNumber", data.phone);
    formData.append("occupation", data.occupation);
    formData.append("fatherName", data.fatherName);
    formData.append("motherName", data.motherName);
    formData.append("country", singleCountry?.name);
    formData.append("state", singleState?.name);
    formData.append("city", singleCity?.name);
    formData.append("address", data.address);
    formData.append("websiteAccesstype", "all-access");
    formData.append("userType", selectedUserType);

    if (data?.institute) {
      formData.append("instituteName", data?.institute);
    }
    if (instituteImages.length > 0) {
      instituteImages.forEach((image) => {
        formData.append("institute_image", image);
      });
    }

    try {
      await mutateAsync(formData);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  };

  const password = watch("password");

  const FormInput = ({ icon: Icon, type, placeholder, name, validation }) => (
    <div className="space-y-1">
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors">
          <Icon size={18} />
        </div>
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
          className="w-full pl-12 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all placeholder:text-gray-400"
        />
      </div>
      {errors[name] && (
        <p className="text-red-500 text-xs ml-1">{errors[name].message}</p>
      )}
    </div>
  );
  const handleInstituteImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));

    setInstituteImages(files);
    setInstituteImage(previewUrls);
  };

  const handleDelete = (index) => {
    setInstituteImage((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput
        icon={User}
        type="text"
        placeholder="Username"
        name="username"
        validation={{ required: "Required" }}
      />

      <FormInput
        icon={Mail}
        type="email"
        placeholder="Email Address"
        name="email"
        validation={{
          required: "Required",
          pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
        }}
      />

      <div className="md:col-span-2 space-y-2">
        <FormInput
          icon={Phone}
          type="tel"
          placeholder="Phone Number"
          name="phone"
          validation={{ required: "Required" }}
        />
      </div>
      <div className="md:col-span-2 space-y-2">
        {/* Country */}
        <select
          value={country}
          onChange={(e) => {
            const selected = countries.find((s) => s.iso2 === e.target.value);
            setCountry(e.target.value);
            setsingleCountry(selected);
          }}
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
            onChange={(e) => {
              const selected = states.find((s) => s.iso2 === e.target.value);
              setState(e.target.value);

              setSingleState(selected);
            }}
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
            onChange={(e) => {
              const selected = cities.find((s) => s.name === e.target.value);
              setCity(e.target.value);
              setSingleCity(selected);
            }}
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
      {city && (
        <div className="md:col-span-2">
          <FormInput
            icon={Home}
            type="text"
            placeholder="Residential Address"
            name="address"
            validation={{ required: "Required" }}
          />
        </div>
      )}
      <div className="md:col-span-2 flex flex-col gap-2.5">
        <label className="block text-sm md:text-base font-medium text-gray-600 mb-2">
          Select Institute Type
        </label>
        <div className="flex gap-2.5 flex-wrap items-center">
          {/* scholl */}
          <div className="flex items-center gap-2">
            <label className="switch !text-[10px] lg:!text-xs">
              <input
                type="radio"
                value="school"
                {...register("instituteType")}
                className="sr-only"
                onChange={() => setInstituteType("school")}
              />
              <span className="slider"></span>
            </label>
            <p className="text-sm lg:text-base">School</p>
          </div>

          {/* college */}
          <div className="flex items-center gap-2">
            <label className="switch !text-[10px] lg:!text-xs">
              <input
                type="radio"
                value="college"
                {...register("instituteType")}
                className="sr-only"
                onChange={() => setInstituteType("college")}
              />
              <span className="slider"></span>
            </label>
            <p className="text-sm lg:text-base">College</p>
          </div>

          {/* university */}
          <div className="flex items-center gap-2">
            <label className="switch !text-[10px] lg:!text-xs">
              <input
                type="radio"
                value="university"
                {...register("instituteType")}
                className="sr-only"
                onChange={() => setInstituteType("university")}
              />
              <span className="slider"></span>
            </label>
            <p className="text-sm lg:text-base">University</p>
          </div>
        </div>
      </div>

      {instituteType && (
        <div className="md:col-span-2 space-y-2">
          <FormInput
            icon={BiSolidInstitution}
            type="text"
            placeholder="Institute Name"
            name="institute"
          />
        </div>
      )}

      <div className="md:col-span-2 flex flex-col gap-2.5">
        <label className="block text-sm md:text-base font-medium text-gray-600 mb-2">
          Select Document Type
        </label>
        <div className="flex gap-2.5 flex-wrap items-center">
          {/* tin */}
          <div className="flex items-center gap-2">
            <label className="switch !text-[10px] lg:!text-xs">
              <input
                type="radio"
                value="tin"
                {...register("documentType")}
                className="sr-only"
                onChange={() => setdocumentType("tin")}
              />
              <span className="slider"></span>
            </label>
            <p className="text-sm lg:text-base">TIN</p>
          </div>

          {/* others */}
          <div className="flex items-center gap-2">
            <label className="switch !text-[10px] lg:!text-xs">
              <input
                type="radio"
                value="others"
                {...register("documentType")}
                className="sr-only"
                onChange={() => setdocumentType("others")}
              />
              <span className="slider"></span>
            </label>
            <p className="text-sm lg:text-base">Others</p>
          </div>
        </div>
      </div>

      {documentType === "tin" && (
        <div className="md:col-span-2 ">
          <FormInput
            icon={FaRegIdCard}
            type="number"
            placeholder="Tin Number"
            name="tin"
          />
        </div>
      )}

      {documentType === "others" && (
        <div className="md:col-span-2 ">
          <FormInput
            icon={FaRegIdCard}
            type="number"
            placeholder="Others.."
            name="other"
          />
        </div>
      )}

      {/* Password Fields */}
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600">
          <Lock size={18} />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          {...register("password", {
            required: "Required",
            minLength: { value: 6, message: "Min 6 chars" },
          })}
          className="w-full pl-12 pr-12 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Lock size={18} />
        </div>
        <input
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Required",
            validate: (v) => v === password || "Match failed",
          })}
          className="w-full pl-12 pr-4 py-2 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {(documentType === "nid" ||
        documentType === "tin" ||
        documentType === "others") && (
        <div className="lg:col-span-2">
          <div className="w-full max-w-xl">
            <label className="block text-sm md:text-base font-medium text-gray-600 mb-2">
              Upload Your Document
            </label>

            <div className="relative flex items-center justify-between gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl bg-white hover:border-purple-600  transition">
              <input
                type="file"
                id="image"
                multiple
                onChange={handleInstituteImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <span className="text-gray-400 text-sm truncate">
                Choose an image…
              </span>

              <span className="shrink-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-sm px-4 py-1.5 rounded-lg  transition">
                Browse
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
          </div>

          {Array.isArray(instituteImage) && (
            <div className="flex flex-wrap gap-2.5 items-center mt-2">
              {instituteImage.map((img, index) => (
                <div className="relative w-20 h-20">
                  <img
                    key={index}
                    src={img}
                    className="w-full h-full object-cover border border-gray-300 "
                  />
                  <button
                    onClick={() => handleDelete(index)}
                    type="button"
                    className="absolute cursor-pointer top-1 left-1 text-red-500"
                  >
                    <IoCloseCircle />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="md:col-span-2 mt-2 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer text-sm md:text-base"
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Creating Account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default InstituteUserForm;
