// ================== Imports ================== //

import "./Feedback.css";
import withContext from "../utils/withContext";

// ================== Component ================== //

function Feedback({ context: { level, message, handleAcceptFeedback } }) {
  // ================== jsx ================== //
  return (
    <div
      className={`Feedback flex-container Feedback--${level ? level : "info"}`}
    >
      <div className="Feedback__box flex-container  container--spaced  container--padded">
        {message}
        <button className="toast-accept-button" onClick={handleAcceptFeedback}>
          Accept
        </button>
      </div>
    </div>
  );
}

export default withContext(Feedback);
