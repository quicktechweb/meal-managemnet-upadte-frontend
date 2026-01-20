import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaMotorcycle, FaTruck } from "react-icons/fa";
import { useSelector } from "react-redux";

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      address: "",
      shippingArea: "inside",
      paymentMethod: "Bkash",
    },
  });

  const shippingArea = watch("shippingArea");
  const paymentMethod = watch("paymentMethod");

  const cartItems = useSelector((state) => state.cart.cartItems);

  const deliveryFee = shippingArea === "inside" ? 60 : 120;
  const totalAmount =
    cartItems.reduce((sum, item) => sum + item.price * item.cartQuantity, 0) +
    deliveryFee;

  const shippingOptions = [
    { id: "inside", label: "Inside Dhaka", fee: 60, icon: <FaMotorcycle /> },
    { id: "outside", label: "Outside Dhaka", fee: 120, icon: <FaTruck /> },
  ];

  const paymentOptions = ["Bkash", "Cash on Delivery"];

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen py-6 md:py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <form
        className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-4 "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* CONTACT & SHIPPING */}
        <div className="flex-1 space-y-4 md:space-y-8">
          {/* Contact Information */}
          <section className="bg-white  shadow-lg border border-gray-100 transition-all hover:shadow-xl px-5 md:px-10 py-5 md:py-10">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-6 flex items-center gap-2">
              <span className="w-2 h-6  md:h-8 bg-red-500 rounded-full inline-block"></span>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 gap-2.5 lg:gap-5">
              {/* Full Name */}
              <div className="group">
                <label className="text-[14px] md:text-[17px] font-semibold text-gray-700 capitalize tracking-wider ml-1 group-focus-within:text-gray-500 transition-colors">
                  Full Name
                </label>
                <input
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  type="text"
                  placeholder="Enter Your Full Name"
                  className={`w-full mt-1 px-2.5 md:px-5 py-2 bg-gray-50 border   focus:bg-white rounded-2xl focus:border-gray-500 focus:ring-0 transition-all outline-none text-gray-700 ${
                    errors.fullName ? "border-red-500" : "border-gray-500 "
                  }`}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div className="group">
                <label className="text-[14px] md:text-[17px] font-semibold text-gray-700 capitalize tracking-wider ml-1 group-focus-within:text-gray-500 transition-colors">
                  Phone Number
                </label>
                <input
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,14}$/,
                      message: "Enter a valid phone number",
                    },
                  })}
                  type="tel"
                  placeholder="017XXXXXXXX"
                  className={`w-full mt-1 px-2.5 md:px-5 py-2 bg-gray-50 border border-gray-600 rounded-2xl focus:bg-white focus:border-gray-500 focus:ring-0 transition-all outline-none text-gray-700 ${
                    errors.phone ? "border-red-500" : "border-gray-500"
                  }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="group">
                <label className="text-[14px] md:text-[17px] font-semibold text-gray-700 capitalize tracking-wider ml-1 group-focus-within:text-gray-500 transition-colors">
                  Shipping Address
                </label>
                <textarea
                  {...register("address", { required: "Address is required" })}
                  rows="3"
                  placeholder="Street Address, City, State..."
                  className={`w-full mt-1 p-2 md:p-4 bg-gray-50 border border-gray-600 rounded-2xl focus:bg-white focus:border-gray-500 focus:ring-0 transition-all outline-none text-gray-700 ${
                    errors.address ? "border-red-500" : "border-gray-500"
                  }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Shipping Area */}
              <div className="">
                <p className="text-[14px] md:text-[17px] font-semibold text-gray-700 capitalize tracking-wider ml-1 group-focus-within:text-gray-500 transition-colors mb-3">
                  Shipping Area
                </p>
                <div className="flex flex-row  gap-2 md:gap-4">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`cursor-pointer relative overflow-hidden rounded-3xl border-1 transition-all  flex-1 py-1 duration-300 flex flex-col items-center  ${
                        shippingArea === option.id
                          ? "border-black bg-gray-50 shadow-lg scale-105"
                          : "border-gray-100 bg-white hover:border-gray-200 hover:scale-103"
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.id}
                        {...register("shippingArea")}
                        className="hidden"
                      />
                      {/* <div className="text-3xl text-red-500">{option.icon}</div> */}
                      <p className="text-sm font-medium text-gray-500 capitalize">
                        {option.label}
                      </p>
                      <p
                        className={`text-xs md:text-base font-black  ${
                          shippingArea === option.id
                            ? "text-black"
                            : "text-gray-800"
                        }`}
                      >
                        ৳{option.fee}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className=" md:mt-6 space-y-4">
                <p className="text-[14px] md:text-[17px] font-semibold text-gray-700 capitalize tracking-wider ml-1 group-focus-within:text-gray-500 transition-colors">
                  Payment Method
                </p>
                <div className="flex  gap-2">
                  {paymentOptions.map((m) => (
                    <label
                      key={m}
                      className={`flex items-center gap-1.5 md:gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        paymentMethod === m
                          ? "border-gray-500 bg-gray-50"
                          : "border-gray-100"
                      }`}
                    >
                      <input
                        type="radio"
                        value={m}
                        {...register("paymentMethod")}
                        className="w-5 h-5 accent-gray-500"
                      />
                      <span className="font-bold text-gray-700 text-xs md:text-base">
                        {m}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/*  */}
            </div>
          </section>
        </div>

        {/* ORDER SUMMARY */}
        <div className="w-full lg:w-[350px]  ">
          <div className="sticky top-8 bg-white p-5 overflow-hidden shadow-lg border border-gray-100">
            {/* Header */}
            <div className=" md:px-4 md:py-3">
              <h2 className="text-2xl font-bold tracking-tight">
                Order Summary
              </h2>
            </div>

            {/* Items & Totals */}
            <div className="md:p-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start gap-1.5 "
                >
                  <span className="text-gray-700 font-medium">
                    <span className="line-clamp-1">{item.name}</span> x
                    {item.cartQuantity}
                  </span>
                  <span className="text-gray-900 font-bold">
                    ৳{item.price * item.cartQuantity}
                  </span>
                </div>
              ))}

              <div className="flex justify-between text-green-600 font-medium">
                <span>Discount</span>
                <span>৳0</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span className="font-semibold text-gray-900">
                  ৳{deliveryFee}
                </span>
              </div>

              <div className="h-px bg-gray-100 my-4" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">
                  Total Amount
                </span>
                <span className="text-xl font-black text-black">
                  ৳{totalAmount}
                </span>
              </div>

              <div className="coupon-container flex gap-2.5 ">
                <input
                  type="text"
                  className="w-full mt-1 px-4 py-2  bg-gray-50 border-1 border-gray-100 rounded-2xl focus:bg-white focus:border-gray-200 focus:ring-0 transition-all outline-none text-gray-700 "
                  placeholder="Enter your coupon number"
                />
                <button
                  type="button"
                  className="px-[15px] py-1 cursor-pointer rounded-4xl text-xs bg-green-200 whitespace-nowrap"
                >
                  Apply
                </button>
              </div>

              {/* Complete Order */}
              <button
                type="submit"
                className="w-full  bg-black text-white font-bold py-2.5 rounded-3xl shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer text-xs"
              >
                Complete Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
