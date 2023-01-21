import {
  validateText,
  validateCallback,
  validateEmail,
  validatePassword,
} from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

// import EMAIL_REGEX from "./constants";

const API_URL = process.env.REACT_APP_API_URL;

function registerUser(name, email, password, callback) {
  /*   if (typeof name !== "string") throw new TypeError("name is not a string");
  if (name.trim().length === 0) throw new Error("name is empty or blank"); */
  validateText(name, "name");

  /*   if (typeof email !== "string") throw new TypeError("email is not a string");
  if (email.trim().length === 0) throw new Error("email is empty or blank");
  if (email.length < 6) throw new Error("email length is not valid");
  if (!EMAIL_REGEX.test(email)) throw new Error("email is not valid"); */
  validateEmail(email);
  /*   if (typeof password !== "string")
    throw new TypeError("password is not a string");
  if (password.trim().length === 0)
    throw new Error("password is empty or blank");
  if (password.length < 8)
    throw new Error("password length is less than 8 characters"); */
  //TO DO validate safe passwords
  validatePassword(password);
  /*   if (typeof callback !== "function")
    throw new TypeError("callback is not a function"); */
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

    // const { error } = JSON.parse(xhr.responseText);

    /* if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 201) callback(null); */

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
      case status === 201:
        callback(null);
        break;
      default:
        callback(new UnknownError(`unexpected status ${status}`));
        break;
    }
  };

  xhr.open("POST", `${API_URL}/users`);

  xhr.setRequestHeader("Content-type", "application/json");

  /* xhr.send(
    `{ "name": "${name}", "email": "${email}", "password": "${password}"}`
  ); */
  xhr.send(JSON.stringify({ name, email, password }));
}

export default registerUser;
