const {
  connect,
  disconnect,
  Types: { ObjectId },
} = require("mongoose");
const { User } = require("../../../models");
const { NotFoundError } = require("errors");
const retrieveUser = require(".");

describe("retrieveUser", () => {
  beforeAll(() => connect("mongodb://127.0.0.1:27017/final-project"));

  beforeEach(() => User.deleteMany());

  it("suceeds on existing user", () => {
    // happy path
    const name = "Pepito Grillo";
    const email = "pepito@grillo.com";
    const password = "123123123";

    return User.create({ name, email, password }).then((user) =>
      retrieveUser(user.id).then((user) => {
        expect(user).toBeDefined();
        expect(user.name).toEqual(name);
        expect(user.email).toEqual(email);

        expect(user.password).toBeUndefined();
      })
    );
  });

  it("fails on non-existing user", () => {
    //unhappy path
    const userId = new ObjectId().toString();

    return retrieveUser(userId).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toEqual(`user with id ${userId} not found`);
    });
  });
});
