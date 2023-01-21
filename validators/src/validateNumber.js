const Joi = require("joi");

function validateNumber(number, explain = "number") {
  const schema = Joi.number().required();

  //prevents the validation of numbers as strings - type checking
  if (typeof number !== "number")
    throw new TypeError(`${number} is not a number`);

  // validates number but also accepts a number as a string
  const result = schema.validate(number);

  if (result.error) {
    throw new Error(
      `error with ${explain}: ${result.error.details[0].message}`
    );
  }

  return `${explain} validated successfully`;
}

module.exports = validateNumber;
