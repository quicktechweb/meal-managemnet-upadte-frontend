import { useContext } from "react";
import { InstituteAuthContext } from "../providers/InstituteAuthProvider";

const useInstituteAuth = () => {
  const all = useContext(InstituteAuthContext);

  return all;
};

export default useInstituteAuth;
