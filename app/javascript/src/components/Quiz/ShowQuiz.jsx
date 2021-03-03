import React, { useEffect, useState } from "react";
import Button from "components/Form/Button";
import { useParams, useHistory, Link } from "react-router-dom";
import quizApi from "apis/quiz";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";
import QuestionList from "components/Question/QuestionList";
import axios from "axios";

export default function ShowQuiz() {
  let { quizId } = useParams();
  let [slug, setSlug] = useState("");
  let [quiz, setQuiz] = useState(null);
  let [questionCount, setQuestionCount] = useState(0);
  let [loading, setLoading] = useState(false);
  let history = useHistory();
  let origin = window.location.origin + "/public";

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  function handleClick(event) {
    history.push(`/dashboard/quizzes/${quizId}/questions/add`);
  }

  async function handlePublish(event) {
    try {
      let response = await quizApi.publishQuiz(quizId);
      setSlug(response.data.slug);
      Toastr.success(response.data.message);
    } catch (error) {
      Toastr.success(error.response.data.message);
    }
  }

  async function fetchQuizDetails() {
    try {
      setLoading(true);
      let response = await quizApi.showQuizDetails(quizId);
      if (response) {
        setQuiz(response.data.quiz);
        setSlug(response.data.quiz?.slug);
        setQuestionCount(response.data.questions_count);
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
        <div className="flex text-xl font-medium text-gray-600">
          <Link to={`/dashboard/quizzes/${quiz?.id}`}>{quiz?.title}</Link>
          {slug && (
            <Link to="#" className="text-sm ml-4 text-blue-500 hover:underline">
              {origin + "/" + slug}
            </Link>
          )}
        </div>
        <div className="flex items-center">
          <Button text="+ Add question" handleClick={handleClick} />
          {!slug && questionCount > 0 && (
            <div className="ml-5">
              <Button text="Publish" handleClick={handlePublish} />
            </div>
          )}
        </div>
      </div>
      {questionCount > 0 ? (
        <div className="w-11/12 mx-auto">
          <QuestionList />
        </div>
      ) : (
        <div className="mt-32 w-11/12">
          <p className="text-gray-500 text-center">
            There are no questions in this quiz.
          </p>
        </div>
      )}
    </div>
  );
}
