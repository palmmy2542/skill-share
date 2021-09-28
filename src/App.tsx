import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/home/index";
import Profile from "./Pages/profile/index";
import Register from "./Pages/register/index";
import Login from "./Pages/login/index";
import "./App.css";
import { UserDataProvider } from "./Domains/UserData/useUserDataContext";
import BottomNav from "./Components/BottomNav/BottomNav";
import { UserAuthenticationProvider } from "./Domains/UserAuthentication/useUserAuthentication";

function App() {
  return (
    <div className="App">
      <UserAuthenticationProvider>
        <UserDataProvider>
          <Switch>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/:userParam">
              <Profile />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </UserDataProvider>
      </UserAuthenticationProvider>
    </div>
  );
}

export default App;
