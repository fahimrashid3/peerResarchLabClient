import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <li>
        <NavLink
          onClick={scrollToTop}
          className={({ isActive }) =>
            `${
              isActive
                ? "text-primary-600 font-bold underline underline-offset-4 decoration-2 decoration-primary-600 hover:text-primary-700"
                : "text-gray-950 dark:text-white font-semibold"
            } bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent`
          }
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={scrollToTop}
          className={({ isActive }) =>
            `${
              isActive
                ? "text-primary-600 font-bold underline underline-offset-4 decoration-2 decoration-primary-600 hover:text-primary-700"
                : "text-gray-950 dark:text-white font-semibold"
            } bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent`
          }
          to="/aboutUs"
        >
          About Us
        </NavLink>
      </li>

      {/* Other NavLinks remain unchanged */}
      <li>
        <NavLink
          onClick={scrollToTop}
          className={({ isActive }) =>
            `${
              isActive
                ? "text-primary-600 font-bold underline underline-offset-4 decoration-2 decoration-primary-600"
                : "text-gray-950 dark:text-white font-semibold"
            } bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent`
          }
          to="/researchAreas"
        >
          Research Areas
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={scrollToTop}
          className={({ isActive }) =>
            `${
              isActive
                ? "text-primary-600 font-bold underline underline-offset-4 decoration-2 decoration-primary-600"
                : "text-gray-950 dark:text-white font-semibold"
            } bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent`
          }
          to="/publications"
        >
          Publications and Resources
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={scrollToTop}
          className={({ isActive }) =>
            `${
              isActive
                ? "text-primary-600 font-bold underline underline-offset-4 decoration-2 decoration-primary-600"
                : "text-gray-950 dark:text-white font-semibold"
            } bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent`
          }
          to="/team"
        >
          Team
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={scrollToTop}
          className={({ isActive }) =>
            `${
              isActive
                ? "text-primary-600 font-bold underline underline-offset-4 decoration-2 decoration-primary-600"
                : "text-gray-950 dark:text-white font-semibold"
            } bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent`
          }
          to="/joinUs"
        >
          Join Us
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={scrollToTop}
          className={({ isActive }) =>
            `${
              isActive
                ? "text-primary-600 font-bold underline underline-offset-4 decoration-2 decoration-primary-600"
                : "text-gray-950 dark:text-white font-semibold"
            } bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent`
          }
          to="/contactUs"
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={scrollToTop}
          className={({ isActive }) =>
            `${
              isActive
                ? "text-primary-600 font-bold underline underline-offset-4 decoration-2 decoration-primary-600"
                : "text-gray-950 dark:text-white font-semibold"
            } bg-transparent hover:!bg-transparent focus:!bg-transparent active:!bg-transparent`
          }
          to="/news"
        >
          News and Updates
        </NavLink>
      </li>
    </>
  );
};

export default NavLinks;
