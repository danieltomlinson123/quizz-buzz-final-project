import { validateCallback } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function retrieveGameCode(pin, callback) {
  /*   if (typeof callback !== "function")
    throw new TypeError("callback is not a function"); */
  validateCallback(callback);

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;

    // const { error, data } = JSON.parse(xhr.responseText);

    /* if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 200) {
      // const json = xhr.responseText;

      // const data = JSON.parse(json);

      callback(null, data.reverse());
    } */

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
      case status === 200:
        // callback(null, data.reverse());
        callback(null, JSON.parse(xhr.responseText).reverse());
        break;
      default:
        callback(new UnknownError(`unexpected status ${status}`));
        break;
    }
  };
  xhr.open("POST", `${API_URL}/gameCodes/pin`);

  xhr.setRequestHeader("Content-type", "application/json");
  // xhr.send(`{ "pin": "${pin}"}`);

  // const json = JSON.stringify({ pin: pin });

  // xhr.send(JSON.stringify({ pin: pin }));
  // xhr.send(json);
  xhr.send(JSON.stringify({ pin }));
}

export default retrieveGameCode;
