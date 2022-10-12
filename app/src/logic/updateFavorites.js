const API_URL = process.env.REACT_APP_API_URL;

function updateFavorites(token, questionId, action, callback) {
  //====== validation ======//
  if (typeof token !== "string") throw new TypeError("token is not a string");
  if (token.trim().length === 0) throw new Error("token is empty or blank");

  // TODO: validation

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function");

  //======== validation ========//

  // retrieve user
  /* 
  const update = {
    oldPassword,
    password: newPassword,
  }; */

  const xhr = new XMLHttpRequest();

  //response

  xhr.onload = function () {
    const status = xhr.status;

    console.log(status);

    if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 204) {
      xhr.onerror = function () {
        console.log("API CALL ERROR");
      };
      callback(null);
    }
  };
  // XMLHttprequest

  xhr.open("PATCH", `${API_URL}/users/favorites`);

  xhr.setRequestHeader("Authorization", `Bearer ${token}`);
  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send(JSON.stringify({ questionId: questionId, action: action }));
}

export default updateFavorites;
