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
        children: [
          {
            element: <a>Discover</a>,
            index: true,
          },
          {
            element: <a>Games</a>,
            path: "/store/games",
          },
          {
            element: <a>Apps</a>,
            path: "/store/apps",
          },
        ],
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
