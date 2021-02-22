import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import questionApi from "apis/question";
import Toastr from "components/Common/Toaster";
import Loader from "components/Common/Loader";
import Button from "components/Form/Button";
import OptionInput from "components/Form/OptionInput";
import QuestionInput from "components/Form/QuestionInput";
import DisabledButton from "components/Form/DisabledButton";
import AddMoreOption from "./AddMoreOption";
import Select from "../Form/Select";

export default function EditQuestion() {
  let { quizId, questionId } = useParams();
  let [prevOptions, setPrevOptions] = useState([]);
  let [quiz, setQuiz] = useState(null);
  let [loading, setLoading] = useState(false);
  let [questionDescription, setQuestionDescription] = useState("");
  let [extraAddedOptionsCount, setExtraAddedOptionsCount] = useState(0);

  let [firstOption, setFirstOption] = useState("");
  let [secondOption, setSecondOption] = useState("");
  let [thirdOption, setThirdOption] = useState("");
  let [fourthOption, setFourthOption] = useState("");

  let [firstOptionIsCorrect, setFirstOptionIsCorrect] = useState(false);
  let [secondOptionIsCorrect, setSecondOptionIsCorrect] = useState(false);
  let [thirdOptionIsCorrect, setThirdOptionIsCorrect] = useState(false);
  let [fourthOptionIsCorrect, setFourthOptionIsCorrect] = useState(false);

  let addedOptions = [
    { value: thirdOption, setOption: setThirdOption },
    { value: fourthOption, setOption: setFourthOption },
  ];

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  function setOptions(options) {
    let optionValueSetter = [
      setFirstOption,
      setSecondOption,
      setThirdOption,
      setFourthOption,
    ];

    let optionIsCorrectValueSetter = [
      setFirstOptionIsCorrect,
      setSecondOptionIsCorrect,
      setThirdOptionIsCorrect,
      setFourthOptionIsCorrect,
    ];

    options.forEach((option, i) => {
      optionValueSetter[i](option.name);
      optionIsCorrectValueSetter[i](option.is_correct);
    });
    setExtraAddedOptionsCount(options.length - 2);
  }

  async function fetchQuizDetails() {
    try {
      setLoading(true);
      let response = await questionApi.getQuestionToEdit(quizId, questionId);
      if (response) {
        let { quiz, options } = response.data;
        setQuiz(quiz);
        setQuestionDescription(response.data.description);
        setPrevOptions(options);
        setOptions(options);
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
        options_attributes: [
          { name: firstOption, is_correct: firstOptionIsCorrect },
          { name: secondOption, is_correct: secondOptionIsCorrect },
        ],
      },
    };

    if (thirdOption.trim()) {
      payload.question.options_attributes.push({
        name: thirdOption,
        is_correct: thirdOptionIsCorrect,
      });
    }

    if (fourthOption.trim()) {
      payload.question.options_attributes.push({
        name: fourthOption,
        is_correct: fourthOptionIsCorrect,
      });
    }

    prevOptions.forEach((option, i) => {
      if (payload.question.options_attributes[i]) {
        payload.question.options_attributes[i].id = option.id;
      } else {
        option.is_correct = false;
        payload.question.options_attributes.push(option);
        payload.question.options_attributes[i]._destroy = true;
      }
    });
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
    let setCorrectOption = [
      setFirstOptionIsCorrect,
      setSecondOptionIsCorrect,
      setThirdOptionIsCorrect,
      setFourthOptionIsCorrect,
    ];

    setCorrectOption.forEach((setIsCorrect, index) => {
      if (optionNo == index) {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
    });
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      if (isFormFilled()) {
        let payload = generatePayload();
        let response = await questionApi.updateQuestion(
          quizId,
          questionId,
          payload
        );
        if (response) {
          window.location.href = `/quiz/${quizId}`;
          Toastr.success(response.data.message);
        }
      }
    } catch (error) {
      Toastr.success(error.response.data);
    } finally {
      resetForm();
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
