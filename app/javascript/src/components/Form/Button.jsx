import React from "react";

export default function Button({type, handleSubmit}) {
  return (
    <div className="flex justify-center">
      <button
        class="flex mx-auto mt-6 text-white bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-700 rounded text-lg"
        type={type}
        onClick={(event) => handleSubmit(event)}
      >
        Submit
      </button>
    </div>
  );
}
