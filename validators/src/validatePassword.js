const { FormatError } = require("errors");

function validatePassword(password) {
  if (typeof password !== "string")
    throw new TypeError("password is not a string");
  if (password.trim().length === 0)
    throw new FormatError("password is empty or blank");
  if (password.length < 8)
    throw new FormatError("password length is less than 8 characters");
}

module.exports = validatePassword;
