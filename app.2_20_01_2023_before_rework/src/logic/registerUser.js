import EMAIL_REGEX from "./constants";

const API_URL = process.env.REACT_APP_API_URL;

function registerUser(name, email, password, callback) {
  if (typeof name !== "string") throw new TypeError("name is not a string");
  if (name.trim().length === 0) throw new Error("name is empty or blank");
  //TO DO validate type of name e.g. first name / surname

  if (typeof email !== "string") throw new TypeError("email is not a string");
  if (email.trim().length === 0) throw new Error("email is empty or blank");
  if (email.length < 6) throw new Error("email length is not valid");
  if (!EMAIL_REGEX.test(email)) throw new Error("email is not valid");

  if (typeof password !== "string")
    throw new TypeError("password is not a string");
  if (password.trim().length === 0)
    throw new Error("password is empty or blank");
  if (password.length < 8)
    throw new Error("password length is less than 8 characters");
  //TO DO validate safe passwords

  if (typeof callback !== "function")
    throw new TypeError("callback is not a function");

  const xhr = new XMLHttpRequest();

  xhr.onload = function () {
    const status = xhr.status;
    console.log(status);

    if (status >= 500) callback(new Error(`server error(${status})`));
    else if (status >= 400) callback(new Error(`client error(${status})`));
    else if (status === 201) callback(null);
  };

  xhr.open("POST", `${API_URL}/users`);

  xhr.setRequestHeader("Content-type", "application/json");

  xhr.send(
    `{ "name": "${name}", "email": "${email}", "password": "${password}"}`
  );
}

export default registerUser;
