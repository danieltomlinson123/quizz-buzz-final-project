const { NotFoundError, AuthError } = require("errors");
const { User, Question } = require("../../../models");
const { verifyObjectIdString } = require("../../../utils");
const {
  validateText,
  validateTimeLimit,
  validateVisibility,
  validateQuestionType,
  validateMCQAnswer,
} = require("validators");

/**
 * Updates all fields of an exisiting question for a user.
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

function updateQuestionEdit(
  userId,
  questionId,
  text,
  timeLimit,
  visibility,
  questionType,
  suggestedAnswer,
  answerA,
  answerB,
  answerC,
  answerD
) {
  verifyObjectIdString(userId);
  verifyObjectIdString(questionId);
  validateText(text, "question");
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
      question.timeLimit = timeLimit;
      question.visibility = visibility;
      question.modifiedAt = Date.now();
      question.questionType = questionType;
      question.suggestedAnswer = suggestedAnswer;
      question.answerA = answerA;
      question.answerB = answerB;
      question.answerC = answerC;
      question.answerD = answerD;

      return question.save();
    })
    .then(() => {});
}

module.exports = updateQuestionEdit;
