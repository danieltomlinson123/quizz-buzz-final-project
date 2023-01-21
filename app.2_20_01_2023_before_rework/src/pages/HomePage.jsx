// ================== Imports ================== //

import "./HomePage.css";

import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Loggito from "../utils/Loggito";
import withContext from "../utils/withContext";

import {
  Settings,
  QuestionsList,
  CommunityList,
  FavoritesList,
  CollectionsList,
  Header,
  LandingPanel,
  EditQuestionPanel,
  CreateQuestionPanel,
} from "../components";

import { QuizMaster } from "../game-screens/main-screens";

import {
  searchQuestions,
  searchQuestionsPublic,
  retrieveUser,
  retrieveQuestions,
  retrieveQuestionsPublic,
  updateQuestionText,
  deleteQuestion,
  updateFavorites,
} from "../logic";

// ================== Page ================== //

function HomePage({
  context: {
    handleLogoutClick,
    handleFeedback,
    // handleQuickPlayClick
  },
}) {
  // ================== consts ================== //

  const logger = new Loggito("HomePage");

  // ================== Hook consts ================== //

  const [name, setName] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [questionsPublic, setQuestionsPublic] = useState(null);
  const [query, setQuery] = useState(null);
  const [questionBeingEditedId, setQuestionBeingEditedId] = useState(null);
  const [editedLocation, setEditedLocation] = useState(null);
  const [gameBeingPlayed, setGameBeingPlayed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ================== useEffects ================== //

  useEffect(() => {
    console.log(location);
  }, [location]);

  useEffect(() => {});

  useEffect(() => {
    logger.info('"componentDidMount"');

    try {
      retrieveUser(sessionStorage.token, (error, user) => {
        if (error) {
          handleFeedback({ message: error.message, level: "error" });

          logger.warn(error.message);

          // onLogoutClick()

          return;
        }

        setName(user.name);
        // setFavorites(user.favorites);

        logger.debug("setName", user.name);
      });
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }

    //Maybe better to move this to happen when each page is loaded, instead of loading all on initial load.
    loadQuestions();
    loadQuestionsPublic();
  }, []);

  useEffect(() => {
    logger.info("on query changed");
    if (location.pathname === "/questionsList") loadQuestions();
    else if (location.pathname === "/communityList") loadQuestionsPublic();
  }, [query]);

  // ================== Function to retrieve and render question lists belonging to the user ================== //

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

  // ================== Function to retrieve and render public question lists ================== //

  const loadQuestionsPublic = () => {
    try {
      if (!query)
        retrieveQuestionsPublic(sessionStorage.token, (error, questions) => {
          if (error) {
            handleFeedback({ message: error.message, level: "error" });

            logger.warn(error.message);

            return;
          }

          setQuestionsPublic(questions);

          logger.debug("setQuestionsPublic", questions);
        });
      else
        searchQuestionsPublic(
          sessionStorage.token,
          query,
          (error, questions) => {
            if (error) {
              handleFeedback({ message: error.message, level: "error" });

              logger.warn(error.message);

              return;
            }
            setQuestionsPublic(questions);

            logger.debug("setQuestions", questions);
          }
        );
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }
  };

  // ================== Function to save the updated question text ================== //

  const handleUpdateQuestion = (questionId, text) => {
    try {
      debugger;
      updateQuestionText(sessionStorage.token, questionId, text, (error) => {
        if (error) {
          handleFeedback({ message: error.message, level: "error" });

          logger.warn(error.message);

          return;
        }
      });
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }
  };

  // ================== Function to delete a question belonging to the user ================== //

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

  // ================== Function to handle updating the user's favorites ================== //

  const handleUpdateFavorites = (questionId, action, location) => {
    try {
      updateFavorites(sessionStorage.token, questionId, action, (error) => {
        if (error) {
          handleFeedback({ message: error.message, level: "error" });

          logger.warn(error.message);

          return;
        }

        if (location.pathname === "/questionsList") loadQuestions();
        else if (location.pathname === "/communityList") loadQuestionsPublic();
        else if (location.pathname === "/favouritesList") loadQuestionsPublic();
      });
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }
  };

  // ================== Functions ================== //

  /*   const handleAddClick = () => {
    try {
      createQuestion(sessionStorage.token, (error) => {
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
  }; */

  const handleAddClick = () => {
    navigate("createQuestion");
  };

  const handleFavoritesClick = (questionId, action, location) => {
    handleUpdateFavorites(questionId, action, location);
  };

  // ================== Function to navigate between pages ================== //

  const handleReturn = () => {
    navigate("./");
    // loadQuestions();
  };

  const handleSettingsClick = () => {
    navigate("settings");

    logger.debug("navigate to settings");
  };

  const handleHomeClick = () => {
    // setSelectQuestionForGame(undefined);
    navigate("/");

    logger.debug("navigate to home");
  };

  const handleNavigateTo = (location) => {
    navigate(`/`);
    navigate(location);
  };

  const onQuickPlayClick = () => {
    navigate("quickPlayInHome");
  };

  // ================== Functios to navigate to the main panels in HomePage ================== //

  const handleMyQuestionsClick = () => {
    // loadQuestions();
    navigate("questionsList");
  };

  const handleCommunityClick = () => {
    // loadQuestionsPublic();
    navigate("communityList");
  };

  const handleFavouritesClick = () => {
    navigate("favouritesList");
  };

  const handleCollectionsClick = () => {
    navigate("collectionsList");
  };

  const handleEditQuestion = (questionId, location) => {
    setQuestionBeingEditedId(questionId);
    setEditedLocation(location);
    navigate("editQuestion");
  };

  // ================== Function to handle updating the user's password ================== //

  const handleUpdatePassword = () => {
    handleLogoutClick();
  };

  const handleLeaveClass = () => {
    // setSelectQuestionForGame(undefined);
    handleGameBeingPlayed("leave");
    navigate("/");
    // navigate("settings");
  };

  // ================== Functions to handle queries for the question lists ================== //

  const handleSearch = (query) => setQuery(query);

  const handleSearchPublic = (query) => setQuery(query);

  // ================== Functions to retrieve and render public question lists ================== //

  const handleGameBeingPlayed = (action) => {
    if (action === "leave") setGameBeingPlayed(false);
    if (action === "join") setGameBeingPlayed(true);
  };

  logger.info("render");

  // ================== jsx ================== //

  return name ? (
    <div className="home-page page background flex-container--homepage">
      {location.pathname !== "/quickPlayInHome" && (
        <Header
          name={name}
          onLogoutClick={handleLogoutClick}
          onSettingsClick={handleSettingsClick}
          onHomeClick={handleHomeClick}
          onFeedback={handleFeedback}
        />
      )}
      <main className="main flex-container main-page-content">
        {location.pathname === "/" && (
          <button
            className="button--primary home-page-start-button"
            onClick={onQuickPlayClick}
          >
            play
          </button>
        )}
        <Routes>
          <Route
            path="quickPlayInHome"
            element={
              <QuizMaster
                handleFeedback={handleFeedback}
                handleLeaveClass={handleLeaveClass}
                handleGameBeingPlayed={handleGameBeingPlayed}
                gameBeingPlayed={gameBeingPlayed}
              />
            }
          />
          <Route
            path="/"
            element={
              <LandingPanel
                handleMyQuestionsClick={handleMyQuestionsClick}
                handleCommunityClick={handleCommunityClick}
                handleFavouritesClick={handleFavouritesClick}
                handleCollectionsClick={handleCollectionsClick}
                handleNavigateTo={handleNavigateTo}
              />
            }
          />
          <Route
            path="createQuestion"
            element={
              <CreateQuestionPanel
                handleFeedback={handleFeedback}
                handleReturn={handleReturn}
                handleNavigateTo={handleNavigateTo}
              />
            }
          />
          <Route
            path="questionsList"
            element={
              <QuestionsList
                questions={questions}
                onUpdateQuestion={handleUpdateQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                handleEditQuestion={handleEditQuestion}
                onFeedback={handleFeedback}
                onReturn={handleReturn}
                onSearch={handleSearch}
                gameBeingPlayed={gameBeingPlayed}
                handleNavigateTo={handleNavigateTo}
              />
            }
          />
          <Route
            path="communityList"
            element={
              <CommunityList
                questionsPublic={questionsPublic}
                onUpdateQuestion={handleUpdateQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                handleEditQuestion={handleEditQuestion}
                handleFavoritesClick={handleFavoritesClick}
                onFeedback={handleFeedback}
                onReturn={handleReturn}
                onSearchPublic={handleSearchPublic}
                gameBeingPlayed={gameBeingPlayed}
                handleNavigateTo={handleNavigateTo}
              />
            }
          />

          <Route
            path="editQuestion"
            element={
              <EditQuestionPanel
                questions={questions}
                onUpdateQuestion={handleUpdateQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                handleEditQuestion={handleEditQuestion}
                onFeedback={handleFeedback}
                onReturn={handleReturn}
                editedLocation={editedLocation}
                questionBeingEditedId={questionBeingEditedId}
                handleNavigateTo={handleNavigateTo}
                loadQuestions={loadQuestions}
                loadQuestionsPublic={loadQuestionsPublic}
              />
            }
          />
          <Route
            path="favouritesList"
            element={
              <FavoritesList
                questionsPublic={questionsPublic}
                onUpdateQuestion={handleUpdateQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                handleEditQuestion={handleEditQuestion}
                handleFavoritesClick={handleFavoritesClick}
                onFeedback={handleFeedback}
                onReturn={handleReturn}
                onSearchPublic={handleSearchPublic}
                gameBeingPlayed={gameBeingPlayed}
                handleNavigateTo={handleNavigateTo}
                // favorites={favorites}
              />
            }
          />
          <Route
            path="collectionsList"
            element={
              <CollectionsList
                questions={questions}
                onUpdateQuestion={handleUpdateQuestion}
                onDeleteQuestion={handleDeleteQuestion}
                handleEditQuestion={handleEditQuestion}
                onFeedback={handleFeedback}
                onReturn={handleReturn}
                gameBeingPlayed={gameBeingPlayed}
              />
            }
          />
          <Route
            path="settings"
            element={
              <Settings
                onUpdatePassword={handleUpdatePassword}
                onFeedback={handleFeedback}
              />
            }
          />
        </Routes>
      </main>
      <footer className="footer flex-container"></footer>
    </div>
  ) : null;
}

export default withContext(HomePage);
