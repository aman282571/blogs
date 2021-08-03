import React, { useEffect, useState, useContext } from "react";
import PreNavbar from "./PreNavbar";
import Loader from "./Loader";
import Error from "./Error";
import PostNavbar from "./PostNavbar";
import { Link, useParams, useHistory } from "react-router-dom";
import { stateContext } from "../ManageState/Context";
import { calcDate } from "./func";
function SingleBlogs(props) {
  const params = useParams();
  const history = useHistory();

  const [edit, setEdit] = useState(false);
  const [localState, setLocalState] = useState({
    loading: true,
    error: false,
  });
  const [blogData, setBlogData] = useState({
    title: null,
    desc: null,
    created_at: null,
    updated_at: null,
    owner: null,
    ownerName: null,
  });
  const { state, dispatch } = useContext(stateContext);
  function fieldChangeHandler(e) {
    setBlogData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    setLocalState((prev) => ({
      loading: false,
      error: false,
    }));
  }
  function saveHandler() {
    fetch(`/api/updateblog/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: blogData.title,
        desc: blogData.desc,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setLocalState((prev) => ({
            loading: false,
            error: true,
          }));
        } else {
          setLocalState((prev) => ({
            loading: false,
            error: false,
          }));
          history.go(0);
        }
      })
      .catch((err) => {
        setLocalState((prev) => ({
          loading: false,
          error: true,
        }));
      });
  }
  function deleteHandler() {
    let response = window.confirm("Blog will be deleted permanently");
    if (!response) return;
    setLocalState((prev) => ({
      error: false,
      loading: true,
    }));
    fetch(`/api/deleteblog/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setLocalState((prev) => ({
            loading: false,
            error: true,
          }));
        } else {
          setLocalState((prev) => ({
            loading: false,
            error: false,
          }));
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
  useEffect(() => {
    setLocalState((prev) => ({
      error: false,
      loading: true,
    }));
    fetch(`/api/blog/${params.id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setLocalState((prev) => ({
            ...prev,

            loading: false,
            error: true,
          }));
        } else {
          setLocalState((prev) => ({
            loading: false,
            error: false,
          }));
          const { title, desc, created_at, updated_at, owner, ownerName } =
            res.data;
          setBlogData((prev) => ({
            title,
            desc,
            created_at,
            updated_at,
            owner,
            ownerName,
          }));
        }
      })
      .catch((err) => {
        setLocalState((prev) => ({
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
      <div id="blog">
        {edit ? (
          <>
            <input
              type="text"
              value={blogData.title}
              name="title"
              id="change_title"
              onChange={fieldChangeHandler}
            />
            <textarea
              name="desc"
              id="change_desc"
              onChange={fieldChangeHandler}
            >
              {blogData.desc}
            </textarea>
            <p id="buttons">
              <span id="cancel_button" onClick={() => setEdit((prev) => !prev)}>
                Cancel
              </span>
              <span id="save_button" onClick={saveHandler}>
                Save
              </span>
            </p>
          </>
        ) : (
          <>
            <p id="title">{blogData.title}</p>
            <p id="author">
              Written by{" "}
              <span>
                <Link to={`/profile/${blogData.owner}`} id="link">
                  {blogData.owner === state.id ? "You" : blogData.ownerName}{" "}
                </Link>
              </span>{" "}
              on <span>{calcDate(blogData.created_at)}</span>
              {blogData.updated_at ? (
                <>
                  <span id="updateDate"> last updated on</span>
                  <span> {calcDate(blogData.updated_at)} </span>
                </>
              ) : (
                ""
              )}
            </p>
            <p id="desc">{blogData.desc}</p>
            {state.id === blogData.owner ? (
              <p id="buttons">
                <span id="edit_button" onClick={() => setEdit((prev) => !prev)}>
                  Edit
                </span>
                <span id="delete_button" onClick={deleteHandler}>
                  Delete
                </span>
              </p>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </>
  );
}

export default SingleBlogs;
