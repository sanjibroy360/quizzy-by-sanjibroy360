import React from "react";
import ActionButton from "components/Form/ActionButton";

function handleEdit(id, event) {
  console.log({ event, id });
}

function handleDelete(id, event) {
  console.log({ event, id });
}

export const COLUMNS = [
  {
    Header: "Quiz name",
    accessor: "quiz.title",
    Cell: ({ row }) => {
      return <h2>{row.original.title}</h2>;
    },
  },
  {
    Header: "Actions",
    accessor: "edit",
    Cell: ({ row }) => {
      console.log(row);
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
