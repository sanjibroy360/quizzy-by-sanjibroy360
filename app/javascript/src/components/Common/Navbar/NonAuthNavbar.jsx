import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function NonAuthNavbar() {
  return (
    <header class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        >
          <img src="https://img.icons8.com/dotty/60/000000/education.png" />
          <span class="ml-3 text-xl">Quizzy</span>
        </Link>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="/login" class="mr-5 hover:text-gray-900">
            <button className="text-gray-700 hover:text-white bg-gray-400 hover:bg-blue-500 inline-flex items-center border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0">
              Log In
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
