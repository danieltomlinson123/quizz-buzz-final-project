const {
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const note = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: "User",
  },

  text: {
    type: String,
    default: "",
  },

  visibility: {
    type: String,
    enum: ["private", "public"],
    default: "private",
  },

  createAt: {
    type: Date,
    default: Date.now,
  },

  modifiedAt: {
    type: Date,
  },
});

module.exports = note;
