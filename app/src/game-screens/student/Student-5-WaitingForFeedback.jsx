// ================== Imports ================== //
import "./Student-5-WaitingForFeedback.css";
import "../game-screens.css";

import { Spinner } from "../../components";

// ================== Component ================== //

function Student5WaitingForFeedback() {
  // ================== jsx ================== //

  return (
    <div className="game-screen">
      <main className="game-screen-main flex--space-around">
        <p className="info">Waiting for all responses to be sent...</p>
        <Spinner />
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default Student5WaitingForFeedback;
