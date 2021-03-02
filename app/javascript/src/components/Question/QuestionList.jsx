import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import questionApi from "apis/question";
import SingleQuestion from "./SingleQuestion";
import Toastr from "components/Common/Toaster";

export default function QuestionList() {
  let [questions, setQuestions] = useState([]);
  let { quizId } = useParams();
  useEffect(() => {
    getQuestionsWithOptions();
  }, []);

  async function getQuestionsWithOptions() {
    try {
      let response = await questionApi.showQuestions(quizId);
      if (response) {
        setQuestions(response.data);
      }
    } catch (error) {
      Toastr.error(error.response.data);
    }
  }
  return (
    <div>
      {questions?.map((question, index) => {
        return (
          <SingleQuestion question={question} questionNumber={index + 1} />
        );
      })}
    </div>
  );
}
