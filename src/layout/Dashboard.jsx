import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaPhone, FaRegNewspaper, FaUsers } from "react-icons/fa";
import {
  MdOutlineGroupAdd,
  MdOutlineMenuOpen,
  MdSubject,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiMiniUserGroup } from "react-icons/hi2";
import { BsEnvelopePaper } from "react-icons/bs";
import { FaSchoolCircleExclamation } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { VscOpenPreview } from "react-icons/vsc";
import useAdmin from "../hooks/useAdmin";
import useRole from "../hooks/useRole";

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  const [role] = useRole();
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
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/applications">
                  <IoMdPersonAdd />
                  Manage Applications
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reviewResearch">
                  <VscOpenPreview />
                  Review Research Paper
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addNews">
                  <FaRegNewspaper />
                  Add New News and Update
                </NavLink>
              </li>
            </>
          ) : role ? (
            <>
              <li>
                <NavLink to="/dashboard/writeResearch">
                  <FaRegNewspaper />
                  Write new Research Paper
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userProfile">
                  <span className="text-2xl">
                    <CgProfile />
                  </span>
                  Profile
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
            <NavLink to="/overview">
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
          <li>
            <NavLink to="/blogs">
              <MdOutlineMenuOpen /> Blogs
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoard;
