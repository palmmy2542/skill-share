import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Pages/home/index";
import Profile from "./Pages/profile/index";
import Register from "./Pages/register/index";
import Login from "./Pages/login/index";
import Feed from "./Pages/feed";

import "./App.css";
import { UserDataProvider } from "./Domains/UserData/useUserDataContext";
import { ClipFeedProvider } from "./Domains/ClipFeed/useClipFeed";
import useUserAuthenticationContext from "./Domains/UserAuthentication/useUserAuthentication";
import ClipFeed from "./Pages/feed/Components/ClipFeed";

function App() {
  const { canAccessService } = useUserAuthenticationContext();
  const username = localStorage.getItem("skillUsername");

  return (
    <div className="App">
      <UserDataProvider>
        <ClipFeedProvider>
          <Switch>
            <Route exact path="/">
              <ClipFeed />
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
