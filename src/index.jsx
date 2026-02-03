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
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StepProvider>
          <Provider store={store}>
            <RouterProvider router={router} />
            <Toaster />
          </Provider>
        </StepProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
