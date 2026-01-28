import { useForm } from "react-hook-form";

import { toast } from "react-hot-toast";
import { useRegister } from "../../api/auth/auth.hook";

export default function FullAccessRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const mutation = useRegister();

  const onSubmit = async (data) => {
    const userData = {
      userType: "allAccess",
      ...data,
    };
    try {
      await mutation.mutateAsync(userData);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* --- Left Side: Branding & Progress --- */}
      <div className="md:w-[35%] bg-indigo-600 p-8 md:p-16 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-12 flex items-center justify-center backdrop-blur-md">
            <div className="w-6 h-6 bg-white rounded-full" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Start your <br /> journey with us.
          </h1>
          <p className="text-indigo-100 text-lg max-w-sm">
            Join over 5,000+ professionals managing their workflow with our
            platform.
          </p>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-50" />
      </div>

      {/* --- Right Side: The Form --- */}
      <div className="flex-1 bg-gray-50/50 p-8 md:p-20 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            {/* Section: Account Info */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-indigo-600"></span>
                Account Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Username" error={errors.username}>
                  <input
                    {...register("username", { required: "Required" })}
                    placeholder="skywalker_7"
                    className={inputClass(errors.username)}
                  />
                </InputGroup>
                <InputGroup label="Email Address" error={errors.email}>
                  <input
                    {...register("email", { required: "Required" })}
                    type="email"
                    placeholder="name@company.com"
                    className={inputClass(errors.email)}
                  />
                </InputGroup>
                <InputGroup label="Password" error={errors.password}>
                  <input
                    {...register("password", { required: "Required" })}
                    type="password"
                    placeholder="••••••••"
                    className={inputClass(errors.password)}
                  />
                </InputGroup>
                <InputGroup label="Phone Number">
                  <input
                    {...register("phoneNumber")}
                    placeholder="+1 (555) 000-0000"
                    className={inputClass()}
                  />
                </InputGroup>
              </div>
            </section>

            {/* Section: Personal Info */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-indigo-600"></span>
                Personal Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <InputGroup label="Full Legal Name">
                    <input
                      {...register("name")}
                      className={inputClass()}
                      placeholder="John Doe"
                    />
                  </InputGroup>
                </div>
                <InputGroup label="Date of Birth">
                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    className={inputClass()}
                  />
                </InputGroup>
                <InputGroup label="Gender">
                  <select {...register("gender")} className={inputClass()}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </InputGroup>
                <InputGroup label="Nationality">
                  <input
                    {...register("nationality")}
                    className={inputClass()}
                    placeholder="Citizen of..."
                  />
                </InputGroup>
                <InputGroup label="Religion">
                  <input {...register("religion")} className={inputClass()} />
                </InputGroup>
              </div>
            </section>

            {/* Footer / Submit */}
            <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-gray-500 text-sm">
                By clicking register, you agree to our{" "}
                <span className="text-indigo-600 font-bold underline cursor-pointer">
                  Terms
                </span>
                .
              </p>
              <button
                type="submit"
                disabled={isSubmitting || mutation.isLoading}
                className="w-full md:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50"
              >
                {isSubmitting || mutation.isLoading
                  ? "Processing..."
                  : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// --- Sub-components remain the same ---

function InputGroup({ label, children, error }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
        {label}
      </label>
      {children}
      {error && (
        <span className="text-xs text-red-500 font-medium ml-1">
          {error.message}
        </span>
      )}
    </div>
  );
}

const inputClass = (err) => `
  w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 outline-none
  ${
    err
      ? "border-red-100 bg-red-50 focus:border-red-500 text-red-900"
      : "border-gray-100 bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50"
  }
`;
