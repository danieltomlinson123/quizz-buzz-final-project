// ================== Imports ================== //

import "./QuestionsList.css";

import "./list-panels.css";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Loggito from "../../utils/Loggito";

import Search from "../Search";

import {
  retrieveQuestions,
  searchQuestions,
  deleteQuestion,
} from "../../logic";

import withContext from "../../utils/withContext";

// ================== Component ================== //

function QuestionsList({
  onDeleteQuestion,
  onUpdateQuestion,
  handleEditQuestion,
  onReturn,
  gameBeingPlayed,
  handleSelectQuestionForGame,
  handleReturnInGame,
  handleNavigateTo,

  context: { handleFeedback },
}) {
  // ================== Consts ================== //

  const logger = new Loggito("List");

  const questionText = {}; // dictionary

  const handleSearch = (query) => setQuery(query);

  // ================== Hook consts ================== //

  const location = useLocation();

  const [questions, setQuestions] = useState();
  const [query, setQuery] = useState();

  // ================== useEffects ================== //

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    loadQuestions();
  }, [query]);

  useEffect(() => {
    logger.info("useEffect questionlist");

    if (questions) {
      questions.map((question) => textAreaAdjust(question.id));
      logger.info("question text area adjusted");
    }
  });

  // ================== Function: adjusts height of textarea ================== //

  const textAreaAdjust = (questionId) => {
    questionText[questionId].style.height = "inherit";
    questionText[questionId].style.height = `${
      25 + questionText[questionId].scrollHeight
    }px`;
  };

  // ================== Function: retrieves users questions and renders list ================== //

  const loadQuestions = () => {
    try {
      if (!query)
        return retrieveQuestions(sessionStorage.token, (error, questions) => {
          if (error) {
            handleFeedback({ message: error.message, level: "error" });

            logger.warn(error.message);

            return;
          }

          setQuestions(questions);

          logger.debug("setQuestions", questions);
        });
      else
        searchQuestions(sessionStorage.token, query, (error, questions) => {
          if (error) {
            handleFeedback({ message: error.message, level: "error" });

            logger.warn(error.message);

            return;
          }

          setQuestions(questions);

          logger.debug("setQuestions", questions);
        });
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }
  };

  // ================== Functions ================== //

  const handleDeleteQuestion = (questionId) => {
    try {
      deleteQuestion(sessionStorage.token, questionId, (error) => {
        if (error) {
          handleFeedback({ message: error.message, level: "error" });

          logger.warn(error.message);

          return;
        }

        loadQuestions();
      });
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }
  };

  const onEditQuestion = (questionId) => {
    handleEditQuestion(questionId, location);
  };

  const onSelectQuestionForGame = (questionId) => {
    handleSelectQuestionForGame(questionId);
  };

  const onAddClick = () => {
    handleNavigateTo("createQuestion");
  };

  const onReturnClick = () => {
    // if (gameBeingPlayed) onReturn("selectFolder");
    if (gameBeingPlayed) handleReturnInGame("selectFolder");
    if (!gameBeingPlayed) handleNavigateTo();
  };

  // ================== jsx ================== //

  return (
    <div className="grouped-elements questions-list-panel">
      <div className="grouped-elements questions-list-panel">
        {gameBeingPlayed === false && (
          <div className="grouped-elements">
            <span
              className="material-symbols-outlined button-icon"
              onClick={onReturnClick}
            >
              arrow_back_ios_new
            </span>
            <Search onQuery={handleSearch} />
            <ul className="list-panel list questions-list">
              {questions &&
                questions.map((question) => (
                  <li className="list__item" key={question.id}>
                    <div className="question-options-grouped">
                      <button
                        className="material-symbols-outlined question-option-button"
                        onClick={() => onEditQuestion(question.id)}
                      >
                        edit
                      </button>
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
                      <button
                        className="material-symbols-outlined question-option-button"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        close
                      </button>
                    </div>
                    <textarea
                      ref={(ref) => (questionText[question.id] = ref)}
                      className="list__item-text input-item"
                      onKeyUp={(event) => {
                        textAreaAdjust(question.id);
                        if (window.updateQuestionTimeoutId)
                          clearTimeout(window.updateQuestionTimeoutId);
                        window.updateQuestionTimeoutId = setTimeout(() => {
                          const questionUpdate = event.target.value;
                          onUpdateQuestion(question.id, questionUpdate);
                        }, 500);
                      }}
                      defaultValue={question.question}
                    ></textarea>
                  </li>
                ))}
            </ul>
          </div>
        )}
        {gameBeingPlayed === true && (
          <div className="grouped-elements">
            <span
              className="material-symbols-outlined button-icon"
              onClick={() => handleReturnInGame("selectFolder")}
            >
              arrow_back_ios_new
            </span>
            <Search onQuery={handleSearch} />
            <ul className="list-panel list questions-list">
              {questions &&
                questions.map((question) => (
                  <li className="list__item" key={question.id}>
                    <div className="question-options-grouped">
                      <div className="grouped-elements flex-row">
                        <span className="material-symbols-rounded question-option-button">
                          thumb_up
                        </span>
                        <p className="question-option-button">2</p>
                      </div>
                      <button
                        type="button"
                        className="select-question-button"
                        onClick={() => onSelectQuestionForGame(question.id)}
                      >
                        Select
                      </button>
                      <div className="grouped-elements flex-row">
                        <span className="material-symbols-rounded question-option-button">
                          thumb_down
                        </span>
                        <p className="question-option-button">3</p>
                      </div>
                    </div>
                    <textarea
                      ref={(ref) => (questionText[question.id] = ref)}
                      className="list__item-text input-item"
                      defaultValue={question.question}
                    ></textarea>
                  </li>
                ))}
            </ul>
          </div>
        )}
        <div className="footer flex-container">
          <button
            className="transparent-button footer-button"
            onClick={onAddClick}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default withContext(QuestionsList);
