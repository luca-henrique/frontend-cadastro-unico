import React from "react";
import { Switch } from "react-router-dom";
import SignIn from "../Pages/Auth/SignIn/index";
import Lisence from "../Pages/Auth/Lisence/index";
import OwnerView from "../Pages/Owner/index";
import history from "./history";
import Private from "./private";

import Pdf from "../Pages/Owner/PDF/index";
import Specific from "../Pages/Owner/PDF/specific";

import Descartes from "../Pages/Owner/PDF/descartes";

import { Route } from "react-router-dom";

import { ConnectedRouter } from "connected-react-router";

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/" exact component={Lisence} />
      <Route path="/login" exact component={SignIn} />

      <Route path="/pdf" exact component={Pdf} />

      <Route path="/descartes" exact component={Descartes} />

      <Route path="/specific" exact component={Specific} />

      <Private path="/owner" component={OwnerView} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
