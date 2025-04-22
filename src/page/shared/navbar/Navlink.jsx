import React from "react";
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
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "transparent",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#00264D" : "white",
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
          onClick={scrollToTop}
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "transparent",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#00264D" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/aboutUs"
        >
          About Us
        </NavLink>
      </li>

      {/* Other NavLinks remain unchanged */}
      <li>
        <NavLink
          onClick={scrollToTop}
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "transparent",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#00264D" : "white",
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
          onClick={scrollToTop}
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "transparent",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#00264D" : "white",
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
          onClick={scrollToTop}
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "transparent",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#00264D" : "white",
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
          onClick={scrollToTop}
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "transparent",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#00264D" : "white",
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
          onClick={scrollToTop}
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "transparent",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#00264D" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/contactUs"
        >
          Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          onClick={scrollToTop}
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "transparent",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#00264D" : "white",
              viewTransitionName: isTransitioning ? "slide" : "",
            };
          }}
          to="/news"
        >
          News and Updates
        </NavLink>
      </li>
    </>
  );
};

export default NavLinks;
