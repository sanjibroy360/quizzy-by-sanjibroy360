import React from "react";
import { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "components/Login";

export default function App() {
  return (
    <div className="container max-w-6xl mx-auto leading-6">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
}
