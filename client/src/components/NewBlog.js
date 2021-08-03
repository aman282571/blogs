import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";
import { stateContext } from "../ManageState/Context";
import PostNavbar from "./PostNavbar";
function NewBlog(props) {
  const history = useHistory();
  const [blog_details, setblogDetails] = useState({
    title: "",
    desc: "",
  });
  const [localState, setLocalState] = useState({
    loading: false,
    error: false,
  });
  const { state, dispatch } = useContext(stateContext);
  function submitHandler(e) {
    e.preventDefault();
    setLocalState((prev) => ({
      loading: true,
      error: false,
    }));
    fetch(`/api/addblog/${state.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: blog_details.title,
        desc: blog_details.desc,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.error) {
          setLocalState((prev) => ({
            loading: false,
            error: true,
          }));
        } else {
          history.push("/myblogs");
        }
      })
      .catch((err) => {
        setLocalState((prev) => ({
          loading: false,
          error: true,
        }));
      });
  }
  // -------------------------for handling fields change ------------------------
  function fieldChangeHandler(e) {
    setblogDetails((prev) => {
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
      <PostNavbar />
      <form id="new_blog" onSubmit={submitHandler}>
        <h1 id="new_blog_title">Create New Blog</h1>
        <p>Title:</p>
        <input
          onChange={fieldChangeHandler}
          value={blog_details.title}
          type="text"
          name="title"
          id="title"
          required
        />
        <p>Description:</p>
        <textarea
          onChange={fieldChangeHandler}
          value={blog_details.desc}
          name="desc"
          id="desc"
          cols="30"
          rows="10"
          required
        ></textarea>
        <input type="Submit" value="Save" />
      </form>
    </>
  );
}

export default NewBlog;
