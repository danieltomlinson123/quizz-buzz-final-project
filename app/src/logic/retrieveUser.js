import { validateText, validateCallback } from "validators";
import { AuthError, ClientError, ServerError, UnknownError } from "errors";

const API_URL = process.env.REACT_APP_API_URL;

function retrieveUser(token, callback) {
  /*   if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank"); */
  validateText(token, "token");
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
      //  const json = xhr.responseText;

      // const data = JSON.parse(json);

      const user = {
        name: data.name,
        email: data.username,
        favorites: data.favorites,
      };

      callback(null, user);
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

  xhr.open("GET", `${API_URL}/users`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);

  xhr.send();
}

export default retrieveUser;
