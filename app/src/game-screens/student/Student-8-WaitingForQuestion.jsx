// ================== Imports ================== //
import "./Student-8-WaitingForQuestion.css";
import "../game-screens.css";

import { Spinner } from "../../components/";

// ================== Component ================== //

function Student8WaitingForQuestion() {
  return (
    // ================== jsx ================== //
    <div className="game-screen">
      <main className="game-screen-main flex--space-around">
        <p className="info">Waiting for question to be sent...</p>
        <Spinner />
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default Student8WaitingForQuestion;
