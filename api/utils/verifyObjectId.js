const {
  Types: { ObjectId },
} = require("mongoose");

function verifyObjectId(objectId, explain = "Object Id") {
  if (!ObjectId.isValid(objectId))
    throw new FormatError(`${explain} is not valid`);
}

module.exports = verifyObjectId;
