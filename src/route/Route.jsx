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
import JoinUs from "../page/joinUs/JoinUs";
import ContactUs from "../page/contactUs/ContactUs";
import DashBoard from "../layout/Dashboard";
import AdminHome from "../page/dashboard/adminPages/AdminHome";
import AllUsers from "../page/dashboard/adminPages/AllUsers";
import UserProfile from "../page/dashboard/userPages/UserProfile";
import ManageApplication from "../page/dashboard/adminPages/ManageApplication";
import Blogs from "../page/blogs/Blogs";
import News from "../page/news/News";

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
        element: <ResearchAries />,
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
        path: "/news",
        element: <News />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/joinUs",
        element: (
          <PrivetRoute>
            <JoinUs />
          </PrivetRoute>
        ),
      },
      {
        path: "/contactUs",
        element: (
          <PrivetRoute>
            <ContactUs />
          </PrivetRoute>
        ),
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
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashBoard />
      </PrivetRoute>
    ),
    children: [
      // user routs
      {
        path: "userProfile",
        element: <UserProfile />,
      },

      // admin routs
      {
        path: "adminHome",
        element: <AdminHome />,
      },
      {
        path: "allUsers",
        element: <AllUsers />,
      },
      {
        path: "applications",
        element: <ManageApplication />,
      },
    ],
  },
]);
