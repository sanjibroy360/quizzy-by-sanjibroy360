import React from "react";

export default function Select({ label, values, texts, handleChange }) {
  return (
    <div className="flex items-center my-4">
      <p>
        <label className="mr-2 text-lg">{label}</label>
      </p>
      <div className="ml-12">
        <select
          name="correctAnswer"
          onChange={(event) => handleChange(event)}
          className="px-4 py-1 rounded cursor-pointer"
        >
          {texts.map((text, index) => {
            return (
              <React.Fragment key={label + values[index] + index}>
                {text.trim() ? (
                  <>
                    {values[index] ? (
                      <option value={values[index]}>{`Option ${index}`}</option>
                    ) : (
                      <option value={values[index]}>Select</option>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </React.Fragment>
            );
          })}
        </select>
      </div>
    </div>
  );
}
