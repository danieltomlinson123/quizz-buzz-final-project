const {
  runWithErrorHandling,
  createLogger,
  verifyToken,
} = require("../../utils");
const {
  users: { retrieveUser },
} = require("../../logic");

const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const userId = verifyToken(req);

      return retrieveUser(userId).then((user) => res.json(user));
    },
    res,
    logger
  );
};
