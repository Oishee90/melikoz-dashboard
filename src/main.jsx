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

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
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
      {
        path: "/aioversight",
        element: <AI></AI>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/membership",
        element: <MembershipCards></MembershipCards>,
      },
      {
        path: "/system",
        element: <ChatbotContent></ChatbotContent>,
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
