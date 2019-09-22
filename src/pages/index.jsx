import Login from "./login";
import Table from "./table";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

export default () => (
  <Router>
    <Switch>
      <Route path="/table" exact component={Table} />
      <Route path="/" exact component={Login} />
    </Switch>
  </Router>
);
