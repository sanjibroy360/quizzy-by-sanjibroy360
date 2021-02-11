import React from "react";
import { Link, useHistory } from "react-router-dom";
import authenticationApi from "apis/authentication";
import Toastr from "components/common/Toaster";
import { setAuthHeaders } from "apis/axios";
import { useUserContext } from "../../../context/user";
export default function AuthNavbar({ user }) {
  const { dispatch, state } = useUserContext();
  let history = useHistory();
  async function handleLogout() {
    try {
      dispatch({ type: "REMOVE_USER" });
      let response = await authenticationApi.logout();
      if (response.status == 200) {
        Toastr.success(response.data.message);
        history.push("/");
      }
    } catch (error) {
      Toastr.error("Something went wrong.");
    }
  }

  return (
    <header class="text-gray-600 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src="https://img.icons8.com/dotty/60/000000/education.png" />
          <span class="ml-3 text-xl">Quizzy</span>
        </a>
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link to="#" class="mr-5 hover:text-gray-900">
            Reports
          </Link>
          <Link to="#" class="mr-5 hover:text-gray-900">
            {`${user?.first_name} ${user?.last_name}`}
          </Link>

          <button
            className="text-gray-700 hover:text-white bg-gray-400 hover:bg-blue-500 inline-flex items-center border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </nav>
      </div>
    </header>
  );
}
