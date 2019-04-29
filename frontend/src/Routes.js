/* 
  Class that have all the routes to the other pages of the web app.
*/
import React from "react";
import { Route, Switch } from "react-router-dom";

import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import CellarPage from "./pages/cellar";
import NotFound from './components/notFound';

export default () =>
<Switch>
  <Route path="/"          exact component={HomePage} />
  <Route path="/login"     exact component={LoginPage} />
  <Route path="/register"  exact component={RegisterPage} />
  <Route path="/cellar"    exact component={CellarPage} />
  { /* Catch all unmatched routes */ }
  <Route component={NotFound} />
</Switch>;