import React from "react";
import MarkCorrectAnswer from "./MarkCorrectAnswer";
import ActionButton from "components/Form/ActionButton";
import { useParams } from "react-router-dom";
import questionApi from "apis/question";
import Toastr from "components/Common/Toaster";

export default function SingleQuestion({ question, questionNumber }) {
  let { quizId } = useParams();

  function handleEdit(questionId, history, event) {
    history.push(`/dashboard/quizzes/${quizId}/questions/${questionId}/edit`);
  }

  async function handleDelete(questionId, history, event) {
    try {
      let isConfirm = confirm(
        "Do you really want to delete the question?",
        false
      );
      if (isConfirm) {
        let response = await questionApi.deleteQuestion(quizId, questionId);
        Toastr.success(response.data.message);
        window.location.href = `/dashboard/quizzes/${quizId}`;
      }
    } catch (error) {
      Toastr.error("Something went wrong");
    }
  }

  return (
    <div className="w-full my-10 flex items-start justify-between">
      <p className="w-1/4 ">{`Question ${questionNumber}`}</p>

      <div className="w-3/4 justify-self-start ">
        <p className="mb-3 text-xl">{question.description}</p>

        <div className="ml-4">
          {question?.options?.map((option) => {
            return (
              <div className="flex items-center" key={option.id}>
                <p className="mr-4 text-base my-1">{option.name}</p>
                {option.is_correct && <MarkCorrectAnswer />}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-1/4">
        <ActionButton
          action="edit"
          handleClick={handleEdit}
          text="Edit"
          id={question.id}
        />

        <ActionButton
          action="delete"
          handleClick={handleDelete}
          text="Delete"
          id={question.id}
        />
      </div>
    </div>
  );
}
