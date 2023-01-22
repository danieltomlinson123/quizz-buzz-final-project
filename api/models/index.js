const { model } = require("mongoose");
const { user, note, gameCode, question } = require("./schemas");

module.exports = {
  User: model("User", user),
  GameCode: model("GameCode", gameCode),
  Question: model("Question", question),
};
