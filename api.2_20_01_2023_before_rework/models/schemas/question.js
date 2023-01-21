const {
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const question = new Schema({
  user: {
    type: ObjectId,
    required: true,
    ref: "User",
  },

  question: {
    type: String,
    default: "",
    required: true,
  },

  suggestedAnswer: {
    type: String,
    default: "",
  },

  timeLimit: {
    type: Number,
    default: 30000,
    required: true,
  },

  questionType: {
    type: String,
    enum: ["written", "MCQ"],
    required: true,
  },

  answerA: {
    type: Array,
    default: ["", "incorrect"],
  },

  answerB: {
    type: Array,
    default: ["", "incorrect"],
  },

  answerC: {
    type: Array,
    default: ["", "incorrect"],
  },

  answerD: {
    type: Array,
    default: ["", "incorrect"],
  },

  visibility: {
    type: String,
    enum: ["private", "public"],
    default: "public",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  modifiedAt: {
    type: Date,
  },
});

module.exports = question;
