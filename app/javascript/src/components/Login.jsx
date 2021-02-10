import React, { useState } from "react";
import Input from "./Form/Input";

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  return (
    <div className="mx-auto w-full  mt-20">
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
        <div className='flex justify-center mt-6'>
          <button
            type="submit"
            className="text-white text-center rounded text-sm py-1 px-3 bg-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
