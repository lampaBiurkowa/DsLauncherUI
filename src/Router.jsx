import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import React from "react";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
