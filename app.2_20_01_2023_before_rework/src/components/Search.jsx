// ================== Imports ================== //

import "./Search.css";

import Loggito from "../utils/Loggito";

// ================== Component ================== //

function Search({ onQuery }) {
  // ================== Consts ================== //

  const logger = new Loggito("Search");

  // ================== Functions ================== //

  const handleSubmit = (event) => {
    event.preventDefault();

    const query = event.target.query.value;

    onQuery(query);
  };

  logger.info("return");

  // ================== jsx ================== //

  return (
    <form className="grouped-elements flex-row" onSubmit={handleSubmit}>
      <input
        className="input-field search-input"
        type="text"
        name="query"
        placeholder="Search questions..."
      />
      <button className="material-symbols-outlined nav-icon logout-button-style search-button">
        search
      </button>
    </form>
  );
}

export default Search;
