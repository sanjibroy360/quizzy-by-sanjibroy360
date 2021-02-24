import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import publicApi from "apis/public";
import Loader from "components/Common/Loader";
import Button from "components/Form/Button";
import Toastr from "components/Common/Toaster";
import Question from "components/Attempt/Question";
import ShowAnswers from "./ShowAnswers";

export default function Questions({ attemptId, userId, quizId }) {
  let [questions, setQuestions] = useState([]);
  let [answers, setAnswers] = useState([]);
  let [loading, setLoading] = useState(false);
  let [submitted, setSubmitted] = useState(false);
  let { slug } = useParams();

  useEffect(() => {
    fetchAllQuestions();
  }, []);

  async function fetchAllQuestions() {
    try {
      let response = await publicApi.getAllQuestions(slug);
      setQuestions(response.data);
    } catch (error) {
      Toastr.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  function storeAnswer(questionId, optionId, event) {
    let payload = {
      attempt_id: attemptId,
      question_id: questionId,
      option_id: optionId,
    };
    let attemptAnswers = answers.filter(
      (answer) => answer.question_id != questionId
    );
    attemptAnswers.push(payload);
    setAnswers([...attemptAnswers]);
  }

  if (loading) {
    return <Loader />;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const payload = {
        quiz_id: quizId,
        user_id: userId,
        is_submitted: true,
        attempt_answers_attributes: answers,
      };

      let response = await publicApi.submitAnswers(payload, slug, attemptId);
      setSubmitted(response.data.attempt.is_submitted);
    } catch (error) {
      Toastr.error(error.response.data);
    }
  }

  return (
    <>
      {submitted ? (
        <ShowAnswers questions={questions} attemptId={attemptId} />
      ) : (
        questions?.map((question, i) => {
          return (
            <Question
              question={question}
              questionNumber={i + 1}
              storeAnswer={storeAnswer}
            />
          );
        })
      )}
      <div className="w-11/12 mx-auto my-4">
        <Button type="submit" handleClick={handleSubmit} />
      </div>
    </>
  );
}
