import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/Main";
import BaseLayout from "./BaseLayout";
import ListPage from "../pages/ReservationList";
import ReservationEditPage from "../pages/ReservationEdit";
import ProfilePage from "../pages/Profile";
import LoginPage from "../pages/Login/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/list",
        element: <ListPage />,
      },
      {
        path: "/reservation/:id",
        element: <ReservationEditPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
    ],
  },
]);

export default router;
