import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import MyBlogs from "./components/MyBlogs";
import NewBlog from "./components/NewBlog";
import AllBlogs from "./components/AllBlogs";
import Users from "./components/Users";
import Profile from "./components/Profile";
import SingleBlogs from "./components/SingleBlogs";
import "./cssfiles/All_blogs.css";
import "./cssfiles/navbar.css";
import "./cssfiles/Profile.css";
import "./cssfiles/NewBlog.css";
import "./cssfiles/Users.css";
import "./auth/auth.css";
import "./cssfiles/Single_blog.css";
import { stateContext } from "./ManageState/Context";

function App() {
  const { state, dispatch } = useContext(stateContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {state.id ? <Redirect to="/myblogs" /> : <Register />}
        </Route>
        <Route exact path="/login">
          {state.id ? <Redirect to="/myblogs" /> : <Login />}
        </Route>
        <Route path="/blogs" exact>
          <AllBlogs />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/myblogs" exact>
          {!state.id ? <Redirect to="/login" /> : <MyBlogs />}
        </Route>

        <Route path="/blog/:id" exact>
          <SingleBlogs />
        </Route>
        <Route path="/profile/:id" exact>
          <Profile />
        </Route>
        <Route path="/addblog" exact>
          {!state.id ? <Redirect to="/login" /> : <NewBlog />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
