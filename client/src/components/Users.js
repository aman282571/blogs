import React, { useEffect, useState, useContext } from "react";
import PreNavbar from "./PreNavbar";
import Loader from "./Loader";
import Error from "./Error";
import { Link } from "react-router-dom";
import { stateContext } from "../ManageState/Context";
import PostNavbar from "./PostNavbar";
function Users(props) {
  const [localState, setLocalState] = useState({
    loading: true,
    error: false,
    data: null,
  });

  const { state, dispatch } = useContext(stateContext);
  useEffect(() => {
    setLocalState((prev) => ({
      data: null,
      loading: true,
      error: false,
    }));
    fetch("/api/users")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setLocalState((prev) => ({
            ...prev,
            data: null,
            loading: false,
            error: true,
          }));
        } else {
          setLocalState((prev) => ({
            ...prev,
            data: res.data,
            loading: false,
            error: false,
          }));
        }
      })
      .catch((err) => {
        setLocalState((prev) => ({
          data: null,
          loading: false,
          error: true,
        }));
      });
  }, []);

  return localState.loading ? (
    <Loader />
  ) : localState.error ? (
    <Error />
  ) : (
    <>
      {state.id ? <PostNavbar /> : <PreNavbar />}

      <div id="users">
        {localState.data.map((user) => {
          return (
            <div id="indi_user" key={user._id}>
              {user.img ? (
                <img src={user.img} alt="" id="user_photo" />
              ) : (
                <img alt="" id="user_photo" />
              )}

              <p id="user_name">
                <Link to={`/profile/${user._id}`} id="link">
                  {" "}
                  {user.name}{" "}
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Users;
