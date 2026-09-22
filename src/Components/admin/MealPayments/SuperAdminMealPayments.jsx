// Components/admin/MealPayments/SuperAdminMealPayments.jsx
// 👑 Super Admin panel — সব institute এর meal payment history + institute wise মোট টাকা
import MealPaymentsView from "../../meal-payments/MealPaymentsView";

const SuperAdminMealPayments = () => (
  <MealPaymentsView
    endpoint="/api/meal-deductions/admin"
    title="Meal Payments (All Institutes)"
    subtitle="সব institute এর student দের meal payment history ও মোট টাকা"
    isSuperAdmin
  />
);

export default SuperAdminMealPayments;
