import { validateText, validateCallback, validateQuestionId } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function retrieveQuestionForEdit(token, questionId, callback) {
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
        callback(null, JSON.parse(xhr.responseText));
        break;
      default:
        callback(new UnknownError(`unexpected status ${status}`));
        break;
    }
  };

  xhr.onerror = function () {
    callback(new ServerError("connection failed"));
  };

  xhr.open("GET", `${API_URL}/questions/${questionId}`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send();
}

export default retrieveQuestionForEdit;
