const { FormatError } = require("errors");

const Joi = require("joi");

function validateFavoritesAction(action, explain = "action") {
  const schema = Joi.string().trim().valid("remove", "add").required();

  const result = schema.validate(action);

  if (result.error) {
    if (result.error.details[0].type === "string.base") {
      throw new TypeError(
        `error with ${explain}: ${result.error.details[0].message}`
      );
    } else {
      throw new FormatError(
        `error with ${explain}: ${result.error.details[0].message}`
      );
    }
  }

  return `${explain} validated successfully`;
}

module.exports = validateFavoritesAction;
