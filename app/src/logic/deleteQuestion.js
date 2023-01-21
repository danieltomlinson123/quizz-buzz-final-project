import { validateText, validateCallback, validateQuestionId } from "validators";
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
  validateText(token, "token");
  validateQuestionId(questionId);
  validateCallback(callback);

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
