import React from "react";
import MealAdminScheduleTable from "./MealAdminScheduleTable";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";
import InstituteAdminPackageRoutine from "./InstituteAdminPackageRoutine";

const InstituteAdminMealManagement = () => {
  const { user } = useInstituteAuth();

  return (
    <div>
      {user?.user?.routine_type === "Routine" && <MealAdminScheduleTable />}

      {user?.user?.routine_type === "Package" && (
        <InstituteAdminPackageRoutine />
      )}
    </div>
  );
};

export default InstituteAdminMealManagement;
