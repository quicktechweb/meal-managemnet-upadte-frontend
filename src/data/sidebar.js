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
    label: "Home",
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
    permission: "balance.view",
  },

  {
    label: "Meal On Off",
    icon: "IoIosSwitch",
    path: "/dashboards/meal-on-off",
    permission: "mealonoff.view",
  },
   {
    label: "Inventory",
    icon: "MdOutlineInventory2",
    path: "/dashboards/inventory",
    permission: "inventory.view",
    excludeRoles: ["user"],
    children: [
      // {
      //   label: "Add Product",
      //   path: "/dashboards/inventory-add-product",
      // },
      // {
      //   label: "Purchase",
      //   path: "/dashboards/inventory-purchase",
      // },
      // {
      //   label: "Purchase List",
      //   path: "/dashboards/inventory-purchase-list",
      // },
      {
        label: "Day wise",
        path: "/dashboards/inventory-day-wise",
      },
      {
        label: "All wise",
        path: "/dashboards/inventory-all-wise",
      },
      // {
      //   label: "Stock Management",
      //   path: "/dashboards/stock-management",
      // },
       {
                label: "Add Material",
               
                path: "/dashboards/admaterial-management",
              },
              {
                label: "Add Product-Material",
               
                path: "/dashboards/admaterial-allproduct",
              },
              {
                label: "Profit Calculation",
               
                path: "/dashboards/daywisecalculation-report",
              },
    ],
  },

  

 
];
