import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import css from "../HomePage/homePage.module.css";
import { Link } from "react-router-dom";
import { deleteTodos, fetchTodos, postTodos } from "../../Reducer/todosReducer";
import { useState } from "react";
import { logaut } from '../../Reducer/userReducer'

const HomePage = () => {
  const [text, setText] = useState('')

  const todos = useSelector((state) => state.todos.todos);
  const error = useSelector((state) => state.todos.error);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleRemove =(id) => {
    dispatch(deleteTodos(id))
  }

  const handleSubmit =(e) => {
    e.preventDefault()
    if (text !== "" && text[0] !== ' ') {
      dispatch(postTodos(text));
    }
    setText("");
  }

  const handleText =(e) => {
    setText(e.target.value)
  }

  const handleClick = () => {
    if (text !== "" && text[0] !== ' ') {
      dispatch(postTodos(text));
    }
    setText("");
  }

  const handleLog = () => {
    if(token){
      dispatch(logaut())
    }
  }

  return (
    <div className={css.mainbody}>
      <div className={css.main}>
        <header className={css.header}>
          <div className={css.registr}>
            <p>
              <Link to="/Signup">Регистрация</Link>
              <Link to="/Signin">Вход</Link>
              <button onClick={handleLog} className={css.btnlog}>Выйти</button>
            </p>
          </div>
          <h1 className={css.mainString}>Главная страница</h1>
          <h3 className={css.todoDiv}>Список Дел</h3>
        </header>
        <div>
          <div className={css.divInput}>
            <form type='submit'
            onSubmit={(e) => handleSubmit(e)} className={css.form}>
              <input
                className={css.mainInput}
                onChange={handleText}
                value={text}
                type="text"
                placeholder="Введите текст"
              />
              <button onClick={handleClick} className={css.btnAdd}>Добавить дело</button>
            </form>
          </div>
        </div>
      </div>
      <div className={css.divTodo}>
        <div className={css.mapDiv}>
            {todos.map((item) => {
              return <div className={css.itemDiv}>{item.text}
              <button 
              className={css.removebtn}
              onClick={()=>handleRemove(item)}>delete</button></div>;
            })}
          {error && <div className={css.errorDiv}>{error} </div>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
