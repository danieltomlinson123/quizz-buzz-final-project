const { NotFoundError, AuthError } = require("errors");

const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  questions: { retrieveQuestionForEdit },
} = require("../../logic");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);

      const {
        params: { questionId },
      } = req;

      return retrieveQuestionForEdit(userId, questionId).then((question) =>
        res.status(200).json(question)
      );
    },
    res,
    logger
  );
};
