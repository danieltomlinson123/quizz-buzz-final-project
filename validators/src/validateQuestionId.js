const { FormatError } = require("errors");

const Joi = require("joi");

function validateQuestionId(questionId, explain = "question ID") {
  const schema = Joi.string().trim().min(24).max(24).alphanum().required();

  const result = schema.validate(questionId);

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

module.exports = validateQuestionId;
