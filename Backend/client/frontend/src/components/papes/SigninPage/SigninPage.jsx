import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { doLogin } from "../../Reducer/userReducer";
import css from "../SigninPage/signinPage.module.css";

const SigninPage = () => {
  const signingIn = useSelector((state) => state.auth.signingIn);
  const error = useSelector((state) => state.auth.error);
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
    if (
      login[0] !== " " &&
      password[0] !== " " &&
      login !== "" &&
      password !== ""
    ) {
      dispatch(doLogin({ login, password }));
      setLogin("");
      setPassword("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      login[0] !== " " &&
      password[0] !== " " &&
      login !== "" &&
      password !== ""
    ) {
      dispatch(doLogin({ login, password }));
      setLogin("");
      setPassword("");
    }
  };

  return (
    <div className={css.upBody}>
      <div className={css.mainDiv}>
        <div className={css.registr}>Страница входа</div>
        <hr />
        <form onSubmit={(e) => handleSubmit(e)} className={css.loginPass}>
          <input
            className={css.inputLogin}
            value={login}
            type="login"
            onChange={handleChangeLogin}
            placeholder="Логин..."
          />
          <input
            className={css.inputLogin}
            type="password"
            value={password}
            onChange={handleChangePassword}
            placeholder="Пароль..."
          />
          <button
            className={css.btnReg}
            onClick={handleClick}
            disabled={signingIn}
          >
            Авторизация
          </button>
          <button className={css.btnregistr}>
            <Link to="/Signup">Нет аккаунта? Зарегистрироваться</Link>
          </button>
          {error && <div className={css.errorDiv}>{error}</div>}
        </form>
        <div className={css.btnDiv}></div>
      </div>
    </div>
  );
};

export default SigninPage;
