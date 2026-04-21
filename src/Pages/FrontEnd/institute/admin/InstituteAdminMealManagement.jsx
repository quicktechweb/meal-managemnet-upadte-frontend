import React from "react";
import MealAdminScheduleTable from "./MealAdminScheduleTable";
import useInstituteAuth from "../../../../Hooks/useInstituteAuth";
import InstituteAdminPackageRoutine from "./InstituteAdminPackageRoutine";
import { useInstituteUserAdminData } from "../../../../api/cms/user.hook";
import Headline from "../../../../Components/Headline";
import LiveKitchen from "../../../../Components/LiveKitchen";
import MenuTable from "../../../../Components/MenuTable";
import PackageMenuRoutine from "../../../../Components/PackageMenuRoutine";
import MealActivity from "../../../../Components/MealActivity";
import PackageMealActivity from "../../Dashboard/UserDashboard/MealManagementPart/PackageMealActivity";
import InstituteMealOnOff from "../../../../Components/InstituteMealOnOff";

const InstituteAdminMealManagement = () => {
  const { user } = useInstituteAuth();

  const { data } = useInstituteUserAdminData(user?.user?.institute_id);

  return (
    <>
      {!data && (
        <div>
          {user?.user?.routine_type === "Routine" && (
            <>
              <div className="mb-2">
                <InstituteMealOnOff />
              </div>
              <MealAdminScheduleTable />
            </>
          )}

          {user?.user?.routine_type === "Package" && (
            <>
              <div className="mb-2">
                <InstituteMealOnOff />
              </div>
              <InstituteAdminPackageRoutine />
            </>
          )}
        </div>
      )}

      {data && (
        <section className="min-h-screen flex flex-col gap-3.5">
          {/* Marquee */}
          <Headline />

          {/* Live Kitchen */}
          <LiveKitchen />

          {/* Menu Table */}
          {data?.routine_type === "Routine" && <MenuTable />}

          {data?.routine_type === "Package" && <PackageMenuRoutine />}

          {/*meal activity  */}

          {data?.routine_type === "Routine" && <MealActivity />}

          {data?.routine_type === "Package" && <PackageMealActivity />}
        </section>
      )}
    </>
  );
};

export default InstituteAdminMealManagement;
