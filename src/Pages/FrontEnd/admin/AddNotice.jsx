import { PlusCircle, Tag } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { useCreateNotice } from "../../../api/admin/admin.api";

const AddNotice = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useCreateNotice();

  const onSubmit = async (formData) => {
    const formdata = new FormData();

    formdata.append("title", formData.notice_title);
    formdata.append("notice_expire_date", formData.expire_date);

    try {
      await mutateAsync(formdata);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex bg-gray-50/50">
      <div className="w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2 rounded-lg">
              <PlusCircle className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">
              Add Notice
            </h3>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Notice Title */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Tag size={16} className="text-slate-400" />
              Notice Title
            </label>

            <input
              type="text"
              placeholder="Notice title given here..."
              {...register("notice_title", {
                required: "Notice Title is required",
              })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />

            {errors.notice_title && (
              <p className="text-red-500 text-sm">
                {errors.notice_title.message}
              </p>
            )}
          </div>

          {/* expire date */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              Expire Date
            </label>

            <div className="relative">
              <input
                type="datetime-local"
                {...register("expire_date", {
                  required: "Expire Date is required",
                })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3  outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {errors.expire_date && (
              <p className="text-red-500 text-sm">
                {errors.expire_date.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex justify-center items-center gap-2 cursor-pointer"
          >
            {isPending ? "Processing..." : "Create Notice"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
