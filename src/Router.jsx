import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import LoginPage from "./routes/LoginPage";
import MainPage from "./routes/MainPage";
import HomePage from "./routes/HomePage";
import StorePage from "./routes/StorePage";
import LibraryPage from "./routes/LibraryPage";
import SettingsPage from "./routes/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        element: <HomePage />,
        index: true,
      },
      {
        path: "/store",
        element: <StorePage />,
      },
      {
        path: "/library",
        element: <LibraryPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
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
