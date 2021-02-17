import React, { useEffect, useState } from "react";
import Button from "components/Form/Button";
import { useHistory } from "react-router-dom";
import quizApi from "apis/quiz";
import { useUserContext } from "../../context/user";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";
import ReactTable from "./ReactTable";

export default function QuizList() {
  let history = useHistory();
  let { state } = useUserContext();
  let [quizzes, setQuizzes] = useState([]);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    loadQuizzes();
  }, [state.user?.id]);

  async function loadQuizzes() {
    try {
      setLoading(true);
      if (state.user) {
        let response = await quizApi.quizList();
        if (response) {
          setQuizzes(response.data.quizzes);
        }
      }
    } catch (error) {
      Toastr.error(error.response.data);
      setQuizzes([]);
    } finally {
      setLoading(false);
    }
  }

  function handleClick() {
    history.push("/quiz/add");
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex flex-row-reverse w-11/12 mx-auto">
        <Button text="+ Add new quiz" handleClick={handleClick} />
      </div>
      {quizzes.length > 0 ? (
        <ReactTable quizzes={quizzes} />
      ) : (
        <div className="mt-32">
          <p className="text-gray-500 text-center">
            You have not created any quiz.
          </p>
        </div>
      )}
    </div>
  );
}
