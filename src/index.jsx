import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routers/Router";
import { Provider } from "react-redux";
import { store } from "./app/store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import StepProvider from "./providers/StepProvider";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StepProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
          <Toaster />
        </Provider>
      </StepProvider>
    </AuthProvider>
  </QueryClientProvider>,
);

const fetchSiteSettings = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_SITE_URL}/api/settings`);
    const formattedData = await res.json();

    if (formattedData?.data) {
      const { faviconUrl, siteName } = formattedData.data;

      // Update favicon
      const link =
        document.querySelector("link[rel~='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = faviconUrl;
      document.head.appendChild(link);

      // Update title
      document.title = siteName;
    }
  } catch (err) {
    console.error("Error fetching site settings:", err);
  }
};

fetchSiteSettings();
