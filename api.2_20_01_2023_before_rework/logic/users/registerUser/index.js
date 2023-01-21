const { User } = require("../../../models");
const { DuplicityError, SystemError } = require("errors");
const { validateText, validateEmail, validatePassword } = require("validators");

/**
 * Registers a user.
 *
 * @param {string} name The name entered by the user.
 * @param {string} email The email entered by the user.
 * @param {string} password The password entered by the user.
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments do not match the expected type.
 * @throws {FormatError} If any of the arguments do not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function registerUser(name, email, password) {
  validateText(name, "name");
  validateEmail(email);
  validatePassword(password);

  return User.create({ name, email, password })
    .then((user) => {})
    .catch((error) => {
      if (error.code === 11000) throw new DuplicityError("user already exists");

      throw new SystemError(error.message);
    });
}

module.exports = registerUser;
