import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
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
  ArticlePage,
  ProductPage,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        index: true,
        loader: () => {
          return redirect("/home");
        },
      },
      {
        path: "/home",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/home/article/:id",
            element: <ArticlePage />,
          },
        ],
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
          {
            element: <ProductPage />,
            path: "/store/product/:id",
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
