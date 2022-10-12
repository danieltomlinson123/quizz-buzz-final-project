const { runWithErrorHandling, verifyToken } = require("../../utils");
const {
  users: { updateFavorites },
} = require("../../logic");
const logger = require("../../logger")(module);

function updateFavoritesHandler(req, res) {
  runWithErrorHandling(
    async () => {
      debugger;
      const userId = await verifyToken(req);

      const {
        body: { questionId, action },
      } = req;

      await updateFavorites(userId, questionId, action);

      res.status(204).send();

      logger.info(`User: ${userId} updated favorites succesfully`);
    },
    res,
    logger
  );
}

module.exports = updateFavoritesHandler;
