/* 
  Class that have all the routes to the other pages of the web app.
*/
import React from "react";
import { Route, Switch } from "react-router-dom";
// import AuthenticatedRoute from "/components/AuthenticatedRoute";
// import UnauthenticatedRoute from "/components/UnauthenticatedRoute";

import AppliedRoute from "./components/appliedRoute";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import CellarPage from "./pages/cellar";
import NotFound from './components/notFound';

export default ({ childProps }) =>
<Switch>
  <AppliedRoute path="/"          exact component={HomePage} props={childProps} />
  <AppliedRoute path="/login"     exact component={LoginPage} props={childProps} />
  <AppliedRoute path="/register"  exact component={RegisterPage} props={childProps} />
  <AppliedRoute path="/cellar"    exact component={CellarPage} props={childProps} />
  { /* Catch all unmatched routes */ }
  <Route component={NotFound} />
</Switch>;