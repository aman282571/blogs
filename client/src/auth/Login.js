import React, { useState, useContext } from "react";
import { stateContext } from "../ManageState/Context";
import PreNavbar from "../components/PreNavbar";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { actions } from "../ManageState/Actions";

function Login(props) {
  const [localState, setLocalState] = useState({
    loading: false,
    error: false,
    msg: null,
  });
  const [auth_details, setAuthDetails] = useState({
    name: "",
    password: "",
  });
  const { state, dispatch } = useContext(stateContext);
  function submitHandler(e) {
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: auth_details.name,
        password: auth_details.password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          setLocalState((prev) => ({
            ...prev,
            msg: res.error,
          }));
        } else {
          dispatch({
            type: actions.login,
            payload: { id: res.id, img: res.img },
          });
          localStorage.setItem("img", JSON.stringify(res.img));
          localStorage.setItem("id", res.id);
        }
      })
      .catch((err) => {
        setLocalState((prev) => ({
          ...prev,
          error: "Something went wrong",
        }));
      });
  }
  // -------------------------for handling fields change ------------------------
  function fieldChangeHandler(e) {
    setAuthDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setLocalState((prev) => ({
      ...prev,

      loading: false,
      error: false,
      msg: null,
    }));
  }
  return localState.error ? (
    <Error />
  ) : localState.loading ? (
    <Loader />
  ) : (
    <>
      {localState.msg ? <p id="error_msg">{localState.msg}</p> : ""}
      <PreNavbar />
      <form
        id="register_form"
        className="register_form"
        onSubmit={submitHandler}
      >
        <h2>Login</h2>
        <p>
          <label htmlFor="username">Username:</label>
        </p>
        <input
          type="text"
          value={auth_details.name}
          name="name"
          id="username"
          required
          onChange={fieldChangeHandler}
        />
        <p>
          <label htmlFor="password">Password:</label>
        </p>
        <input
          type="password"
          name="password"
          value={auth_details.password}
          id="password"
          required
          onChange={fieldChangeHandler}
        />

        <input type="submit" name="" id="" />
        <p id="footer">
          Don't have an account?
          <Link to="/"> Register here </Link>
        </p>
      </form>
    </>
  );
}

export default Login;
