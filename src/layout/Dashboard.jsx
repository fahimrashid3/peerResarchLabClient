import { NavLink, Outlet } from "react-router-dom";
import {
  FaEdit,
  FaHome,
  FaPhone,
  FaRegNewspaper,
  FaUsers,
} from "react-icons/fa";
import { MdOutlineGroupAdd, MdSubject } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsEnvelopePaper } from "react-icons/bs";
import { FaSchoolCircleExclamation } from "react-icons/fa6";
import { TbEyeEdit } from "react-icons/tb";
import { VscOpenPreview } from "react-icons/vsc";
import useAdmin from "../hooks/useAdmin";
import useRole from "../hooks/useRole";
import { CgProfile } from "react-icons/cg";
import useAuth from "../hooks/useAuth";

const DashBoard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const [role, isRoleLoading] = useRole();
  const { user, logOut } = useAuth();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
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
        <div className="flex-grow p-10 overflow-y-auto h-screen">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Conditional Navigation */}
          {user && (
            <>
              <li>
                <NavLink to="userProfile">
                  <span className="text-xl">
                    <CgProfile />
                  </span>
                  Profile
                </NavLink>
              </li>
            </>
          )}
          {!isAdminLoading && isAdmin && (
            <>
              <li>
                <NavLink to="adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/updateInfo">
                  <TbEyeEdit />
                  Update info
                </NavLink>
              </li>
              <li>
                <NavLink to="allUsers">
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="applications">
                  <FaUsers /> Manage Applications
                </NavLink>
              </li>
              <li>
                <NavLink to="reviewResearch">
                  <VscOpenPreview /> Review Research Paper
                </NavLink>
              </li>
              <li>
                <NavLink to="addNews">
                  <FaRegNewspaper /> News and Update
                </NavLink>
              </li>
            </>
          )}
          {!isRoleLoading && role && (
            <>
              <li>
                <NavLink to="writeResearch">
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
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/aboutUs">
              <FaSchoolCircleExclamation /> About us
            </NavLink>
          </li>
          <li>
            <NavLink to="/researchAreas">
              <MdSubject />
              Research Aries
            </NavLink>
          </li>
          <li>
            <NavLink to="/publications">
              <IoNewspaperOutline /> Research and Publication
            </NavLink>
          </li>
          <li>
            <NavLink to="/team">
              <HiMiniUserGroup /> Team
            </NavLink>
          </li>
          <li>
            <NavLink to="/joinUs">
              <MdOutlineGroupAdd /> Join us
            </NavLink>
          </li>
          <li>
            <NavLink to="/contactUs">
              <FaPhone /> Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/news">
              <BsEnvelopePaper /> News and Updates
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
