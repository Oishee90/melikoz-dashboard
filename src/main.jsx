import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./Components/Pages/Login";
import Forgot from "./Components/Pages/Forgot";

import "./index.css";
import AdminDashboard from "./Components/Dashboard/AdminLayout/AdminDashboard";
import Root from "./Components/Dashboard/Root";
import Verification from "./Components/Pages/Verification";
import Setnew from "./Components/Pages/Setnew";
import Privacy from "./Components/Dashboard/AdminLayout/Settings/Privacy";
import TermsCondition from "./Components/Dashboard/AdminLayout/Settings/TermsCondition";
import User from "./Components/Dashboard/AdminLayout/User";
import Services from "./Components/Dashboard/AdminLayout/Services";
import AdminProfileSettings from "./Components/Dashboard/AdminLayout/AdminProfileSettings";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot",
    element: <Forgot />,
  },
  {
    path: "/verification",
    element: <Verification></Verification>,
  },
  {
    path: "/setNew",
    element: <Setnew></Setnew>,
  },
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "/users",
        element: <User></User>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/services",
        element: <Services></Services>,
      },
      {
        path: "/settings",
        element: <AdminProfileSettings></AdminProfileSettings>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
