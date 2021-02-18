import React from "react";

import OptionInputWithRemoveButton from "components/Form/OptionInputWithRemoveButton";

export default function AddMoreOption({
  addedOptions,
  extraAddedOptionsCount,
  setExtraAddedOptionsCount,
}) {
  function handleRemoveOption(optionNo, event) {
    event.preventDefault();
    let optionCount = extraAddedOptionsCount;
    let index = optionNo - 3;
    let otherIndex = index == 4 ? 0 : 1;
    addedOptions[index].setOption(addedOptions[otherIndex].value);
    addedOptions[otherIndex].setOption("");
    setExtraAddedOptionsCount(optionCount - 1);
  }

  function handleAddMoreOption() {
    if (extraAddedOptionsCount < 4) {
      setExtraAddedOptionsCount(extraAddedOptionsCount + 1);
    }
  }
  return (
    <>
      {addedOptions.map((option, index) => {
        return (
          <React.Fragment key={`extraAddedOptionNo${index + 1}`}>
            {index + 1 <= extraAddedOptionsCount ? (
              <OptionInputWithRemoveButton
                label={`Option ${index + 3}`}
                handleChange={option.setOption}
                type="text"
                keyName={`Option ${index + 3}`}
                value={option.value}
                optionNo={index + 3}
                handleRemoveOption={handleRemoveOption}
              />
            ) : (
              <></>
            )}
          </React.Fragment>
        );
      })}

      {extraAddedOptionsCount < 2 && (
        <p
          className="text-sm text-blue-700 hover:underline"
          onClick={handleAddMoreOption}
        >
          Add more option
        </p>
      )}
    </>
  );
}
