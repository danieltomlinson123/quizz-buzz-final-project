const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  questions: { deleteQuestion },
} = require("../../logic");

const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const {
        params: { questionId },
      } = req;

      return deleteQuestion(questionId).then(() => res.status(200).send());
    },
    res,
    logger
  );
};
