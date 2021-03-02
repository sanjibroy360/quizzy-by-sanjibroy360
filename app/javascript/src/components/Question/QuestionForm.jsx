import React, { useEffect, useState } from "react";
import QuestionInput from "components/Form/QuestionInput";
import Select from "components/Form/Select";
import Button from "components/Form/Button";
import DisabledButton from "components/Form/DisabledButton";
import OptionInputWithRemoveButton from "components/Form/OptionInputWithRemoveButton";

export default function QuestionForm({ options, prevQuestion, handleSubmit }) {
  let [question, setQuestion] = useState("");
  let [optionAttributes, setOptionAttributes] = useState([]);
  let initialOption = { name: "", is_correct: false };

  useEffect(() => {
    setQuestion(prevQuestion || "");
    setOptionAttributes([...options]);
  }, []);

  function handleOptionValue(event, index) {
    console.log(index, optionAttributes);

    optionAttributes[index] = {
      ...optionAttributes[index],
      name: event.target.value,
    };

    setOptionAttributes([...optionAttributes]);
    console.log(index, optionAttributes);
  }

  function handleAddMoreOption() {
    let arr = [...optionAttributes, initialOption];
    setOptionAttributes([...arr]);
  }

  function handleRemoveOption(event, index) {
    event.preventDefault();
    let temp = optionAttributes.filter((option, i) => i != index);
    setOptionAttributes([...temp]);
  }

  function handleCorrectAnswer(event) {
    let optionNo = event.target.value;
    let temp = optionAttributes.map((option, index) => {
      if (optionNo == index) {
        return { ...option, is_correct: true };
      } else {
        return { ...option, is_correct: false };
      }
    });
    setOptionAttributes([...temp]);
  }

  function isFormFilled() {
    let hasOneCorrectAnswer = optionAttributes.some(
      (option) => option.is_correct == true
    );
    return (
      optionAttributes.every((option) => option.name) && hasOneCorrectAnswer
    );
  }

  function handleSubmitButtonClick(event) {
    event.preventDefault();
    handleSubmit(question, optionAttributes, event);
  }

  return (
    <div>
      <form>
        <QuestionInput
          label="Question"
          handleChange={(event) => setQuestion(event.target.value)}
          keyName={`${question.title}`}
          type="text"
          value={question || ""}
        />
        {optionAttributes?.map((option, index) => {
          return (
            <>
              {index + 1 <= 2 ? (
                <QuestionInput
                  label={`Option ${index + 1}`}
                  keyName={`${index}`}
                  type="text"
                  handleChange={handleOptionValue}
                  extraInfo={index}
                  value={option.name}
                />
              ) : (
                <OptionInputWithRemoveButton
                  label={`Option ${index + 1}`}
                  handleChange={handleOptionValue}
                  type="text"
                  keyName={`Option ${index + 3}`}
                  value={option.name}
                  optionNo={index + 3}
                  extraInfo={index}
                  handleRemoveOption={handleRemoveOption}
                />
              )}
            </>
          );
        })}
        {optionAttributes.length < 4 && (
          <p
            className="text-sm text-blue-700 hover:underline cursor-pointer"
            onClick={handleAddMoreOption}
          >
            Add more option
          </p>
        )}
        <Select
          label="Correct answer"
          values={optionAttributes}
          handleChange={handleCorrectAnswer}
        />
        {isFormFilled() ? (
          <Button type="submit" handleClick={handleSubmitButtonClick} />
        ) : (
          <DisabledButton />
        )}
      </form>
    </div>
  );
}
