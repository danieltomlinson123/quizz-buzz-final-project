const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  questions: { retrieveQuestionsPublic },
} = require("../../logic");
const { NotFoundError } = require("errors");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);

      return retrieveQuestionsPublic(userId).then((questions) => {
        return res.json(questions);
      });
    },
    res,
    logger
  );
};
