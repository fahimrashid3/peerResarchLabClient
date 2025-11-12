import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiLogIn } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { VscOpenPreview } from "react-icons/vsc";
import { FaEdit, FaEnvelope, FaRegNewspaper, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import useRole from "../../../hooks/useRole";
import useUsers from "../../../hooks/useUser";
import NavLinks from "./Navlink";
import { TbCategoryPlus, TbEyeEdit } from "react-icons/tb";
import logoColoredPng from "../../../assets/logo/logoColoredPng.png";
import logoColoredWithoutText from "../../../assets/logo/logoColoredWithoutText.png";
import { GiStabbedNote } from "react-icons/gi";

import {
  MdConnectWithoutContact,
  MdOutlinePendingActions,
} from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { BsMoonStars, BsSun } from "react-icons/bs";
import useTheme from "../../../hooks/useTheme";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logOut } = useAuth();
  const [users] = useUsers();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [role, isRoleLoading] = useRole();

  // Navbar show/hide state
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handelLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "LogOut Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <div
      className={`bg-white/70 dark:bg-gray-950/70 py-2 md:py-3 w-full z-[50] fixed transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } text-gray-950 dark:text-white`}
      style={{ willChange: "transform" }}
    >
      <div className="mx-auto">
        <div className="navbar w-full">
          <div className="navbar-start">
            {/* Dropdown menu for sm and md devices */}
            <div className="dropdown">
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
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content z-[1] shadow bg-white text-gray-950 dark:bg-gray-950 dark:text-white rounded-box w-56"
              >
                <NavLinks />
              </ul>
            </div>
            <Link to="/">
              <img
                src={logoColoredPng}
                alt="Peer Research Lab Logo"
                className="h-12 text-primary-700 hidden md:block"
              />
              <img
                src={logoColoredWithoutText}
                alt="Peer Research Lab Logo"
                className="h-8 text-primary-700 md:hidden"
              />
            </Link>
          </div>
          {/* Horizontal menu for lg and above devices */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base">
              <NavLinks />
            </ul>
          </div>
          <div className="navbar-end">
            {/* Theme toggle */}
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="btn btn-ghost text-xl mr-2 text-gray-950 dark:text-white"
            >
              {theme === "dark" ? <BsSun /> : <BsMoonStars />}
            </button>
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="md:pr-5 text-3xl md:text-4xl text-gray-950 hover:text-gray-700 dark:text-white dark:hover:text-gray-300"
                >
                  {users?.photoUrl ? (
                    <div className="avatar">
                      <div className="w-8 md:w-10 rounded-full ring-primary-700 ring-offset-primary-500 ring ring-offset-1">
                        <img src={users?.photoUrl} alt="Profile" />
                      </div>
                    </div>
                  ) : (
                    <div className="avatar">
                      <div className="w-10 rounded-full ring-primary-700 ring-offset-primary-500 ring ring-offset-1 bg-primary-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {user?.displayName?.charAt(0)?.toUpperCase() ||
                            user?.email?.charAt(0)?.toUpperCase() ||
                            "U"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white text-gray-950 dark:bg-gray-950 dark:text-white rounded-box z-[1] w-64 shadow"
                >
                  {/* Common Role-Based Links */}

                  {user && (
                    <>
                      <li>
                        <Link to="/dashboard/userProfile">
                          <span className="text-xl">
                            <CgProfile />
                          </span>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/dashboard/pendingPaper">
                          <span className="text-xl">
                            <MdOutlinePendingActions />
                          </span>
                          My Pending Paper
                        </Link>
                      </li>
                      <li>
                        <NavLink to="/dashboard/myContacts">
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
                        <Link to="/dashboard/myApplication">
                          <span className="text-xl">
                            <GiStabbedNote />
                          </span>
                          My applications
                        </Link>
                      </li>
                    </>
                  )}

                  {/* Admin Specific Links */}
                  {!isAdminLoading && isAdmin && (
                    <>
                      <li>
                        <NavLink to="/dashboard/updateInfo">
                          <TbEyeEdit />
                          Update info
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/allUsers">
                          <FaUsers /> All Users
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/applications">
                          <FaUsers /> Manage Applications
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/reviewResearch">
                          <VscOpenPreview /> Review Research Paper
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/addNews">
                          <FaRegNewspaper /> News and Update
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/addArea">
                          <TbCategoryPlus />
                          Add new Research Area
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/addCollaborators">
                          <FaUserGroup />
                          Add Collaborators
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/dashboard/manageContacts">
                          <MdConnectWithoutContact />
                          Manage Contacts
                        </NavLink>
                      </li>
                    </>
                  )}
                  {!isRoleLoading && role && (
                    <>
                      <li>
                        <Link to="/dashboard/writeResearch">
                          <span className="text-xl">
                            <FaEdit />
                          </span>
                          Write Research Paper
                        </Link>
                      </li>
                    </>
                  )}

                  {/* Auth Buttons */}
                  <li onClick={handelLogout}>
                    <p>
                      <span className="text-xl font-semibold">
                        <CiLogout />
                      </span>
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary text-white bg-primary-600 hover:bg-primary-700 border-primary-700 hover:border-primary-800"
              >
                <span className="text-lg">
                  <FiLogIn />
                </span>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
