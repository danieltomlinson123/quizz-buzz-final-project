const {
  Types: { ObjectId },
} = require("mongoose");

const { FormatError } = require("errors");

function verifyObjectId(objectId, explain = "Object Id") {
  if (!ObjectId.isValid(objectId))
    throw new FormatError(`${explain} is not valid`);
}

module.exports = verifyObjectId;
