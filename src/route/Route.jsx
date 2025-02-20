import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home/Home";
import Main from "../layout/Main";
import Overview from "../page/about/Overview";
import Mission from "../page/about/Mission";
import Vision from "../page/about/Vision";
import History from "../page/about/History";
import ResearchAries from "../page/researchAreas/ResearchAries";
import Publications from "../page/publications/Publications";
import Team from "../page/team/Team";
import Login from "../page/authentication/Login";
import Registration from "../page/authentication/Registration";
import PrivetRoute from "./privetRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/overview",
        element: <Overview />,
      },
      {
        path: "/mission",
        element: <Mission />,
      },
      {
        path: "/vision",
        element: <Vision />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/researchAreas",
        element: (
          <PrivetRoute>
            <ResearchAries />
          </PrivetRoute>
        ),
      },
      {
        path: "/publications",
        element: <Publications />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
