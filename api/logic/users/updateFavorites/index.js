const { User } = require("../../../models");
const { AuthError } = require("errors");
const { validateFavoritesAction } = require("validators");
const { verifyObjectIdString } = require("../../../utils");

/**
 * Updates the favorites array for a user.
 *
 * @param {string} userId The used id.
 * @param {string} userId The question id.
 * @param {string} action The action required: "add" or "remove".
 *
 * @returns {Promise}
 *
 * @throws {TypeError} If any of the arguments do not match the expected type.
 * @throws {FormatError} If any of the arguments do not match the expected format.
 *
 * @throws {NotFoundError} If the user is not found.
 * @throws {SystemError} If an error happens in db.
 */

function updateFavorites(userId, questionId, action) {
  verifyObjectIdString(userId, "user id");
  verifyObjectIdString(questionId, "question id");
  validateFavoritesAction(action);

  return (async () => {
    // TODO: change this to promises and add a catch for the async parts
    const foundUser = await User.findById(userId);

    if (!foundUser)
      // AuthError or NotFoundError? - In other logics it's not found error
      throw new AuthError(
        `User ${userId} does not exist or credentials are wrong`
      );

    if (action === "add")
      foundUser.favorites[foundUser.favorites.length] = questionId;

    if (action === "remove") {
      const newFavorites = foundUser.favorites.filter(
        (favorite) => favorite !== questionId
      );
      foundUser.favorites = newFavorites;
    }

    await foundUser.save();

    return;
  })();
}

module.exports = updateFavorites;
