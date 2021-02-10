import React from "react";

export default function Input({ name, label, handleChange, type, keyName }) {
  return (
    <div className="flex justify-between items-center my-4">
      <p>
        <label className="mr-2 text-lg">{label}</label>
      </p>
      <div>
        <input
          type={type}
          name={name}
          onChange={(event) => handleChange(event.target.value)}
          key={keyName}
          className="border border-gray-500 py-1 px-3 text-sm text-grey-500 rounded"
        />
      </div>
    </div>
  );
}
