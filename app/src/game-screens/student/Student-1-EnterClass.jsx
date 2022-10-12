// ================== Imports ================== //

import retrieveGameCode from "../../logic/retrieveGameCode";

// ================== Component ================== //

function Student1EnterClass({ handleScreenChangeS1, socket, handleFeedback }) {
  // ================== Function: to retrieve gameCode, verify details and join the class room on socket ================== //

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const pinInput = form.pin;
    const nameOfClassInput = form.nameOfClass;
    const nicknameInput = form.nickname;

    const pin = pinInput.value;
    const nameOfClass = nameOfClassInput.value;
    const nickname = nicknameInput.value;

    if (pin.trim() === "") {
      alert("Input fields cannot be left blank.");
      throw new Error("Input fields cannot be left blank");
    }
    if (nameOfClass.trim() === "") {
      alert("Input fields cannot be left blank.");
      throw new Error("Input fields cannot be left blank");
    }
    if (nickname.trim() === "") {
      alert("Input fields cannot be left blank.");
      throw new Error("Input fields cannot be left blank");
    }

    try {
      retrieveGameCode(pin, (error, gameCodes) => {
        debugger;
        if (error) {
          handleFeedback({ message: error.message, level: "error" });

          // logger.warn(error.message);

          return;
        }
        let gameCodeFiltered = gameCodes.filter(
          (gameCode) =>
            gameCode.nameOfClass === nameOfClass && gameCode.pin === pin
        );
        if (gameCodeFiltered.length === 1) {
          const host = gameCodeFiltered[0].host;
          socket.emit("S1", {
            nickname: { nickname },
            host: { host },
            socketId: socket.id,
          });
          handleScreenChangeS1("Student2Connected", nickname, host);
          form.reset();
        } else {
          alert(`Could not find game with pin ${pin} and name ${nameOfClass}`);
        }

        // logger.debug("setNotes", notes);
      });
    } catch (error) {
      handleFeedback({ message: error.message, level: "error" });

      // logger.warn(error.message);
    }
    // };
  };

  // ================== jsx ================== //

  return (
    <div className="game-screen">
      <main className="game-screen-main flex--spaced">
        <form
          action=""
          className="form form--spread"
          onSubmit={handleFormSubmit}
        >
          <div className="grouped-elements">
            <div className="form-field">
              <label htmlFor="pin" className="input-label">
                Enter class PIN:
              </label>
              <input
                type="text"
                placeholder="Enter class PIN..."
                name="pin"
                id="pin"
                className="input-field"
              />
            </div>

            <div className="form-field">
              <label htmlFor="nameOfCLass" className="input-label">
                Enter the class name:
              </label>
              <input
                type="text"
                placeholder="Enter the class name..."
                name="nameOfClass"
                id="nameOfClass"
                className="input-field"
              />
            </div>

            <div className="form-field">
              <label htmlFor="nickname" className="input-label">
                Choose a nickname:
              </label>
              <input
                type="text"
                placeholder="Enter your nickname..."
                name="nickname"
                id="nickname"
                className="input-field"
              />
            </div>
          </div>
          <button href="" type="submit" className="footer-button">
            Join
          </button>
        </form>
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default Student1EnterClass;
