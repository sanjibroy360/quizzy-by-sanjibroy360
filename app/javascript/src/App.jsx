import React, { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "components/Login";
import { setAuthHeaders } from "apis/axios";
import { UserProvider } from "./context/user";
import Navbar from "components/common/Navbar";
import Loader from "components/common/Loader";

export default function App() {
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <UserProvider>
      <ToastContainer />
      <div className="container max-w-6xl mx-auto leading-6">
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <div>Home</div>} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    </UserProvider>
  );
}
