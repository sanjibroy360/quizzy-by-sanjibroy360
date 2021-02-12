import React from "react";

export default function Loader() {
  return (
    <>
      <div class="w-full justify-center self-center flex space-x-8 text-lg">
        <p class="animate-ping inline-block py-4 px-8 mt-20 text-gray-700">
          Loading...
        </p>
      </div>
    </>
  );
}
