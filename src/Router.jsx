import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import React from "react";

import AppsPage from "@/pages/apps-page/AppsPage";
import ArticlePage from "@/pages/article-page/ArticlePage";
import DiscoverPage from "@/pages/discover-page/DiscoverPage";
import GamesPage from "@/pages/games-page/GamesPage";
import HomePage from "@/pages/home-page/HomePage";
import LibraryPage from "@/pages/library-page/LibraryPage";
import LoginPage from "@/pages/login-page/LoginPage";
import MainPage from "@/pages/main-page/MainPage";
import SettingsPage from "@/pages/settings-page/SettingsPage";
import StorePage from "@/pages/store-page/StorePage";
import ProductPage from "@/pages/product-page/ProductPage";
import RegisterPage from "@/pages/register-page/RegisterPage";
import InstalledPage from "@/pages/installed-page/InstalledPage";
import UpdatesPage from "./pages/updates-page/UpdatesPage";
import OwnedPage from "./pages/owned-page/OwnedPage";

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
        children: [
          {
            element: <InstalledPage />,
            index: true,
          },
          {
            element: <UpdatesPage />,
            path: "/library/updates",
          },
          {
            element: <OwnedPage />,
            path: "/library/owned",
          },
        ],
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
