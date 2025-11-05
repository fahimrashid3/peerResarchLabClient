import { NavLink } from "react-router-dom";

const NavLinks = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getLinkClass = ({ isActive }) =>
    [
      "font-semibold transition-colors duration-150 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
      isActive
        ? "text-primary-600 dark:text-primary-400 underline underline-offset-4 decoration-2 decoration-primary-600 hover:text-primary-700 focus:text-primary-700"
        : "text-gray-950 dark:text-white hover:text-primary-700 focus:text-primary-700",
    ].join(" ");
  return (
    <>
      <li>
        <NavLink onClick={scrollToTop} className={getLinkClass} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink onClick={scrollToTop} className={getLinkClass} to="/aboutUs">
          About Us
        </NavLink>
      </li>

      {/* Other NavLinks remain unchanged */}
      <li>
        <NavLink
          onClick={scrollToTop}
          className={getLinkClass}
          to="/researchAreas"
        >
          Research Areas
        </NavLink>
      </li>

      <li>
        <NavLink
          onClick={scrollToTop}
          className={getLinkClass}
          to="/publications"
        >
          Publications and Resources
        </NavLink>
      </li>

      <li>
        <NavLink onClick={scrollToTop} className={getLinkClass} to="/team">
          Team
        </NavLink>
      </li>

      <li>
        <NavLink onClick={scrollToTop} className={getLinkClass} to="/joinUs">
          Join Us
        </NavLink>
      </li>
      <li>
        <NavLink onClick={scrollToTop} className={getLinkClass} to="/contactUs">
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink onClick={scrollToTop} className={getLinkClass} to="/news">
          News and Updates
        </NavLink>
      </li>
    </>
  );
};

export default NavLinks;
