// ================== Imports ================== //

import "../game-screens.css";

function Teacher2PlayersConnected({
  pin,
  nameOfClass,
  nickname,
  handleScreenChangeT2,
}) {
  // ================== Function ================== //

  const onButtonClick = () => {
    handleScreenChangeT2("Teacher3CreateQuestion");
  };

  // ================== jsx ================== //

  return (
    <div className="game-screen">
      <main className="game-screen-main flex--spaced">
        <div className="grouped-elements">
          <p className="info--bold">PIN: {pin}</p>
          <p className="info--bold">Class: {nameOfClass}</p>
        </div>
        <div className="grouped-elements">
          <p className="paragraph--bold">Players connected:</p>
          {nickname.length === 0 && (
            <div className="info">
              <p>Waiting for players to connect...</p>
            </div>
          )}
          {nickname.length !== 0 && (
            <ul className="info">
              {/* <ul>{nicknameString}</ul> */}
              {nickname.map((ncknme) => {
                return (
                  <li className="players-connected-list-item" key="ncknme">
                    {/* {ncknme.nickname} */}
                    {ncknme}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <button className="footer-button" onClick={onButtonClick}>
          start game
        </button>
      </main>

      <footer className="game-screen-footer"></footer>
    </div>
  );
}

export default Teacher2PlayersConnected;
