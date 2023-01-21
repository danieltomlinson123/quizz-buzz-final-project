const { runWithErrorHandling, createLogger } = require("../../utils");
const {
  users: { authenticateUser },
} = require("../../logic");
const { sign } = require("jsonwebtoken");
const { NotFoundError, AuthError } = require("errors");
const logger = createLogger(module);

module.exports = (req, res) => {
  runWithErrorHandling(
    () => {
      const {
        body: { email, password },
      } = req;

      return authenticateUser(email, password).then((userId) => {
        const token = sign({ sub: userId }, "Dan: copié el código de Mónica!", {
          expiresIn: "1h",
        });

        res.json({ token });
      });
    },
    res,
    logger
  );
};
