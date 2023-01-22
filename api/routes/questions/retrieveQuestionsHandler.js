const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  questions: { retrieveQuestions },
} = require("../../logic");

const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);

      return retrieveQuestions(userId).then((questions) => res.json(questions));
    },
    res,
    logger
  );
};
