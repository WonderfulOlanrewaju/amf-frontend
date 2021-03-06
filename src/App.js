import React, { createContext, useReducer } from "react";
import { Parse } from "./components/Parse";
import { NotFound } from "./components/NotFound";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Protector } from "./components/Protector";
import { Home } from "./components/Home";
import { Switch, Route } from "react-router-dom";
import { LedgerDashboard } from "./components/LedgerDashboard";
import { Test } from "./components/Test";
import { UserDashboard } from "./components/UserDashboard";
import "./assets/output.css";
export const AuthContext = createContext();

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  err: null,
  success: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
        err: null,
        success: action.payload.message
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
        err: null,
        success: null
      };
    case "ERR":
      return {
        ...state,
        err: action.payload
      };
    case "SUCCESS":
      return {
        ...state,
        success: action.payload.message
      };
    default:
      return {
        initialState
      };
  }
};

export const App = () => {
  let [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Protector path="/parse" exact component={Parse} />
        <Protector path="/dashboard" exact component={LedgerDashboard} />
        <Protector path="/user/dashboard" exact component={UserDashboard} />
        <Protector path="/test" exact component={Test} />
        <Route path="/auth" exact component={Login} />
        <Route path="/newauth" exact component={Signup} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </AuthContext.Provider>
  );
};
