const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  questions: { createQuestion },
} = require("../../logic");

const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);
      console.log("userId:");
      console.log(userId);

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
      } = req;

      return createQuestion(
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
      ).then(() => res.status(201).send());
    },
    res,
    logger
  );
};
