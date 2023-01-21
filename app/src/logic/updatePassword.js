import {
  validateText,
  validateCallback,
  validatePassword,
  validateEmail,
  validateFormId,
} from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function updatePassword(token, formValues, callback) {
  const {
    formId,
    updatedName,
    password,
    newEmail,
    oldPassword,
    newPassword,
    confirmNewPassword,
  } = formValues;

  validateText(token, "token");
  validateCallback(callback);
  validateFormId(formId);

  if (formId === "nameForm") {
    validateText(updatedName, "updated name");
    validatePassword(password);
  }

  if (formId === "passwordForm") {
    validatePassword(oldPassword);
    validatePassword(newPassword, "new password");
  }

  if (formId === "emailForm") {
    validateEmail(newEmail, "updated email");
    validatePassword(password);
  }

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

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

  xhr.onerror = function () {
    callback(new ServerError("connection failed"));
  };

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
