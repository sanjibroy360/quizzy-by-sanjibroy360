import React from "react";
import DisabledRadioButton from "./DisabledRadioButton";

export default function Question({
  question,
  questionNumber,
  storeAnswer,
  optionId,
  markCorrectAnswer,
}) {
  return (
    <div className="w-11/12 mx-auto my-10 flex items-start justify-between">
      <p className="w-1/4 ">{`Question ${questionNumber}`}</p>

      <div className="w-3/4 justify-self-start ">
        <p className="mb-3 text-xl">{question.description}</p>

        <div className="ml-4">
          {question?.options?.map((option) => {
            return (
              <>
                {markCorrectAnswer ? (
                  <DisabledRadioButton
                    submittedOptionId={optionId}
                    option={option}
                  />
                ) : (
                  <div className="flex items-center" key={option.id}>
                    <div>
                      <input
                        type="radio"
                        name={question.id}
                        onChange={(event) =>
                          storeAnswer(question.id, option.id, event)
                        }
                        id={option.id}
                      />
                      <label htmlFor={option.id} className="ml-2">
                        {option.name}
                      </label>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
