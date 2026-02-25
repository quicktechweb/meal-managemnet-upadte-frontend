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
import CustomSelect from "../../../Components/CustomSelect";
import DocumentUpload from "../../../Components/DocumentUpload";
const InstituteUserForm = () => {
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

  const [adminType, setAdminType] = useState("");
  const [adminTypeOptions, setAdminTypeOptions] = useState([
    "admin",
    "authority",
  ]);

  const handleCreateHall = (newItem) => {
    setHallOptions((prev) => [...prev, newItem]);
  };
  const handleCreateMess = (newItem) => {
    setMessOptions((prev) => [...prev, newItem]);
  };

  const handleCreateAdminType = (newItem) => {
    setAdminTypeOptions((prev) => [...prev, newItem]);
  };

  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <form className="flex flex-col  gap-4" onSubmit={handleSubmit(onSubmit)}>
      <CustomSelect
        label="Institute Type"
        options={instituteOptions}
        value={institute}
        onChange={setInstitute}
        onCreate={handleCreateInstituteType}
        allowCreate
        showOther
      />
      <FormInput
        icon={User}
        type="text"
        placeholder="Name of the Institute"
        name="institute"
        validation={{ required: "Required" }}
      />

      <FormInput
        icon={User}
        type="text"
        placeholder="Username"
        name="username"
        validation={{ required: "Required" }}
      />

      <FormInput
        icon={User}
        type="number"
        placeholder="Number of member"
        name="number-of-member"
        validation={{ required: "Required" }}
      />

      <FormInput
        icon={User}
        type="date"
        placeholder="Date of Birth"
        name="number-of-member"
        validation={{ required: "Required" }}
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
        <h4 className="text-[18px] font-semibold text-gray-500">
          Admin / Authority
        </h4>
        <CustomSelect
          label="Type of Admin"
          options={adminTypeOptions}
          value={adminType}
          onChange={setAdminType}
          onCreate={handleCreateAdminType}
          allowCreate
          showOther
        />
        <FormInput
          icon={User}
          type="text"
          placeholder="Name of Admin / Authority"
          name="admin"
          validation={{
            required: "Required",
          }}
        />
        <FormInput
          icon={Phone}
          type="tel"
          placeholder="Phone Number"
          name="institutephone"
          validation={{ required: "Required" }}
        />
      </div>

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
            <FormInput
              icon={Home}
              type="text"
              placeholder="Village"
              name="village"
            />

            <FormInput
              icon={Home}
              type="text"
              placeholder="Location"
              name="address"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-[18px] font-semibold text-gray-500">Contact</h4>
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

        <FormInput
          icon={Phone}
          type="tel"
          placeholder="Phone Number"
          name="phone"
          validation={{ required: "Required" }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="text-[18px] font-semibold text-gray-500">Document</h4>
        <DocumentUpload />
      </div>

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
      <div className="flex items-center  gap-2">
        <input type="checkbox" />
        <p className="text-black font-semibold">
          I confirm that the above information is correct.
        </p>
      </div>
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
