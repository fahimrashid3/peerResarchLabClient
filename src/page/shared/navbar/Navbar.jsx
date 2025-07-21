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
import logoWhitedPng from "../../../assets/logo/logoWhitePng.png";
import logoWhiteWithoutText from "../../../assets/logo/logoWhiteWithoutText.png";
import { GiStabbedNote } from "react-icons/gi";

import {
  MdConnectWithoutContact,
  MdOutlinePendingActions,
} from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";

const Navbar = () => {
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
      className={`bg-primary-400 bg-opacity-80 md:py-3 w-full z-[50] fixed transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ willChange: "transform" }}
    >
      <div className="mx-auto">
        <div className="navbar w-full">
          <div className="navbar-start">
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
                className="menu menu-sm dropdown-content z-[1] shadow bg-primary-400 bg-opacity-50 rounded-box w-56"
              >
                <NavLinks />
              </ul>
            </div>
            <Link to="/">
              {/* <div className="btn btn-ghost bg-transparent hover:bg-transparent flex flex-col md:flex-row">
                <h1 className="text-lg md:text-3xl font-bold text-white text-center sm:text-left">
                  Peer <span className="text-primary-600">Research</span> Lab
                </h1>
              </div> */}
              <img
                src={logoWhitedPng}
                alt="Peer Research Lab Logo"
                className="h-12 text-primary-700 hidden md:block" // or whatever size you need
              />
              <img
                src={logoWhiteWithoutText}
                alt="Peer Research Lab Logo"
                className="h-12 text-primary-700 md:hidden" // or whatever size you need
              />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base">
              <NavLinks />
            </ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="pr-5 text-4xl dark:text-white dark:hover:text-gray-100 text-white hover:text-gray-300"
              >
                {users?.photoUrl ? (
                  <div className="avatar">
                    <div className="w-10 rounded-full ring-primary-700 ring-offset-primary-500 ring ring-offset-1">
                      <img src={users?.photoUrl} />
                    </div>
                  </div>
                ) : (
                  <CgProfile />
                )}
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-primary-400 bg-opacity-80 text-white dark:bg-gray-400 dark:text-dark-900 rounded-box z-[1] w-64 shadow"
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
                {user ? (
                  <li onClick={handelLogout}>
                    <p>
                      <span className="text-xl font-semibold">
                        <CiLogout />
                      </span>
                      Logout
                    </p>
                  </li>
                ) : (
                  <Link to="/login">
                    <li>
                      <p className="flex">
                        <span className="text-xl">
                          <FiLogIn />
                        </span>
                        Login
                      </p>
                    </li>
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
