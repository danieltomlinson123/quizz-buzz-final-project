const {
  connect,
  disconnect,
  Types: { ObjectId },
} = require("mongoose");
const { User, Question } = require("../../../models");
const { NotFoundError } = require("errors");
const createQuestion = require(".");

describe("createQuestion", () => {
  beforeAll(() => connect("mongodb://127.0.0.1:27017/final-project"));

  beforeEach(() => Promise.all([User.deleteMany(), Question.deleteMany()]));

  it("succeeds on correct data", () => {
    //happy path
    const name = "Pepito Grillo";
    const email = "pepito@grilloquestion.com";
    const password = "123123123";

    const question = "Is Java a type of OS?";
    const suggestedAnswer = "No";
    const timeLimit = 30000;
    const questionType = "written";
    const answerA = ["", "incorrect"];
    const answerB = ["", "incorrect"];
    const answerC = ["", "incorrect"];
    const answerD = ["", "incorrect"];
    const visibility = "public";

    return User.create({ name, email, password }).then((user) => {
      createQuestion(
        user._id,
        question,
        timeLimit,
        visibility,
        questionType,
        suggestedAnswer,
        answerA,
        answerB,
        answerC,
        answerD
      )
        .then((res) => {
          expect(res).toBeUndefined();

          return Question.find();
        })
        .then((questions) => {
          expect(questions).toHaveLength(1);

          const [question] = questions;

          expect(question.question).toEqual("Is Java a type of OS?");
          expect(typeof question.question).toBe("string");
          expect(question.suggestedAnswer).toEqual("No");
          expect(typeof question.suggestedAnswer).toBe("string");
          expect(question.timeLimit).toEqual(30000);
          expect(typeof question.timeLimit).toBe("number");
          expect(question.questionType).toEqual("written");
          expect(typeof question.questionType).toBe("string");
          expect(typeof question.answerA).toBe("object");
          expect(typeof question.answerB).toBe("object");
          expect(typeof question.answerC).toBe("object");
          expect(typeof question.answerD).toBe("object");
          expect(question.answerA[0]).toBe("");
          expect(question.answerB[0]).toBe("");
          expect(question.answerC[0]).toBe("");
          expect(question.answerD[0]).toBe("");
          expect(question.answerA[1]).toBe("incorrect");
          expect(question.answerB[1]).toBe("incorrect");
          expect(question.answerC[1]).toBe("incorrect");
          expect(question.answerD[1]).toBe("incorrect");
          expect(question.createdAt).toBeInstanceOf(Date);
          expect(question.modifiedAt).toBeUndefined();
        });
    });
  });

  it("fails on non-existing user", () => {
    const userId = new ObjectId().toString();

    const question = "Is Java a type of OS?";
    const suggestedAnswer = "No";
    const timeLimit = 30000;
    const questionType = "written";
    const answerA = ["", "incorrect"];
    const answerB = ["", "incorrect"];
    const answerC = ["", "incorrect"];
    const answerD = ["", "incorrect"];
    const visibility = "public";

    return createQuestion(
      userId,
      question,
      suggestedAnswer,
      timeLimit,
      visibility,
      questionType,
      answerA,
      answerB,
      answerC,
      answerD
    ).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toEqual(`user with id ${userId} not found`);
    });
  });

  afterAll(() => disconnect());
});
