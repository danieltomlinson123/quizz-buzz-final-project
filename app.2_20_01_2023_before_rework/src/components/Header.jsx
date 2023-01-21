// ================== Imports ================== //

import "./Header.css";

import { useState } from "react";
import "./Header.css";
import Menu from "./Menu";
import Loggito from "../utils/Loggito";

// ================== Component ================== //

function Header({
  name,
  onLogoutClick,
  onSettingsClick,
  onHomeClick,
  view: viewHome,
}) {
  // ================== Consts ================== //

  const logger = new Loggito("Header");

  // ================== Hook consts ================== //

  const [view, setView] = useState(null); // [null, f () {}]
  const [menuView, setMenuView] = useState("home");

  // ================== Functions ================== //

  const handleMenuClick = () => {
    setView("menu");

    logger.debug("setView", "menu");
  };

  const handleCloseClick = () => {
    setView(null);

    logger.debug("setView", null);
  };

  const handleLogoutClick = () => {
    onLogoutClick();
    handleCloseClick();
  };

  const handleHomeClick = () => {
    setMenuView("home");
    onHomeClick();
    handleCloseClick();
  };

  const handleSettingsClick = () => {
    setMenuView("settings");
    onSettingsClick();
    handleCloseClick();
  };

  logger.info("render");

  // ================== jsx ================== //

  return (
    <header className=" header flex-container navigation-bar">
      <div className="navigation-bar flex-container">
        <div className="navigation-bar">
          <p className="welcome">Hello, {name}!</p>
          {view === null && (
            <button
              type="menu"
              className="menu-button menu-button__styles menu-panel-button"
              onClick={handleMenuClick}
            >
              <span className="material-symbols-outlined nav-icon logout-button-style">
                menu
              </span>
            </button>
          )}
          {view === "menu" && (
            <button
              type="menu"
              className="menu-button menu-button__styles menu-panel-button"
              onClick={handleCloseClick}
            >
              <span className="material-symbols-outlined nav-icon logout-button-style">
                close
              </span>
            </button>
          )}
        </div>
        <h1 className="app-title">Quizz Buzz</h1>
        {view === "menu" && (
          <Menu
            onLogoutClick={handleLogoutClick}
            onSettingsClick={handleSettingsClick}
            onHomeClick={handleHomeClick}
            onCloseClick={handleCloseClick}
            view={viewHome}
            menuView={menuView}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
