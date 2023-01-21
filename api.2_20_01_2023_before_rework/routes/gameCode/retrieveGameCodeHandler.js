const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  gameCodes: { retrieveGameCode },
} = require("../../logic");
const { NotFoundError, AuthError } = require("errors");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const {
        body: { pin },
      } = req;
      // const userId = verifyToken(req);
      return retrieveGameCode(pin).then((gameCode) => res.json(gameCode));
    },
    res,
    logger
  );
};
