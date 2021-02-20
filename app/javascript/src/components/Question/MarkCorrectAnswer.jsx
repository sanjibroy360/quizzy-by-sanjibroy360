import React from "react";

export default function MarkCorrectAnswer() {
  return (
    <div className="flex items-center">
      <p>
        <i className="ri-checkbox-circle-fill text-green-800" />
      </p>
      <p className="text-xs text-green-800 font-semibold">Correct answer</p>
    </div>
  );
}
