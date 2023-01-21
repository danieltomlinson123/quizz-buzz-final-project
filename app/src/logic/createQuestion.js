import { validateCallback, validateText } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function createQuestion(
  token,
  questionDetails,
  /* question,
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

  validateText(question, "question");
  // TODO: validate timeLimit
  // TODO: validate visibility
  if (questionType === "MCQ") {
    // TODO: validate answerA ... (array with text and tru/false)
  } else if (questionType === "written") {
    validateText(suggestedAnswer);
  }

  /*   if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank"); */
  validateText(token, "token");
  /*   if (typeof question !== "string")
    throw new TypeError("question is not a string"); */
  /*   if (question.trim().length === 0)
    throw new Error("question is empty or blank"); */
  /*   if (typeof suggestedAnswer !== "string")
    throw new TypeError("suggested answer is not a string"); */
  if (typeof timeLimit !== "string")
    throw new TypeError("time limit is not a string");
  if (typeof visibility !== "string")
    throw new TypeError("visibility is not a string");

  /*  if (typeof callback !== "function")
    throw new TypeError("callback is not a function"); */
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  //response

  xhr.onload = function () {
    const status = xhr.status;

    /* if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 201) callback(null); */
    // const json = xhr.responseText;
    // const { error } = JSON.parse(xhr.responseText);

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

  xhr.onerror = function () {
    callback(new ServerError("connection failed"));
  };

  xhr.open("POST", `${API_URL}/questions`);

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
  }); */
  // xhr.send(json);
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

export default createQuestion;
