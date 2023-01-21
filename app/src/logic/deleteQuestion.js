import { validateText, validateCallback } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

/**
 * Deletes a question from database
 *
 * @param {string} token The user session token
 * @param {string} questionId The question identifier
 * @param {function} callback The function expression that provides a result
 *
 * @throws {TypeError} On invalid inputs
 */

function deleteQuestion(token, questionId, callback) {
  /*   if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank"); */
  validateText(token, "token");

  if (typeof questionId !== "string")
    throw new TypeError("question id is not a string");
  if (questionId.trim().length === 0)
    throw new Error("question id is empty or blank");

  /*   if (typeof callback !== "function")
    throw new TypeError("callback is not a function"); */

  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

    // const { error } = JSON.parse(xhr.responseText);

    /*     if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 200) callback(null); */

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
        callback(null);
        break;
      default:
        callback(new UnknownError(`unexpected status ${status}`));
        break;
    }
  };

  xhr.open("DELETE", `${API_URL}/questions/${questionId}`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);

  xhr.send(JSON.stringify({ questionId }));
}

export default deleteQuestion;
