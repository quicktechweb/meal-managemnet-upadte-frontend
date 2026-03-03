import React from "react";
import MealScheduleTable from "../MealTable";

const StepThree = ({ prevStep, nextStep, totalPrice, form }) => {
  return (
    <>
      <div className="space-y-3">
        <p className="font-semibold">Select the Meals</p>
        <MealScheduleTable totalPrice={totalPrice} />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={prevStep}
          className="w-full border cursor-pointer py-1.5 lg:py-3 rounded-lg"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="w-full bg-black cursor-pointer text-white py-1.5 lg:py-3 rounded-lg"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default StepThree;
