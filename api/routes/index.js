const express = require("express");
const { Router, json } = express;
const jsonBodyParser = json();
const {
  authenticateUserHandler,
  registerUserHandler,
  retrieveUserHandler,
  updateFavoritesHandler,
  updatePasswordHandler,
} = require("./user");
const {
  createQuestionHandler,
  deleteQuestionHandler,
  retrieveQuestionsHandler,
  retrieveQuestionsPublicHandler,
  retrieveQuestionForEditHandler,
  searchQuestionsHandler,
  searchQuestionsPublicHandler,
  updateQuestionEditHandler,
  updateQuestionTextHandler,
} = require("./questions");
const {
  createGameCodeHandler,
  retrieveGameCodeHandler,
} = require("./gameCode");

const usersRouter = Router();

usersRouter.post("/users", jsonBodyParser, registerUserHandler);

usersRouter.post("/users/auth", jsonBodyParser, authenticateUserHandler);

usersRouter.get("/users", retrieveUserHandler);

usersRouter.patch("/users/details", jsonBodyParser, updatePasswordHandler);

usersRouter.patch("/users/favorites", jsonBodyParser, updateFavoritesHandler);

const questionsRouter = Router();

questionsRouter.post("/questions", jsonBodyParser, createQuestionHandler);

questionsRouter.get("/questions", retrieveQuestionsHandler);

questionsRouter.get("/questions/public", retrieveQuestionsPublicHandler);

questionsRouter.patch(
  "/questions/:questionId/text",
  jsonBodyParser,
  updateQuestionTextHandler
);

questionsRouter.patch(
  "/questions/:questionId",
  jsonBodyParser,
  updateQuestionEditHandler
);

questionsRouter.get("/questions/search", searchQuestionsHandler);

questionsRouter.get("/questions/public/search", searchQuestionsPublicHandler);

questionsRouter.delete("/questions/:questionId", deleteQuestionHandler);

questionsRouter.get("/questions/:questionId", retrieveQuestionForEditHandler);

const gameCodesRouter = Router();

gameCodesRouter.post("/gameCodes", jsonBodyParser, createGameCodeHandler);

gameCodesRouter.post("/gameCodes/pin", jsonBodyParser, retrieveGameCodeHandler);

module.exports = {
  usersRouter,
  questionsRouter,
  gameCodesRouter,
  questionsRouter,
};
