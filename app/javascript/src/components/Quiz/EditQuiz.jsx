import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "components/Form/Input";
import Button from "components/Form/Button";
import { useUserContext } from "../../context/user";
import quizApi from "apis/quiz";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";


export default function EditQuiz() {
  let [quizTitle, setQuizTitle] = useState("");
  let [loading, setLoading] = useState(false);
  let history = useHistory();
  let { state } = useUserContext();
  let { quizId } = useParams();

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  async function fetchQuizDetails() {
    try {
      let response = await quizApi.getQuizToEdit(quizId);
      if (response) {
        setQuizTitle(response.data.quiz.title);
      }
    } catch (error) {
      Toastr.error(error.response.data);
    }
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      let payload = {
        quiz: {
          title: quizTitle,
        },
      };
      let response = await quizApi.updateQuiz(payload, quizId);
      if (response) {
        history.push("/");
        Toastr.success(response.data.message);
      }
    } catch (error) {
      Toastr.error(error.response.data);
    } finally {
      setQuizTitle("");
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-1/2">
      <form method="POST" className="w-2/3 mx-auto">
        <h3 className="text-2xl my-12 capitalize">Edit quiz</h3>
        <Input
          name="title"
          label="Quiz Name"
          handleChange={setQuizTitle}
          type="text"
          keyName="editquiztitle001"
          value={quizTitle}
        />
        <div className="flex justify-center">
          <Button type="submit" handleClick={(event) => handleSubmit(event)} />
        </div>
      </form>
    </div>
  );
}
