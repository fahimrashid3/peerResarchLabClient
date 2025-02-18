import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home/Home";
import Main from "../layout/Main";
import Overview from "../page/about/Overview";
import Mission from "../page/about/Mission";
import Vision from "../page/about/Vision";
import History from "../page/about/History";

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
    ],
  },
]);
