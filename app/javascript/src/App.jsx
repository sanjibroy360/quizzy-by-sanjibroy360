import React, { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
import { setAuthHeaders } from "apis/axios";
import { UserProvider } from "./context/user";
import Navbar from "components/Common/Navbar";
import Loader from "components/Common/Loader";
import Main from "./Main";

export default function App({ currentUser }) {
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
          <Navbar currentUser={currentUser} />
          <Main />
        </Router>
      </div>
    </UserProvider>
  );
}
