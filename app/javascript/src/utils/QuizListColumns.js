import React from "react";
import ActionButton from "components/Form/ActionButton";
import quizApi from "apis/quiz";
import Toastr from "components/Common/Toaster";
import { Link } from "react-router-dom";

function handleEdit(quizId, history, event) {
  history.push(`/quiz/${quizId}/edit`);
}

async function handleDelete(quizId, history, event) {
  try {
    let isConfirm = confirm("Do you really want to delete the quiz?", false);
    if (isConfirm) {
      let response = await quizApi.deleteQuiz(quizId);
      if (response) {
        Toastr.success(response.data.message);
        window.location.href = "/";
      }
    }
  } catch (error) {
    Toastr.error(error.response.data);
  }
}

export const COLUMNS = [
  {
    Header: "Quiz name",
    accessor: "quiz.title",
    Cell: ({ row }) => {
      return (
        <h2>
          <Link to={`/quiz/${row.original.id}`}>{row.original.title}</Link>
        </h2>
      );
    },
  },
  {
    Header: "Actions",
    accessor: "edit",
    Cell: ({ row }) => {
      return (
        <>
          <ActionButton
            action="edit"
            handleClick={handleEdit}
            text="Edit"
            id={row.original.id}
          />
          <ActionButton
            action="delete"
            handleClick={handleDelete}
            text="Delete"
            id={row.original.id}
          />
        </>
      );
    },
  },
];
