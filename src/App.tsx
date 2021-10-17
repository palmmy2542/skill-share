import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Profile from "./Pages/profile/index";
import Register from "./Pages/register/index";
import Login from "./Pages/login/index";
import Learn from "./Pages/learn/index";
import Upload from "./Pages/upload/index";

import "./App.css";
import { ClipFeedProvider } from "./Domains/ClipFeed/useClipFeed";
import useUserAuthenticationContext from "./Domains/UserAuthentication/useUserAuthentication";
import { UserDataProvider } from "./Domains/UserData/useUserDataContext";

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
            <Route exact path="/learn">
              <Learn />
            </Route>
            <Route exact path="/upload">
                <Upload />
              </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
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
