// ================== Imports ================== //

import "../game-screens.css";

import "../../components/timeSelect.scss";

import retrieveQuestionForEdit from "../../logic/retrieveQuestionForEdit";

import Loggito from "../../utils/Loggito";
import createQuestion from "../../logic/createQuestion";

import withContext from "../../utils/withContext";
import { useState, useEffect, useRef } from "react";

// ================== Component ================== //

function Teacher3EditQuestionPanel({
  pin,
  nameOfClass,
  handleScreenChangeT3,
  socket,
  host,
  selectQuestionForGame,
  handleSelectFolderClick,
  handleReturnInGame,
  context: { handleFeedback },
}) {
  // ================== consts ================== //

  const logger = new Loggito("Create Question");

  const correctAnswers = [];

  const [questionType, setQuestionType] = useState("MCQ");
  const [questionForEdit, setQuestionForEdit] = useState("");

  const [MCQResponses, setMCQResponses] = useState({
    A: "incorrect",
    B: "incorrect",
    C: "incorrect",
    D: "incorrect",
  });

  const timeLimitRef = useRef(null);
  const visibilityRef = useRef(null);
  const questionTextRef = useRef(null);
  const suggestedAnswerRef = useRef(null);
  const multipleChoiceARef = useRef(null);
  const multipleChoiceBRef = useRef(null);
  const multipleChoiceCRef = useRef(null);
  const multipleChoiceDRef = useRef(null);

  // ================== useEffects ================== //

  useEffect(() => {
    loadQuestionForEdit();
  }, []);

  useEffect(() => {
    timeLimitRef.current.value = questionForEdit.timeLimit;
    visibilityRef.current.value = questionForEdit.visibility;
    questionTextRef.current.value = questionForEdit.question;

    if (questionForEdit.questionType === "written")
      suggestedAnswerRef.current.value = questionForEdit.suggestedAnswer;

    if (questionForEdit.questionType === "MCQ") {
      multipleChoiceARef.current.value = questionForEdit.answerA[0];
      multipleChoiceBRef.current.value = questionForEdit.answerB[0];
      multipleChoiceCRef.current.value = questionForEdit.answerC[0];
      multipleChoiceDRef.current.value = questionForEdit.answerD[0];
    }
  }, [questionForEdit]);

  useEffect(() => {
    logger.info("useEffect questionlist");

    textAreaAdjust(questionForEdit);
    logger.info("question text area adjusted");
  });

  const textAreaAdjust = (questionForEdit) => {
    questionTextRef.current.style.height = "inherit";
    questionTextRef.current.style.height = `${
      25 + questionTextRef.scrollHeight
    }px`;
  };

  // ================== Function: to retrieve question to edit ================== //

  const loadQuestionForEdit = () => {
    try {
      retrieveQuestionForEdit(
        sessionStorage.token,
        selectQuestionForGame,
        (error, question) => {
          if (error) {
            handleFeedback({ message: error.message, level: "error" });

            logger.warn(error.message);

            return;
          }

          setQuestionForEdit(question);
          setQuestionType(question.questionType);
          setMCQResponses((MCQResponses) => ({
            ...MCQResponses,
            ...{ A: question.answerA[1] },
          }));
          setMCQResponses((MCQResponses) => ({
            ...MCQResponses,
            ...{ B: question.answerB[1] },
          }));
          setMCQResponses((MCQResponses) => ({
            ...MCQResponses,
            ...{ C: question.answerC[1] },
          }));
          setMCQResponses((MCQResponses) => ({
            ...MCQResponses,
            ...{ D: question.answerD[1] },
          }));

          logger.debug("setQuestionForEdit", question);

          return;
        }
      );
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    }
  };

  // ================== Function: to update MCQResponses correct answers ================== //

  const handleCorrectClick = (response) => {
    const obj = {};

    if (response === "A" && MCQResponses.A === "incorrect") obj.A = "correct";
    else if (response === "A" && MCQResponses.A === "correct")
      obj.A = "incorrect";
    else if (response === "B" && MCQResponses.B === "incorrect")
      obj.B = "correct";
    else if (response === "B" && MCQResponses.B === "correct")
      obj.B = "incorrect";
    else if (response === "C" && MCQResponses.C === "incorrect")
      obj.C = "correct";
    else if (response === "C" && MCQResponses.C === "correct")
      obj.C = "incorrect";
    else if (response === "D" && MCQResponses.D === "incorrect")
      obj.D = "correct";
    else if (response === "D" && MCQResponses.D === "correct")
      obj.D = "incorrect";

    setMCQResponses((MCQResponses) => ({
      ...MCQResponses,
      ...obj,
    }));
  };

  // ================== Function: to send form details to quiz player and pass details to QuizTeacher ================== //

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const questionDetails = {
      question: "",
      timeLimit: 30000,
      visibility: "",
      questionType: "",
      suggestedAnswer: "",
      answerA: ["", "incorrect"],
      answerB: ["", "incorrect"],
      answerC: ["", "incorrect"],
      answerD: ["", "incorrect"],
    };

    const form = event.target;

    if (form.question.value.trim() === "") {
      alert("Question input cannot be left blank.");
      throw new Error("Question input cannot be left blank.");
    }

    questionDetails.question = form.question.value;
    questionDetails.timeLimit = form.timeLimit.value;
    questionDetails.visibility = form.visibility.value;
    questionDetails.questionType = questionType;

    if (questionDetails.questionType === "written") {
      questionDetails.suggestedAnswer = form.suggestedAnswer.value;
      if (!form.suggestedAnswer.value) questionDetails.suggestedAnswer = "";
    }

    if (questionDetails.questionType === "MCQ") {
      questionDetails.answerA[0] = form.MCQA.value;
      questionDetails.answerA[1] = MCQResponses.A;
      questionDetails.answerB[0] = form.MCQB.value;
      questionDetails.answerB[1] = MCQResponses.B;
      questionDetails.answerC[0] = form.MCQC.value;
      questionDetails.answerC[1] = MCQResponses.C;
      questionDetails.answerD[0] = form.MCQD.value;
      questionDetails.answerD[1] = MCQResponses.D;

      if (MCQResponses.A === "correct")
        correctAnswers[correctAnswers.length] = "A";
      if (MCQResponses.B === "correct")
        correctAnswers[correctAnswers.length] = "B";
      if (MCQResponses.C === "correct")
        correctAnswers[correctAnswers.length] = "C";
      if (MCQResponses.D === "correct")
        correctAnswers[correctAnswers.length] = "D";

      if (correctAnswers.length === 0) {
        alert("At least one correct answer must be selected.");
        throw new Error("At least one correct answer must be selected.");
      }
    }

    form.reset();

    /* try {
      createQuestion(sessionStorage.token, questionDetails, (error) => {
        if (error) {
          handleFeedback({ message: error.message, level: "error" });

          logger.warn(error.message);

          return;
        }

        // loadNotes();
      });
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      logger.warn(error.message);
    } */

    const questionDetailsDuplicate = JSON.parse(
      JSON.stringify(questionDetails)
    );

    const answersCombined = [];

    answersCombined[0] = questionDetails.answerA;
    answersCombined[1] = questionDetails.answerB;
    answersCombined[2] = questionDetails.answerC;
    answersCombined[3] = questionDetails.answerD;

    questionDetailsDuplicate.gameScreen = "Student3GetReady";
    questionDetailsDuplicate.host = host;
    questionDetailsDuplicate.answerA.length = 1;
    questionDetailsDuplicate.answerB.length = 1;
    questionDetailsDuplicate.answerC.length = 1;
    questionDetailsDuplicate.answerD.length = 1;

    socket.emit("T3", questionDetailsDuplicate);

    handleScreenChangeT3(
      "Teacher3BGetReady",
      questionDetails.question,
      questionDetails.timeLimit,
      questionDetails.questionType,
      correctAnswers,
      answersCombined
    );
  };

  // ================== Functions ================== //

  const handleWrittenResponseClick = () => {
    setQuestionType("written");
  };

  const handleMCQClick = () => {
    setQuestionType("MCQ");
  };

  // ================== jsx ================== //

  return (
    <div className="game-screen">
      <main className="game-screen-main flex--spaced">
        <div className="grouped-elements">
          <p className="info--bold">
            PIN: {pin} <br></br>
            Class: {nameOfClass}
          </p>
        </div>
        <div className="grouped-elements flex-row">
          <button
            type="button"
            className="non-footer-button"
            onClick={() => handleReturnInGame("createQuestion")}
          >
            Create New Question
          </button>
          <button
            type="button"
            className="non-footer-button"
            onClick={handleSelectFolderClick}
          >
            Search questions
          </button>
        </div>
        <form
          action=""
          className="form form--spread"
          onSubmit={handleFormSubmit}
        >
          <div className="grouped-elements flex-row">
            <select id="timeLimit" ref={timeLimitRef}>
              <option value="30000">Time limit...</option>
              <option value="10000">10 seconds</option>
              <option value="20000">20 seconds</option>
              <option value="30000">30 seconds</option>
              <option value="45000">45 seconds</option>
              <option value="50000">1 minute</option>
              <option value="60000">1 min 30 sec</option>
              <option value="70000">2 mins</option>
              <option value="80000">no limit</option>
            </select>
            <select id="visibility" ref={visibilityRef}>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="question" className="input-label">
              Question:
            </label>
            <textarea
              className="list__item-text list-item__text--form input-field"
              type="text"
              placeholder="Write your question..."
              name="question"
              id="question"
              ref={questionTextRef}
            ></textarea>
          </div>
          {/* For the moment the change reponse type buttons will be disabled */}
          {/* <div className="grouped-elements flex-row">
            <button
              href=""
              type="button"
              className="footer-button"
              onClick={handleWrittenResponseClick}
            >
              Written reponse
            </button>
            <button
              href=""
              type="button"
              className="footer-button"
              onClick={handleMCQClick}
            >
              Multiple choice
            </button>
          </div> */}

          {questionType === "written" && (
            <div className="form-field">
              <label htmlFor="suggestedAnswer" className="input-label">
                Suggested answer:
              </label>
              <textarea
                className="list__item-text list-item__text--form input-field"
                type="text"
                placeholder="Write a suggested answer..."
                name="suggestedAnswer"
                id="suggestedAnswer"
                ref={suggestedAnswerRef}
              ></textarea>
            </div>
          )}

          {questionType === "MCQ" && (
            <div className="grouped-elements">
              <p className="paragraph--left">
                Write the answers and select on or more as correct:
              </p>
              <div className="grouped-elements flex-row">
                <div className="form-field">
                  <div className="grouped-elements flex-row">
                    <label htmlFor="MCQA" className="input-label">
                      Answer A:
                    </label>
                    {MCQResponses.A === "incorrect" && (
                      <span
                        className="material-symbols-rounded question-option-button check-circle"
                        onClick={() => {
                          handleCorrectClick("A");
                        }}
                      >
                        check_circle
                      </span>
                    )}
                    {MCQResponses.A === "correct" && (
                      <span
                        className="material-symbols-rounded question-option-button check-circle check-circle--correct"
                        onClick={() => {
                          handleCorrectClick("A");
                        }}
                      >
                        check_circle
                      </span>
                    )}
                  </div>
                  <textarea
                    className="list__item-text list-item__text--form input-field"
                    type="text"
                    placeholder="Write answer A..."
                    name="MCQA"
                    id="MCQA"
                    ref={multipleChoiceARef}
                  ></textarea>
                </div>

                <div className="form-field">
                  <div className="grouped-elements flex-row">
                    <label htmlFor="MCQB" className="input-label">
                      Answer B:
                    </label>
                    {MCQResponses.B === "incorrect" && (
                      <span
                        className="material-symbols-rounded question-option-button check-circle"
                        onClick={() => {
                          handleCorrectClick("B");
                        }}
                      >
                        check_circle
                      </span>
                    )}
                    {MCQResponses.B === "correct" && (
                      <span
                        className="material-symbols-rounded question-option-button check-circle check-circle--correct"
                        onClick={() => {
                          handleCorrectClick("B");
                        }}
                      >
                        check_circle
                      </span>
                    )}
                  </div>
                  <textarea
                    className="list__item-text list-item__text--form input-field"
                    type="text"
                    placeholder="Write answer B..."
                    name="MCQB"
                    id="MCQB"
                    ref={multipleChoiceBRef}
                  ></textarea>
                </div>
              </div>

              <div className="grouped-elements flex-row">
                <div className="form-field">
                  <div className="grouped-elements flex-row">
                    <label htmlFor="MCQC" className="input-label">
                      Answer C:
                    </label>
                    {MCQResponses.C === "incorrect" && (
                      <span
                        className="material-symbols-rounded question-option-button check-circle"
                        onClick={() => {
                          handleCorrectClick("C");
                        }}
                      >
                        check_circle
                      </span>
                    )}
                    {MCQResponses.C === "correct" && (
                      <span
                        className="material-symbols-rounded question-option-button check-circle check-circle--correct"
                        onClick={() => {
                          handleCorrectClick("C");
                        }}
                      >
                        check_circle
                      </span>
                    )}
                  </div>
                  <textarea
                    className="list__item-text list-item__text--form input-field"
                    type="text"
                    placeholder="Write answer C..."
                    name="MCQC"
                    id="MCQC"
                    ref={multipleChoiceCRef}
                  ></textarea>
                </div>
                <div className="form-field">
                  <div className="grouped-elements flex-row">
                    <label htmlFor="MCQD" className="input-label">
                      Answer D:
                    </label>
                    {MCQResponses.D === "incorrect" && (
                      <span
                        className="material-symbols-rounded question-option-button check-circle"
                        onClick={() => {
                          handleCorrectClick("D");
                        }}
                      >
                        check_circle
                      </span>
                    )}
                    {MCQResponses.D === "correct" && (
                      <span
                        className="material-symbols-rounded question-option-button check-circle check-circle--correct"
                        onClick={() => {
                          handleCorrectClick("D");
                        }}
                      >
                        check_circle
                      </span>
                    )}
                  </div>
                  <textarea
                    className="list__item-text list-item__text--form input-field"
                    type="text"
                    placeholder="Write answer D..."
                    name="MCQD"
                    id="MCQD"
                    ref={multipleChoiceDRef}
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          <button href="" type="submit" className="footer-button">
            Send
          </button>
        </form>
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default withContext(Teacher3EditQuestionPanel);
