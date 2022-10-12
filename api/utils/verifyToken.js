const { validateText } = require("validators");
const { verify } = require("jsonwebtoken");

function verifyToken(req) {
  const {
    headers: { authorization },
  } = req;

  validateText(authorization, "authorization");

  const token = authorization.substring(7);

  const payload = verify(token, "Dan: copié el código de Mónica!");

  const { sub: userId } = payload;

  return userId;
}

module.exports = verifyToken;
