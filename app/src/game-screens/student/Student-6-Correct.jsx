// ================== Imports ================== //

import { Confetti } from "../../components";

import { useEffect } from "react";

// ================== Component ================== //

function Student6Correct({ handleScreenChangeS6 }) {
  // ================== useEffects ================== //
  useEffect(() => {
    setTimeout(() => {
      handleScreenChangeS6("Student8WaitingForQuestion");
    }, 15000);
  }, []);

  // ================== jsx ================== //
  return (
    <div className="game-screen correct-screen">
      <main className="game-screen-main correct-screen flex--space-between">
        <span class="material-symbols-outlined feedback-icon">
          sentiment_satisfied
        </span>
        <Confetti text="Well done!!" text2={"Click me!!"} correct={true} />
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default Student6Correct;
