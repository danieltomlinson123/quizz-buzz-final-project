import { validateText, validateString, validateCallback } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function searchQuestionsPublic(query, callback) {
  validateString(query, "query");
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

    const json = xhr.responseText;

    const questions = JSON.parse(json);
    const { error } = questions;

    switch (true) {
      case status >= 500:
        callback(new ServerError(error));
        break;
      case status === 401:
        callback(new AuthError(error));
        break;
      case status >= 400:
        callback(new ClientError(error));
        break;
      case status === 200:
        callback(null, questions.reverse());
        break;
      default:
        callback(new UnknownError(`unexpected status ${status}`));
    }
  };

  xhr.open("GET", `${API_URL}/questions/public/search?q=${query}`);

  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send();
}

export default searchQuestionsPublic;
