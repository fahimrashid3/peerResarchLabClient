import { NavLink, Outlet } from "react-router-dom";
import { BsMoonStars, BsSun } from "react-icons/bs";
import useTheme from "../hooks/useTheme";
import { Helmet } from "react-helmet";
import {
  FaEdit,
  FaEnvelope,
  FaHome,
  FaPhone,
  FaRegNewspaper,
  FaUsers,
} from "react-icons/fa";
import {
  MdConnectWithoutContact,
  MdOutlineGroupAdd,
  MdOutlinePendingActions,
  MdSubject,
} from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsEnvelopePaper } from "react-icons/bs";
import { FaSchoolCircleExclamation, FaUserGroup } from "react-icons/fa6";
import { TbCategoryPlus, TbEyeEdit } from "react-icons/tb";
import { VscOpenPreview } from "react-icons/vsc";
import useAdmin from "../hooks/useAdmin";
import useRole from "../hooks/useRole";
import { CgProfile } from "react-icons/cg";
import useAuth from "../hooks/useAuth";
import { GiStabbedNote } from "react-icons/gi";
import { useRef } from "react";

const DashBoard = () => {
  const { theme, toggleTheme } = useTheme();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [role, isRoleLoading] = useRole();
  const { user, logOut } = useAuth();
  const drawerCheckboxRef = useRef(null);

  const baseLinkClass =
    "rounded-md focus:outline-none focus:bg-primary-500 focus:text-white dark:focus:text-gray-950";
  const navLinkClass = ({ isActive }) =>
    isActive
      ? `${baseLinkClass} bg-primary-600 text-white dark:text-gray-950`
      : baseLinkClass;

  // Function to close drawer on small devices when a link is clicked
  const closeDrawer = () => {
    if (drawerCheckboxRef.current && window.innerWidth < 1024) {
      drawerCheckboxRef.current.checked = false;
    }
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
      <Helmet>
        <title>Dashboard - Peer Research Lab</title>
        <meta
          name="description"
          content="Access your Peer Research Lab dashboard. Manage your research papers, applications, contacts, and collaborate with our research community."
        />
        <meta
          name="keywords"
          content="peer research lab dashboard, research dashboard, academic research management, research paper management, research collaboration dashboard"
        />
        <meta property="og:title" content="Dashboard - Peer Research Lab" />
        <meta
          property="og:description"
          content="Access your Peer Research Lab dashboard. Manage your research papers, applications, contacts, and collaborate with our research community."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dashboard - Peer Research Lab" />
        <meta
          name="twitter:description"
          content="Access your Peer Research Lab dashboard. Manage your research papers, applications, contacts, and collaborate with our research community."
        />
      </Helmet>
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        ref={drawerCheckboxRef}
      />
      <div className="drawer-content flex flex-col bg-white dark:bg-gray-950">
        {/* Button for small screens */}
        <label htmlFor="my-drawer-2">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-yellow lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </label>
        {/* Main Content */}
        <div className="flex-grow p-1 md:p-10 overflow-y-auto">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-gray-200 dark:bg-gray-800  text-gray-950 dark:text-white min-h-full w-80 p-4">
          {/* Sidebar Header with Theme Switch */}
          <li className="mb-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Dashboard</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="btn btn-ghost btn-sm"
                aria-label="Toggle theme"
                title={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? <BsSun /> : <BsMoonStars />}
              </button>
            </div>
          </li>
          {/* Conditional Navigation */}
          {user && (
            <>
              <li>
                <NavLink
                  to="userProfile"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <span className="text-xl">
                    <CgProfile />
                  </span>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/pendingPaper"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <span className="text-xl">
                    <MdOutlinePendingActions />
                  </span>
                  My Pending Paper
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/myContacts"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <span className="text-xl">
                    <FaEnvelope />
                  </span>
                  My Contacts
                </NavLink>
              </li>
            </>
          )}

          {user && !role && (
            <>
              <li>
                <NavLink
                  to="/dashboard/myApplication"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <span className="text-xl">
                    <GiStabbedNote />
                  </span>
                  My applications
                </NavLink>
              </li>
            </>
          )}
          {!isAdminLoading && isAdmin && (
            <>
              <li>
                <NavLink
                  to="/dashboard/updateInfo"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <TbEyeEdit />
                  Update info
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="allUsers"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="applications"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <FaUsers /> Manage Applications
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="reviewResearch"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <VscOpenPreview /> Review Research Paper
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="addNews"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <FaRegNewspaper /> News and Update
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addArea"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <TbCategoryPlus />
                  Add new Research Area
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addCollaborators"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <FaUserGroup />
                  Add Collaborators
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageContacts"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <MdConnectWithoutContact />
                  Manage Contacts
                </NavLink>
              </li>
            </>
          )}
          {!isRoleLoading && role && (
            <>
              <li>
                <NavLink
                  to="writeResearch"
                  className={navLinkClass}
                  onClick={closeDrawer}
                >
                  <span className="text-xl">
                    <FaEdit />
                  </span>
                  Write Research Paper
                </NavLink>
              </li>
            </>
          )}

          <div className="divider"></div>

          {/* Shared Nav - Always displayed */}
          <li>
            <NavLink to="/" className={navLinkClass} onClick={closeDrawer}>
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutUs"
              className={navLinkClass}
              onClick={closeDrawer}
            >
              <FaSchoolCircleExclamation /> About us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/researchAreas"
              className={navLinkClass}
              onClick={closeDrawer}
            >
              <MdSubject />
              Research Aries
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/publications"
              className={navLinkClass}
              onClick={closeDrawer}
            >
              <IoNewspaperOutline /> Research and Publication
            </NavLink>
          </li>
          <li>
            <NavLink to="/team" className={navLinkClass} onClick={closeDrawer}>
              <HiMiniUserGroup /> Team
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/joinUs"
              className={navLinkClass}
              onClick={closeDrawer}
            >
              <MdOutlineGroupAdd /> Join us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contactUs"
              className={navLinkClass}
              onClick={closeDrawer}
            >
              <FaPhone /> Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" className={navLinkClass} onClick={closeDrawer}>
              <BsEnvelopePaper /> News and Updates
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
