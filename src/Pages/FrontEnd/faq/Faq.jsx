import React, { useState } from "react";

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
          className={`ml-6 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
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
  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Simply browse our products, add items to your cart, and proceed to checkout. Fill in your delivery details, choose a payment method, and confirm your order.",
    },
    {
      question: "What areas do you deliver to?",
      answer:
        "We currently deliver both inside Dhaka and outside Dhaka. Delivery charges may vary based on your location.",
    },
    {
      question: "How much is the delivery charge?",
      answer:
        "Delivery charges are ৳60 for inside Dhaka and ৳120 for outside Dhaka.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept bKash and Cash on Delivery (COD) for your convenience.",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Inside Dhaka deliveries usually take 1–3 hours. Outside Dhaka deliveries may take 24–72 hours.",
    },
    {
      question: "Can I cancel or change my order?",
      answer:
        "Yes, you can cancel or modify your order before it is dispatched. Please contact our support team as soon as possible.",
    },
    {
      question: "What if I receive a damaged or wrong product?",
      answer:
        "If you receive a damaged or incorrect item, contact us within 24 hours of delivery and we’ll arrange a replacement or refund.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-6 lg:py-12 mt-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 lg:mb-8 text-center text-2xl md:text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="rounded-2xl bg-white p-4 lg:p-8 shadow-sm ring-1 ring-slate-200">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
}
