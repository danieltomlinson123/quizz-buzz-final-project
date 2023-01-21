const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  questions: { updateQuestionText },
} = require("../../logic");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);

      const {
        body: { text },
        params: { questionId },
      } = req;

      return updateQuestionText(userId, questionId, text).then(() =>
        res.status(204).send()
      );
    },
    res,
    logger
  );
};
