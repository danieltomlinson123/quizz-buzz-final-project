import { validateText, validateCallback } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function retrieveUser(token, callback) {
  validateText(token, "token");
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
      case status === 200:
        const user = {
          name: JSON.parse(xhr.responseText).name,
          email: JSON.parse(xhr.responseText).username,
          favorites: JSON.parse(xhr.responseText).favorites,
        };
        callback(null, user);
        break;
      default:
        callback(new UnknownError(`unexpected status ${status}`));
        break;
    }
  };

  xhr.onerror = function () {
    callback(new ServerError("connection failed"));
  };

  xhr.open("GET", `${API_URL}/users`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.send();
}

export default retrieveUser;
