const API_URL = process.env.REACT_APP_API_URL;

function retrieveQuestionsPublic(token, callback) {
  if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank");

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function");

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

    if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 200) {
      const json = xhr.responseText;

      const data = JSON.parse(json);

      callback(null, data.reverse());
    }
  };

  xhr.open("GET", `${API_URL}/questions/public`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);

  xhr.send();
}

export default retrieveQuestionsPublic;
