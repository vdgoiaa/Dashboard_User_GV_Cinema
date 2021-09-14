import React from "react";
import { Redirect, Route } from "react-router";

export const AuthRoute = (props) => {
  const { exact, component: RouteCompt, redirectPath, path } = props;
  return (
    <div>
      <Route
        path={path}
        exact={exact}
        render={(routeProps) => {
          if (localStorage.getItem("managerToken")) {
            return <Redirect to={redirectPath} />;
          }
          return <RouteCompt {...routeProps} />;
        }}
      ></Route>
    </div>
  );
};

export const PrivateRoute = (props) => {
  const { exact, component: RouteCompt, redirectPath, path } = props;
  return (
    <div>
      <Route
        path={path}
        exact={exact}
        render={(routeProps) => {
          if (localStorage.getItem("managerToken")) {
            return <RouteCompt {...routeProps} />;
          }
          return <Redirect to={redirectPath} />;
        }}
      ></Route>
    </div>
  );
};
