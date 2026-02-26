import { PlusCircle, Tag } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateNotice,
  useGetNotices,
  useUpdateNotice,
} from "../../../api/admin/admin.api";
import { useParams } from "react-router-dom";

const formatDateTimeLocal = (isoString) => {
  if (!isoString) return "";

  const date = new Date(isoString);

  const offset = date.getTimezoneOffset();

  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
};

const UpdateNotice = () => {
  const { id } = useParams();
  const { data: notices } = useGetNotices();

  const singleNotice = notices?.find((notice) => notice?._id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (singleNotice) {
      reset({
        title: singleNotice?.title,
        notice_expire_date: formatDateTimeLocal(
          singleNotice?.notice_expire_date,
        ),
      });
    }
  }, [singleNotice, reset]);

  const { mutateAsync, isPending } = useUpdateNotice();

  const onSubmit = async (formData) => {
    try {
      await mutateAsync({
        id,
        payload: formData,
      });

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
              Update Notice
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
              {...register("title", {
                required: "Notice Title is required",
              })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />

            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
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
                {...register("notice_expire_date", {
                  required: "Expire Date is required",
                })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3  outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {errors.notice_expire_date && (
              <p className="text-red-500 text-sm">
                {errors.notice_expire_date.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex justify-center items-center gap-2 cursor-pointer"
          >
            {isPending ? "Processing..." : "Update Notice"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNotice;
