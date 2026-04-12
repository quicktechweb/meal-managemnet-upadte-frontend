import React, { useState } from "react";
import { useGetAllFaq } from "../../../api/admin/admin.api";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-2 lg:py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center cursor-pointer justify-between text-left focus:outline-none"
      >
        <span className="text-sm lg:text-lg font-medium text-slate-800">
          {question}
        </span>

        <span
          className={`ml-6 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? (
            <span className="text-2xl font-light text-blue-600">−</span>
          ) : (
            <span className="text-2xl font-light text-slate-400">+</span>
          )}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-72 lg:max-h-96 opacity-100 lg:mt-3"
            : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-slate-600 leading-relaxed text-xs lg:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function Faq() {
  const { data: faqs = [], isLoading } = useGetAllFaq();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-6 lg:py-12">
        <div className="mx-auto max-w-3xl animate-pulse">
          {/* Heading Skeleton */}
          <div className="h-8 bg-slate-200 rounded w-2/3 mx-auto mb-8"></div>

          <div className="rounded-2xl bg-white p-4 lg:p-8 shadow-sm ring-1 ring-slate-200 space-y-6">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="border-b border-slate-200 pb-4">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-6 w-6 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 ">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 lg:mb-8 text-center text-2xl md:text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
          Frequently Asked Questions
        </h2>

        <div className="rounded-2xl bg-white p-4 lg:p-8 shadow-sm ring-1 ring-slate-200">
          {faqs.length === 0 && (
            <p className="flex items-center justify-center text-gray-500">
              No Faq Added
            </p>
          )}

          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}
