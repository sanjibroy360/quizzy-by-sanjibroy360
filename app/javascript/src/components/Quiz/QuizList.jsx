import React from "react";
import Button from "components/Form/Button";

export default function QuizList() {
  return (
    <div>
      <div className="flex flex-row-reverse w-4/5 mx-auto">
        <Button text="+ Add new quiz" />
      </div>

      <div className="mt-32">
        <p className="text-gray-500 text-center">
          You have not created any quiz.
        </p>
      </div>
    </div>
  );
}
