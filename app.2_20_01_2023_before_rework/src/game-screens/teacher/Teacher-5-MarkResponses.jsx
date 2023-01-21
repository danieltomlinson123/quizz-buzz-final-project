// ================== Imports ================== //

import "../game-screens.css";

import { useState, useEffect } from "react";

// ================== Component ================== //

function Teacher5MarkResponses({
  pin,
  nameOfClass,
  handleScreenChangeT5,
  responses,
  host,
  socket,
  questionType,
  correctAnswers,
}) {
  let correct = 0;
  let incorrect = 0;
  // ================== Hook consts ================== //

  const [responsesToSend, setResponsesToSend] = useState(responses);

  // ================== useEffects ================== //

  useEffect(() => {
    responsesToSend.forEach((response) => {});
  });

  // ================== Function: emits feedback to quiz members and sends count to the next screen ================== //

  const onButtonClick = () => {
    if (questionType === "written") {
      responsesToSend.forEach((response) => {
        if (response.correct === true) {
          socket.emit("T5", {
            gameScreen: "Student6Correct",
            socketId: response.socketId,
            host: host,
          });
          console.log("Emitted 'correct' to:");
          console.log(response.socketId);
          correct += 1;
        } else if (response.correct === false) {
          socket.emit("T5", {
            gameScreen: "Student7Incorrect",
            socketId: response.socketId,
            host: host,
          });
          console.log("Emitted 'incorrect' to:");
          console.log(response.socketId);
          incorrect += 1;
        }
      });
    } else if (questionType === "MCQ")
      responses.forEach((response) => {
        if (
          response.responseDetails.answersSelected.toString() ===
          correctAnswers.toString()
        ) {
          socket.emit("T5", {
            gameScreen: "Student6Correct",
            socketId: response.socketId,
            host: host,
          });
          console.log("Emitted 'correct' to:");
          console.log(response.socketId);
          correct += 1;
        } else if (
          response.responseDetails.answersSelected.toString() !==
          correctAnswers.toString()
        ) {
          socket.emit("T5", {
            gameScreen: "Student7Incorrect",
            socketId: response.socketId,
            host: host,
          });
          console.log("Emitted 'incorrect' to:");
          console.log(response.socketId);
          incorrect += 1;
        }
      });
    handleScreenChangeT5("Teacher6ResponseStats", correct, incorrect);
  };

  // ================== Function: Changes the colour of the response to mark correct/incorrect ================== //

  const handleMarkResponse = (event, socketId) => {
    if (event.target.className === "info response-list-item")
      event.target.className = "info response-list-item correct";
    else if (event.target.className === "info response-list-item correct")
      event.target.className = "info response-list-item incorrect";
    else if (event.target.className === "info response-list-item incorrect")
      event.target.className = "info response-list-item correct";

    const currentResponseIndex = responsesToSend.findIndex(
      (resp) => resp.socketId === socketId
    );

    if (!responsesToSend[currentResponseIndex].correct) {
      const copyRes = [...responsesToSend];

      copyRes[currentResponseIndex].correct = true;

      setResponsesToSend(copyRes);
    } else if (responsesToSend[currentResponseIndex].correct === true) {
      const copyRes = [...responsesToSend];

      copyRes[currentResponseIndex].correct = false;

      setResponsesToSend(copyRes);
    }
  };

  console.log("Responses received at T5 Mark Responses");
  console.log(responses);

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
        {questionType === "written" && (
          <div className="grouped-elements">
            <p className="paragraph--bold">
              Click to mark correct or incorrect.
            </p>

            {responses.map((responseData) => {
              return (
                <p
                  className="info response-list-item"
                  key={responseData.socketId}
                  onClick={(event) =>
                    handleMarkResponse(event, responseData.socketId)
                  }
                  // React complaine here that it does not recognise the capital I in ID as a prop on a DOM element.
                  // Warning only fires when an answer is returned without being corrected
                  data-Id={responseData.socketId}
                  id={responseData.socketId}
                >
                  {responseData.responseDetails.writtenResponse}
                </p>
              );
            })}
          </div>
        )}

        {questionType === "MCQ" && (
          <p className="info--bold">Responses ready to be sent</p>
        )}

        <button className="footer-button" onClick={onButtonClick}>
          send
        </button>
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default Teacher5MarkResponses;
