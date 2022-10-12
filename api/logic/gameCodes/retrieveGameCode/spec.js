const { connect, disconnect } = require("mongoose");
const { User, GameCode } = require("../../../models");
const retrieveGameCode = require(".");
const { DuplicityError, NotFoundError } = require("errors");

describe("retrieveGameCode", () => {
  beforeAll(() => connect("mongodb://127.0.0.1:27017/final-project"));

  beforeEach(() => [User.deleteMany(), GameCode.deleteMany()]);

  it("succeeds on existing user with gameCode", () => {
    const name = "Pepito Grillo";
    const email = "pepito@grillocode.com";
    const password = "123123123";

    const pin1 = "1234";

    const user = new User({ name, email, password });

    return Promise.all([
      user.save(),
      GameCode.create({
        pin: pin1,
        nameOfClass: "Neoland",
        host: user._id,
      }),
    ])
      .then(() => {
        return retrieveGameCode(pin1);
      })
      .then((gameCode) => {
        expect(typeof gameCode).toBe("object");
        // expect(typeof gameCode.host).toBe("string");
        expect(typeof gameCode[0].pin).toBe("string");
        expect(typeof gameCode[0].nameOfClass).toBe("string");
        expect(gameCode[0].pin).toEqual("1234");
        expect(gameCode[0].nameOfClass).toEqual("Neoland");
        // expect(gameCode[0].host).toEqual(user._id.toString);
      });
  });
  afterAll(() => disconnect());
});
