import { validateText, validateCallback } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function createGameCode(token, nameOfClass, pin, host, callback) {
  //TODO validate inputs
  /*   if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank"); */
  validateText(token, "token");
  /*   if (typeof nameOfClass !== "string")
    throw new TypeError("name of class is not a string");
  if (nameOfClass.trim().length === 0)
    throw new Error("name of class is empty or blank"); */

  validateText(nameOfClass, "name of class");

  // TODO: validate token, pin and host, check error message returned when name empty or blank

  validateCallback(callback);
  /* 
  if (typeof callback !== "function")
    throw new TypeError("callback is not a function"); */

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

    // This is new, TODO: check error is passed back from api
    // const json = xhr.responseText;
    // const { error } = JSON.parse(xhr.responseText);

    /*     if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 201) callback(null); */

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

  xhr.open("POST", `${API_URL}/gameCodes`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

  /* const json = JSON.stringify({ nameOfClass, pin, host });
  xhr.send(json); */
  xhr.send(JSON.stringify({ nameOfClass, pin, host }));
}

export default createGameCode;
