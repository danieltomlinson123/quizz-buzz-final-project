const { User } = require("../../../models");
const { AuthError, SystemError, NotFoundError } = require("errors");
const { validateEmail, validatePassword } = require("validators");

/**
 * Authenticates a user.
 *
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

function authenticateUser(email, password) {
  validateEmail(email);
  validatePassword(password);

  return User.findOne({ email })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with email ${email} not found`);

      if (user.password !== password) throw new AuthError("wrong password");

      return user.id;
    });
}

module.exports = authenticateUser;
