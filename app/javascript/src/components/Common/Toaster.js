import React from "react";
import { toast, Slide } from "react-toastify";

const ToastrComponent = ({ type, message }) => {
  let icon;
  switch (type) {
    case "success":
      icon = "ri-checkbox-circle-fill";
      break;
    case "error":
      icon = "ri-error-warning-fill";
      break;
    case "info":
      icon = "ri-information-fill";
      break;
    case "warn":
      icon = "ri-alert-fill";
      break;
    default:
      icon = "ri-information-fill";
      break;
  }
  
  return (
    <div className="flex flex-row items-start justify-startconsole.log({ response, error: error.response.data.message })">
      <i className={icon}></i>
      <p className="mx-4 font-medium leading-5 text-white">{message}</p>
    </div>
  );
};

const showSuccessToastr = (message) => {
  toast.success(<ToastrComponent type="success" message={message} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
  });
};

const showWarningToastr = (message) => {
  toast.warn(<ToastrComponent type="warn" message={message} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
  });
}

const isError = (e) => e && !e.success && e.message;

const showErrorToastr = (error) => {
  const errorMessage = isError(error) ? error.message : error;
  toast.error(<ToastrComponent type="error" message={errorMessage} />, {
    position: toast.POSITION.BOTTOM_CENTER,
    transition: Slide,
  });
};

export const Toastr = {
  success: showSuccessToastr,
  error: showErrorToastr,
  warn: showWarningToastr
};

export default Toastr;
