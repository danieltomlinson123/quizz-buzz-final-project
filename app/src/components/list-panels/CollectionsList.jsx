// ================== Imports ================== //

import "./CollectionsList.css";

import "./list-panels.css";

// ================== Component ================== //

function CollectionsList({ gameBeingPlayed, onReturn, handleNavigateTo }) {
  const onReturnClick = () => {
    if (gameBeingPlayed) onReturn("selectFolder");
    if (!gameBeingPlayed) onReturn();
  };

  return (
    <span
      className="material-symbols-outlined button-icon"
      onClick={onReturnClick}
    >
      arrow_back_ios_new
    </span>
  );
}

export default CollectionsList;
