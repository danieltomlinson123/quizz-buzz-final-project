const { NotFoundError, AuthError } = require("errors");
const { User, Question } = require("../../../models");
const { verifyObjectIdString } = require("../../../utils");
const { validateString } = require("validators");

/**
 * Updates the text for a question.
 *
 * @param {string} userId The user id.
 * @param {string} questionId The question id.
 * @param {string} text The question text.
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments does not match the expected type.
 * @throws {FormatError} If any of the arguments does not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function updateQuestionText(userId, questionId, text) {
  verifyObjectIdString(userId);
  verifyObjectIdString(questionId);
  validateText(text, "new question");

  return User.findById(userId)
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return Question.findById(questionId);
    })
    .then((question) => {
      if (!question)
        throw new NotFoundError(`question with id ${questionId} not found`);

      if (question.user.toString() !== userId)
        throw new AuthError(
          `question with id ${questionId} does not belong to user with id ${userId}`
        );

      question.question = text;
      question.modifiedAt = Date.now();

      return question.save();
    })
    .then(() => {});
}

module.exports = updateQuestionText;
