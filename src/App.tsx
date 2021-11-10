import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Profile from "./Pages/profile/index";
import Register from "./Pages/register/index";
import Login from "./Pages/login/index";
import Learn from "./Pages/learn/index";

import "./App.css";
import { ClipFeedProvider } from "./Domains/ClipFeed/useClipFeed";
import useUserAuthenticationContext from "./Domains/UserAuthentication/useUserAuthentication";
import { UserDataProvider } from "./Domains/UserData/useUserDataContext";
import { PlayListProvider } from "./Domains/Playlist/usePlaylist";
import Error from "./Pages/error";

function App() {
  const { canAccessService } = useUserAuthenticationContext();
  const username = localStorage.getItem("skillUsername");
  console.log("test", canAccessService());
  return (
    <div className="App">
      <UserDataProvider>
        <ClipFeedProvider>
          <PlayListProvider>
            <Switch>
              <Route exact path="/error">
                <Error />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              {!canAccessService() && (
                <Route path="/">
                  <Redirect to="/login" />
                </Route>
              )}
              <Route exact path="/learn">
                <Learn />
              </Route>
              <Route exact path="/register">
                <Register />
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
        </ClipFeedProvider>
      </UserDataProvider>
    </div>
  );
}

export default App;
