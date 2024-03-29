const { Question, User } = require("../../../models");
const { NotFoundError } = require("errors");
const { AuthError } = require("errors");
const { verifyObjectIdString } = require("../../../utils");

/**
 * Retrieves a single question for a user.
 *
 * @param {string} userId The user id.
 * @param {string} questionId The question id.
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments does not match the expected type.
 * @throws {FormatError} If any of the arguments does not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function retrieveQuestionForEdit(userId, questionId) {
  verifyObjectIdString(userId);
  verifyObjectIdString(questionId);

  return (
    User.findById(userId)
      .lean()
      .then((user) => {
        if (!user) throw new NotFoundError(`user with id ${userId} not found`);
        return Question.findById(questionId);
      })
      // .lean() lean caused an error here
      .catch((error) => {
        throw new SystemError(error.message);
      })
      .then((question) => {
        if (!question)
          throw new NotFoundError(`question with id ${questionId} not found`);

        // This code was commented out before, but it seems like a useful authorisation check
        if (question.user.toString() !== userId)
          throw new AuthError(
            `question with id ${questionId} does not belong to user with id ${userId}`
          );

        // sanitise
        question._doc.id = question._doc._id.toString();

        delete question._doc._id;

        delete question._doc.__v;

        return question;
      })
      .catch((error) => {
        throw new SystemError(error.message);
      })
  );
}

module.exports = retrieveQuestionForEdit;
