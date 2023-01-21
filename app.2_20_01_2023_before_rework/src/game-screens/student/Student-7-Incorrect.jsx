// ================== Imports ================== //

import "../game-screens.css";

import { Confetti } from "../../components";

import { useEffect } from "react";

function Student7Incorrect({ handleScreenChangeS7 }) {
  // ================== useEffects ================== //
  useEffect(() => {
    setTimeout(() => {
      handleScreenChangeS7("Student8WaitingForQuestion");
    }, 15000);
  }, []);

  // ================== jsx ================== //

  return (
    <div className="game-screen correct-screen incorrect-screen">
      <main className="game-screen-main correct-screen incorrect-screen flex--space-between">
        <span class="material-symbols-outlined feedback-icon">
          sentiment_dissatisfied
        </span>
        <Confetti
          text="Better luck next time!"
          text2={"Click me!!"}
          correct={false}
        />
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default Student7Incorrect;
