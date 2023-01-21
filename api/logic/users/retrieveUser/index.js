const { User } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { verifyObjectIdString } = require("../../../utils");

/**
 * Retrieves a user.
 *
 * @param {string} userId The used id.
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments do not match the expected type.
 * @throws {FormatError} If any of the arguments do not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function retrieveUser(userId) {
  verifyObjectIdString(userId, "user id");

  // return User.findById(userId)
  //     .catch(error => {
  //         throw new SystemError(error.message)
  //     })
  //     .then(user => {
  //         if (!user) throw new NotFoundError(`user with id ${userId} not found`)

  //         const { name, email } = user

  //         return { name, email }
  //     })

  // return User.findById(userId)
  //     .catch(error => {
  //         throw new SystemError(error.message)
  //     })
  //     .then(user => {
  //         if (!user) throw new NotFoundError(`user with id ${userId} not found`)

  //         const doc = user._doc
  //         delete doc.password
  //         delete user._id

  //         return doc
  //     })

  // return User.findById(userId).lean()
  //     .catch(error => {
  //         throw new SystemError(error.message)
  //     })
  //     .then(user => {
  //         if (!user) throw new NotFoundError(`user with id ${userId} not found`)

  //         // sanitize
  //         delete user.password
  //         delete user.__v
  //         delete user._id

  //         return user
  //     })

  // return User.findById(userId).lean()
  //     .catch(error => {
  //         throw new SystemError(error.message)
  //     })
  //     .then(user => {
  //         if (!user) throw new NotFoundError(`user with id ${userId} not found`)

  //         // sanitize
  //         delete user.password
  //         delete user.__v
  //         delete user._id

  //         return user
  //     })

  return User.findById(userId, "name email")
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      // sanitize

      delete user._id;

      return user;
    });
}

module.exports = retrieveUser;
