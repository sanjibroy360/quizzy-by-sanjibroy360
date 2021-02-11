import React, { useState } from "react";
import Input from "./Form/Input";
import authenticationApi from "apis/authentication";
import { useUserContext } from "../context/user";

export default function Login() {
  let [loading, setLoading] = useState(false);
  let [email, setEmail] = useState("");
  const context = useUserContext();
  const {dispatch, state} = context;

  let [password, setPassword] = useState("");

  console.log({dispatch, state});
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const payload = {
        session: { email, password },
      };

      setLoading(true);
      let response = await authenticationApi.login(payload);
      if (response.status == 200) {
        dispatch({ type: "SET_USER", payload: response.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full mt-20">
      <form className="w-1/3 mx-auto">
        <h3 className="text-center text-3xl mb-10">Login</h3>
        <Input
          name="email"
          label="Email"
          handleChange={setEmail}
          keyName="login001"
          type="text"
        />

        <Input
          name="password"
          label="Password"
          handleChange={setPassword}
          keyName="login002"
          type="password"
        />
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="text-white text-center rounded text-sm py-1 px-3 bg-blue-500"
            onClick={(event) => handleSubmit(event)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
