import { useAuthInstituteUser } from "../api/auth/auth.hook";
import useLocalStorage from "../Hooks/useLocalStorage";
import { createContext, useEffect, useState } from "react";

export const InstituteAuthContext = createContext(null);

const InstituteAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken, clearToken] = useLocalStorage("token", null);

  const { data, isLoading } = useAuthInstituteUser(token);


  useEffect(() => {
    if (token && data) {
      setUser(data);
    } else if (!token) {
      setUser(null);
    }
  }, [data, token]);

  const allValues = {
    user,
    setUser,
    loading: isLoading,
    token,
    setToken,
    clearToken,
  };

  return (
    <InstituteAuthContext.Provider value={allValues}>
      {children}
    </InstituteAuthContext.Provider>
  );
};

export default InstituteAuthProvider;
