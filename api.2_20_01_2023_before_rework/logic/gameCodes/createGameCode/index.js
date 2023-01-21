const { User, GameCode } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { validateString } = require("validators");
const { verifyObjectId } = require("../../../utils");

/**
 * Creates a gameCode for a user with an ID to join the scocket.io room.
 *
 * @param {string} userId The user id.
 * @param {string} nameOfClass The name of the class.
 * @param {string} pin The game pin.
 * @param {string} host The socket.io id of the host.
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments do not match the expected type.
 * @throws {FormatError} If any of the arguments do not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function createGameCode(userId, nameOfClass, pin, host) {
  verifyObjectId(userId, "user id");
  validateString(nameOfClass, "nameOfClass");
  validateString(pin, "pin");
  validateString(host, "host");

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return GameCode.create({ user: user._id, nameOfClass, pin, host }).catch(
        (error) => {
          throw new SystemError(error.message);
        }
      );
    })
    .then((gameCode) => {});
}

module.exports = createGameCode;
