const { connect, disconnect } = require("mongoose");
const { User } = require("../../../models");
const registerUser = require(".");
const { DuplicityError } = require("errors");

describe("registerUser", () => {
  beforeAll(() => connect("mongodb://127.0.0.1:27017/final-project"));

  beforeEach(() => {
    return User.deleteMany();
  });

  it("succeeds on new user", () => {
    // happy path
    const name = "Pepito Grillo";
    const email = "pepito@grillo.com";
    const password = "123123123";

    return registerUser(name, email, password)
      .then((res) => {
        expect(res).toBeUndefined();

        return User.find({ email });
      })
      .then((users) => {
        expect(users).toHaveLength(1);

        const [user] = users;

        expect(user.name).toEqual(name);
        expect(user.email).toEqual(email);
        expect(user.password).toEqual(password);
      });
  });

  it("it fails on existing user", () => {
    // unhappy path
    const name = "Pepito Grillo";
    const email = "pepito@grillo.com";
    const password = "123123123";
    // TODO create a user manually (using fs, json tools)

    return User.create({ name, email, password })
      .then(() => {
        return registerUser(name, email, password);
      })
      .catch((error) => {
        console.log(error.message);
        expect(error).toBeInstanceOf(DuplicityError);
        expect(error.message).toEqual("user already exists");
      });
  });

  afterAll(() => {
    return disconnect();
  });
});
