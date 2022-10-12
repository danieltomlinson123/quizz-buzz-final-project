// ================== Imports ================== //

import { useEffect, useState, useRef } from "react";

// ================== Component ================== //

function Teacher4IncomingResponses({
  pin,
  nameOfClass,
  timeLimit,
  responsesReceivedTotal,
  responses,
  question,
  handleScreenChangeT4,
  socket,
  host,
  questionType,
  answersCombined,
}) {
  console.log(timeLimit);
  console.log(responses);

  // ================== useEffects ================== //

  const [timeoutId, setTimeoutId] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const counterRef = useRef(null);

  useEffect(() => {
    const id = setTimeout(timeLimit);

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

  useEffect(() => {
    setTimeout(() => {
      handleScreenChangeT4("Teacher5MarkResponses");
    }, timeLimit);
  });

  // ================== Functions ================== //

  const onButtonClick = () => {
    clearTimeout(timeoutId);
    clearInterval(intervalId);

    handleScreenChangeT4("Teacher5MarkResponses");
    socket.emit("T4", { gameScreen: "Student5WaitingForFeedback", host });
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

          <div className="grouped-elements flex-row">
            <div className="progress-bar">
              <div
                className="progress"
                style={{ animation: `fill ${timeLimit / 1000}s linear` }}
              ></div>
            </div>
            <div className="num" ref={counterRef}></div>
          </div>
        </div>

        <div className="grouped-elements">
          <p className="paragraph--bold">Question:</p>
          <p className="list__item-text list__item-text-readonly info">
            {question}
          </p>

          {questionType === "MCQ" && (
            <div className="grouped-elements">
              <div className="grouped-elements flex-row">
                {answersCombined[0][1] === "correct" && (
                  <span className="list__item-text list__item-text-readonly MCQResponse MCQResponse--correct">
                    <p>A:</p> {answersCombined[0][0]}
                  </span>
                )}

                {answersCombined[0][1] === "incorrect" && (
                  <span className="list__item-text list__item-text-readonly MCQResponse">
                    <p>A:</p> {answersCombined[0][0]}
                  </span>
                )}

                {answersCombined[1][1] === "correct" && (
                  <span className="list__item-text list__item-text-readonly MCQResponse MCQResponse--correct">
                    <p>B:</p> {answersCombined[1][0]}
                  </span>
                )}

                {answersCombined[1][1] === "incorrect" && (
                  <span className="list__item-text list__item-text-readonly MCQResponse">
                    <p>B:</p> {answersCombined[1][0]}
                  </span>
                )}
              </div>

              <div className="grouped-elements flex-row">
                {answersCombined[2][1] === "correct" && (
                  <span className="list__item-text list__item-text-readonly MCQResponse MCQResponse--correct">
                    <p>C:</p> {answersCombined[2][0]}
                  </span>
                )}

                {answersCombined[2][1] === "incorrect" && (
                  <span className="list__item-text list__item-text-readonly MCQResponse">
                    <p>C:</p> {answersCombined[2][0]}
                  </span>
                )}

                {answersCombined[3][1] === "correct" && (
                  <span className="list__item-text list__item-text-readonly MCQResponse MCQResponse--correct">
                    <p>D:</p> {answersCombined[3][0]}
                  </span>
                )}

                {answersCombined[3][1] === "incorrect" && (
                  <span className="list__item-text list__item-text-readonly MCQResponse">
                    <p>D:</p> {answersCombined[3][0]}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="grouped-elements">
          <p className="paragraph--bold">
            Responses received: {responsesReceivedTotal}
          </p>
          {questionType === "written" &&
            responses.map((response) => {
              return (
                <p className="info" key={response.socketId} id={socket.Id}>
                  {response.responseDetails.writtenResponse}
                </p>
              );
            })}
          {questionType === "MCQ" &&
            responses.map((response) => {
              return (
                <p className="info" key={response.socketId} id={socket.Id}>
                  {response.responseDetails.answersSelected.toString()}
                </p>
              );
            })}
        </div>
        <button
          href=""
          type="submit"
          className="footer-button"
          onClick={onButtonClick}
        >
          End round
        </button>
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default Teacher4IncomingResponses;
