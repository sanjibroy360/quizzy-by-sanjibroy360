import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import UserLogin from "./UserLogin";
import publicApi from "apis/public";
import Questions from "./Questions";
import Loader from "components/Common/Loader";
import Toastr from "components/Common/Toaster";

export default function NewAttempt() {
  let { slug } = useParams();
  let history = useHistory();
  let [attempt, setAttempt] = useState(null);
  let [quiz, setQuiz] = useState(null);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  async function fetchQuizDetails() {
    try {
      setLoading(true);
      let response = await publicApi.getQuizDetails(slug);
      setQuiz(response.data.quiz);
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
      {attempt?.id ? (
        <Questions
          attemptId={attempt.id}
          userId={attempt.user_id}
          quizId={quiz?.id}
        />
      ) : (
        <UserLogin
          setAttempt={setAttempt}
          quizTitle={quiz?.title}
          quizId={quiz?.id}
        />
      )}
    </div>
  );
}
