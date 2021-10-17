import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/home/index";
import Profile from "./Pages/profile/index";
import Register from "./Pages/register/index";
import Login from "./Pages/login/index";
import Feed from "./Pages/feed";
import Upload from "./Pages/upload/index";

import "./App.css";
import { UserDataProvider } from "./Domains/UserData/useUserDataContext";
import { UserAuthenticationProvider } from "./Domains/UserAuthentication/useUserAuthentication";
import { ClipFeedProvider } from "./Domains/ClipFeed/useClipFeed";

function App() {
  return (
    <div className="App">
      <UserAuthenticationProvider>
        <UserDataProvider>
          <ClipFeedProvider>
            <Switch>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/upload">
                <Upload />
              </Route>
              <Route exact path="/:userParam/:videoId">
                <Feed />
              </Route>
              <Route exact path="/:userParam">
                <Profile />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </ClipFeedProvider>
        </UserDataProvider>
      </UserAuthenticationProvider>
    </div>
  );
}

export default App;
