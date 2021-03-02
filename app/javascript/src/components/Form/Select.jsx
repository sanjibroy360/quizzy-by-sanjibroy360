import React from "react";

export default function Select({ label, values, handleChange }) {
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
          <option value="-1">Select</option>
          {values.map((value, index) => {
            return (
              <React.Fragment key={label + values[index] + index}>
                <option value={index} selected={value.is_correct}>
                  {`Option ${index + 1}`}
                </option>
              </React.Fragment>
            );
          })}
        </select>
      </div>
    </div>
  );
}
