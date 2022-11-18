// ================== Imports ================== //

// ================== Component ================== //

function LandingPanel({
  handleMyQuestionsClick,
  handleCommunityClick,
  handleFavouritesClick,
  handleCollectionsClick,
  handleNavigateTo,
}) {
  const onAddClick = () => {
    handleNavigateTo("createQuestion");
  };

  // ================== jsx ================== //
  return (
    <div className="grouped-elements">
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
        onClick={handleFavouritesClick}
      >
        favourites
      </button>
      <button
        className="button--primary home-page-button"
        onClick={handleCollectionsClick}
      >
        collections
      </button>
      <button className="button--primary home-page-button" onClick={onAddClick}>
        +
      </button>
    </div>
  );
}

export default LandingPanel;
