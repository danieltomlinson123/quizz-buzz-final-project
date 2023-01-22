const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  gameCodes: { retrieveGameCode },
} = require("../../logic");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const {
        body: { pin },
      } = req;

      return retrieveGameCode(pin).then((gameCode) => res.json(gameCode));
    },
    res,
    logger
  );
};
