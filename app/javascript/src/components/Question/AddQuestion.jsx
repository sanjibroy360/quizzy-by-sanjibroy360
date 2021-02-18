import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import quizApi from "apis/quiz";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";
import Button from "components/Form/Button";
import OptionInput from "components/Form/OptionInput";
import QuestionInput from "components/Form/QuestionInput";
import DisabledButton from "components/Form/DisabledButton";
import AddMoreOption from "./AddMoreOption";
import Select from "../Form/Select";

export default function AddQuestion() {
  let { quizId } = useParams();
  let [quiz, setQuiz] = useState(null);
  let [loading, setLoading] = useState(false);
  let [questionDescription, setQuestionDescription] = useState("");
  let [correctAnswer, setCorrectAnswer] = useState("");
  let [extraAddedOptionsCount, setExtraAddedOptionsCount] = useState(0);

  let [firstOption, setFirstOption] = useState("");
  let [secondOption, setSecondOption] = useState("");
  let [thirdOption, setThirdOption] = useState("");
  let [fourthOption, setFourthOption] = useState("");

  let addedOptions = [
    { value: thirdOption, setOption: setThirdOption },
    { value: fourthOption, setOption: setFourthOption },
  ];

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  async function fetchQuizDetails() {
    try {
      setLoading(true);
      let response = await quizApi.showQuizDetails(quizId);
      if (response) {
        setQuiz(response.data.quiz);
      }
    } catch (error) {
      Toastr.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  function isFormFilled() {
    if (
      questionDescription.trim() &&
      firstOption.trim() &&
      secondOption.trim()
    ) {
      return true;
    } else {
      return false;
    }
  }

  function generatePayload() {
    let payload = {
      question: {
        description: questionDescription,
        options: [firstOption, secondOption],
      },
      answer: correctAnswer,
    };

    if (thirdOption.trim()) {
      payload.question.options.push(thirdOption);
    }

    if (fourthOption.trim()) {
      payload.question.options.push(fourthOption);
    }

    return payload;
  }

  function resetForm() {
    setQuestionDescription("");
    setFirstOption("");
    setSecondOption("");
    setThirdOption("");
    setFourthOption("");
    setExtraAddedOptionsCount(0);
  }

  function handleCorrectAnswer(event) {
    let optionNo = event.target.value - 1;
    let options = [firstOption, secondOption, thirdOption, fourthOption];
    if (optionNo >= 0) {
      setCorrectAnswer(options[optionNo]);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isFormFilled()) {
      let payload = generatePayload();
      resetForm();
      console.log(payload);
    }
  }

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="w-11/12 mx-auto">
      <p className="text-xl font-medium text-gray-600">{quiz?.title}</p>

      <div className="w-1/2">
        <form>
          <QuestionInput
            name="description"
            label="Question"
            handleChange={setQuestionDescription}
            type="text"
            keyName="addQuestionDescription"
            value={questionDescription}
          />

          <OptionInput
            name="firstOption"
            label="Option 1"
            handleChange={setFirstOption}
            type="text"
            keyName="addFirstOption"
            value={firstOption}
          />

          <OptionInput
            name="secondOption"
            label="Option 2"
            handleChange={setSecondOption}
            type="text"
            keyName="addSecondOption"
            value={secondOption}
          />
          <AddMoreOption
            addedOptions={addedOptions}
            extraAddedOptionsCount={extraAddedOptionsCount}
            setExtraAddedOptionsCount={setExtraAddedOptionsCount}
          />

          <Select
            label="Correct answer"
            values={[0, 1, 2, 3, 4]}
            texts={[
              "Select",
              firstOption,
              secondOption,
              thirdOption,
              fourthOption,
            ]}
            handleChange={handleCorrectAnswer}
            value={correctAnswer}
          />

          {isFormFilled() ? (
            <Button type="submit" handleClick={handleSubmit} />
          ) : (
            <DisabledButton />
          )}
        </form>
      </div>
    </div>
  );
}
