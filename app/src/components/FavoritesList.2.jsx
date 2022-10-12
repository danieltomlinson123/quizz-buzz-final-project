// ================== Imports ================== //

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Loggito from "../utils/Loggito";

import Search from "./Search";

// ================== Component ================== //

function FavoritesList({
  questionsPublic,
  // onDeleteQuestion,
  // onUpdateQuestion
  handleEditQuestion,
  handleFavoritesClick,
  onReturn,
  onSearchPublic,
  gameBeingPlayed,
  handleReturnInGame,
}) {
  // ================== consts ================== //

  const logger = new Loggito("List");

  const questionText = {}; // dictionary

  // ================== Hook consts ================== //

  const location = useLocation();

  const [favorites, setFavorites] = useState([]);

  // ================== useEffects ================== //

  useEffect(() => {
    const favoritesTemp = questionsPublic.filter(
      (question) => question.isFav === true
    );
    setFavorites(favoritesTemp);
  }, [questionsPublic]);

  useEffect(() => {
    logger.info("useEffect communitylist");

    if (questionsPublic) {
      favorites.map((question) => textAreaAdjust(question.id));
      logger.info("question text area adjusted");
    }
  });

  // ================== Function: adjusts height of text area ================== //

  const textAreaAdjust = (questionId) => {
    questionText[questionId].style.height = "inherit";
    questionText[questionId].style.height = `${
      25 + questionText[questionId].scrollHeight
    }px`;
  };

  // ================== Functions ================== //

  const onEditQuestion = (questionId) => {
    handleEditQuestion(questionId, location);
  };

  const onFavoritesClick = (questionId, questionIsFav) => {
    let action = null;
    if (questionIsFav === true) action = "remove";
    else if (questionIsFav === false) action = "add";
    handleFavoritesClick(questionId, action, location);
  };

  // ================== jsx ================== //

  return (
    <div className="grouped-elements questions-list-panel">
      <span
        className="material-symbols-outlined button-icon"
        onClick={onReturn}
      >
        arrow_back_ios_new
      </span>

      <div className="grouped-elements questions-list-panel">
        <Search onQuery={onSearchPublic} />
        <ul className="list-panel list questions-list">
          {favorites &&
            favorites.map((question) => (
              <li className="list__item" key={question.id}>
                <div className="question-options-grouped">
                  <button
                    className="material-symbols-outlined question-option-button"
                    onClick={() => onEditQuestion(question.id)}
                  >
                    edit
                  </button>
                  {question.isFav && (
                    <span
                      className="material-symbols-rounded question-option-button question-option-button-stars--true"
                      onClick={() =>
                        onFavoritesClick(question.id, question.isFav)
                      }
                    >
                      stars
                    </span>
                  )}
                  {!question.isFav && (
                    <span
                      className="material-symbols-rounded question-option-button question-option-button-stars--false"
                      onClick={() =>
                        onFavoritesClick(question.id, question.isFav)
                      }
                    >
                      stars
                    </span>
                  )}

                  <div className="grouped-elements flex-row">
                    <span className="material-symbols-rounded question-option-button">
                      thumb_up
                    </span>
                    <p className="question-option-button">2</p>
                  </div>
                  <div className="grouped-elements flex-row">
                    <span className="material-symbols-rounded question-option-button">
                      thumb_down
                    </span>
                    <p className="question-option-button">3</p>
                  </div>

                  {/* <button
                    className="material-symbols-outlined question-option-button"
                    onClick={() => onDeleteQuestion(question.id)}
                  >
                    close
                  </button> */}
                </div>
                {/* <textarea
                  ref={(ref) => (questionText[question.id] = ref)}
                  className="list__item-text"
                  onKeyUp={(event) => {
                    textAreaAdjust(question.id);
                    if (window.updateQuestionTimeoutId)
                      clearTimeout(window.updateQuestionTimeoutId);
                    window.updateQuestionTimeoutId = setTimeout(() => {
                      const question = event.target.value;
                      onUpdateQuestion(question.id, question);
                    }, 500);
                  }}
                  defaultValue={question.question}
                ></textarea> */}
                <p
                  ref={(ref) => (questionText[question.id] = ref)}
                  className="list__item-text list__item-text-readonly"
                >
                  {question.question}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default FavoritesList;
