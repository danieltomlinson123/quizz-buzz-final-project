const { GameCode } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { validateNumber } = require("validators");

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
  // validate string breaks the code because pin is not a string here!!! so does validateNumber!!
  // validateNumber(pin, "pin");

  /* return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      debugger;
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return  */
  console.log("pin received as argument in retrieveGameCode");
  console.log(pin);

  return GameCode.find({ pin: pin })
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
