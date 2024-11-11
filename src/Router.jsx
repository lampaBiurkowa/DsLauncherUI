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
import VideosPage from "@/pages/store/VideosPage";
import MusicPage from "@/pages/store/MusicPage";
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

import DeveloperProfilePage from "@/pages/developer/DeveloperProfilePage";
import DeveloperNewsPage from "@/pages/developer/DeveloperNewsPage";
import DeveloperGamesPage from "@/pages/developer/DeveloperGamesPage";
import DeveloperSettingsPage from "@/pages/profile/DeveloperSettingsPage";
import DeveloperMembersPage from "@/pages/developer/DeveloperMembersPage";
import DeveloperNdibPage from "@/pages/profile/DeveloperNdibPage";

import DownloadsPage from "@/pages/downloads/DownloadsPage";
import AudioPage from "./pages/library/AudioPage";
import NdibPage from "./pages/ndib/NdibPage";

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
          {
            path: "/profile/payments",
            element: (
              <Guard>
                <></>
              </Guard>
            ),
          },
          {
            path: "/profile/developer",
            element: (
              <Guard>
                <DeveloperSettingsPage></DeveloperSettingsPage>
              </Guard>
            ),
          },
          // {
          //   path: "/profile/ndib",
          //   element: (
          //     <Guard>
          //       <DeveloperNdibPage></DeveloperNdibPage>
          //     </Guard>
          //   ),
          // },
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
            element: <MusicPage />,
            path: "/store/music",
          },
          {
            element: <VideosPage />,
            path: "/store/videos",
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
          {
            element: <AudioPage />,
            path: "/library/audio/:id",
          },
        ],
      },
      {
        path: "/ndib",
        element: <NdibPage />,
      },
      {
        element: <DeveloperNdibPage />,
        path: "/ndib/repo",
      },
      {
        path: "/downloads",
        element: <DownloadsPage />,
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
      {
        path: "/developer/:id",
        element: <DeveloperProfilePage />,
        children: [
          {
            element: <DeveloperNewsPage />,
            index: true,
          },
          {
            element: <DeveloperGamesPage />,
            path: "/developer/:id/games",
          },
          {
            element: (
              <Guard>
                <DeveloperMembersPage />
              </Guard>
            ),
            path: "/developer/:id/members",
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
