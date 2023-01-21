const {
  Types: { ObjectId },
} = require("mongoose");
const { validateString } = require("validators");

function verifyObjectIdString(objectIdString, explain = "id") {
  validateString(objectIdString, explain);
  if (!ObjectId.isValid(objectIdString))
    throw new FormatError(`${explain} is not valid`);
}

module.exports = verifyObjectIdString;
