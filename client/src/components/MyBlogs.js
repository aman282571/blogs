import React, { useEffect, useState, useContext } from "react";
import PostNavbar from "./PostNavbar";
import { Link, useParams } from "react-router-dom";
import { sortByDate, calcDate } from "./func";
import Loader from "./Loader";
import Error from "./Error";
import { stateContext } from "../ManageState/Context";
function MyBlogs(props) {
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
    fetch(`/api/userblogs/${props.id ? props.id : state.id}`)
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
          sortByDate(res.data);
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
          ...prev,
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
      {props.id ? "" : <PostNavbar />}
      {localState.data.length === 0 ? <p id="noData">No Blogs Yet</p> : ""}
      <div id="all_blogs">
        {localState.data.map((blog) => {
          return (
            <div id="indi_blogs" key={blog._id}>
              <Link to={`/blog/${blog._id}`} id="link">
                <p id="title">{blog.title}</p>
              </Link>
              <p id="desc">{blog.desc}</p>
              <p id="author">
                Written by{" "}
                <Link to={`/profile/${blog.owner}`} id="link">
                  <span>
                    {state.id === blog.owner ? "You" : blog.ownerName}
                  </span>
                </Link>{" "}
                on <span>{calcDate(blog.created_at)}</span>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MyBlogs;
