import React, { useContext, useEffect } from "react";
import "../cssfiles/navbar.css";
import { actions } from "../ManageState/Actions";
import { stateContext } from "../ManageState/Context";
import { useLocation, Link, useHistory } from "react-router-dom";
function PostNavbar(props) {
  const { state, dispatch } = useContext(stateContext);
  const location = useLocation();
  const history = useHistory();

  function logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("img");
    dispatch({ type: actions.logout });
    history.push("/");
  }
  useEffect(() => {
    let ele = document.getElementById("button");
    let slide = document.getElementById("slide");
    ele.addEventListener("click", (e) => {
      ele.classList.toggle("change");
      slide.classList.toggle("slide");
    });
  }, []);
  return (
    <>
      <nav id="login_nav">
        <ul>
          <li id={location.pathname === "/blogs" ? "highlight" : ""}>
            <Link to="/blogs" id="links">
              All Blogs
            </Link>{" "}
          </li>
          <li id={location.pathname === "/addblog" ? "highlight" : ""}>
            <Link to="/addblog" id="links">
              Add Blog
            </Link>{" "}
          </li>
          <li id={location.pathname === "/myblogs" ? "highlight" : ""}>
            <Link to="/myblogs" id="links">
              My Blogs
            </Link>{" "}
          </li>
          <li id={location.pathname === "/users" ? "highlight" : ""}>
            <Link id="links" to="/users">
              All Users
            </Link>
          </li>
        </ul>
        <div id="profileSection">
          <Link id="links" to={`/profile/${state.id}`}>
            {state.img ? (
              <img src={state.img} alt="" id="profile_pic" />
            ) : (
              <img alt="" id="profile_pic" />
            )}
          </Link>
          <p id="logout" onClick={logout}>
            Log Out
          </p>
        </div>
      </nav>
      <nav id="mobile">
        <p id="button" className="change"></p>
        <ul id="slide" className="slide">
          <li>
            {" "}
            <Link id="links" to={`/profile/${state.id}`}>
              {state.img ? (
                <img src={state.img} alt="" id="profile_pic" />
              ) : (
                <img alt="" id="profile_pic" />
              )}
            </Link>
          </li>
          <li id={location.pathname === "/blogs" ? "highlight" : ""}>
            <Link to="/blogs" id="links">
              All Blogs
            </Link>{" "}
          </li>
          <li id={location.pathname === "/addblog" ? "highlight" : ""}>
            <Link to="/addblog" id="links">
              Add Blog
            </Link>{" "}
          </li>
          <li id={location.pathname === "/myblogs" ? "highlight" : ""}>
            <Link to="/myblogs" id="links">
              My Blogs
            </Link>{" "}
          </li>
          <li id={location.pathname === "/users" ? "highlight" : ""}>
            <Link id="links" to="/users">
              All Users
            </Link>
          </li>
          <li onClick={logout}>Log Out</li>
        </ul>
      </nav>
    </>
  );
}

export default PostNavbar;
