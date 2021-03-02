import React from "react";

export default function OptionInputWithRemoveButton({
  name,
  label,
  handleChange,
  type,
  keyName,
  value,
  extraInfo,
  handleRemoveOption,
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
        <button
          className="py-1 px-3 bg-red-700 rounded ml-2"
          onClick={(event) => handleRemoveOption(event, extraInfo)}
        >
          <i className="ri-indeterminate-circle-fill text-white text-lg align-middle" />
        </button>
      </div>
    </div>
  );
}
