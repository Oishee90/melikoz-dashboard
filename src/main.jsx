import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./Components/Pages/Login";

import "./index.css";
import AdminDashboard from "./Components/Dashboard/AdminLayout/AdminDashboard";
import Root from "./Components/Dashboard/Root";

import User from "./Components/Dashboard/AdminLayout/User";
import Services from "./Components/Dashboard/AdminLayout/Services";
import AdminProfileSettings from "./Components/Dashboard/AdminLayout/AdminProfileSettings";
import AI from "./Components/Dashboard/AdminLayout/AI";
import Payment from "./Components/Dashboard/AdminLayout/Payment";
import SystemLog from "./Components/Dashboard/AdminLayout/SystemLog";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import ChatbotContent from "./Components/Dashboard/AdminLayout/Chatbot/ChatbotContent";

import MembershipCards from "./Components/Dashboard/AdminLayout/MembershipPlans";
import { PrivateRoute } from "./Components/routes/PrivateRoute";
import PublicRoute from "./Components/routes/PublicRoute ";

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <PublicRoute>
        {" "}
        <Login />
      </PublicRoute>
    ),
  },

  {
    path: "/",
    element: (
      <PrivateRoute>
        <Root></Root>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            {" "}
            <AdminDashboard></AdminDashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/users",
        element: (
          <PrivateRoute>
            {" "}
            <User></User>
          </PrivateRoute>
        ),
      },
      {
        path: "/services",
        element: (
          <PrivateRoute>
            <Services></Services>
          </PrivateRoute>
        ),
      },
      {
        path: "/services",
        element: (
          <PrivateRoute>
            <Services></Services>
          </PrivateRoute>
        ),
      },
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <AdminProfileSettings></AdminProfileSettings>
          </PrivateRoute>
        ),
      },
      {
        path: "/aioversight",
        element: (
          <PrivateRoute>
            <AI></AI>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/membership",
        element: (
          <PrivateRoute>
            <MembershipCards></MembershipCards>
          </PrivateRoute>
        ),
      },
      {
        path: "/system",
        element: (
          <PrivateRoute>
            <ChatbotContent></ChatbotContent>{" "}
          </PrivateRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
