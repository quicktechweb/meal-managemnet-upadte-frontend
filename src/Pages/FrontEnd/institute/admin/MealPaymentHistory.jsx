// Pages/FrontEnd/institute/admin/MealPaymentHistory.jsx
// 🏫 Institute panel — কোন student কোন meal এ কত টাকা দিলো + মোট কত টাকা ঢুকলো

import MealPaymentsView from "../../../../Components/meal-payments/MealPaymentsView";

const MealPaymentHistory = () => (
  <MealPaymentsView
    endpoint="/api/meal-deductions/institute"
    title="Meal Payments"
    subtitle="Student দের meal এর টাকা — কে, কোন দিন, কোন meal এর জন্য কত টাকা দিয়েছে"
  />
);

export default MealPaymentHistory;
