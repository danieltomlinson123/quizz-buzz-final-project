const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  questions: { searchQuestions },
} = require("../../logic");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      debugger;
      const userId = verifyToken(req);

      const {
        query: { q: query },
      } = req;

      return searchQuestions(userId, query).then((questions) =>
        res.json(questions)
      );
    },
    res,
    logger
  );
};
