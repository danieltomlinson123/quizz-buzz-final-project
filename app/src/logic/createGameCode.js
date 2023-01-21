import {
  validateText,
  validateCallback,
  validatePin,
  validateHost,
} from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function createGameCode(token, nameOfClass, pin, host, callback) {
  validateText(token, "token");
  validateText(nameOfClass, "name of class");
  validatePin(pin);
  validateHost(host);
  validateCallback(callback);

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

  xhr.send(JSON.stringify({ nameOfClass, pin, host }));
}

export default createGameCode;
