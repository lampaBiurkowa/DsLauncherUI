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
  RegisterPage,
} from "./pages";
import Protected from "./Protected";

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
        element: (
          <Protected>
            <LibraryPage />
          </Protected>
        ),
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
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
