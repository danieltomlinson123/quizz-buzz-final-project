const { GameCode } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { validateString } = require("validators");

/**
 * Retrieves a gameCodes that match the pin.
 *
 * @param {string} userId The user id.
 * @param {string} pin The game pin.
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments do not match the expected type.
 * @throws {FormatError} If any of the arguments do not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function retrieveGameCode(pin) {
  validateString(pin, "pin");

  /* return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      debugger;
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return  */

  return GameCode.find(pin)
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((gameCodes) => gameCodes)
    .catch((error) => {
      throw new NotFoundError(`no open games match the details entered`);
    });
  /* GameCode.find({ user: userId }).catch((error) => {
    throw new NotFoundError(`no game codes found for user with id ${userId}`);
  }); */
} /* )
    .then((gameCodes) => {
      debugger;
      // TODO sanitize
      return gameCodes;
    });
} */

module.exports = retrieveGameCode;
