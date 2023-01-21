const Joi = require("joi");

function validatePassword(password, explain = "password") {
  const schema = Joi.string()
    .trim()
    .min(8)
    .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
    .required();

  const result = schema.validate(password);

  if (result.error) {
    if (result.error.details[0].type === "string.base") {
      throw new TypeError(
        `error with ${explain}: ${result.error.details[0].message}`
      );
    } else if (
      result.error.details[0].message ===
      `"value" length must be at least 8 characters long`
    )
      throw new Error(
        `error with ${explain}: ${result.error.details[0].message}`
      );
    else
      throw new Error(
        `error with ${explain}: password must contain at least one uppercase letter, one lowercase letter, a number and a symbol}`
      );
  }

  return `${explain} validated successfully`;
}

module.exports = validatePassword;
