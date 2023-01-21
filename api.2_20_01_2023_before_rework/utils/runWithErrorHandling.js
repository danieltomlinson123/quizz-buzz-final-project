const {
  JsonWebTokenError,
  TokenExpiredError,
  NotBeforeError,
} = require("jsonwebtoken");
const {
  FormatError,
  NotFoundError,
  AuthError,
  DuplicityError,
} = require("errors");

function runWithErrorHandling(callback, res, logger) {
  try {
    callback().catch((error) => {
      if (error instanceof DuplicityError)
        res.status(409).json({ error: error.message });
      else if (error instanceof NotFoundError || error instanceof AuthError)
        res.status(401).json({ error: "wrong credentials" });
      else res.status(500).json({ error: "system error" });

      logger.error(error);
    });
  } catch (error) {
    if (error instanceof TypeError || error instanceof FormatError)
      res.status(400).json({ error: error.message });
    else if (
      error instanceof JsonWebTokenError ||
      error instanceof TokenExpiredError ||
      error instanceof NotBeforeError
    )
      res.status(401).json({ error: "token not valid" });
    else res.status(500).json({ error: "system error" });

    logger.error(error);
  }
}

module.exports = runWithErrorHandling;
