// ================== Imports ================== //

import { useEffect } from "react";

// ================== Component ================== //

function Student9ClassClosed({ handleScreenChangeS9 }) {
  // ================== useEffects ================== //

  useEffect(() => {
    setTimeout(() => handleScreenChangeS9("Student1EnterClass"), 7000);
  }, []);

  // ================== jsx ================== //

  return (
    <div className="game-screen">
      <main className="game-screen-main">
        <p className="info--bold class-closed">
          Class closed.<br></br>
          <br></br>
          Thanks for playing!
        </p>
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default Student9ClassClosed;
