// ================== Imports ================== //
import "./Student-4-ResponseInput.css";
import "../game-screens.css";

import { useEffect, useState, useRef } from "react";

// ================== Component ================== //

function Student4ResponseInput({
  question,
  timeLimit,
  socket,
  handleScreenChangeS4,
  host,
  questionType,
  answerA,
  answerB,
  answerC,
  answerD,
}) {
  // ================== Hook consts ================== //

  const [MCQResponses, setMCQResponses] = useState({
    A: "incorrect",
    B: "incorrect",
    C: "incorrect",
    D: "incorrect",
  });

  const [timeoutId, setTimeoutId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const counterRef = useRef();
  const buttonRef = useRef();

  // ================== useEffects ================== //

  useEffect(() => {
    const id = setTimeout(handleFormSubmit2, timeLimit);

    setTimeoutId(id);

    let contador = timeLimit / 1000;

    counterRef.current.innerHTML = contador;

    const interval = setInterval(() => {
      contador--;

      counterRef.current.innerHTML = contador;

      if (contador <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    setIntervalId(interval);
  }, []);

  // ================== Function: sends response to teacher on button click - autosends when time limit runs out ================== //

  const handleFormSubmit = (event) => {
    event.preventDefault();

    clearTimeout(timeoutId);
    clearInterval(intervalId);

    const responseDetails = {
      writtenResponse: "",
      responseA: "",
      responseB: "",
      responseC: "",
      responseD: "",
    };

    const form = event.target;

    const answersSelected = [];

    if (questionType === "written")
      responseDetails.writtenResponse = form.response.value;
    else if (questionType === "MCQ") {
      if (MCQResponses.A === "correct")
        answersSelected[answersSelected.length] = "A";
      if (MCQResponses.B === "correct")
        answersSelected[answersSelected.length] = "B";
      if (MCQResponses.C === "correct")
        answersSelected[answersSelected.length] = "C";
      if (MCQResponses.D === "correct")
        answersSelected[answersSelected.length] = "D";

      responseDetails.responseA = MCQResponses.A;
      responseDetails.responseB = MCQResponses.B;
      responseDetails.responseC = MCQResponses.C;
      responseDetails.responseD = MCQResponses.D;
      responseDetails.answersSelected = answersSelected;
    }

    const socketId = socket.id;

    socket.emit("S4", {
      responseDetails,
      socketId,
      host,
    });

    handleScreenChangeS4("Student5WaitingForFeedback");
  };

  // ================== Function: forces button click to auto send results when time runs out ================== //

  const handleFormSubmit2 = () => {
    buttonRef.current.click();
  };

  // ================== socket.on: forces button click to auto send results on close round from teacher ================== //

  socket.on("T4", () => {
    console.log("T4 received by client");
    handleFormSubmit2();
  });

  // ================== Function: to select response as correct ================== //

  const handleCorrectClick = (response) => {
    if (response === "A" && MCQResponses.A === "incorrect")
      setMCQResponses((MCQResponses) => ({
        ...MCQResponses,
        ...{ A: "correct" },
      }));
    else if (response === "A" && MCQResponses.A === "correct")
      setMCQResponses((MCQResponses) => ({
        ...MCQResponses,
        ...{ A: "incorrect" },
      }));
    else if (response === "B" && MCQResponses.B === "incorrect")
      setMCQResponses((MCQResponses) => ({
        ...MCQResponses,
        ...{ B: "correct" },
      }));
    else if (response === "B" && MCQResponses.B === "correct")
      setMCQResponses((MCQResponses) => ({
        ...MCQResponses,
        ...{ B: "incorrect" },
      }));
    else if (response === "C" && MCQResponses.C === "incorrect")
      setMCQResponses((MCQResponses) => ({
        ...MCQResponses,
        ...{ C: "correct" },
      }));
    else if (response === "C" && MCQResponses.C === "correct")
      setMCQResponses((MCQResponses) => ({
        ...MCQResponses,
        ...{ C: "incorrect" },
      }));
    else if (response === "D" && MCQResponses.D === "incorrect")
      setMCQResponses((MCQResponses) => ({
        ...MCQResponses,
        ...{ D: "correct" },
      }));
    else if (response === "D" && MCQResponses.D === "correct")
      setMCQResponses((MCQResponses) => ({
        ...MCQResponses,
        ...{ D: "incorrect" },
      }));
  };

  // ================== jsx ================== //

  return (
    <div className="game-screen">
      <main className="game-screen-main">
        <div className="grouped-elements">
          <div className="grouped-elements flex-row">
            <div className="progress-bar">
              <div
                className="progress"
                style={{ animation: `fill ${timeLimit / 1000}s linear` }}
              ></div>
            </div>
            <div className="num" ref={counterRef}></div>
          </div>

          <p className="paragraph--bold">Question: </p>
          <p className="list__item-text list__item-text-readonly info">
            {question}
          </p>
        </div>

        <form
          action=""
          className="form form--spread"
          onSubmit={handleFormSubmit}
        >
          {questionType === "written" && (
            <div className="form-field">
              <label htmlFor="answer" className="input-label input-label--bold">
                Write your answer:
              </label>
              <textarea
                className="list__item-text list-item__text--form input-field"
                type="text"
                placeholder="Write your answer here..."
                name="response"
                id="response"
              ></textarea>
            </div>
          )}

          {questionType === "MCQ" && (
            <div className="grouped-elements">
              <div className="grouped-elements flex-row">
                {MCQResponses.A === "correct" && (
                  <span
                    className="list__item-text list__item-text-readonly MCQResponse MCQResponse--correct"
                    onClick={() => {
                      handleCorrectClick("A");
                    }}
                  >
                    {answerA[0]}
                  </span>
                )}

                {MCQResponses.A === "incorrect" && (
                  <span
                    className="list__item-text list__item-text-readonly MCQResponse"
                    onClick={() => {
                      handleCorrectClick("A");
                    }}
                  >
                    {answerA[0]}
                  </span>
                )}

                {MCQResponses.B === "correct" && (
                  <span
                    className="list__item-text list__item-text-readonly MCQResponse MCQResponse--correct"
                    onClick={() => {
                      handleCorrectClick("B");
                    }}
                  >
                    {answerB[0]}
                  </span>
                )}

                {MCQResponses.B === "incorrect" && (
                  <span
                    className="list__item-text list__item-text-readonly MCQResponse"
                    onClick={() => {
                      handleCorrectClick("B");
                    }}
                  >
                    {answerB[0]}
                  </span>
                )}
              </div>

              <div className="grouped-elements flex-row">
                {MCQResponses.C === "correct" && (
                  <span
                    className="list__item-text list__item-text-readonly MCQResponse MCQResponse--correct"
                    onClick={() => {
                      handleCorrectClick("C");
                    }}
                  >
                    {answerC[0]}
                  </span>
                )}

                {MCQResponses.C === "incorrect" && (
                  <span
                    className="list__item-text list__item-text-readonly MCQResponse"
                    onClick={() => {
                      handleCorrectClick("C");
                    }}
                  >
                    {answerC[0]}
                  </span>
                )}

                {MCQResponses.D === "correct" && (
                  <span
                    className="list__item-text list__item-text-readonly MCQResponse MCQResponse--correct"
                    onClick={() => {
                      handleCorrectClick("D");
                    }}
                  >
                    {answerD[0]}
                  </span>
                )}

                {MCQResponses.D === "incorrect" && (
                  <span
                    className="list__item-text list__item-text-readonly MCQResponse"
                    onClick={() => {
                      handleCorrectClick("D");
                    }}
                  >
                    {answerD[0]}
                  </span>
                )}
              </div>
            </div>
          )}

          <button
            href=""
            type="submit"
            className="footer-button response-submit-button"
            ref={buttonRef}
          >
            Submit
          </button>
        </form>
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default Student4ResponseInput;
