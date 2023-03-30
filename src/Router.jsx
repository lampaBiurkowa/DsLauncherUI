import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { LoginPage } from "./pages";
import { MainPage } from "./pages";
import { HomePage } from "./pages";
import { StorePage } from "./pages";
import { LibraryPage } from "./pages";
import { SettingsPage } from "./pages";
import { DiscoverPage } from "./pages";
import { GamesPage } from "./pages";
import { AppsPage } from "./pages";

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
            element: <DiscoverPage />,
            index: true,
          },
          {
            element: <GamesPage />,
            path: "/store/games",
          },
          {
            element: <AppsPage />,
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
