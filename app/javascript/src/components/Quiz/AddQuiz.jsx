import React, { useEffect, useState } from "react";
import Input from "components/Form/Input";
import Button from "components/Form/Button";
import DisabledButton from "components/Form/DisabledButton";
import { useUserContext } from "../../context/user";
import quizApi from "../../apis/quiz";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";

export default function AddQuiz() {
  let [quizTitle, setQuizTitle] = useState("");
  let [loading, setLoading] = useState(false);
  let { state } = useUserContext();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      if (state.user) {
        const payload = {
          quiz: {
            title: quizTitle,
            user_id: state.user.id,
          },
        };

        let response = await quizApi.addQuiz(payload);
        if (response) {
          Toastr.success(response.data.message);
        }
      }
    } catch (error) {
      Toastr.error(error.response.data);
    } finally {
      setQuizTitle("");
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-1/2">
      <form method="POST" className="w-2/3 mx-auto">
        <h3 className="text-2xl my-12 capitalize">Add new quiz</h3>
        <Input
          name="title"
          label="Quiz Name"
          handleChange={setQuizTitle}
          type="text"
          keyName=""
        />
        <div className="flex justify-center">
          {quizTitle.trim() ? (
            <Button type="submit" handleClick={handleSubmit} />
          ) : (
            <DisabledButton />
          )}
        </div>
      </form>
    </div>
  );
}
