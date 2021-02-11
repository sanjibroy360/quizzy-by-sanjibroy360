import React, { useState } from "react";
import { useEffect } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "components/Login";
import { setAuthHeaders } from "apis/axios";
import { UserProvider } from "./context/user";

export default function App() {
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <UserProvider>
      <div className="container max-w-6xl mx-auto leading-6">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <div>Home</div>} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}
