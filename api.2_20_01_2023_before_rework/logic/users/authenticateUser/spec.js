const { connect, disconnect } = require("mongoose");
const { User } = require("../../../models");
const { NotFoundError, AuthError } = require("errors");
const authenticateUser = require(".");

describe("authenticateUser", () => {
  beforeAll(() => connect("mongodb://127.0.0.1:27017/final-project"));

  beforeEach(() => User.deleteMany());

  it("succeeds on existing user", () => {
    // happy path
    const name = "Pepito Grillo";
    const email = "pepito@grillo.com";
    const password = "123123123";

    return User.create({ name, email, password }).then((user) =>
      authenticateUser(email, password).then((userId) =>
        expect(userId).toEqual(user.id)
      )
    );
  });

  // unhappy path
  it("fails on non-exisiting user", () => {
    const email = "pepito@grillo.com";
    const password = "123123123";

    return authenticateUser(email, password).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toEqual(`user with email ${email} not found`);
    });
  });

  it("fails on existing user but wrong password", () => {
    const name = "Pepito Grillo";
    const email = "pepito@grillo.com";
    const password = "123123123";

    return User.create({ name, email, password }).then((user) =>
      authenticateUser(email, password + "_wrong").catch((error) => {
        expect(error).toBeInstanceOf(AuthError);
        expect(error.message).toEqual("wrong password");
      })
    );
  });
  afterAll(() => disconnect());
});
