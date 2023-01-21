import { validateText, validateCallback } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function updateQuestionEdit(
  token,
  questionId,
  questionDetails,
  /*  question,
  suggestedAnswer,
  timeLimit,
  visibility, */
  callback
) {
  const {
    question,
    timeLimit,
    visibility,
    questionType,
    suggestedAnswer,
    answerA,
    answerB,
    answerC,
    answerD,
  } = questionDetails;

  // TODO: validate inputs

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
    else if (status === 204) callback(null); */

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

  xhr.open("PATCH", `${API_URL}/questions/${questionId}`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

  /* const json = JSON.stringify({
    question,
    timeLimit,
    visibility,
    questionType,
    suggestedAnswer,
    answerA,
    answerB,
    answerC,
    answerD,
  });

  xhr.send(json); */
  xhr.send(
    JSON.stringify({
      question,
      timeLimit,
      visibility,
      questionType,
      suggestedAnswer,
      answerA,
      answerB,
      answerC,
      answerD,
    })
  );
}

export default updateQuestionEdit;
