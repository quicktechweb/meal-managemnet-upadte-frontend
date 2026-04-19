// context/PermissionContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useIndividualUserPermission } from "../api/cms/user.hook";

const PermissionContext = createContext();

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data } = useIndividualUserPermission();

  console.log(data);

  const hasPermission = (slug) => permissions.includes(slug);
  const hasAnyPermission = (slugs) =>
    slugs.some((s) => permissions.includes(s));

  return (
    <PermissionContext.Provider
      value={{ permissions, hasPermission, hasAnyPermission, loading }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => useContext(PermissionContext);
