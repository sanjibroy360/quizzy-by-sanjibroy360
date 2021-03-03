import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import publicApi from "apis/public";
import Question from "components/Attempt/Question";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";

export default function ShowAnswers({ questions, attemptId }) {
  let { slug } = useParams();
  let [loading, setLoading] = useState(false);
  let [submittedAnswers, setSubmittedAnswers] = useState([]);
  let [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  let [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);

  useEffect(() => {
    fetchAttemptAnswers();
  }, []);

  async function fetchAttemptAnswers() {
    try {
      setLoading(true);
      let response = await publicApi.getSubmittedAnswers(slug, attemptId);
      setSubmittedAnswers(response.data.attempt_answers);
      setCorrectAnswerCount(response.data.correct_answer_count);
      setIncorrectAnswerCount(response.data.incorrect_answer_count);
    } catch (error) {
      Toastr.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  function pluralize_answers() {
    return correctAnswerCount + incorrectAnswerCount > 1 ? "answers" : "answer";
  }

  function formatAnswerString() {
    let str = [];
    if (correctAnswerCount > 0) {
      str.push(`${correctAnswerCount} correct`);
    }

    if (incorrectAnswerCount > 0) {
      str.push(`${incorrectAnswerCount} incorrect`);
    }

    let answerString = `You have submitted ${str.join(
      " and "
    )} ${pluralize_answers()}.`;
    return answerString;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {correctAnswerCount + incorrectAnswerCount == 0 ? (
        <p className="w-11/12 mx-auto text-sm text-gray-600">
          You have not answered any question.
        </p>
      ) : (
        <p className="w-11/12 mx-auto text-sm text-gray-600">
          Thank you for taking the quiz, here are your results.
          <br />
          {formatAnswerString()}
        </p>
      )}
      {questions?.map((question, i) => {
        let index = submittedAnswers.findIndex(
          (answer) => answer.question_id === question.id
        );
        let optionId = submittedAnswers[index]?.option_id || "";
        return (
          <Question
            question={question}
            questionNumber={i + 1}
            markCorrectAnswer={true}
            optionId={optionId}
          />
        );
      })}
    </>
  );
}
