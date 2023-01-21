import { validateText, validateCallback } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function updatePassword(
  token,
  /* oldPassword,
  newPassword,
  confirmNewPassword, */
  formValues,
  callback
) {
  const {
    formId,
    updatedName,
    password,
    newEmail,
    oldPassword,
    newPassword,
    confirmNewPassword,
  } = formValues;
  //====== validation ======//
  /*   if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank"); */
  validateText(token, "token");

  if (formId === "passwordForm") {
    if (typeof newPassword !== "string")
      throw new TypeError("new password is not a string");
    if (newPassword.trim().length === 0)
      throw new Error("new password is empty or blank");
    if (newPassword.trim() !== confirmNewPassword.trim())
      throw new Error("passwords do  not match");

    if (newPassword.length < 8)
      throw new Error("password length is less than 8 characters");
    //TO DO validate safe passwords
  }

  //TO DO validate type of name e.g. first name / surname and other inputs

  /*   if (typeof callback !== "function")
    throw new TypeError("callback is not a function"); */
  validateCallback();

  // TODO: validate other fields

  //======== validation ========//

  // retrieve user
  /* 
  const update = {
    oldPassword,
    password: newPassword,
  }; */

  const xhr = new XMLHttpRequest();

  //response

  xhr.onload = function () {
    const status = xhr.status;
    // const { error } = JSON.parse(xhr.responseText);

    /* if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 204) {
      xhr.onerror = function () {
        console.log("API CALL ERROR");
      };
      callback(null);
    } */
    switch (true) {
      case status >= 500:
        callback(
          new ServerError(`error ${status}: ${JSON.parse(xhr.response).error}`)
        );
        break;
      case status === 401:
        callback(
          new AuthError(`error ${status}: ${JSON.parse(xhr.response).error}`)
        );
        break;
      case status === 400:
        callback(
          new ClientError(`error ${status}: ${JSON.parse(xhr.response).error}`)
        );
        break;
      case status === 204:
        callback(null);
        break;
      default:
        callback(new UnknownError(`unexpected status ${status}`));
        break;
    }
  };
  // XMLHttprequest

  xhr.open("PATCH", `${API_URL}/users/details`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

  if (formId === "nameForm")
    xhr.send(
      JSON.stringify({
        formId: formId,
        updatedName: updatedName,
        password: password,
      })
    );
  else if (formId === "passwordForm")
    xhr.send(
      JSON.stringify({
        formId: formId,
        oldPassword: oldPassword,
        newPassword: newPassword,
      })
    );
  else if (formId === "emailForm")
    xhr.send(
      JSON.stringify({
        formId: formId,
        newEmail: newEmail,
        password: password,
      })
    );
}

export default updatePassword;
