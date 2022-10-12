// ================== Imports ================== //

// ================== Component ================== //

function Teacher1StartClass({ socket, handleStartClass }) {
  // ================== Function ================== //

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const nameOfClassInput = form.nameOfClass;

    const nameOfClass = nameOfClassInput.value;

    const pin = Math.round(Math.random() * 10000);

    const host = socket.id;

    if (nameOfClass.trim() === "") {
      alert("Name of class cannot be left blank.");
      throw new Error("Name of class cannot be left blank.");
    }
    form.reset();

    handleStartClass("Teacher2PlayersConnected", nameOfClass, pin, host);

    socket.emit("T1", {
      pin: { pin },
      nameOfClass: { nameOfClass },
      host: { host },
    });
  };

  // ================== jsx ================== //

  return (
    <div className="game-screen">
      <main className="game-screen-main">
        <p className="info">
          Click ‘start’ to open the class and generate the code!
        </p>
        <form action="" className="form" onSubmit={handleFormSubmit}>
          <div className="form-field">
            <label htmlFor="nameOfClass" className="input-label">
              Enter name of class:
            </label>
            <input
              type="text"
              placeholder="Enter a name for your class..."
              name="nameOfClass"
              id="nameOfClass"
              className="input-field"
            />
          </div>

          <button href="" type="submit" className="footer-button form-button">
            generate code
          </button>
        </form>
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default Teacher1StartClass;
