const { GameCode } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { validatePin } = require("validators");

/**
 * Retrieves a gameCodes that match the pin.
 *
 * @param {number} pin The game pin. !!!!! Doesn't accept nnumber or string??
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
  validatePin(pin);

  return (
    GameCode.find({ pin: pin })
      // will lean work here for an array of values?
      .lean()
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((gameCodes) => {
        // TODO: check this
        if (gameCodes.length === 0)
          throw new NotFoundError(`no open games match the details entered`);
        return gameCodes;
      })
      .catch((error) => {
        throw new SystemError(error.message);
      })
  );
}

module.exports = retrieveGameCode;
