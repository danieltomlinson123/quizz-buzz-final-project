const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  questions: { updateQuestionEdit },
} = require("../../logic");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);

      const {
        body: {
          question,
          timeLimit,
          visibility,
          questionType,
          suggestedAnswer,
          answerA,
          answerB,
          answerC,
          answerD,
        },
        params: { questionId },
      } = req;

      return updateQuestionEdit(
        userId,
        questionId,
        question,
        timeLimit,
        visibility,
        questionType,
        suggestedAnswer,
        answerA,
        answerB,
        answerC,
        answerD
      ).then(() => res.status(204).send());
    },
    res,
    logger
  );
};
