const API_URL = process.env.REACT_APP_API_URL;

function retrieveQuestionForEdit(token, questionId, callback) {
  if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank");

  if (typeof questionId !== "string")
    throw new TypeError("question id is not a string");
  if (questionId.trim().length === 0)
    throw new Error("question id is empty or blank");

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function");

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

    const json = xhr.responseText;

    const data = JSON.parse(json);

    callback(null, data);
    if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 200) callback(null, data);
  };

  xhr.open("GET", `${API_URL}/questions/${questionId}`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send();
}

export default retrieveQuestionForEdit;
