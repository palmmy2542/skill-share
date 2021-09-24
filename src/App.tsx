import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/home/index";
import Profile from "./Pages/profile/index";

import "./App.css";
import { UserDataProvider } from "./Domains/UserData/useUserDataContext";

function App() {
  return (
    <div className="App">
      <UserDataProvider>
        <div className="layout">
          <Switch>
            <Route exact path="/:username">
              <Profile />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </UserDataProvider>
    </div>
  );
}

export default App;
