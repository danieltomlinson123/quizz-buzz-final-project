const { User, Question } = require("../../../models");
const { NotFoundError, SystemError } = require("errors");
const {
  validateText,
  validateTimeLimit,
  validateVisibility,
  validateQuestionType,
  validateMCQAnswer,
} = require("validators");
const { verifyObjectIdString } = require("../../../utils");
const validateQuestionType = require("validators/src/validateQuestionType");

/**
 * Updates an exisiting question for a user.
 *
 * @param {string} userId The user id.
 * @param {string} question The question text.
 * @param {number} timeLimit The time limit in ms.
 * @param {string} visibility The visibility of the question: "public" or "private".
 * @param {string} questionType The question type: "MCQ" ur "written".
 * @param {string} suggestedAnswer The suggested answer.
 * @param {array} answerA The written answer and "correct" or "incorrect".
 * @param {array} answerB The written answer and "correct" or "incorrect".
 * @param {array} answerC The written answer and "correct" or "incorrect".
 * @param {array} answerD The written answer and "correct" or "incorrect".
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments does not match the expected type.
 * @throws {FormatError} If any of the arguments does not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function createQuestion(
  userId,
  question,
  timeLimit,
  visibility,
  questionType,
  suggestedAnswer,
  answerA,
  answerB,
  answerC,
  answerD
) {
  //TODO: validate all

  verifyObjectIdString(userId, "user id");
  validateText(question, "question");
  validateTimeLimit(timeLimit);
  validateVisibility(visibility);
  validateQuestionType(questionType);

  if (questionType === "MCQ") {
    // validateMCQAnswer(answerA, "answer A");
    // validateMCQAnswer(answerB, "answer B");
    // validateMCQAnswer(answerC, "answer C");
    // validateMCQAnswer(answerD, "answer D");
  } else if (questionType === "written") {
    validateText(suggestedAnswer, "suggested answer");
  }

  return User.findById(userId)
    .lean()
    .catch((error) => {
      throw new SystemError(error.message);
    })
    .then((user) => {
      if (!user) throw new NotFoundError(`user with id ${userId} not found`);
      return Question.create({
        user: user._id,
        question,
        timeLimit,
        visibility,
        questionType,
        suggestedAnswer,
        answerA,
        answerB,
        answerC,
        answerD,
      }).catch((error) => {
        throw new SystemError(error.message);
      });
    })
    .then((question) => {});
}

module.exports = createQuestion;
