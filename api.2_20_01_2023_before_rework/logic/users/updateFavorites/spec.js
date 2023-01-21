const {
  connect,
  disconnect,
  Types: { ObjectId },
} = require("mongoose");
const { User, Question } = require("../../../models");
const { NotFoundError } = require("errors");
const updateFavorites = require(".");

describe("updateFavorites", () => {
  beforeAll(() => connect("mongodb://127.0.0.1:27017/final-project"));

  beforeEach(() => Promise.all([User.deleteMany(), Question.deleteMany()]));

  it("succeeds on correct data", () => {
    // happy path

    const name = "Pepito Grillo";
    const email = "pepito@grillofavorites.com";
    const password = "123123123";

    const text = "hello mundo";

    return User.create({ name, email, password }).then((user) => {
      Question.create({
        user: user._id,
        question: "Is Java a type of OS 4?",
        suggestedAnswer: "No",
        timeLimit: 30000,
        questionType: "written",
        answerA: ["", "incorrect"],
        answerB: ["", "incorrect"],
        answerC: ["", "incorrect"],
        answerD: ["", "incorrect"],
        visibility: "public",
      }).then((question) => {
        updateFavorites(user._id, question.id, "add").then((userUpdated) => {
          expect(userUpdated.favorites).toEqual([question.id]);
        });
      });
    });
  });

  /* it("fails on note that does not belong to the user", () => {
    // unhappy path
    const name1 = "Pepito Grillo";
    const email1 = "pepito@grillo.com";
    const password1 = "123123123";

    const name2 = "Wendy Bread";
    const email2 = "wendybread@gmail.com";
    const password2 = "123123123";

    return Promis.all([
      User.create({ name: name1, email: email1, password: password1 }),
      User.create({ name: name2, email: email2, password: password2 }),
    ]).then((users) => {
      Note.create({ user: users[0].id }).then((note) => {
        updateNote({
          user: users[1].id,
          id: note.id,
          text: "new Text",
          visibility: "public",
        })
          .then(() => {
            throw new Error("it should not reach this point");
          })
          .catch((error) => {
            expect(error).toBeInstanceOf(AuthError);
            expect(error.message).toequal(
              `note with id ${note.id} does not belong to user with id ${users[1].id}`
            );
          });
      });
    });
  }); */

  afterAll(() => disconnect());
});
