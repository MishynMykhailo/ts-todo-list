import React, { useState } from "react";
import s from "./AddTodo.module.css";
interface IProps {
  onAddTodo: (todo: string) => void;
}

const AddTodo: React.FC<IProps> = ({ onAddTodo }) => {
  const [todo, setTodo] = useState<string>("");
  // save data in state
  function todoHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value);
  }

  // send create todo
  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    if (!todo) {
      return;
    }
    onAddTodo(todo);
    setTodo("");
  }

  return (
    <>
      <form onSubmit={submitHandler} className={s.form}>
        <div className={s.div}>
          <input
            className={s.input}
            type="text"
            id="add-todo"
            onChange={todoHandler}
            value={todo}
            autoComplete="off"
          />
        </div>
        <button className={s.button} type="submit">
          AddTodo
        </button>
      </form>
    </>
  );
};

export default AddTodo;
