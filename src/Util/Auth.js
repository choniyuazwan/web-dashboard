import React from "react";
import { Route, Redirect } from "react-router-dom";

const fakeAuth = {
  authenticate(cb) {
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    localStorage.removeItem('token');
    setTimeout(cb, 100);
  }
};

export function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('token') !== null ? (
          children
        ) : (
          <Redirect to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export function LoginRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('token') === null ? (
          children
        ) : (
          <Redirect to={{
            pathname: "/country",
            state: { from: location }
          }}
          />
        )
      }
    />
  );
}

export default fakeAuth;
