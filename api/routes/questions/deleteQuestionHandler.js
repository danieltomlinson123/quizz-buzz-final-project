const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  questions: { deleteQuestion },
} = require("../../logic");
const { NotFoundError } = require("errors");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      debugger;

      const {
        params: { questionId },
      } = req;

      return deleteQuestion(questionId).then(() => res.status(200).send());
    },
    res,
    logger
  );
};
