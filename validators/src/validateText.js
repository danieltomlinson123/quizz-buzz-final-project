const { FormatError } = require("errors");

const Joi = require("joi");

function validateText(text, explain = "text") {
  const schema = Joi.string().trim().min(1).required();

  const result = schema.validate(text);

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

module.exports = validateText;
