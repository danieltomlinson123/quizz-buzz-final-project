const {
  connect,
  disconnect,
  Types: { ObjectId },
} = require("mongoose");
const { User, GameCode } = require("../../../models");
const { NotFoundError } = require("errors");
const createGameCode = require(".");

describe("createGamecode", () => {
  beforeAll(() => connect("mongodb://127.0.0.1:27017/final-project"));

  beforeEach(() => Promise.all([User.deleteMany(), GameCode.deleteMany()]));

  it("succeeds on correct data", () => {
    //happy path
    const name = "Pepito Grillo";
    const email = "pepito@grillo.com";
    const password = "123123123";

    const pin = "1234";
    const nameOfClass = "Neoland";

    return User.create({ name, email, password }).then((user) =>
      createGameCode(user.id, nameOfClass, pin, user.id)
        .then((res) => {
          expect(res).toBeUndefined();

          return GameCode.find();
        })
        .then((gameCodes) => {
          expect(gameCodes).toHaveLength(1);

          const [gameCode] = gameCodes;

          // expect(gameCode.host.toString()).toEqual(user.id);
          expect(gameCode.pin).toEqual(pin);
          expect(gameCode.nameOfClass).toEqual("Neoland");
          expect(typeof gameCode.pin).toBe("string");
          expect(typeof gameCode.host).toBe("string");
          expect(gameCode.createdAt).toBeInstanceOf(Date);
          expect(gameCode.modifiedAt).toBeUndefined();
        })
    );
  });

  it("fails on non-existing user", () => {
    const userId = new ObjectId().toString();

    const pin = "1234";
    const nameOfClass = "Neoland";
    const host = userId;

    return createGameCode(userId, nameOfClass, pin, host).catch((error) => {
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.message).toEqual(`user with id ${userId} not found`);
    });
    /* .then expect(createGameCode(userId)).rejects.toThrowError(
      NotFoundError,
      `user with id ${userId} not found`
    ); */
  });

  afterAll(() => disconnect());
});
