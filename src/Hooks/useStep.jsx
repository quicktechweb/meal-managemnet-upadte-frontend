import { useContext } from "react";
import { StepContext } from "../providers/StepProvider";

const useStep = () => {
  const formStep = useContext(StepContext);

  return formStep;
};

export default useStep;
