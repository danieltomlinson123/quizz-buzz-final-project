// ================== Imports ================== //

import "./Spinner.css";

// ================== Component ================== //

function Spinner() {
  return (
    <div className="spinner-container">
      <div className="dot-container flex-">
        <div className="dot dot1"></div>
      </div>
      <div className="dot-container">
        <div className="dot dot2"></div>
      </div>
      <div className="dot-container">
        <div className="dot dot3"></div>
      </div>
    </div>
  );
}

export default Spinner;
