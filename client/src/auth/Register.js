import React, { useState } from "react";
import PreNavbar from "../components/PreNavbar";
import { Link, useHistory } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";

function Register(props) {
  const history = useHistory();
  const [localState, setLocalState] = useState({
    loading: false,
    error: false,
    msg: null,
  });
  const [auth_details, setAuthDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  //--------------------------submit handler-------------------
  async function submitHandler(e) {
    e.preventDefault();

    if (auth_details.password !== auth_details.confirm_password) {
      setLocalState((prev) => ({
        ...prev,
        msg: "Confirm password does not match with passowrd",
      }));
    } else if (auth_details.password.length < 8) {
      setLocalState((prev) => ({
        ...prev,
        msg: "Minimum password length should be 8",
      }));
    } else {
      try {
        let userInfo = JSON.stringify({
          name: auth_details.name,
          email: auth_details.email,
          password: auth_details.password,
        });
        let res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: userInfo,
        });
        let data = await res.json();
        if (data.error) {
          setLocalState((prev) => ({
            ...prev,
            msg: res.error,
          }));
        } else {
          history.push("/login");
        }
      } catch (err) {
        setLocalState((prev) => ({
          ...prev,
          error: "Something went wrong",
        }));
      }
    }
  }
  //-------------------field change handler--------------------
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
  return localState.loading ? (
    <Loader />
  ) : localState.error ? (
    <Error />
  ) : (
    <>
      {localState.msg ? <p id="error_msg">{localState.msg}</p> : ""}
      <PreNavbar />
      <form
        action=""
        id="register_form"
        className="register_form"
        onSubmit={submitHandler}
      >
        <h2>Register</h2>
        <p>
          <label htmlFor="name">Username:</label>
        </p>
        <input
          type="text"
          name="name"
          value={auth_details.name}
          id="username"
          required
          onChange={fieldChangeHandler}
        />
        <p>
          <label htmlFor="email">Email:</label>
        </p>
        <input
          type="email"
          name="email"
          id="email"
          value={auth_details.email}
          required
          onChange={fieldChangeHandler}
        />
        <p>
          <label htmlFor="password">Password:</label>
        </p>
        <input
          type="password"
          name="password"
          id="password"
          value={auth_details.password}
          required
          onChange={fieldChangeHandler}
        />
        <p>
          <label htmlFor="confirm_password">Confirm Password:</label>
        </p>
        <input
          type="password"
          name="confirm_password"
          id="confirm_password"
          value={auth_details.confirm_password}
          required
          onChange={fieldChangeHandler}
        />
        <input type="submit" name="" id="" />
        <p id="footer">
          Have an account?
          <Link to="/login"> Login here </Link>
        </p>
      </form>
    </>
  );
}

export default Register;
