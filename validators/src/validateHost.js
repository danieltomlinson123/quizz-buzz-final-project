const { FormatError } = require("errors");

const Joi = require("joi");

function validateHost(host, explain = "host") {
  const schema = Joi.string().trim().min(20).max(20).alphanum().required();

  const result = schema.validate(host);

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

module.exports = validateHost;
