import React from "react";
import MealAdminScheduleTable from "./MealAdminScheduleTable";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";

const InstituteAdminMealManagement = () => {
  const { user } = useInstituteAuth();

  console.log(user?.user?.routine_type);

  return (
    <div>
      {user?.user?.routine_type === "Routine" && <MealAdminScheduleTable />}

      {user?.user?.routine_type === "Package" && <p>Routine package</p>}
    </div>
  );
};

export default InstituteAdminMealManagement;
