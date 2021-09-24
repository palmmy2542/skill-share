import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/home/index";
import Profile from "./Pages/profile/index";

import "./App.css";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
