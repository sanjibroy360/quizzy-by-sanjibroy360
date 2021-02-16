import React from "react";

export default function ActionButton({ action, handleClick, text, id }) {
  let icon;
  let backgroundColor;
  let backgroundColorOnHover;
  let textColor;

  switch (action.trim().toLowerCase()) {
    case "edit":
      icon = "ri-edit-line mx-1";
      backgroundColor = "bg-gray-400";
      backgroundColorOnHover = "bg-blue-500";
      textColor = "text-gray-700";
      break;

    case "delete":
      icon = "ri-delete-bin-6-line mx-1";
      backgroundColor = "bg-red-600";
      backgroundColorOnHover = "bg-red-700";
      textColor = "text-white";
      break;

    default:
      icon = "ri-edit-line mx-1";
      backgroundColor = "bg-gray-400";
      backgroundColorOnHover = "bg-blue-500";
      textColor = "text-gray-700";
      break;
  }
  return (
    <button
      className={`${textColor} hover:text-white ${backgroundColor} hover:${backgroundColorOnHover} inline-flex items-center border-0 py-1 px-3 focus:outline-none rounded mx-2 text-base mt-4 md:mt-0`}
      onClick={(event) => handleClick(id, event)}
    >
      <i className={icon}></i> {text || "Edit"}
    </button>
  );
}
