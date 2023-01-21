// validate String used in verifyObjectIdString in utils

const Joi = require("joi");

function validateString(string, explain = "string") {
  const schema = Joi.string().trim().min(1).required();

  const result = schema.validate(string);

  if (result.error) {
    if (result.error.details[0].type === `string.base`) {
      throw new TypeError(
        `error with ${explain}: ${result.error.details[0].message}`
      );
    } else {
      throw new Error(
        `error with ${explain}: ${result.error.details[0].message}`
      );
    }
  }

  return `${explain} validated successfully`;
}

module.exports = validateString;
