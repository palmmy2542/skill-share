import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/home/index";
import Profile from "./Pages/profile/index";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/profile/:id">
          <Profile />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
