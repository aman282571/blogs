import React, { useContext, useState, useEffect } from "react";
import PreNavbar from "./PreNavbar";
import Loader from "./Loader";
import Error from "./Error";
import { Link } from "react-router-dom";
import { stateContext } from "../ManageState/Context";
import PostNavbar from "./PostNavbar";
import { sortByDate, calcDate } from "./func";
function All_Blogs(props) {
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
    fetch("/api/blogs")
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
      {state.id ? <PostNavbar /> : <PreNavbar />}
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
                <span>
                  {" "}
                  <Link to={`/profile/${blog.owner}`} id="link">
                    {blog.owner === state.id ? "You" : blog.ownerName}
                  </Link>{" "}
                </span>
                on <span>{calcDate(blog.created_at)}</span>
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default All_Blogs;
