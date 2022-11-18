// ================== Imports ================== //

import Loggito from "../utils/Loggito";
import registerUser from "../logic/registerUser";
// import onFeedback from "../App";
import withContext from "../utils/withContext";

import "./RegisterPage.css";

function RegisterPage({
  context: { handleNavigationToLogin, handleFeedback },
}) {
  const logger = new Loggito(RegisterPage.name);

  logger.info("constructor");

  const handleClick = (event) => {
    event.preventDefault();

    handleNavigationToLogin();
  };

  logger.info("render");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const nameInput = form.name;
    const emailInput = form.email;
    const passwordInput = form.password;

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      registerUser(name, email, password, function (error) {
        if (error) {
          handleFeedback({
            message: error.message,
            level: "warn",
          });

          logger.warn(error.message);

          return;
        }

        form.reset();

        handleFeedback({
          message: "User registered successfully",
          level: "success",
        });

        handleNavigationToLogin();
      });
    } catch (error) {
      handleFeedback({
        message: error.message,
        level: "warn",
      });

      logger.warn(error.message);
    }
  };

  return (
    <main className="register-page page background flex-container">
      <div className="login-elements flex-container">
        <form
          action=""
          className="form flex-container login-form"
          onSubmit={handleFormSubmit}
        >
          <div className="input-fields">
            <div className="form__field">
              <label htmlFor="name">name</label>
              <input
                type="text"
                placeholder="name"
                name="name"
                id="name"
                className="input-item"
              />
            </div>

            <div className="form__field">
              <label htmlFor="email">email</label>
              <input
                type="email"
                placeholder="email"
                name="email"
                id="email"
                className="input-item"
              />
            </div>

            <div className="form__field">
              <label htmlFor="password">password</label>
              <input
                type="password"
                placeholder="password"
                name="password"
                id="password"
                className="input-item"
              />
            </div>
          </div>
          <button type="submit" className="button--primary">
            Register
          </button>
        </form>
      </div>
      <a className="anchor" onClick={handleClick}>
        Already have an account?
      </a>
    </main>
  );
}

export default withContext(RegisterPage);
