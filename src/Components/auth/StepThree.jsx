import React from "react";
import MealScheduleTable from "../MealTable";

const StepThree = ({ prevStep, form, nextStep, totalPrice }) => {
  return (
    <div className="space-y-3">
      <MealScheduleTable totalPrice={totalPrice} />

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
    </div>
  );
};

export default StepThree;
