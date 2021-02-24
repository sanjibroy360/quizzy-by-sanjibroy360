import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "components/Form/Input";
import Button from "components/Form/Button";
import DisabledButton from "components/Form/DisabledButton";
import Toastr from "components/Common/Toaster";

import publicApi from "apis/public";

export default function UserLogin({ setAttempt, quizTitle }) {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let { slug } = useParams();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const payload = {
        user: {
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
      };
      let response = await publicApi.attemptQuiz(payload, slug);
      if (response) {
        setAttempt(response.data.attempt);
      }
    } catch (error) {
      console.log(error.response);
      Toastr.error(error.response.data);
    } finally {
      resetForm();
    }
  }

  function resetForm() {
    setFirstName("");
    setLastName("");
    setEmail("");
  }

  function isFormFilled() {
    if (firstName.trim() && lastName.trim() && email.trim()) {
      return true;
    }
  }

  return (
    <div>
      <div className="mx-auto w-11/12 mt-20">
        <form className="w-1/3" method="POST">
          <h3 className="text-xl text-gray-600 mb-10">
            Welcome to {quizTitle} quiz
          </h3>
          <Input
            name="first_name"
            label="First name"
            handleChange={setFirstName}
            type="text"
            value={firstName}
          />

          <Input
            name="last_name"
            label="Last name"
            handleChange={setLastName}
            type="text"
            value={lastName}
          />

          <Input
            name="email"
            label="Email"
            handleChange={setEmail}
            type="email"
            value={email}
          />
          <div className="flex justify-center">
            {isFormFilled() ? (
              <Button type="submit" handleClick={handleSubmit} />
            ) : (
              <DisabledButton />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
