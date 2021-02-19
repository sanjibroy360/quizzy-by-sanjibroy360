import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "components/Form/Input";
import Button from "components/Form/Button";
import quizApi from "apis/quiz";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";

export default function AddQuiz() {
  let [quizTitle, setQuizTitle] = useState("");
  let [loading, setLoading] = useState(false);
  let history = useHistory();

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);

      const payload = {
        quiz: {
          title: quizTitle,
        },
      };

      let response = await quizApi.addQuiz(payload);
      if (response) {
        history.push("/");
        Toastr.success(response.data.message);
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
          keyName="addquiztitle001"
          value={quizTitle}
        />
        <div className="flex justify-center">
          <Button type="submit" handleClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
}
