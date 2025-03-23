import React from "react";
import { NavLink, useMatch } from "react-router-dom";

const NavLinks = () => {
  // Check if any of the dropdown routes are active
  const isOverviewActive = useMatch("/overview");
  const isMissionActive = useMatch("/mission");
  const isVisionActive = useMatch("/vision");
  const isHistoryActive = useMatch("/history");

  // Determine if any dropdown item is active
  const isDropdownActive =
    isOverviewActive || isMissionActive || isVisionActive || isHistoryActive;

  return (
    <>
      <li>
        <NavLink
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
        <div className="dropdown md:dropdown-hover dropdown-bottom">
          {/* Apply active styles to the dropdown trigger based on isDropdownActive */}
          <div
            tabIndex={0}
            className="cursor-pointer"
            style={{
              color: isDropdownActive ? "#00264D" : "white",
              fontWeight: isDropdownActive ? "bold" : "",
            }}
          >
            About us
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-primary-400 bg-opacity-80 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li>
              <NavLink
                style={({ isActive, isTransitioning }) => {
                  return {
                    background: isActive ? "transparent" : "transparent",
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#00264D" : "white",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
                to="/overview"
              >
                Lab Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive, isTransitioning }) => {
                  return {
                    background: isActive ? "transparent" : "transparent",
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#00264D" : "white",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
                to="/mission"
              >
                Lab Mission
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive, isTransitioning }) => {
                  return {
                    background: isActive ? "transparent" : "transparent",
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#00264D" : "white",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
                to="/vision"
              >
                Lab Vision
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive, isTransitioning }) => {
                  return {
                    background: isActive ? "transparent" : "transparent",
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#00264D" : "white",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
                to="/history"
              >
                Lab History
              </NavLink>
            </li>
          </ul>
        </div>
      </li>

      {/* Other NavLinks remain unchanged */}
      <li>
        <NavLink
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
      <li>
        <NavLink
          style={({ isActive, isTransitioning }) => {
            return {
              background: isActive ? "transparent" : "transparent",
              fontWeight: isActive ? "bold" : "",
              color: isActive ? "#00264D" : "white",
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
