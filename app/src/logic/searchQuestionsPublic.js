import { validateText, validateString, validateCallback } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function searchQuestionsPublic(token, query, callback) {
  validateText(token, "token");
  validateString(query, "query");
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

    /* const json = xhr.responseText;

    const questions = JSON.parse(json);
    const { error } = questions; */

    // const { error, questions } = JSON.parse(xhr.responseText);

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
        // callback(null, questions.reverse());
        callback(null, JSON.parse(xhr.responseText).reverse());
        break;
      default:
        callback(new UnknownError(`unexpected status ${status}`));
        break;
    }
  };

  xhr.open("GET", `${API_URL}/questions/public/search?q=${query}`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);

  xhr.send();
}

export default searchQuestionsPublic;
