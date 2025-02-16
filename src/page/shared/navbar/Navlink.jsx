import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#004080" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#004080" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/researchAreas"
        >
          Research Areas
        </NavLink>
      </li>

      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#004080" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/about"
        >
          About Us
        </NavLink>
      </li>

      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#004080" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/publications"
        >
          Publications and Resources
        </NavLink>
      </li>

      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#004080" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/team"
        >
          Team
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#004080" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/news"
        >
          News and Updates
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#004080" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/joinUs"
        >
          Join Us
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#004080" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/contact"
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#004080" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/blogs"
        >
          Blogs
        </NavLink>
      </li>
    </>
  );
};

export default NavLinks;
