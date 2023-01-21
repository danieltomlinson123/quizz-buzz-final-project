import {
  validateText,
  validateCallback,
  validateQuestionId,
  validateTimeLimit,
  validateVisibility,
  validateMCQAnswer,
} from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function updateQuestionEdit(token, questionId, questionDetails, callback) {
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
  validateText(token, "token");
  validateQuestionId(questionId);
  validateCallback(callback);

  validateText(question, "question");
  validateTimeLimit(timeLimit);
  validateVisibility(visibility);

  if (questionType === "MCQ") {
    validateMCQAnswer(answerA, "answer A");
    validateMCQAnswer(answerB, "answer B");
    validateMCQAnswer(answerC, "answer C");
    validateMCQAnswer(answerD, "answer D");
  } else if (questionType === "written") {
    validateText(suggestedAnswer, "suggested answer");
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

  xhr.open("PATCH", `${API_URL}/questions/${questionId}`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

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
