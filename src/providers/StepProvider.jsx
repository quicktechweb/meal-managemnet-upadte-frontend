import { createContext, useState } from "react";

export const StepContext = createContext(null);

const StepProvider = ({ children }) => {
  // states:
  const [step, setStep] = useState(1);
  //  values:
  const allValues = {
    step,
    setStep,
  };
  return (
    <StepContext.Provider value={allValues}>{children}</StepContext.Provider>
  );
};
export default StepProvider;
