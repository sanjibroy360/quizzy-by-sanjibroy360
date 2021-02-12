import React from "react";

export default function DisabledButton({ text }) {
  return (
    <button
      class="mt-6 text-white bg-indigo-400 border-0 py-2 px-4 focus:outline-none  rounded text-lg disabled:opacity-50 cursor-not-allowed"
      disabled
    >
      {text || "Submit"}
    </button>
  );
}
