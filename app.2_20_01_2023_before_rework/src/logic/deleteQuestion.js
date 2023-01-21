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

    if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 200) callback(null);
  };

  xhr.open("DELETE", `${API_URL}/questions/${questionId}`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);

  xhr.send(JSON.stringify({ questionId }));
}

export default deleteQuestion;
