import { useGetUserData } from "../api/auth/auth.hook";
import useLocalStorage from "../Hooks/useLocalStorage";

import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  // states:
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken, clearToken] = useLocalStorage("token", null);

  // mutation:
  const { data: getUserData, isLoading } = useGetUserData(token);

  // const { data: getUserData, isLoading } = useGetUserData(token);

console.log("getUserData:", getUserData);

  // get data:
  useEffect(() => {
    if (token) {
      setUser(getUserData);
      if (isLoading) {
        setLoading(true);
      } else {
        setLoading(false);
      }
    } else {
      setUser(null);
    }
  }, [getUserData, isLoading, token]);

  //  values:
  const allValues = {
    user,
    setUser,
    loading,
    setLoading,
    token,
    setToken,
    clearToken,
  };
  return (
    <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
