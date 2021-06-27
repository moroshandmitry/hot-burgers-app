import PT from "prop-types";

export const Login = ({ authenticate }) => (
  <div className="login-container">
    <nav className="login">
      <h2>Авторизация</h2>
      <p>Введите логин и пароль Вашего аккаунта GitHub</p>
      <button onClick={() => authenticate()} className="github">
        Войти
      </button>
    </nav>
  </div>
);

Login.propTypes = {
  authenticate: PT.func.isRequired,
};
