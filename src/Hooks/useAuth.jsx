import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

const useAuth = () => {
  const all = useContext(AuthContext);

  return all;
};

export default useAuth;
