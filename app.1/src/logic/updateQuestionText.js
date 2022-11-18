const API_URL = process.env.REACT_APP_API_URL;

function updateQuestionText(token, questionId, text, callback) {
  if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank");

  if (typeof questionId !== "string")
    throw new TypeError("question id is not a string");
  if (questionId.trim().length === 0)
    throw new Error("question id is empty or blank");

  if (typeof text !== "string") throw new TypeError("text is not a string");

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function");

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

    if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 204) callback(null);
  };

  xhr.open("PATCH", `${API_URL}/questions/${questionId}/text`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

  const json = JSON.stringify({ text });
  debugger;
  xhr.send(json);
}

export default updateQuestionText;
