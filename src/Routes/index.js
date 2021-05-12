import React, { Suspense, lazy } from "react";

import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";

import Loader from "../components/loader";

import SignIn from "../Pages/authentication/SignIn/index";

import history from "./history";





const Routes = () => (
  <Suspense fallback={<Loader />}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={SignIn} />

      </Switch>
    </ConnectedRouter>
  </Suspense>
);

export default Routes;
