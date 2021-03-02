import React from "react";
import ActionButton from "components/Form/ActionButton";
import quizApi from "apis/quiz";
import Toastr from "components/Common/Toaster";
import { Link } from "react-router-dom";

export const COLUMNS = [
  {
    Header: "Quiz name",
    accessor: "quiz_name",
    Cell: ({ row }) => {
      return <h2>{row.original.quiz_name}</h2>;
    },
  },
  {
    Header: "User name",
    accessor: "user_name",
    Cell: ({ row }) => {
      return <h2>{row.original.user_name}</h2>;
    },
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: ({ row }) => {
      return <h2>{row.original.email}</h2>;
    },
  },
  {
    Header: "Correct Answer",
    accessor: "correct_answers_count",
    Cell: ({ row }) => {
      return <h2>{row.original.correct_answers_count}</h2>;
    },
  },
  {
    Header: "Incorrect Answer",
    accessor: "incorrect_answers_count",
    Cell: ({ row }) => {
      return <h2>{row.original.incorrect_answers_count}</h2>;
    },
  },
];
