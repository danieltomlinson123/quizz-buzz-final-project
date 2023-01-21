const API_URL = process.env.REACT_APP_API_URL;

function createGameCode(token, nameOfClass, pin, host, callback) {
  //TODO validate inputs
  if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank");

  if (typeof nameOfClass !== "string")
    throw new TypeError("name of class is not a string");
  if (nameOfClass.trim().length === 0)
    throw new Error("name of class is empty or blank");

  // TODO: validate pin and host

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function");

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

    if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 201) callback(null);
  };

  xhr.open("POST", `${API_URL}/gameCodes`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

  const json = JSON.stringify({ nameOfClass, pin, host });
  console.log(json);
  xhr.send(json);
}

export default createGameCode;
