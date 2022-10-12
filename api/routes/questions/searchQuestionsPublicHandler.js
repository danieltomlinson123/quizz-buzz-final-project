const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  questions: { searchQuestionsPublic },
} = require("../../logic");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const {
        query: { q: query },
      } = req;

      return searchQuestionsPublic(query).then((questions) =>
        res.json(questions)
      );
    },
    res,
    logger
  );
};
