export const SIDEBAR_ITEMS = [
  {
    label: "Dashboard",
    icon: "LayoutDashboard",
    path: "/dashboards",
    permission: "dashboard.view",
  },
  {
    label: "Users",
    icon: "Users",
    path: "/dashboards/users",
    permission: "users.view",
  },
  {
    label: "Roles",
    icon: "Shield",
    path: "/dashboards/role",
    permission: "roles.view",
  },

  {
    label: "Meal Orders",
    icon: "ShoppingCart",
    path: "/dashboards/meal-order",
    permission: "orders.view",
    excludeRoles: ["user"],
  },
  {
    label: "Services",
    icon: "Wrench",
    path: "/dashboards/my-services",
    permission: "services.view",
  },
  {
    label: "Routine",
    icon: "Calendar",
    path: "/dashboards/routines",
    permission: "routine.view",
  },
  {
    label: "Profile",
    icon: "Users",
    path: "/dashboards/profile",
    permission: "profile.view",
  },
  {
    label: "Balance",
    icon: "Wallet",
    path: "/dashboards/balance",
    parmission: "balance.view",
  },
];
