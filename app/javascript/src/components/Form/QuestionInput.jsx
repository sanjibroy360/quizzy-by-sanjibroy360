import React from "react";

export default function QuestionInput({
  name,
  label,
  handleChange,
  type,
  keyName,
  value,
  extraInfo,
}) {
  return (
    <div className="flex items-center my-4">
      <p>
        <label className="mr-2 text-lg">{label}</label>
      </p>
      <div className="ml-12">
        <input
          type={type}
          name={name}
          onChange={(event) => handleChange(event, extraInfo)}
          key={keyName}
          className="border border-gray-500 py-1 px-3 text-sm text-grey-500 rounded"
          value={value}
        />
      </div>
    </div>
  );
}
