import React from "react";
import Button from "components/Form/Button";
import { useHistory } from "react-router-dom";

export default function QuizList() {
  let history = useHistory();

  function handleClick() {
    history.push("/quiz/add");
    console.log("Add quiz");
  }

  return (
    <div>
      <div className="flex flex-row-reverse w-4/5 mx-auto">
        <Button text="+ Add new quiz" handleClick={handleClick} />
      </div>

      <div className="mt-32">
        <p className="text-gray-500 text-center">
          You have not created any quiz.
        </p>
      </div>
    </div>
  );
}
