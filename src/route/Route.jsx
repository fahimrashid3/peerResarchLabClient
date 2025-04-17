import { createBrowserRouter } from "react-router-dom";
import Home from "../page/home/Home";
import Main from "../layout/Main";
import AboutUs from "../page/about/AboutUs";
import Publications from "../page/publications/Publications";
import Team from "../page/team/Team";
import Login from "../page/authentication/Login";
import Registration from "../page/authentication/Registration";
import JoinUs from "../page/joinUs/JoinUs";
import ContactUs from "../page/contactUs/ContactUs";
import DashBoard from "../layout/Dashboard";
import AdminHome from "../page/dashboard/adminPages/AdminHome";
import AllUsers from "../page/dashboard/adminPages/AllUsers";
import UserProfile from "../page/dashboard/userPages/UserProfile";
import ManageApplication from "../page/dashboard/adminPages/ManageApplication";
import Blogs from "../page/blogs/Blogs";
import News from "../page/news/News";
import PrivetRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoute";
import PaperDetails from "../page/publications/PaperDetails";
import ResearchAres from "../page/researchAreas/ResearchAres";
import ResearchAreasDetails from "../page/researchAreas/ResearchAreasDetails";
import Application from "../page/joinUs/Application";
import AddNews from "../page/dashboard/adminPages/AddNews";

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
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/researchAreas",
        element: <ResearchAres />,
      },
      {
        path: "/researchAreaDetails/:_id",
        element: <ResearchAreasDetails />,
      },
      {
        path: "/publications",
        element: <Publications />,
      },
      {
        path: "/paper/:_id",
        element: <PaperDetails />,
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
        element: <JoinUs />,
      },
      {
        path: "/application/:role",
        element: (
          <PrivetRoute>
            <Application />
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
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "applications",
        element: (
          <AdminRoute>
            <ManageApplication />
          </AdminRoute>
        ),
      },
      {
        path: "addNews",
        element: (
          <AdminRoute>
            <AddNews />
          </AdminRoute>
        ),
      },
    ],
  },
]);
