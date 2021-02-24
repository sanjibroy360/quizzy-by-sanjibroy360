import React from "react";
import MarkCorrectAnswer from "../Question/MarkCorrectAnswer";

export default function DisabledRadioButton({ submittedOptionId, option }) {
  return (
    <div className="flex items-center" key={option.id}>
      <div>
        <input type="radio" disabled={true} checked={option.id === submittedOptionId} />
        <label className="mx-2">{option.name}</label>
      </div>
      <p> {option.is_correct && <MarkCorrectAnswer />}</p>
    </div>
  );
}
