import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from "react-router-dom";
import React from "react";

import Guard from "./Guard";

import MainPage from "@/pages/main/MainPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

import HomePage from "@/pages/home/HomePage";
import ArticlePage from "@/pages/home/ArticlePage";

import StorePage from "@/pages/store/StorePage";
import DiscoverPage from "@/pages/store/DiscoverPage";
import GamesPage from "@/pages/store/GamesPage";
import AppsPage from "@/pages/store/AppsPage";
import ProductPage from "@/pages/store/ProductPage";

import LibraryPage from "@/pages/library/LibraryPage";
import InstalledPage from "@/pages/library/InstalledPage";
import UpdatesPage from "@/pages/library/UpdatesPage";
import OwnedPage from "@/pages/library/OwnedPage";

import ProfilePage from "@/pages/profile/ProfilePage";
import ProfileDetailsPage from "@/pages/profile/ProfileDetailsPage";

import SettingsPage from "@/pages/settings/SettingsPage";
import LibrariesSettingsPage from "@/pages/settings/LibrariesSettingsPage";
import GeneralSettingsPage from "@/pages/settings/GeneralSettingsPage";

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
        path: "/profile",
        element: (
          <Guard>
            <ProfilePage />
          </Guard>
        ),
        children: [
          {
            index: true,
            element: (
              <Guard>
                <ProfileDetailsPage />
              </Guard>
            ),
          },
        ],
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
          <Guard>
            <LibraryPage />
          </Guard>
        ),
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
        children: [
          {
            element: <GeneralSettingsPage />,
            index: true,
          },
          {
            element: <LibrariesSettingsPage />,
            path: "/settings/libraries",
          },
        ],
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
