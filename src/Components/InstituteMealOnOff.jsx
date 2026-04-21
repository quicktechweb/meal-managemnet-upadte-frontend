import { useForm } from "react-hook-form";
import {
  useGetInstituteMealOnOffTime,
  useGetMealOnOffTime,
  useInstituteMealOnOffTime,
} from "../api/cms/user.hook";
import { useEffect } from "react";

const InstituteMealOnOff = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      meal_on_off_time: "",
    },
  });

  const { mutateAsync } = useInstituteMealOnOffTime();

  const { data: mealOnOffTime } = useGetInstituteMealOnOffTime();

  useEffect(() => {
    if (mealOnOffTime?.meal_on_off_time) {
      reset({ meal_on_off_time: mealOnOffTime?.meal_on_off_time });
    }
  }, [mealOnOffTime]);

  const onSubmit = async (data) => {
    await mutateAsync(data);
  };

  return (
    <div className="  flex items-center  ">
      <div className="bg-white rounded-2xl  p-4 w-full max-w-2xl shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3  border-b border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-emerald-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-medium text-gray-900">
              Meal on/off settings
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Configure meal cutoff time
            </p>
          </div>
        </div>

        {/* Form */}
        <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
          {/* Meal on/off time field */}
          <div className="space-y-1.5 mb-2">
            <label
              htmlFor="meal_on_off_time"
              className="block text-sm font-medium text-gray-600"
            >
              Meal on/off time
            </label>
            <div className="flex items-center gap-3">
              <input
                id="meal_on_off_time"
                type="number"
                className={`w-24 px-3 py-2 text-sm text-center bg-gray-50 border rounded-lg outline-none transition-all
                  ${
                    errors.meal_on_off_time
                      ? "border-red-400 focus:ring-2 focus:ring-red-100"
                      : "border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  }`}
                {...register("meal_on_off_time", {
                  required: "This field is required",
                })}
              />
              <span className="text-sm text-gray-500">hours before cutoff</span>
            </div>
            {errors.meal_on_off_time && (
              <p className="text-xs text-red-500 mt-1">
                {errors.meal_on_off_time.message}
              </p>
            )}
          </div>

          {/* Divider */}
          <hr className="border-gray-100" />

          {/* Buttons */}
          <div className="space-y-2 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg
                hover:bg-emerald-700 active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {isSubmitting ? "Saving..." : "Save settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InstituteMealOnOff;
