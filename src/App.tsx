import React from 'react';
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/home/index";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar name="Default" />
      <div className="layout">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
