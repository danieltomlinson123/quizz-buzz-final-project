const { FormatError } = require("errors");

const Joi = require("joi");

function validateMCQAnswer(answerArray, explain = "answer array") {
  debugger;
  const schema = Joi.array().items(
    // TODO: fails on empty string as index 0 in array
    Joi.string().required(false),
    Joi.string().valid("correct", "incorrect").required()
  );

  const result = schema.validate(answerArray);

  if (result.error) {
    if (result.error.details[0].type === "array.base") {
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

module.exports = validateMCQAnswer;
