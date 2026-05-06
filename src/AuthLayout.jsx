import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import "./index.css";
const AuthLayout = () => {
  return (
    <div>
      <ScrollRestoration />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
