// ================== Imports ================== //
import "./Student-2-Connected.css";
import "../game-screens.css";

import { Spinner } from "../../components";

// ================== Component ================== //

function Student2Connected({ nickname }) {
  // ================== jsx ================== //

  return (
    <div className="game-screen">
      <main className="game-screen-main">
        <p className="info">Connected as: {nickname}</p>
        <span className="material-symbols-outlined tick-icon">
          check_circle
        </span>
        <p className="info">Waiting for question to be sent...</p>
        <Spinner />
      </main>

      <footer className="game-screen-footer">
        {/* <button className="footer-button">Start Game</button> */}
      </footer>
    </div>
  );
}

export default Student2Connected;
