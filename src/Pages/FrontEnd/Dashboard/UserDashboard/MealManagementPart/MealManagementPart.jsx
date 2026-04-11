import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

import Headline from "../../../../../Components/Headline";
import LiveKitchen from "../../../../../Components/LiveKitchen";
import MenuTable from "../../../../../Components/MenuTable";
import MealActivity from "../../../../../Components/MealActivity";
import useInstituteAuth from "../../../../../Hooks/useInstituteAuth";
import { useInstituteUserAdminData } from "../../../../../api/cms/user.hook";
import PackageMenuRoutine from "../../../../../Components/PackageMenuRoutine";
import PackageMealActivity from "./PackageMealActivity";

// ----------------- MAIN COMPONENT -----------------
export default function MealManagementPart() {
  const { user, loading } = useInstituteAuth();
  const { data } = useInstituteUserAdminData(user?.user?.institute_id);

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-3 lg:p-6 flex flex-col gap-3.5">
      <ScrollToTop />

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
  );
}
