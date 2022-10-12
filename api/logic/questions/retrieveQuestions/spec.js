const { connect, disconnect } = require("mongoose");
const { User, Question } = require("../../../models");
const retrieveQuestions = require(".");
const { DuplicityError, NotFoundError } = require("errors");

describe("retrieveQuestions", () => {
  beforeAll(() => connect("mongodb://127.0.0.1:27017/final-project"));

  beforeEach(() => [User.deleteMany(), Question.deleteMany()]);

  it("succeeds on existing user with notes", () => {
    const name = "Pepito Grillo";
    const email = "pepito@grillotest.com";
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

    const user = new User({ name, email, password });

    return Promise.all([
      user.save(),
      Question.create({
        user: user._id,
        question: "Is Java a type of OS 1?",
        suggestedAnswer: "No",
        timeLimit: 30000,
        questionType: "written",
        answerA: ["", "incorrect"],
        answerB: ["", "incorrect"],
        answerC: ["", "incorrect"],
        answerD: ["", "incorrect"],
        visibility: "public",
      }),

      Question.create({
        user: user._id,
        question: "Is Java a type of OS 2?",
        suggestedAnswer: "No",
        timeLimit: 30000,
        questionType: "written",
        answerA: ["", "incorrect"],
        answerB: ["", "incorrect"],
        answerC: ["", "incorrect"],
        answerD: ["", "incorrect"],
        visibility: "public",
      }),

      Question.create({
        user: user._id,
        question: "Is Java a type of OS 3?",
        suggestedAnswer: "No",
        timeLimit: 30000,
        questionType: "written",
        answerA: ["", "incorrect"],
        answerB: ["", "incorrect"],
        answerC: ["", "incorrect"],
        answerD: ["", "incorrect"],
        visibility: "public",
      }),
    ]).then(([user, question1, question2, question3]) => {
      // without {} this return would be implicit and not necessary
      return retrieveQuestions(user.id).then((questions) => {
        expect(questions).toHaveLength(3);

        const _question1 = questions.find(
          (question) => question.question === "Is Java a type of OS 1?"
        );
        expect(_question1).toBeDefined();
        // expect(_question1.user).toEqual(user.id);
        expect(_question1.question).toEqual(question1.question);
        expect(_question1.timeLimit).toEqual(question1.timeLimit);
        expect(_question1.visibility).toEqual(question1.visibility);
        expect(_question1.questionType).toEqual(question1.questionType);
        expect(_question1.suggestedAnswer).toEqual(question1.suggestedAnswer);
        expect(_question1.answerA).toEqual(question1.answerA);
        expect(_question1.answerB).toEqual(question1.answerB);
        expect(_question1.answerC).toEqual(question1.answerC);
        expect(_question1.answerD).toEqual(question1.answerD);
        expect(_question1.createdAt).toEqual(question1.createdAt);
        expect(_question1.modifiedAt).toBeUndefined();

        const _question2 = questions.find(
          (question) => question.question === "Is Java a type of OS 2?"
        );

        expect(_question2).toBeDefined();
        // expect(_question2.user).toEqual(user.id);
        expect(_question2.question).toEqual(question2.question);
        expect(_question2.timeLimit).toEqual(question2.timeLimit);
        expect(_question2.visibility).toEqual(question2.visibility);
        expect(_question2.questionType).toEqual(question2.questionType);
        expect(_question2.suggestedAnswer).toEqual(question2.suggestedAnswer);
        expect(_question2.answerA).toEqual(question2.answerA);
        expect(_question2.answerB).toEqual(question2.answerB);
        expect(_question2.answerC).toEqual(question2.answerC);
        expect(_question2.answerD).toEqual(question2.answerD);
        expect(_question2.createdAt).toEqual(question2.createdAt);
        expect(_question2.modifiedAt).toBeUndefined();

        const _question3 = questions.find(
          (question) => question.question === "Is Java a type of OS 3?"
        );
        expect(_question3).toBeDefined();
        // expect(_question3.user).toEqual(user.id);
        expect(_question3.question).toEqual(question3.question);
        expect(_question3.timeLimit).toEqual(question3.timeLimit);
        expect(_question3.visibility).toEqual(question3.visibility);
        expect(_question3.questionType).toEqual(question3.questionType);
        expect(_question3.suggestedAnswer).toEqual(question3.suggestedAnswer);
        expect(_question3.answerA).toEqual(question3.answerA);
        expect(_question3.answerB).toEqual(question3.answerB);
        expect(_question3.answerC).toEqual(question3.answerC);
        expect(_question3.answerD).toEqual(question3.answerD);
        expect(_question3.createdAt).toEqual(question3.createdAt);
        expect(_question3.modifiedAt).toBeUndefined();
      });
    });
  });
  afterAll(() => disconnect());
});
