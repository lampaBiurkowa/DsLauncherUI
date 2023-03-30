import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import {
  LoginPage,
  MainPage,
  HomePage,
  StorePage,
  LibraryPage,
  SettingsPage,
  DiscoverPage,
  GamesPage,
  AppsPage,
} from "./pages";

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
