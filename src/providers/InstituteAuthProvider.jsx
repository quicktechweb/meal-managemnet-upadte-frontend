import { useAuthInstituteUser, useGetUserData } from "../api/auth/auth.hook";
import useLocalStorage from "../Hooks/useLocalStorage";

import { createContext, useEffect, useState } from "react";

export const InstituteAuthContext = createContext(null);

const InstituteAuthProvider = ({ children }) => {
  // states:
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken, clearToken] = useLocalStorage("token", null);

  // mutation:
  const { data: getUserData, isLoading } = useAuthInstituteUser(token);

  // const allMealSchedule = [
  //   ...new Map(
  //     getUserData?.user?.routine?.schedule_lists?.map((item) => [
  //       item.day.toLowerCase(),
  //       item,
  //     ]),
  //   ).values(),
  // ];

  const days = [
    ...new Set(getUserData?.user?.routine?.schedule_lists?.map((s) => s.day)),
  ];

  const groupedSchedule = days.map((day) => ({
    day,
    meals: getUserData?.user?.routine?.schedule_lists?.filter(
      (s) => s.day === day,
    ),
  }));

  console.log(groupedSchedule);

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
    <InstituteAuthContext.Provider value={allValues}>
      {children}
    </InstituteAuthContext.Provider>
  );
};
export default InstituteAuthProvider;
