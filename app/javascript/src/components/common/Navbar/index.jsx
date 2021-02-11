import React from "react";
import { useUserContext } from "../../../context/user";
import AuthNavbar from "./AuthNavbar";
import NonAuthNavbar from "./NonAuthNavbar";

export default function Navbar() {
  const { state } = useUserContext();

  return (
    <>{state.user ? <AuthNavbar user={state.user} /> : <NonAuthNavbar />}</>
  );
}
