import React from "react";

export default function OptionInput({
  name,
  label,
  handleChange,
  type,
  keyName,
  value,
}) {
  return (
    <div className="flex items-center my-4">
      <p>
        <label className="mr-2 text-lg">{label}</label>
      </p>
      <div className="ml-10">
        <input
          type={type}
          name={name}
          onChange={(event) => handleChange(event.target.value)}
          key={keyName}
          className="border border-gray-500 py-1 px-3 text-sm text-grey-500 rounded"
          value={value}
        />
      </div>
    </div>
  );
}
