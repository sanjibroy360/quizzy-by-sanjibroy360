import React from "react";

export default function DisabledButton() {
  return (
    <div className="flex justify-center">
      <button
        class="flex mx-auto mt-6 text-white bg-indigo-400 border-0 py-2 px-4 focus:outline-none  rounded text-lg disabled:opacity-50 cursor-not-allowed"
        disabled
      >
        Submit
      </button>
    </div>
  );
}
