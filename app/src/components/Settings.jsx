// ================== Imports ================== //

import Loggito from "../utils/Loggito";
import updatePassword from "../logic/updatePassword";

// ================== Component ================== //

function Settings({ onFeedback, onUpdatePassword }) {
  // ================== Consts ================== //

  const logger = new Loggito("Settings");

  logger.info("constructor");

  logger.info("render");

  // ================== Function: updates details in db depending on form id ================== //

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { target: form } = event;

    const formValues = {
      formId: null,
      updatedName: null,
      password: null,
      newEmail: null,
      oldPassword: null,
      newPassword: null,
      confirmNewPassword: null,
    };

    formValues.formId = form.id;

    if (form.id === "nameForm") {
      const updatedNameInput = form.updatedName;
      const passwordInput = form.passwordName;

      formValues.updatedName = updatedNameInput.value;
      formValues.password = passwordInput.value;
    }

    if (form.id === "passwordForm") {
      const oldPasswordInput = form.oldPassword;
      const newPasswordInput = form.newPassword;
      const confirmNewPasswordInput = form.confirmNewPassword;

      formValues.oldPassword = oldPasswordInput.value;
      formValues.newPassword = newPasswordInput.value;
      formValues.confirmNewPassword = confirmNewPasswordInput.value;
    }

    if (form.id === "emailForm") {
      const newEmailInput = form.newEmail;
      const passwordInput = form.passwordEmail;

      formValues.newEmail = newEmailInput.value;
      formValues.password = passwordInput.value;
    }

    try {
      updatePassword(
        sessionStorage.token,
        formValues,

        function (error) {
          if (error) {
            onFeedback({ message: error.message, level: "warning" });

            logger.warn(error.message);

            return;
          }

          form.reset();

          onUpdatePassword();
        }
      );
    } catch (error) {
      onFeedback({ message: error.message, level: "warning" });

      logger.warn(error.message);
    }
  };

  // ================== jsx ================== //

  return (
    <main className="register-page page background flex-container">
      <div className="settings-elements flex-container grouped-elements">
        <div className="login-elements flex-container settings-form-card">
          <form
            id="nameForm"
            action=""
            className="form flex-container login-form"
            onSubmit={handleFormSubmit}
          >
            <div className="form__field">{/* <p>{nickname}</p> */}</div>
            <div className="input-fields">
              <div className="form__field">
                <label htmlFor="updatedName">updated name</label>
                <input
                  type="txt"
                  placeholder="updated name"
                  name="updatedName"
                  id="updatedName"
                  className="input-item"
                />
              </div>
              <div className="form__field">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  id="passwordName"
                  className="input-item"
                />
              </div>
            </div>
            <button type="submit" className="button--primary">
              Update
            </button>
          </form>
        </div>

        <div className="login-elements flex-container settings-form-card">
          <form
            id="passwordForm"
            action=""
            className="form flex-container login-form"
            onSubmit={handleFormSubmit}
          >
            <div className="input-fields">
              <div className="form__field">
                <label htmlFor="password">old password</label>
                <input
                  type="password"
                  placeholder="old password"
                  name="oldPassword"
                  id="oldPassword"
                  className="input-item"
                />
              </div>
              <div className="form__field">
                <label htmlFor="newPassword">new password</label>
                <input
                  type="password"
                  placeholder="new password"
                  name="newPassword"
                  id="newPassword"
                  className="input-item"
                />
              </div>
              <div className="form__field">
                <label htmlFor="confirmNewPassword">confirm password</label>
                <input
                  type="password"
                  placeholder="confirm password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  className="input-item"
                />
              </div>
            </div>
            <button type="submit" className="button--primary">
              Update
            </button>
          </form>
        </div>

        <div className="login-elements flex-container settings-form-card">
          <form
            id="emailForm"
            action=""
            className="form flex-container login-form"
            onSubmit={handleFormSubmit}
          >
            <div className="form__field">{/* <p>{currentEmail}</p> */}</div>
            <div className="input-fields">
              <div className="form__field">
                <label htmlFor="newEmail">new email</label>
                <input
                  type="email"
                  placeholder="new email"
                  name="newEmail"
                  id="newEmail"
                  className="input-item"
                />
              </div>

              <div className="form__field">
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  placeholder="type password"
                  name="password"
                  id="passwordEmail"
                  className="input-item"
                />
              </div>
            </div>
            <button type="submit" className="button--primary">
              Update
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Settings;
