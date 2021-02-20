import React from "react";
import MarkCorrectAnswer from "./MarkCorrectAnswer";
import ActionButton from "components/Form/ActionButton";
import { useParams } from "react-router-dom";

export default function SingleQuestion({ question, questionNumber }) {
  let { quizId } = useParams();

  function handleEdit(questionId, history, event) {
    history.push(`/quizzes/${quizId}/questions/${questionId}/edit`);
  }

  function handleDelete(id, history, event) {
    //   Delete question
  }

  return (
    <div className="w-full my-10 flex items-start">
      <p className="w-1/4">{`Question ${questionNumber}`}</p>
      <div className="w-2/3">
        <div className="flex justify-between items-center">
          <p className="mb-3 text-xl">{question.description}</p>
          <div>
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
    </div>
  );
}
