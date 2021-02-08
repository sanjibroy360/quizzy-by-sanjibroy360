import React from "react";
import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";


export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact path="/about" render={() => <div>About</div>} />
      </Switch>
    </Router>
  );
}
