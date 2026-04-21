// context/PermissionContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useIndividualUserPermission } from "../api/cms/user.hook";

const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);

  const { data, isLoading } = useIndividualUserPermission();

  console.log(data, "data");

  console.log(permissions, "permissions");

  useEffect(() => {
    if (data?.permissions) {
      const slugs = data?.permissions?.map((p) => p?.slug);
      setPermissions(slugs);
    }
  }, [data]);

  const hasPermission = (slug) => permissions.includes(slug);
  const hasAnyPermission = (slugs) =>
    slugs.some((s) => permissions.includes(s));

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        hasPermission,
        hasAnyPermission,
        loading: isLoading,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => useContext(PermissionContext);
