import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "../../tools/helpers";

const SuperProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isSuperUser } = useSelector(state => state);

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && getToken() && isSuperUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default SuperProtectedRoute;
