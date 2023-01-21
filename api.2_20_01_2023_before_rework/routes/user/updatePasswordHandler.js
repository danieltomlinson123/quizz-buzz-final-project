const {
  runWithErrorHandling,
  verifyToken,
  createLogger,
} = require("../../utils");
const {
  users: { updatePassword },
} = require("../../logic");
const logger = createLogger(module);

function updatePasswordHandler(req, res) {
  runWithErrorHandling(
    async () => {
      const userId = await verifyToken(req);

      await updatePassword(userId, req.body);

      res.status(204).send();

      logger.info(`User: ${userId} updated details succesfully`);
    },
    res,
    logger
  );
}

module.exports = updatePasswordHandler;
