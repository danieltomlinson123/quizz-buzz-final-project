const { User, Question } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { verifyObjectIdString } = require("../../../utils");

/**
 * Deletes a question for a user.
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

function deleteQuestion(questionId) {
  verifyObjectIdString(questionId, "question id");

  // TODO: this must be changed to work with first checking the userId

  return Question.findById(questionId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((question) => {
      if (!question)
        throw new NotFoundError(`question with id ${questionId} not found`);

      return Question.deleteOne({ _id: questionId }).catch((error) => {
        throw new SystemError(error.message);
      });
    })
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((question) => {});
}

module.exports = deleteQuestion;
