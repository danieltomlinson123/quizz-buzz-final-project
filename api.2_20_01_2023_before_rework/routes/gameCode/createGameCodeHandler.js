const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  gameCodes: { createGameCode },
} = require("../../logic");
const { NotFoundError } = require("errors");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      debugger;
      const userId = verifyToken(req);

      const {
        body: { nameOfClass, pin, host },
      } = req;

      return createGameCode(userId, nameOfClass, pin, host).then(() =>
        res.status(201).send()
      );
    },
    res,
    logger
  );
};
