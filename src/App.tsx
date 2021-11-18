import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Profile from "./Pages/profile/index";
import Register from "./Pages/register/index";
import Login from "./Pages/login/index";
import Learn from "./Pages/learn/index";
import Home from "./Pages/home/index";

import "./App.css";
import { ClipFeedProvider } from "./Domains/ClipFeed/useClipFeed";
import useUserAuthenticationContext from "./Domains/UserAuthentication/useUserAuthentication";
import { UserDataProvider } from "./Domains/UserData/useUserDataContext";
import { PlayListProvider } from "./Domains/Playlist/usePlaylist";
import Error from "./Pages/error";
import { ClipCommentProvider } from "./Domains/ClipComment/useClipComment";

function App() {
  const { canAccessService } = useUserAuthenticationContext();
  const username = localStorage.getItem("skillUsername");
  return (
    <div className="App">
      <UserDataProvider>
        <ClipFeedProvider>
          <ClipCommentProvider>
            <PlayListProvider>
              <Switch>
                <Route exact path="/error">
                  <Error />
                </Route>
                {/* <Route
                exact
                path="/"
                render={() => {
                  if (canAccessService()) {
                    return <Redirect to={`/${username}`} />;
                  } else {
                    return <Redirect to={`/login`} />;
                  }
                }}
              ></Route> */}
                <Route exact path="/learn">
                  <Learn />
                </Route>
                <Route exact path="/test">
                  <Home />
                </Route>
                <Route exact path="/register">
                  <Register />
                </Route>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/:usernameParam">
                  <Profile />
                </Route>
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
              </Switch>
            </PlayListProvider>
          </ClipCommentProvider>
        </ClipFeedProvider>
      </UserDataProvider>
    </div>
  );
}

export default App;
