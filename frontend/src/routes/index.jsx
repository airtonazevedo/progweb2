import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSnapshot } from "valtio";
import { Appbar } from "../components/Appbar";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { authState } from "../store/auth";

function ProtectedRoute({ children, publicroute, ...rest }) {
  const authSnap = useSnapshot(authState);
  const ok =
    (authSnap.logged && !publicroute) || (!authSnap.logged && publicroute);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        ok ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: publicroute ? "/" : "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export function AppRoutes() {
  return (
    <Router>
      <div>
        <Appbar />
        <Switch>
          <ProtectedRoute publicroute={true} path="/signup">
            <SignUp />
          </ProtectedRoute>
          <ProtectedRoute publicroute={true} path="/login">
            <Login />
          </ProtectedRoute>
          <ProtectedRoute publicroute={false} path="/cart">
            <h1>cart</h1>
          </ProtectedRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
