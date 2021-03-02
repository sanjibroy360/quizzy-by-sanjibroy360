import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import questionApi from "apis/question";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";
import QuestionForm from "./QuestionForm";

export default function EditQuestion() {
  let { quizId, questionId } = useParams();
  let [prevOptions, setPrevOptions] = useState([]);
  let [quiz, setQuiz] = useState(null);
  let [loading, setLoading] = useState(false);
  let [questionDescription, setQuestionDescription] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    try {
      setLoading(true);
      let response = await questionApi.getQuestionToEdit(quizId, questionId);
      if (response) {
        let { quiz, options } = response.data;
        setQuiz(quiz);
        setQuestionDescription(response.data.description);
        setPrevOptions(options);
      }
    } catch (error) {
      Toastr.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  function generatePayload(question, options) {
    for (let i = 0; i < prevOptions.length; i++) {
      let found = false;
      for (let j = 0; j < options.length; j++) {
        if (prevOptions[i].id == options[j]?.id) {
          found = true;
          break;
        }
      }
      if (!found) {
        options.push({ ...prevOptions[i], is_correct: false, _destroy: true });
      }
    }

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

      let response = await questionApi.updateQuestion(
        quizId,
        questionId,
        payload
      );
      if (response) {
        window.location.href = `/dashboard/quizzes/${quizId}`;
        Toastr.success(response.data.message);
      }
    } catch (error) {
      Toastr.error(error.response.data);
    }
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="w-11/12 mx-auto">
        <p className="text-xl font-medium text-gray-600">
          <Link to={`/dashboard/quizzes/${quizId}`}>{quiz?.title}</Link>
        </p>
        <QuestionForm
          prevQuestion={questionDescription}
          options={prevOptions}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
