import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Upload, Image as ImageIcon, Type } from "lucide-react";
import {
  useAddChooseusLists,
  useCreateFaqData,
} from "../../../api/admin/admin.api";
import RichTextEditor from "../../../Components/RichTextEditor";

const AddFaq = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const { mutateAsync, isPending } = useCreateFaqData();

  const onSubmit = async (data) => {
    try {
      await mutateAsync(data);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto p-4 bg-white rounded-xl shadow-lg border border-gray-100">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Add Faq</h2>
      </header>

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {/* Question Input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Type size={16} /> Question
          </label>
          <input
            {...register("question", { required: "Question is required" })}
            type="text"
            placeholder="e.g. Making the Perfect Sourdough"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-transparent outline-none transition-all ${
              errors.question ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.question && (
            <span className="text-red-500 text-xs">
              {errors.question.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Type size={16} /> Answer
          </label>
          <textarea
            {...register("answer", { required: "Answer is required" })}
            type="text"
            placeholder="e.g. Making the Perfect Sourdough"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-transparent outline-none transition-all ${
              errors.answer ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.answer && (
            <span className="text-red-500 text-xs">
              {errors.answer.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full  bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform transition hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddFaq;
