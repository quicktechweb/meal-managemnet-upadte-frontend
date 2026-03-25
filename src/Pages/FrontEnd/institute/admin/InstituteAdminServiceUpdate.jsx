import React from "react";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";

const InstituteAdminServiceUpdate = () => {
  const { user } = useInstituteAuth();

  console.log(user);

  return <div></div>;
};

export default InstituteAdminServiceUpdate;
