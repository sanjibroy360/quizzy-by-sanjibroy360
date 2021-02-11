import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "./Form/Input";
import Toastr from "./common/Toaster";
import Button from "components/Form/Button";
import DisabledButton from "components/Form/DisabledButton";
import authenticationApi from "apis/authentication";
import { useUserContext } from "../context/user";
import Loader from "components/common/Loader";

export default function Login() {
  let [loading, setLoading] = useState(false);
  let [email, setEmail] = useState("");
  let [isFormFilled, setIsFormFilled] = useState(false);
  let history = useHistory();

  const { dispatch, state } = useUserContext();

  let [password, setPassword] = useState("");

  useEffect(() => {
    if (email.trim() && password.trim()) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [email, password]);

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const payload = {
        session: { email, password },
      };

      setLoading(true);
      var response = await authenticationApi.login(payload);
      if (response.status == 200) {
        dispatch({ type: "SET_USER", payload: response.data });
        Toastr.success(response.data.message);
        history.push("/");
      }
    } catch (error) {
      Toastr.error(error.response.data.message);
    } finally {
      setLoading(false);
      resetForm();
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mx-auto w-full mt-20">
      <form className="w-1/3 mx-auto" method="POST">
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

        {isFormFilled ? (
          <Button type="submit" handleSubmit={handleSubmit} />
        ) : (
          <DisabledButton />
        )}
      </form>
    </div>
  );
}
