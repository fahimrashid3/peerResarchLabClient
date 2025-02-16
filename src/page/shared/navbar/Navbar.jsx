import { Link } from "react-router-dom";
import NavLinks from "./NavLink";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="bg-black bg-opacity-70 py-3 w-full z-[50] fixed">
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black bg-opacity-50 rounded-box w-52"
              >
                <NavLinks></NavLinks>
              </ul>
            </div>
            <Link to="/">
              <div className="btn btn-ghost bg-transparent hover:bg-transparent flex flex-col md:flex-row">
                {/* <img src={""} className="hidden md:block rounded-md bg-white" /> */}
                <h1 className="text-lg md:text-3xl font-bold text-white text-center sm:text-left">
                  Peer <span className="text-primary-400">Research</span> Lab
                </h1>
              </div>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base">
              <NavLinks></NavLinks>
            </ul>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="pr-5 text-4xl dark:text-white dark:hover:text-gray-100 text-white hover:text-gray-300"
              >
                <CgProfile />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-primary-900 text-white dark:bg-gray-400 dark:text-dark-900 rounded-box z-[1] w-64 p-2 shadow"
              >
                <li>
                  <Link to="/dashboard/adminHome">
                    <CgProfile /> Profile
                  </Link>
                </li>

                <li>
                  <Link to="/dashboard/allUsers">
                    <IoMdLogIn />
                    Log In
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
