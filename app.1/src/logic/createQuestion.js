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
  //TODO validate inputs

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

  if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank");
  if (typeof question !== "string")
    throw new TypeError("question is not a string");
  if (question.trim().length === 0)
    throw new Error("question is empty or blank");
  if (typeof suggestedAnswer !== "string")
    throw new TypeError("suggested answer is not a string");
  if (typeof timeLimit !== "string")
    throw new TypeError("time limit is not a string");
  if (typeof visibility !== "string")
    throw new TypeError("visibility is not a string");

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function");

  const xhr = new XMLHttpRequest();

  //response

  xhr.onload = function () {
    const status = xhr.status;

    if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 201) callback(null);
  };

  xhr.open("POST", `${API_URL}/questions`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

  const json = JSON.stringify({
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
  console.log(json);
  xhr.send(json);
}

export default createQuestion;
