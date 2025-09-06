import LoginPage from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";
import BaseLayout from "./BaseLayout";
import MainPage from "@/pages/Main";
import ListPage from "@/pages/ReservationList";
import ReservationEditPage from "@/pages/ReservationEdit";
import ProfilePage from "@/pages/Profile";
import ProtectRoute from "./ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/main",
        element: (
          <ProtectRoute>
            <MainPage />
          </ProtectRoute>
        ),
      },
      {
        path: "/list",
        element: (
          <ProtectRoute>
            <ListPage />
          </ProtectRoute>
        ),
      },
      {
        path: "/reservation/:id",
        element: (
          <ProtectRoute>
            <ReservationEditPage />
          </ProtectRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectRoute>
            <ProfilePage />
          </ProtectRoute>
        ),
      },
    ],
  },
]);

export default router;
