// ================== Imports ================== //

import "./Menu.css";
import Loggito from "../utils/Loggito";
import withContext from "../utils/withContext";
import { useState } from "react";

function Menu({
  menuView,
  onLogoutClick,
  onSettingsClick,
  onHomeClick,
  onCloseClick,
  context: { handleThemeChange },
}) {
  // ================== Consts ================== //

  const logger = new Loggito("Menu");

  // ================== Hook consts ================== //

  const [themeMenu, setThemeMenu] = useState(null);

  logger.info("render");

  // ================== Functions: change pages within home ================== //

  const handleLogoutClick = () => onLogoutClick();

  const handleSettingsClick = () => {
    onSettingsClick();
  };

  const handleHomeClick = () => {
    onHomeClick();
  };

  // ================== Functions: change themes ================== //

  const onThemeMenuClick = () => {
    if (!themeMenu) setThemeMenu("showThemeMenu");
    else setThemeMenu(null);
  };

  const onThemeClick1 = () => {
    handleThemeChange("default");
    onCloseClick();
  };
  const onThemeClick2 = () => {
    handleThemeChange("green");
    onCloseClick();
  };
  const onThemeClick3 = () => {
    handleThemeChange("earth");
    onCloseClick();
  };
  const onThemeClick4 = () => {
    handleThemeChange("contrast");
    onCloseClick();
  };
  const onThemeClick5 = () => {
    handleThemeChange("pink");
    onCloseClick();
  };

  // ================== Values to map the menu ================== //

  const elementsMenu =
    menuView === "home"
      ? [
          { text: "Settings", action: handleSettingsClick, key: 1 },
          { text: "Theme", action: onThemeMenuClick, key: 3 },
          { text: "Logout", action: handleLogoutClick, key: 4 },
        ]
      : [
          { text: "Home", action: handleHomeClick, key: 2 },
          { text: "Theme", action: onThemeMenuClick, key: 3 },
          { text: "Logout", action: handleLogoutClick, key: 4 },
        ];

  // ================== jsx ================== //

  return (
    <>
      <div className="menu-panel">
        <ul className="dropdown-menu menu-panel__list">
          {elementsMenu.map((element) => {
            return (
              <li
                className="menu-panel__list-item dropdown-item settings-button"
                key={element.key}
                onClick={element.action}
              >
                <button className="dropdown__link">
                  <span className="material-symbols-outlined">arrow_right</span>
                  {element.text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {themeMenu === "showThemeMenu" && (
        <ul className=" menu-panel dropdown-menu menu-panel__list themeMenu">
          <li
            className="menu-panel__list-item dropdown-item settings-button"
            onClick={onThemeClick1}
          >
            <button className="dropdown__link">
              <span className="material-symbols-outlined">arrow_right</span>
              Classic
            </button>
          </li>
          <li
            className="menu-panel__list-item dropdown-item settings-button"
            onClick={onThemeClick2}
          >
            <button className="dropdown__link">
              <span className="material-symbols-outlined">arrow_right</span>
              Green
            </button>
          </li>
          <li
            className="menu-panel__list-item dropdown-item settings-button"
            onClick={onThemeClick3}
          >
            <button className="dropdown__link">
              <span className="material-symbols-outlined">arrow_right</span>
              Earth
            </button>
          </li>
          <li
            className="menu-panel__list-item dropdown-item settings-button"
            onClick={onThemeClick4}
          >
            <button className="dropdown__link">
              <span className="material-symbols-outlined">arrow_right</span>
              Contrast
            </button>
          </li>
          <li
            className="menu-panel__list-item dropdown-item settings-button"
            onClick={onThemeClick5}
          >
            <button className="dropdown__link">
              <span class="material-symbols-outlined">arrow_right</span>
              Pink
            </button>
          </li>
        </ul>
      )}
    </>
  );
}

export default withContext(Menu);
