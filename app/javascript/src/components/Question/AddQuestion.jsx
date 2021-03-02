import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import quizApi from "apis/quiz";
import questionApi from "apis/question";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";
import QuestionForm from "./QuestionForm";

export default function AddQuestion() {
  let { quizId } = useParams();
  let initialOption = { name: "", is_correct: false };
  let [loading, setLoading] = useState(false);
  let [quiz, setQuiz] = useState(null);
  let [options, setOptions] = useState([initialOption, initialOption]);

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  function generatePayload(question, options) {
    let payload = {
      question: {
        description: question,
        options_attributes: options,
      },
    };
    return payload;
  }

  async function handleSubmit(question, options, event) {
    try {
      event.preventDefault();

      let payload = generatePayload(question, options);
      let response = await questionApi.createQuestion(payload, quizId);
      if (response) {
        window.location.href = `/dashboard/quizzes/${quizId}`;
        Toastr.success(response.data.message);
      }
    } catch (error) {
      Toastr.error(error.response.data.message);
    } finally {
      resetForm();
    }
  }

  async function fetchQuizDetails() {
    try {
      setLoading(true);
      let response = await quizApi.showQuizDetails(quizId);
      if (response) {
        setQuiz(response.data.quiz);
      }
    } catch (error) {
      Toastr.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-11/12 mx-auto">
      <p className="text-xl font-medium text-gray-600">
        <Link to={`/dashboard/quizzes/${quizId}`}>{quiz?.title}</Link>
      </p>
      <QuestionForm options={options} handleSubmit={handleSubmit} />
    </div>
  );
}
