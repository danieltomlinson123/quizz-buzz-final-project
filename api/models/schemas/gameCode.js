const {
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const gameCode = new Schema({
  nameOfClass: {
    type: String,
    required: true,
  },

  pin: {
    type: String,
    required: true,
  },

  host: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  modifiedAt: {
    type: Date,
  },
});

module.exports = gameCode;
