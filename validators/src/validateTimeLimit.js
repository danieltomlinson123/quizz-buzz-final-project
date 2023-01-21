const { FormatError } = require("errors");

const Joi = require("joi");

function validateTimeLimit(timeLimit, explain = "time limit") {
  // cannot do number.trim
  const schema = Joi.number().min(1000).max(80000).required();

  const result = schema.validate(timeLimit);

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

module.exports = validateTimeLimit;
