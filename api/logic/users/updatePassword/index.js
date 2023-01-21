const { User } = require("../../../models");
const {
  Types: { ObjectId },
} = require("mongoose");
const { FormatError, AuthError } = require("errors");
const {
  validatePassword,
  validateEmail,
  validateText,
  validateFormId,
} = require("validators");
const { verifyObjectIdString } = require("../../../utils");

/**
 * Updates the name, email or password of a user.
 *
 * @param {string} userId The used id.
 * @param {string} req The request sent.
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments do not match the expected type.
 * @throws {FormatError} If any of the arguments do not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function updatePassword(userId, req) {
  // if (!ObjectId.isValid(userId)) throw new FormatError("User is not valid");
  verifyObjectIdString(userId);
  const { formId, updatedName, password, newEmail, oldPassword, newPassword } =
    req;

  validateFormId(formId);

  if (formId === "nameForm") {
    validatePassword(password);
    validateText(updatedName, "name");
  }

  if (formId === "passwordForm") {
    validatePassword(oldPassword);
    validatePassword(newPassword);
  }

  if (formId === "emailForm") {
    validatePassword(password);
    validateEmail(email);
  }

  return (async () => {
    const foundUser = await User.findById(userId);

    if (formId === "passwordForm") {
      if (!foundUser || foundUser.password !== oldPassword)
        throw new AuthError(
          `User ${userId} does not exist or credentials are wrong`
        );
    }

    if (formId === "nameForm") {
      if (!foundUser || foundUser.password !== password)
        throw new AuthError(
          `User ${userId} does not exist or credentials are wrong`
        );
    }

    if (formId === "emailForm") {
      if (!foundUser || foundUser.password !== password)
        throw new AuthError(
          `User ${userId} does not exist or credentials are wrong`
        );
    }

    if (formId === "nameForm") foundUser.name = updatedName;
    if (formId === "passwordForm") foundUser.password = newPassword;
    if (formId === "emailForm") foundUser.email = newEmail;

    await foundUser.save();

    return;
  })();
}

module.exports = updatePassword;
