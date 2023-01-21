// ================== Imports ================== //

import "../game-screens.css";

// ================== Component ================== //

function Teacher3SelectFolderPanel({
  handleMyQuestionsClick,
  handleCommunityClick,
  handleFavoritesClick,
  handleCollectionsClick,
  handleReturnInGame,
}) {
  // ================== jsx ================== //

  return (
    <div className="grouped-elements">
      <span
        className="material-symbols-outlined button-icon"
        onClick={() => handleReturnInGame("createQuestion")}
      >
        arrow_back_ios_new
      </span>
      <button
        className="button--primary home-page-button"
        onClick={handleMyQuestionsClick}
      >
        my questions
      </button>
      <button
        className="button--primary home-page-button"
        onClick={handleCommunityClick}
      >
        community
      </button>
      <button
        className="button--primary home-page-button"
        onClick={handleFavoritesClick}
      >
        favourites
      </button>
      <button
        className="button--primary home-page-button"
        onClick={handleCollectionsClick}
      >
        collections
      </button>
    </div>
  );
}

export default Teacher3SelectFolderPanel;
