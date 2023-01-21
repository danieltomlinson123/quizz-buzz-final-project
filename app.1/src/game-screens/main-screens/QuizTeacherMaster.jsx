// ================== Imports ================== //

import { useState, useEffect } from "react";

import {
  Teacher1StartClass,
  Teacher2PlayersConnected,
  Teacher3BGetReady,
  Teacher3CreateQuestion,
  Teacher4IncomingResponses,
  Teacher5MarkResponses,
  Teacher6ResponseStats,
  Teacher7ClassClosed,
} from "../teacher";

import Loggito from "../../utils/Loggito";
import withContext from "../../utils/withContext";

import createGameCode from "../../logic/createGameCode";

// ================== Component ================== //

function QuizTeacherMaster({
  socket,
  handleLeaveClass,
  handleGameBeingPlayed,
  selectQuestionForGame,
  gameBeingPlayed,
  context: { handleFeedback },
}) {
  // ================== consts ================== //

  const logger = new Loggito("QuizTeacher");

  // ================== Hook consts ================== //

  const [gameScreen, setGameScreen] = useState("Teacher1StartClass");
  const [nameOfClass, setNameOfClass] = useState("");
  const [nickname, setNickname] = useState([]);
  const [pin, setPin] = useState("");
  const [host, setHost] = useState("");
  const [timeLimit, setTimeLimit] = useState("30 seconds");
  const [question, setQuestion] = useState("");
  const [responses, setResponses] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [socketsConnected, setSocketsConnected] = useState([]);

  const [questionType, setQuestionType] = useState("MCQ");
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [answersCombined, setAnswersCombined] = useState([]);

  // ================== useEffect: opens socket listeners on component mount ================== //

  useEffect(() => {
    socket.on("S1.5", (data) => {
      console.log("S1 data received by client:");
      console.log(data);

      console.log("nickname:");
      console.log(nickname);
      setSocketsConnected((socketsConnected) => [
        ...socketsConnected,
        data.socketId,
      ]);
      console.log("Sockets connected:");
      console.log(socketsConnected);
      if (!socketsConnected.includes(data.socketId))
        setNickname((nickname) => [...nickname, data.nickname.nickname]);
      console.log("Nickname received:");
      console.log(data.nickname.nickname);
    });

    socket.on("S4.5", (data) => {
      console.log("S4 data received by client:");
      console.log(data);
      setResponses((responses) => [...responses, data]);
      console.log("responses state in QuizTeacher");
      console.log(responses);
      // }
    });
  }, []);

  // ================== Functions: start and end quiz ================== //

  const handleStartClass = (gameScreen, nameOfClass, pin, host) => {
    try {
      const pinString = `${pin}`;

      createGameCode(
        sessionStorage.token,
        nameOfClass,
        pinString,
        host,
        (error) => {
          if (error) {
            handleFeedback({ message: error.message, level: "error" });

            logger.warn(error.message);

            return;
          }
        }
      );
      handleScreenChangeT1(gameScreen, nameOfClass, pin, host);
      handleGameBeingPlayed("join");
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }
  };

  const handleCloseGameTeacher = () => {
    const hostTemp = host;
    socket.emit("Tclose", { hostTemp });

    setGameScreen("Teacher7ClassClosed");
    setNameOfClass("");
    setNickname([]);
    setPin("");
    setHost("");
    setTimeLimit("30 seconds");
    setQuestion("");
    setResponses([]);
    setCorrect(0);
    setIncorrect(0);
  };

  // ================== Functions: handle changes of game screen ================== //

  const onLeaveClass = () => {
    handleLeaveClass();
  };

  const handleScreenChangeT1 = (gameScreen, nameOfClass, pin, host) => {
    setGameScreen(gameScreen);
    setNameOfClass(nameOfClass);
    setPin(pin);
    setHost(host);
  };

  const handleScreenChangeT2 = (gameScreen) => {
    setGameScreen(gameScreen);
  };

  const handleScreenChangeT3 = (
    gameScreen,
    question,
    timeLimit,
    questionType,
    correctAnswers,
    answersCombined
  ) => {
    setQuestion(question);
    setTimeLimit(timeLimit);
    setQuestionType(questionType);
    setCorrectAnswers(correctAnswers);
    setAnswersCombined(answersCombined);
    setGameScreen(gameScreen);
  };

  const handleScreenChangeT3B = (gameScreen) => {
    setGameScreen(gameScreen);
  };

  const handleScreenChangeT4 = (gameScreen) => {
    setGameScreen(gameScreen);
  };

  const handleScreenChangeT5 = (gameScreen, correct, incorrect) => {
    setGameScreen(gameScreen);
    setCorrect(correct);
    setIncorrect(incorrect);
  };

  const handleScreenChangeT6 = (gameScreen) => {
    setGameScreen(gameScreen);
    setResponses([]);
  };

  const handleScreenChangeT7 = (gameScreen) => {
    setGameScreen(gameScreen);
    handleGameBeingPlayed("leave");
  };

  // ================== jsx ================== //

  return (
    <div className="game-screen">
      <header className="game-screen-header">
        {gameScreen === "Teacher1StartClass" && (
          <span
            className="material-symbols-outlined button-icon"
            onClick={onLeaveClass}
          >
            arrow_back_ios_new
          </span>
        )}
        {gameScreen !== "Teacher1StartClass" && (
          <span className="menu-icon-spaceholder"></span>
        )}
        <h1 className="app-title">Quizz Buzz</h1>
        {gameBeingPlayed && (
          <button
            type="menu"
            className="material-symbols-outlined  button-icon"
            onClick={handleCloseGameTeacher}
          >
            exit_to_app
          </button>
        )}
        {!gameBeingPlayed && (
          <div className="material-symbols-outlined  button-icon"></div>
        )}
      </header>
      <main className="game-screen-main">
        {gameScreen === "Teacher1StartClass" && (
          <Teacher1StartClass
            handleStartClass={handleStartClass}
            socket={socket}
          />
        )}
        {gameScreen === "Teacher2PlayersConnected" && (
          <Teacher2PlayersConnected
            nameOfClass={nameOfClass}
            pin={pin}
            nickname={nickname}
            handleScreenChangeT2={handleScreenChangeT2}
            socket={socket}
            // host={host}
          />
        )}
        {gameScreen === "Teacher3CreateQuestion" && (
          <Teacher3CreateQuestion
            pin={pin}
            nameOfClass={nameOfClass}
            socket={socket}
            handleScreenChangeT3={handleScreenChangeT3}
            host={host}
            selectQuestionForGame={selectQuestionForGame}
          />
        )}
        {gameScreen === "Teacher3BGetReady" && (
          <Teacher3BGetReady
            handleScreenChangeT3B={handleScreenChangeT3B}
            // host={host}
          />
        )}
        {gameScreen === "Teacher4IncomingResponses" && (
          <Teacher4IncomingResponses
            pin={pin}
            nameOfClass={nameOfClass}
            timeLimit={timeLimit}
            question={question}
            socket={socket}
            responses={responses}
            handleScreenChangeT4={handleScreenChangeT4}
            host={host}
            questionType={questionType}
            answersCombined={answersCombined}
          />
        )}
        {gameScreen === "Teacher5MarkResponses" && (
          <Teacher5MarkResponses
            pin={pin}
            nameOfClass={nameOfClass}
            socket={socket}
            responses={responses}
            handleScreenChangeT5={handleScreenChangeT5}
            host={host}
            questionType={questionType}
            correctAnswers={correctAnswers}
          />
        )}
        {gameScreen === "Teacher6ResponseStats" && (
          <Teacher6ResponseStats
            handleScreenChangeT6={handleScreenChangeT6}
            host={host}
            pin={pin}
            nameOfClass={nameOfClass}
            correct={correct}
            incorrect={incorrect}
            questionType={questionType}
          />
        )}
        {gameScreen === "Teacher7ClassClosed" && (
          <Teacher7ClassClosed
            handleScreenChangeT7={handleScreenChangeT7}
            host={host}
          />
        )}
      </main>
      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default withContext(QuizTeacherMaster);
