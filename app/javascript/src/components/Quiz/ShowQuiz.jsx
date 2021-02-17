import React, { useEffect, useState } from "react";
import Button from "components/Form/Button";
import { useParams, useHistory } from "react-router-dom";
import quizApi from "apis/quiz";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";

export default function ShowQuiz() {
  let { quizId } = useParams();
  let [quiz, setQuiz] = useState(null);
  let [loading, setLoading] = useState(false);
  let history = useHistory();

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  function handleClick(event) {
    
  }

  async function fetchQuizDetails() {
    try {
      setLoading(true);
      let response = await quizApi.showQuizDetails(quizId);
      if (response) {
        setQuiz(response.data.quiz);
      }
    } catch (error) {
      history.push("/");
      Toastr.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex justify-between items-center w-11/12 mx-auto">
        <p className="text-xl font-medium text-gray-600">{quiz?.title}</p>
        <div>
          <Button text="+ Add question" handleClick={handleClick} />
        </div>
      </div>

      <div className="mt-32 w-11/12">
        <p className="text-gray-500 text-center">
          There are no questions in this quiz.
        </p>
      </div>
    </div>
  );
}
