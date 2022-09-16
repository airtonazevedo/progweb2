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
import { NovoProduto } from "../pages/NovoProduto";
import { SignUp } from "../pages/SignUp";
import { authState } from "../store/auth";

function ProtectedRoute({ children, routeType, ...rest }) {
  const authSnap = useSnapshot(authState);
  let ok = true;
  if (routeType === "public") {
    if (authSnap.logged) {
      ok = false;
    }
  } else if (routeType === "admin") {
    if (authSnap.type !== 2) {
      ok = false;
    }
  } else if (routeType === "client") {
    if (authSnap.type !== 1) {
      ok = false;
    }
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        ok ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: authSnap.logged ? "/" : "/login",
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
          <ProtectedRoute routeType={"public"} path="/signup">
            <SignUp />
          </ProtectedRoute>
          <ProtectedRoute routeType={"public"} path="/login">
            <Login />
          </ProtectedRoute>
          <ProtectedRoute routeType={"client"} path="/cart">
            <h1>cart</h1>
          </ProtectedRoute>
          <ProtectedRoute routeType={"admin"} path="/produto/novo">
            <NovoProduto />
          </ProtectedRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
