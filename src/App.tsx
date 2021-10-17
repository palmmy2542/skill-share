import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./Pages/home/index";
import Profile from "./Pages/profile/index";
import Register from "./Pages/register/index";
import Login from "./Pages/login/index";
import Feed from "./Pages/feed";
import Search from "./Pages/search/index";

import "./App.css";
import { ClipFeedProvider } from "./Domains/ClipFeed/useClipFeed";
import useUserAuthenticationContext from "./Domains/UserAuthentication/useUserAuthentication";
import { UserDataProvider } from "./Domains/UserData/useUserDataContext";
import Feed from "./Pages/feed";
import Login from "./Pages/login/index";
import Profile from "./Pages/profile/index";
import Register from "./Pages/register/index";

function App() {
  const { canAccessService } = useUserAuthenticationContext();
  const username = localStorage.getItem("skillUsername");

  return (
    <div className="App">
      <UserDataProvider>
        <ClipFeedProvider>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (canAccessService()) {
                  return <Redirect to={`/${username}`} />;
                } else {
                  return <Redirect to={`/login`} />;
                }
              }}
            ></Route>
            <Route exact path="/learn/:style">
              <Feed />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route exact path="/:userParam">
              <Profile />
            </Route>
          </Switch>
        </ClipFeedProvider>
      </UserDataProvider>
    </div>
  );
}

export default App;
