import React from "react";

export default function Select({ label, values, texts, handleChange }) {
  return (
    <div className="flex items-center my-4">
      <p>
        <label className="mr-2 text-lg">{label}</label>
      </p>
      <div className="ml-12">
        <select name="correctAnswer" onChange={(event) => handleChange(event)}>
          {values.map((value, index) => {
            return (
              <React.Fragment key={label + value + index}>
                {texts[index].trim() ? (
                  <option value={value}>{texts[index]}</option>
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
