const { User } = require("../../../models");
const {
  Types: { ObjectId },
} = require("mongoose");
const { FormatError, AuthError } = require("errors");
const { validateQuestionId, validateFavoritesAction } = require("validators");
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
  validateQuestionId(questionId);
  validateFavoritesAction(action);
  // if (!ObjectId.isValid(userId)) throw new FormatError("User is not valid");
  //   validatePassword(oldPassword);
  //   validatePassword(password);
  //   validatePassword(confirmNewPassword);
  //   if (newPassword !== confirmNewPassword)
  //     throw new AuthError(
  //       "New password and confirm new password are not the same"
  //     );

  return (async () => {
    const foundUser = await User.findById(userId);

    // if (!foundUser || foundUser.password !== oldPassword)
    //   throw new AuthError(
    //     `User ${userId} does not exist or credentials are wrong`
    //   );

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
