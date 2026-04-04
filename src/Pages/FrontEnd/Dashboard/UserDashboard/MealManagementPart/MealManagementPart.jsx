import ScrollToTop from "../../../ScrollToTop/ScrollToTop";

import Headline from "../../../../../Components/Headline";
import LiveKitchen from "../../../../../Components/LiveKitchen";
import MenuTable from "../../../../../Components/MenuTable";
import MealActivity from "../../../../../Components/MealActivity";

// ----------------- MAIN COMPONENT -----------------
export default function MealManagementPart() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-3 lg:p-6 flex flex-col gap-3.5">
      <ScrollToTop />

      {/* Marquee */}
      <Headline />

      {/* Live Kitchen */}
      <LiveKitchen />

      {/* Menu Table */}
      <MenuTable />

      {/*meal activity  */}
      <MealActivity />
    </section>
  );
}
