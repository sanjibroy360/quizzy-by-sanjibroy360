import React, { useEffect } from "react";
import { useUserContext } from "../../../context/user";
import AuthNavbar from "./AuthNavbar";
import NonAuthNavbar from "./NonAuthNavbar";

export default function Navbar({ currentUser }) {
  const { state, dispatch } = useUserContext();

  useEffect(() => {
    if (currentUser?.id) {
      let payload = { user: currentUser };
      dispatch({ type: "SET_USER", payload: payload });
    }
  }, [currentUser]);

  return (
    <>{state.user ? <AuthNavbar user={state.user} /> : <NonAuthNavbar />}</>
  );
}
