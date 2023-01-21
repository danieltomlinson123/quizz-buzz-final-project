const { FormatError } = require("errors");

const Joi = require("joi");

function validatePin(pin, explain = "pin") {
  // can't do number.trim
  const schema = Joi.number().min(1000).max(9999).required();

  const result = schema.validate(pin);

  if (result.error) {
    if (result.error.details[0].type === "number.base") {
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

module.exports = validatePin;
