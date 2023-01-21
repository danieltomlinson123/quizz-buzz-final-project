import { validateEmail, validatePassword, validateCallback } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Checks user credentials against database
 *
 * @param {string} email The user email
 * @param {string} password The user password
 * @param {function} callback The function expression that provides a result
 *
 * @throws {Error | TypeError} On invalid inputs
 */

function authenticateUser(email, password, callback) {
  validateEmail(email);
  validatePassword(password);
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  //response

  xhr.onload = function () {
    const status = xhr.status;

    console.log(status);

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
      case status === 200:
        callback(null, JSON.parse(xhr.responseText).token);
        break;
      default:
        callback(new UnknownError(`unexpected status ${status}`));
        break;
    }
  };

  xhr.onerror = function () {
    callback(new ServerError("connection failed"));
  };

  xhr.open("POST", `${API_URL}/users/auth`);

  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send(JSON.stringify({ email, password }));
}

export default authenticateUser;
