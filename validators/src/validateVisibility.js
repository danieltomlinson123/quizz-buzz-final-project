const { FormatError } = require("errors");

const Joi = require("joi");

function validateVisibility(visibility, explain = "visibility") {
  // const schema = Joi.string().trim().min(6).max(7).required();
  const schema = Joi.string().trim().valid("public", "private").required();

  const result = schema.validate(visibility);

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

module.exports = validateVisibility;
