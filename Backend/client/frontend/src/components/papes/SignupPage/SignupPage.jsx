import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { postUser } from "../../Reducer/userReducer";
import css from "../SignupPage/signupPage.module.css";

const SignupPage = () => {
  const signingUp = useSelector((state) => state.auth.signingUp);
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
      dispatch(postUser({ login, password }));
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
      dispatch(postUser({ login, password }));
      setLogin("");
      setPassword("");
    }
  };

  return (
    <div className={css.upBody}>
      <div className={css.mainDiv}>
        <div className={css.registr}>Регистрация</div>
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
            disabled={signingUp}
          >
            <Link to="/Signin">Зарегистрироваться</Link>
          </button>
          <button className={css.btnregistr}>
            <Link to="/Signin">Есть аккаунт? Войти</Link>
          </button>
          {error && <div className={css.errorDiv}>{error}</div>}
        </form>
        <div className={css.btnDiv}></div>
      </div>
    </div>
  );
};

export default SignupPage;
