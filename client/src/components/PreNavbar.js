import React from "react";
import "../cssfiles/navbar.css";
import { useLocation, Link } from "react-router-dom";

function PreNavbar(props) {
  const location = useLocation();
  return (
    <nav id="guest_nav">
      <ul>
        <li id={location.pathname === "/blogs" ? "highlight" : ""}>
          <Link to="/blogs" id="links">
            All Blogs
          </Link>{" "}
        </li>
        <li id={location.pathname === "/users" ? "highlight" : ""}>
          <Link id="links" to="/users">
            All Users
          </Link>
        </li>
        <li id={location.pathname === "/" ? "highlight" : ""}>
          <Link id="links" to="/">
            Register
          </Link>
        </li>
        <li id={location.pathname === "/login" ? "highlight" : ""}>
          <Link id="links" to="/login">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default PreNavbar;
