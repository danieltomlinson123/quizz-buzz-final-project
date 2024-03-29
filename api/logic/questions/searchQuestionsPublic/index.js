const { User, Question } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const { verifyObjectIdString } = require("../../../utils");
const { validateText } = require("validators");

/**
 * Retrieves all questions that match the query and have visibility "public".
 *
 * @param {string} userId The user id.
 * @param {string} query The query.
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments does not match the expected type.
 * @throws {FormatError} If any of the arguments does not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function searchQuestionsPublic(userId, query) {
  verifyObjectIdString(userId);
  validateText(query, "query");

  return User.findById(userId)
    .lean()
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);

      return Question.find(
        { visibility: "public", question: { $regex: new RegExp(query) } },
        "question suggestedAnswer timeLimit visibility id"
      )
        .lean()
        .catch((error) => {
          throw new SystemError(error.message);
        })
        .then((questions) => {
          questions.forEach((question) => {
            // sanitize

            question.id = question._id.toString();

            question.isFav = user.favorites.some(
              (questionId) => questionId.toString() === question.id
            );

            delete question._id;

            delete question.__v;
          });

          return questions;
        });
    });
}

module.exports = searchQuestionsPublic;
