import React from "react";
import { useParams } from "react-router-dom";

export default function EditQuestion() {
  let { quizId, questionId } = useParams();
  return <div>
      <p>Question Id: {questionId}</p>
      <p>Quiz Id: {quizId}</p>
  </div>;
}
