// ================== Imports ================== //

import confetti from "https://cdn.skypack.dev/canvas-confetti";
import "./Confetti.css";

// ================== Component ================== //

function Confetti({ text, text2, correct }) {
  // ================== Functions ================== //
  const doItNow = (evt, hard) => {
    const direction = Math.sign(lastX - evt.clientX);
    lastX = evt.clientX;
    const particleCount = hard ? r(122, 245) : r(2, 15);
    confetti({
      particleCount,
      angle: r(90, 90 + direction * 30),
      spread: r(45, 80),
      origin: {
        x: evt.clientX / window.innerWidth,
        y: evt.clientY / window.innerHeight,
      },
    });
  };
  const doIt = (evt) => {
    doItNow(evt, false);
  };

  const doItHard = (evt) => {
    doItNow(evt, true);
  };

  let lastX = 0;

  function r(mi, ma) {
    return parseInt(Math.random() * (ma - mi) + mi);
  }

  // ================== jsx ================== //

  return (
    <div className="grouped-elements">
      {correct === true && (
        <button
          className="non-footer-button confetti-button confetti-button--correct"
          id="confetti-button"
          onClick={doItHard}
          onMouseOver={doIt}
        >
          {text}
          <br></br>
          {text2}
        </button>
      )}
      {correct === false && (
        <button
          className="non-footer-button confetti-button confetti-button--incorrect"
          id="confetti-button"
          onClick={doItHard}
          onMouseOver={doIt}
        >
          {text}
          <br></br>
          {text2}
        </button>
      )}
    </div>
  );
}

export default Confetti;
