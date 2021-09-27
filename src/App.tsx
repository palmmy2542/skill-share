import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/home/index";
import Profile from "./Pages/profile/index";
import Register from "./Pages/register/index";
import Login from "./Pages/login/index";
import "./App.css";
import { UserDataProvider } from "./Domains/UserData/useUserDataContext";
import Navbar from "./Components/Navbar/Navbar";
import { UserAuthenticationProvider } from "./Domains/UserAuthentication/useUserAuthentication";

function App() {
  return (
    <div className="App">
      <Navbar name="Default" />
      <UserAuthenticationProvider>
        <UserDataProvider>
          <div className="layout">
            <Switch>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/:username">
                <Profile />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </UserDataProvider>
      </UserAuthenticationProvider>
    </div>
  );
}

export default App;
