const { Question, User } = require("../../../models");
const { DuplicityError, NotFoundError, SystemError } = require("errors");
const { validateString } = require("validators");
const { verifyObjectIdString } = require("../../../utils");
const verifyObjectId = require("../../../utils/verifyObjectId");

/**
 * Retrieves all questions for a user.
 *
 * @param {string} userId The user id.
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments does not match the expected type.
 * @throws {FormatError} If any of the arguments does not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function retrieveQuestions(userId) {
  verifyObjectIdString(userId, "userId");

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return Question.find({ user: userId })
        .lean()
        .catch((error) => {
          throw new NotFoundError(
            `no questions found for user with id ${userId}`
          );
        });
    })
    .then((questions) => {
      questions.forEach((question) => {
        // sanitize

        question.id = question._id.toString();

        delete question._id;

        delete question.__v;
      });

      return questions;
    });
}

module.exports = retrieveQuestions;
